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
import { categories, vocabularyData } from './data'; // استيراد الكلمات والأقسام من الملف الخارجي

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('HOME'); 
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [filteredData, setFilteredData] = useState(vocabularyData);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    const backAction = () => {
      if (currentScreen === 'HOME') {
        return false; 
      } else if (['PRONUNCIATION_RULES', 'VOCABULARY'].includes(currentScreen)) {
        setCurrentScreen('HOME'); 
        return true; 
      } else if (['RULE_C', 'RULE_G', 'RULE_SILENT'].includes(currentScreen)) {
        setCurrentScreen('PRONUNCIATION_RULES'); 
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

  const currentItem = filteredData[currentIndex] || filteredData[0];

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
          <Text style={styles.screenSubTitle}>اختر الحرف لمعرفة أسرار نطقه</Text>

          <TouchableOpacity style={styles.letterMenuCard} onPress={() => setCurrentScreen('RULE_C')}>
            <View style={styles.letterIconContainer}>
              <Text style={styles.letterIcon}>C</Text>
            </View>
            <View style={styles.letterMenuText}>
              <Text style={styles.letterMenuTitle}>قاعدة حرف C</Text>
              <Text style={styles.letterMenuSubtitle}>متى ننطقه S ومتى ننطقه K؟</Text>
            </View>
            <Ionicons name="chevron-back" size={20} color="#ADB5BD" style={styles.arrowIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.letterMenuCard} onPress={() => setCurrentScreen('RULE_G')}>
            <View style={[styles.letterIconContainer, { backgroundColor: '#E3F2FD' }]}>
              <Text style={[styles.letterIcon, { color: '#0084FF' }]}>G</Text>
            </View>
            <View style={styles.letterMenuText}>
              <Text style={styles.letterMenuTitle}>قاعدة حرف G</Text>
              <Text style={styles.letterMenuSubtitle}>متى ننطقه جـ (J) ومتى ننطقه گ؟</Text>
            </View>
            <Ionicons name="chevron-back" size={20} color="#ADB5BD" style={styles.arrowIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.letterMenuCard} onPress={() => setCurrentScreen('RULE_SILENT')}>
            <View style={[styles.letterIconContainer, { backgroundColor: '#FCE4EC' }]}>
              <Ionicons name="volume-mute" size={24} color="#E91E63" />
            </View>
            <View style={styles.letterMenuText}>
              <Text style={styles.letterMenuTitle}>الحروف الصامتة</Text>
              <Text style={styles.letterMenuSubtitle}>تُكتب ولا تُنطق (مثل K و W)</Text>
            </View>
            <Ionicons name="chevron-back" size={20} color="#ADB5BD" style={styles.arrowIcon} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (currentScreen === 'RULE_SILENT') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.topHeaderNav}>
          <TouchableOpacity style={styles.iconBackButton} onPress={() => setCurrentScreen('PRONUNCIATION_RULES')}>
            <Ionicons name="arrow-back" size={24} color="#0084FF" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.ruleScreenContent}>
          <Text style={styles.screenMainTitle}>الحروف الصامتة</Text>
          <Text style={styles.screenSubTitle}>حروف نكتبها ولا ننطقها</Text>

          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>K</Text>
              <Text style={styles.ruleDetailTitle}>حرف K لا يُنطق</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              إذا جاء حرف K في بداية الكلمة وجاء بعده مباشرة حرف N، فإننا لا ننطق حرف K.
            </Text>
            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Know <Text style={styles.exampleTranslation}>(يَعرف - "نو")</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Know')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Knife <Text style={styles.exampleTranslation}>(سكين - "نايف")</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Knife')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>W</Text>
              <Text style={styles.ruleDetailTitle}>حرف W لا يُنطق</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              إذا جاء حرف W في بداية الكلمة وجاء بعده مباشرة حرف R، فإننا لا ننطق حرف W.
            </Text>
            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Write <Text style={styles.exampleTranslation}>(يَكتب - "رايت")</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Write')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Wrong <Text style={styles.exampleTranslation}>(خاطئ - "رونج")</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Wrong')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (currentScreen === 'RULE_C') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.topHeaderNav}>
          <TouchableOpacity style={styles.iconBackButton} onPress={() => setCurrentScreen('PRONUNCIATION_RULES')}>
            <Ionicons name="arrow-back" size={24} color="#0084FF" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.ruleScreenContent}>
          <Text style={styles.screenMainTitle}>قاعدة نطق حرف C</Text>
          <Text style={styles.screenSubTitle}>متى ننطقه S ومتى ننطقه K؟</Text>

          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>S</Text>
              <Text style={styles.ruleDetailTitle}>يُنطق مثل السين (S)</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              إذا جاء بعد حرف C أحد هذه الحروف الثلاثة: ( e, i, y ) فإنه يُنطق (س).
            </Text>
            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>C<Text style={{color: '#E53935'}}>i</Text>ty <Text style={styles.exampleTranslation}>(مدينة)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('City')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>C<Text style={{color: '#E53935'}}>e</Text>nter <Text style={styles.exampleTranslation}>(مركز)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Center')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>K</Text>
              <Text style={styles.ruleDetailTitle}>يُنطق مثل الكاف (K)</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              إذا جاء بعده أي حرف آخر غير (e, i, y) فإنه يُنطق (ك).
            </Text>
            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>C<Text style={{color: '#0084FF'}}>a</Text>t <Text style={styles.exampleTranslation}>(قطة)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Cat')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>C<Text style={{color: '#0084FF'}}>o</Text>ld <Text style={styles.exampleTranslation}>(بارد)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Cold')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (currentScreen === 'RULE_G') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.topHeaderNav}>
          <TouchableOpacity style={styles.iconBackButton} onPress={() => setCurrentScreen('PRONUNCIATION_RULES')}>
            <Ionicons name="arrow-back" size={24} color="#0084FF" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.ruleScreenContent}>
          <Text style={styles.screenMainTitle}>قاعدة نطق حرف G</Text>
          <Text style={styles.screenSubTitle}>متى ننطقه جـ ومتى ننطقه گ؟</Text>

          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>J</Text>
              <Text style={styles.ruleDetailTitle}>يُنطق (جـ) معطشة</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              غالباً إذا جاء بعد حرف G أحد الحروف: ( e, i, y ) فإنه يُنطق (جـ).
            </Text>
            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>G<Text style={{color: '#E53935'}}>y</Text>m <Text style={styles.exampleTranslation}>(صالة رياضية)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Gym')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>G<Text style={{color: '#E53935'}}>i</Text>ant <Text style={styles.exampleTranslation}>(عملاق)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Giant')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>G</Text>
              <Text style={styles.ruleDetailTitle}>يُنطق (گ) مصرية</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              إذا جاء بعده أي حرف آخر (مثل a, o, u) فإنه يُنطق (گ).
            </Text>
            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>G<Text style={{color: '#0084FF'}}>o</Text>od <Text style={styles.exampleTranslation}>(جيد)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Good')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>G<Text style={{color: '#0084FF'}}>a</Text>me <Text style={styles.exampleTranslation}>(لعبة)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Game')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
            <TouchableOpacity style={styles.gridCard}>
              <View style={styles.cardContent}>
                <Text style={styles.largeCardText}>نص</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridCard}>
              <View style={styles.cardContent}>
                <Text style={styles.mediumCardText}>اساسيات اللغة الانجليزية</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

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
  gridContainer: { flex: 1, paddingHorizontal: 16, justifyContent: 'center' },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  gridCard: { width: cardWidth, height: cardWidth * 1.05, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 12, alignItems: 'center', justifyContent: 'space-between', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 6, borderWidth: 1, borderColor: '#EFEFEF' },
  cardContent: { flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' },
  cardEmojiHeader: { fontSize: 26, marginBottom: 4 },
  cardMainText: { fontSize: 24, fontWeight: 'bold', color: '#D32F2F' },
  cardFooterText: { fontSize: 15, fontWeight: 'bold', color: '#E53935', marginTop: 6 },
  largeCardText: { fontSize: 38, fontWeight: 'bold', color: '#212529' },
  mediumCardText: { fontSize: 18, fontWeight: 'bold', color: '#212529', textAlign: 'center', lineHeight: 26 },
  
  topHeaderNav: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 10, flexDirection: 'row' },
  iconBackButton: { width: 44, height: 44, backgroundColor: '#E3F2FD', borderRadius: 22, justifyContent: 'center', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  
  letterMenuCard: { flexDirection: 'row-reverse', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 15, marginBottom: 15, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, borderWidth: 1, borderColor: '#E9ECEF' },
  letterIconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginLeft: 15 },
  letterIcon: { fontSize: 24, fontWeight: 'bold', color: '#F57C00' },
  letterMenuText: { flex: 1, alignItems: 'flex-end' },
  letterMenuTitle: { fontSize: 18, fontWeight: 'bold', color: '#212529', marginBottom: 4 },
  letterMenuSubtitle: { fontSize: 13, color: '#6C757D' },
  arrowIcon: { marginRight: 10 },
  
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
  soundButton: { backgroundColor: '#E3F2FD', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginBottom: 30 },
  soundButtonText: { color: '#0084FF', fontSize: 16, fontWeight: 'bold' },
  navigationRow: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingTop: 15, borderTopWidth: 1, borderTopColor: '#F1F3F5' },
  navButton: { paddingVertical: 8, paddingHorizontal: 10 },
  navButtonText: { fontSize: 14, color: '#0084FF', fontWeight: 'bold' },
  counterText: { fontSize: 15, fontWeight: '700', color: '#212529' },

  ruleScreenContent: { paddingHorizontal: 20, paddingBottom: 40 },
  screenMainTitle: { fontSize: 26, fontWeight: 'bold', color: '#212529', textAlign: 'center', marginTop: 10 },
  screenSubTitle: { fontSize: 16, color: '#6C757D', textAlign: 'center', marginBottom: 20, marginTop: 5 },
  ruleDetailCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, borderWidth: 1, borderColor: '#E9ECEF' },
  ruleDetailHeader: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 12 },
  badgeYellowBig: { backgroundColor: '#FFEB3B', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, fontWeight: 'bold', fontSize: 18, marginLeft: 10, color: '#212529' },
  ruleDetailTitle: { fontSize: 18, fontWeight: 'bold', color: '#212529' },
  ruleExplanation: { fontSize: 15, color: '#495057', lineHeight: 24, textAlign: 'right', marginBottom: 20 },
  examplesContainer: { backgroundColor: '#F8F9FA', borderRadius: 12, padding: 15 },
  exampleRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#E9ECEF' },
  exampleEnglish: { fontSize: 18, fontWeight: 'bold', color: '#0084FF', letterSpacing: 1 },
  exampleTranslation: { fontSize: 14, color: '#6C757D', fontWeight: 'normal' },
  smallSoundBtn: { backgroundColor: '#E3F2FD', padding: 8, borderRadius: 50 },
  smallSoundIcon: { fontSize: 14 }
});
