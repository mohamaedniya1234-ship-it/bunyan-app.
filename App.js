// App.js

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  BackHandler,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';
import { categories, vocabularyData, storiesData, grammarData, pronunciationRules } from './data';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('HOME'); 
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [filteredData, setFilteredData] = useState(vocabularyData);
  const [currentIndex, setCurrentIndex] = useState(0);

  // حالات قسم الاختبارات (Quiz States)
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'الكل') {
      setFilteredData(vocabularyData);
    } else {
      const filtered = vocabularyData.filter((item) => item.category === selectedCategory);
      setFilteredData(filtered);
    }
    setCurrentIndex(0);
  }, [selectedCategory]);

  // التحكم بزر الرجوع في الهاتف (Hardware Back Button)
  useEffect(() => {
    const backAction = () => {
      if (currentScreen === 'HOME') {
        return false; 
      } else if (['PRONUNCIATION_RULES', 'VOCABULARY', 'TEXT_STORIES', 'GRAMMAR_BASICS', 'QUIZ_SCREEN'].includes(currentScreen)) {
        setCurrentScreen('HOME'); 
        return true; 
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [currentScreen]);

  const handleNext = () => {
    if (currentIndex < filteredData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredData.length - 1);
    }
  };

  const speakWord = async (word) => {
    try {
      const isSpeaking = await Speech.isSpeakingAsync();
      if (isSpeaking) {
        await Speech.stop();
      }
      Speech.speak(word, {
        language: 'en-US',
        rate: 0.85, 
      });
    } catch (e) {
      console.log(e);
    }
  };

  // دالة بدء اختبار جديد
  const startQuiz = () => {
    const shuffled = [...vocabularyData].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10); // 10 أسئلة في كل اختبار
    
    const formattedQuestions = selected.map(item => {
      const wrongOptions = vocabularyData
        .filter(v => v.id !== item.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(v => v.english);
      
      const options = [...wrongOptions, item.english].sort(() => 0.5 - Math.random());
      return {
        arabic: item.arabic,
        emoji: item.emoji,
        correct: item.english,
        options: options
      };
    });

    setQuizQuestions(formattedQuestions);
    setCurrentQuizIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizFinished(false);
    setCurrentScreen('QUIZ_SCREEN');
  };

  const handleAnswerOption = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === quizQuestions[currentQuizIndex].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuizIndex + 1;
    if (nextIndex < quizQuestions.length) {
      setCurrentQuizIndex(nextIndex);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const currentItem = filteredData[currentIndex] || filteredData[0];

  // ==========================================
  // شاشة الاختبارات التفاعلية (QUIZ_SCREEN)
  // ==========================================
  if (currentScreen === 'QUIZ_SCREEN') {
    const currentQ = quizQuestions[currentQuizIndex];
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.topHeaderNav}>
          <TouchableOpacity style={styles.iconBackButton} onPress={() => setCurrentScreen('HOME')}>
            <Ionicons name="home" size={24} color="#0084FF" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          {quizFinished ? (
            <View style={styles.card}>
              <Text style={{ fontSize: 60, marginBottom: 15 }}>🎉</Text>
              <Text style={styles.screenMainTitle}>انتهى الاختبار!</Text>
              <Text style={{ fontSize: 18, color: '#495057', marginVertical: 15, fontWeight: 'bold' }}>
                نتيجتك هي: {score} من {quizQuestions.length}
              </Text>
              <TouchableOpacity style={styles.soundButton} onPress={startQuiz}>
                <Text style={styles.soundButtonText}>🔄 إعادة الاختبار</Text>
              </TouchableOpacity>
            </View>
          ) : (
            currentQ && (
              <View style={styles.card}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#6C757D', marginBottom: 10 }}>
                  السؤال {currentQuizIndex + 1} / {quizQuestions.length}
                </Text>
                <Text style={{ fontSize: 60, marginBottom: 10 }}>{currentQ.emoji}</Text>
                <Text style={styles.arabicWord}>{currentQ.arabic}</Text>
                <Text style={{ fontSize: 15, color: '#6C757D', marginBottom: 20 }}>ما هي الكلمة بالإنجليزية؟</Text>

                <View style={{ width: '100%', marginBottom: 20 }}>
                  {currentQ.options.map((option, index) => {
                    let btnBg = '#FFFFFF';
                    let txtColor = '#212529';
                    let borderColor = '#E9ECEF';

                    if (isAnswered) {
                      if (option === currentQ.correct) {
                        btnBg = '#D4EDDA';
                        txtColor = '#155724';
                        borderColor = '#C3E6CB';
                      } else if (option === selectedOption) {
                        btnBg = '#F8D7DA';
                        txtColor = '#721C24';
                        borderColor = '#F5C6CB';
                      }
                    }

                    return (
                      <TouchableOpacity
                        key={index}
                        style={[styles.optionButton, { backgroundColor: btnBg, borderColor: borderColor }]}
                        onPress={() => handleAnswerOption(option)}
                        disabled={isAnswered}
                      >
                        <Text style={[styles.optionText, { color: txtColor }]}>{option}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {isAnswered && (
                  <TouchableOpacity style={styles.soundButton} onPress={handleNextQuestion}>
                    <Text style={styles.soundButtonText}>السؤال التالي ←</Text>
                  </TouchableOpacity>
                )}
              </View>
            )
          )}
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // شاشة أسرار النطق الديناميكية (PRONUNCIATION_RULES)
  // ==========================================
  if (currentScreen === 'PRONUNCIATION_RULES') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.topHeaderNav}>
          <TouchableOpacity style={styles.iconBackButton} onPress={() => setCurrentScreen('HOME')}>
            <Ionicons name="home" size={24} color="#0084FF" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.ruleScreenContent}>
          <Text style={styles.screenMainTitle}>أسرار النطق</Text>
          <Text style={styles.screenSubTitle}>قواعد الحروف والحركات المحيرة في الإنجليزية</Text>

          {pronunciationRules.map((rule) => (
            <View key={rule.id} style={styles.ruleDetailCard}>
              <View style={styles.ruleDetailHeader}>
                <Text style={styles.badgeYellowBig}>💡</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={styles.ruleDetailTitle}>{rule.title}</Text>
                  <Text style={{ fontSize: 13, color: '#F57C00', fontWeight: 'bold', marginTop: 2 }}>{rule.subtitle}</Text>
                </View>
              </View>
              
              <Text style={styles.ruleExplanation}>{rule.rule}</Text>
              
              <View style={styles.examplesContainer}>
                <View style={styles.exampleRow}>
                  <Text style={styles.exampleEnglish}>{rule.example}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (currentScreen === 'TEXT_STORIES') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.topHeaderNav}>
          <TouchableOpacity style={styles.iconBackButton} onPress={() => setCurrentScreen('HOME')}>
            <Ionicons name="home" size={24} color="#0084FF" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.ruleScreenContent}>
          <Text style={styles.screenMainTitle}>نصوص ومحادثات</Text>
          <Text style={styles.screenSubTitle}>طور مهارة القراءة والاستماع بجمل واقعية</Text>

          {storiesData.map((item) => (
            <View key={item.id} style={styles.ruleDetailCard}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0084FF', marginBottom: 6 }}>{item.title}</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#212529', marginBottom: 4 }}>{item.englishText}</Text>
              <Text style={{ fontSize: 14, color: '#6C757D', marginBottom: 12 }}>النطق: {item.pron}</Text>
              <Text style={{ fontSize: 15, color: '#495057', marginBottom: 15, borderTopWidth: 1, borderTopColor: '#F1F3F5', paddingTop: 8 }}>
                الترجمة: {item.arabicText}
              </Text>
              <TouchableOpacity style={styles.soundButton} onPress={() => speakWord(item.englishText)}>
                <Text style={styles.soundButtonText}>🔊 استمع للنص</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (currentScreen === 'GRAMMAR_BASICS') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.topHeaderNav}>
          <TouchableOpacity style={styles.iconBackButton} onPress={() => setCurrentScreen('HOME')}>
            <Ionicons name="home" size={24} color="#0084FF" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.ruleScreenContent}>
          <Text style={styles.screenMainTitle}>أساسيات اللغة الإنجليزية</Text>
          <Text style={styles.screenSubTitle}>قواعد مبسطة لبناء أساس قوي</Text>

          {grammarData.map((rule) => (
            <View key={rule.id} style={styles.ruleDetailCard}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#D32F2F', marginBottom: 8 }}>{rule.title}</Text>
              <Text style={{ fontSize: 15, color: '#495057', lineHeight: 22, marginBottom: 10 }}>{rule.description}</Text>
              <View style={{ backgroundColor: '#F8F9FA', padding: 10, borderRadius: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0084FF' }}>أمثلة: {rule.examples}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==========================================
  // الشاشة الرئيسية (HOME)
  // ==========================================
  if (currentScreen === 'HOME') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.homeHeader}>
          <Text style={styles.homeTitle}>Bunyan</Text>
          <Text style={styles.homeSubtitle}>اختر القسم الذي تريد دراسته</Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            <TouchableOpacity style={styles.gridCard} onPress={() => setCurrentScreen('VOCABULARY')}>
              <View style={styles.cardContent}>
                <Text style={styles.cardEmojiHeader}>👩💯👋</Text>
                <Text style={styles.cardMainText}>إلى أخ...</Text>
              </View>
              <Text style={styles.cardFooterText}>الكلمات والجمل</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridCard} onPress={() => setCurrentScreen('PRONUNCIATION_RULES')}>
              <View style={styles.cardContent}>
                <Text style={{ fontSize: 35, marginBottom: 8 }}>🤔</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#F57C00', textAlign: 'center' }}>أسرار النطق</Text>
              </View>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#E65100', marginTop: 6, textAlign: 'center' }}>
                الحروف المحيرة
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.gridRow}>
            <TouchableOpacity style={styles.gridCard} onPress={() => setCurrentScreen('TEXT_STORIES')}>
              <View style={styles.cardContent}>
                <Text style={{ fontSize: 30, marginBottom: 4 }}>📖</Text>
                <Text style={styles.largeCardText}>نص</Text>
              </View>
              <Text style={{ fontSize: 12, color: '#6C757D', marginTop: 4 }}>محادثات وقصص</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridCard} onPress={() => setCurrentScreen('GRAMMAR_BASICS')}>
              <View style={styles.cardContent}>
                <Text style={{ fontSize: 30, marginBottom: 4 }}>✍️</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#212529', textAlign: 'center', lineHeight: 20 }}>اساسيات اللغة الانجليزية</Text>
              </View>
              <Text style={{ fontSize: 12, color: '#6C757D', marginTop: 4 }}>قواعد مبسطة</Text>
            </TouchableOpacity>
          </View>

          {/* زر خاص بقسم الاختبارات التفاعلية */}
          <View style={{ marginTop: 10, paddingHorizontal: 4 }}>
            <TouchableOpacity style={styles.quizBannerButton} onPress={startQuiz}>
              <Text style={{ fontSize: 22, marginRight: 10 }}>🎯</Text>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>اختبر معلوماتك</Text>
                <Text style={{ fontSize: 12, color: '#E3F2FD' }}>تحدَّ نفسك في الكلمات والجمل</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // شاشة الكلمات والجمل (الافتراضية)
  // ==========================================
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <View style={styles.topHeaderNav}>
        <TouchableOpacity style={styles.iconBackButton} onPress={() => setCurrentScreen('HOME')}>
          <Ionicons name="home" size={22} color="#0084FF" />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {categories.map((cat, index) => (
            <TouchableOpacity key={index} style={[styles.categoryPill, selectedCategory === cat && styles.activeCategoryPill]} onPress={() => setSelectedCategory(cat)}>
              <Text style={[styles.categoryText, selectedCategory === cat && styles.activeCategoryText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.emoji}>{currentItem?.emoji}</Text>
          <Text style={styles.arabicWord}>{currentItem?.arabic}</Text>
          <Text style={styles.englishWord}>{currentItem?.pron} / {currentItem?.english}</Text>
          <TouchableOpacity style={styles.soundButton} onPress={() => speakWord(currentItem?.english)}>
            <Text style={styles.soundButtonText}>🔊 استمع</Text>
          </TouchableOpacity>

          <View style={styles.navigationRow}>
            <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
              <Text style={styles.navButtonText}>← السابقة</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>{currentIndex + 1} / {filteredData.length}</Text>
            <TouchableOpacity style={styles.navButton} onPress={handleNext}>
              <Text style={styles.navButtonText}>التالية →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  homeHeader: { paddingTop: 20, paddingHorizontal: 20, alignItems: 'center', marginBottom: 10 },
  homeTitle: { fontSize: 28, fontWeight: 'bold', color: '#0084FF' },
  homeSubtitle: { fontSize: 14, color: '#6C757D', marginTop: 4 },
  gridContainer: { flex: 1, paddingHorizontal: 16, justifyContent: 'center', paddingBottom: 20 },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  gridCard: { width: cardWidth, height: cardWidth * 0.95, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 12, alignItems: 'center', justifyContent: 'space-between', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 6, borderWidth: 1, borderColor: '#EFEFEF' },
  cardContent: { flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' },
  cardEmojiHeader: { fontSize: 26, marginBottom: 4 },
  cardMainText: { fontSize: 24, fontWeight: 'bold', color: '#D32F2F' },
  cardFooterText: { fontSize: 15, fontWeight: 'bold', color: '#E53935', marginTop: 6 },
  largeCardText: { fontSize: 32, fontWeight: 'bold', color: '#212529' },
  
  quizBannerButton: { flexDirection: 'row-reverse', backgroundColor: '#0084FF', borderRadius: 16, padding: 15, alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  
  topHeaderNav: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 10, flexDirection: 'row' },
  iconBackButton: { width: 44, height: 44, backgroundColor: '#E3F2FD', borderRadius: 22, justifyContent: 'center', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  
  categoryContainer: { paddingVertical: 5 },
  scrollContent: { paddingHorizontal: 15, flexDirection: 'row-reverse' },
  categoryPill: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 25, backgroundColor: '#E9ECEF', marginLeft: 8 },
  activeCategoryPill: { backgroundColor: '#0084FF' },
  categoryText: { fontSize: 14, color: '#495057', fontWeight: '600' },
  activeCategoryText: { color: '#FFFFFF' },
  cardContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },
  card: { width: width * 0.88, backgroundColor: '#FFFFFF', borderRadius: 24, paddingVertical: 30, paddingHorizontal: 20, alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, borderWidth: 1, borderColor: '#E9ECEF' },
  emoji: { fontSize: 80, marginBottom: 15 },
  arabicWord: { fontSize: 32, fontWeight: 'bold', color: '#212529', marginBottom: 10, textAlign: 'center' },
  englishWord: { fontSize: 18, fontWeight: '600', color: '#495057', letterSpacing: 1, marginBottom: 20, textAlign: 'center' },
  soundButton: { backgroundColor: '#E3F2FD', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginBottom: 30, width: '100%', alignItems: 'center' },
  soundButtonText: { color: '#0084FF', fontSize: 16, fontWeight: 'bold' },
  
  optionButton: { width: '100%', paddingVertical: 12, paddingHorizontal: 15, borderRadius: 12, borderWidth: 1, marginBottom: 10, alignItems: 'center' },
  optionText: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },

  navigationRow: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingTop: 15, borderTopWidth: 1, borderTopColor: '#F1F3F5' },
  navButton: { paddingVertical: 8, paddingHorizontal: 10 },
  navButtonText: { fontSize: 14, color: '#0084FF', fontWeight: 'bold' },
  counterText: { fontSize: 15, fontWeight: '700', color: '#212529' },

  ruleScreenContent: { paddingHorizontal: 20, paddingBottom: 40 },
  screenMainTitle: { fontSize: 26, fontWeight: 'bold', color: '#212529', textAlign: 'center', marginTop: 10 },
  screenSubTitle: { fontSize: 16, color: '#6C757D', textAlign: 'center', marginBottom: 20, marginTop: 5 },
  ruleDetailCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, borderWidth: 1, borderColor: '#E9ECEF' },
  ruleDetailHeader: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 12 },
  badgeYellowBig: { backgroundColor: '#FFEB3B', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, fontWeight: 'bold', fontSize: 16, marginLeft: 10, color: '#212529' },
  ruleDetailTitle: { fontSize: 18, fontWeight: 'bold', color: '#212529', textAlign: 'right' },
  ruleExplanation: { fontSize: 15, color: '#495057', lineHeight: 24, textAlign: 'right', marginBottom: 15 },
  examplesContainer: { backgroundColor: '#F8F9FA', borderRadius: 12, padding: 12 },
  exampleRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  exampleEnglish: { fontSize: 16, fontWeight: 'bold', color: '#0084FF', letterSpacing: 0.5, textAlign: 'right', width: '100%' }
});
