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
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Speech from 'expo-speech';

SplashScreen.preventAutoHideAsync();

const categories = [
  'الكل', 'العائلة', 'أعضاء الجسم', 'الألوان', 'الحيوانات', 'الطعام', 
  'المهن', 'المنزل', 'الملابس', 'الطبيعة', 'النقل', 'المدرسة', 
  'الرياضة', 'الطقس', 'الصفات', 'الأفعال', 'التحيات', 'جمل مفيدة'
];

const vocabularyData = [
  // --- العائلة ---
  { id: 1, arabic: 'أب', english: 'FATHER', pron: 'فاذر', emoji: '👨', category: 'العائلة' },
  { id: 2, arabic: 'أم', english: 'MOTHER', pron: 'ماذر', emoji: '👩', category: 'العائلة' },
  { id: 3, arabic: 'أخ', english: 'BROTHER', pron: 'براذر', emoji: '👦', category: 'العائلة' },
  { id: 4, arabic: 'أخت', english: 'SISTER', pron: 'سيستر', emoji: '👧', category: 'العائلة' },
  // (تم تقليل البيانات في هذا العرض لتسريع الكود، يمكنك لصق بقية الكلمات التي كانت في الكود السابق هنا أو تركها كما هي، سأضع بعضها للاختبار)
  { id: 161, arabic: 'مرحباً', english: 'HELLO', pron: 'هالو', emoji: '👋', category: 'التحيات' },
  { id: 171, arabic: 'كيف حالك؟', english: 'HOW ARE YOU?', pron: 'هاو آر يو', emoji: '❓', category: 'جمل مفيدة' },
];

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

  const speakWord = (word) => {
    Speech.speak(word, {
      language: 'en-US',
      rate: 0.9, 
    });
  };

  const currentItem = filteredData[currentIndex] || filteredData[0];

  // شاشة الشرح لقاعدة حرف C
  if (currentScreen === 'RULE_C') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.topHeaderNav}>
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('HOME')}>
            <Text style={styles.backButtonText}>← القائمة الرئيسية</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.ruleScreenContent}>
          <Text style={styles.screenMainTitle}>قاعدة نطق حرف C</Text>
          <Text style={styles.screenSubTitle}>متى ننطقه S ومتى ننطقه K ؟</Text>

          {/* القاعدة الأولى: S */}
          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>S</Text>
              <Text style={styles.ruleDetailTitle}>يُنطق مثل حرف S</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              إذا جاء بعد حرف C مباشرة أحد هذه الحروف الثلاثة: ( E, I, Y )
            </Text>

            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>City <Text style={styles.exampleTranslation}>(مدينة)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('City')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Center <Text style={styles.exampleTranslation}>(مركز)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Center')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Bicycle <Text style={styles.exampleTranslation}>(دراجة)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Bicycle')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* القاعدة الثانية: K */}
          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>K</Text>
              <Text style={styles.ruleDetailTitle}>يُنطق مثل حرف K</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              إذا جاء بعده أي حرف آخر (مثل: A, O, U) أو إذا جاء في نهاية الكلمة.
            </Text>

            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Cat <Text style={styles.exampleTranslation}>(قطة)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Cat')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Cold <Text style={styles.exampleTranslation}>(بارد)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Cold')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Music <Text style={styles.exampleTranslation}>(موسيقى)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Music')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // الشاشة الرئيسية
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
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => setCurrentScreen('VOCABULARY')}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardEmojiHeader}>👩💯👋</Text>
                <Text style={styles.cardMainText}>إلى أخ...</Text>
              </View>
              <Text style={styles.cardFooterText}>كلمات و الجمل</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.gridCard}
              onPress={() => setCurrentScreen('RULE_C')} // تم تفعيل الزر هنا
            >
              <View style={styles.cardContent}>
                <Text style={styles.ruleTitle}>عندك مشكلة مع حرف <Text style={styles.redCircle}>C</Text></Text>
                <View style={styles.ruleBox}>
                  <Text style={styles.badgeYellow}>S</Text>
                  <Text style={styles.ruleText}>متى ينطق</Text>
                </View>
                <View style={styles.ruleBox}>
                  <Text style={styles.badgeYellow}>K</Text>
                  <Text style={styles.ruleText}>ومتى ينطق</Text>
                </View>
              </View>
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

  // شاشة الكلمات
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View style={styles.topHeaderNav}>
        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('HOME')}>
          <Text style={styles.backButtonText}>← القائمة الرئيسية</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryPill, selectedCategory === cat && styles.activeCategoryPill]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryText, selectedCategory === cat && styles.activeCategoryText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.emoji}>{currentItem.emoji}</Text>

          <Text style={styles.arabicWord}>{currentItem.arabic}</Text>

          <Text style={styles.englishWord}>
            {currentItem.pron} / {currentItem.english}
          </Text>

          <TouchableOpacity 
            style={styles.soundButton} 
            onPress={() => speakWord(currentItem.english)}
          >
            <Text style={styles.soundButtonText}>🔊 استمع للكلمة</Text>
          </TouchableOpacity>

          <View style={styles.navigationRow}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={handlePrevious}
            >
              <Text style={styles.navButtonText}>← السابقة</Text>
            </TouchableOpacity>

            <Text style={styles.counterText}>
              {currentIndex + 1} / {filteredData.length}
            </Text>

            <TouchableOpacity
              style={styles.navButton}
              onPress={handleNext}
            >
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
  
  /* ستايلات الشاشة الرئيسية */
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
  ruleTitle: { fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, color: '#212529' },
  redCircle: { color: '#D32F2F', fontWeight: 'bold' },
  ruleBox: { flexDirection: 'row-reverse', alignItems: 'center', marginVertical: 2 },
  badgeYellow: { backgroundColor: '#FFEB3B', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontWeight: 'bold', fontSize: 12, marginLeft: 4 },
  ruleText: { fontSize: 11, color: '#333' },
  largeCardText: { fontSize: 38, fontWeight: 'bold', color: '#212529' },
  mediumCardText: { fontSize: 18, fontWeight: 'bold', color: '#212529', textAlign: 'center', lineHeight: 26 },
  
  /* ستايلات التنقل العلوي */
  topHeaderNav: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10 },
  backButton: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#E9ECEF', borderRadius: 12 },
  backButtonText: { fontSize: 14, fontWeight: '600', color: '#0084FF' },
  
  /* ستايلات شاشة الكلمات */
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

  /* ستايلات شاشة قاعدة C الجديدة */
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
      
