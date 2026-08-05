import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WORDS_DATABASE = [
  // الكلمات الأساسية
  { ar: 'كتاب', en: 'BOOK', pronunciation: 'بوك' },
  { ar: 'قلم', en: 'PEN', pronunciation: 'بين' },
  { ar: 'تفاحة', en: 'APPLE', pronunciation: 'أبل' },
  { ar: 'سيارة', en: 'CAR', pronunciation: 'كار' },
  { ar: 'مدرسة', en: 'SCHOOL', pronunciation: 'سكول' },
  { ar: 'شمس', en: 'SUN', pronunciation: 'سان' },
  { ar: 'قمر', en: 'MOON', pronunciation: 'مون' },
  { ar: 'ماء', en: 'WATER', pronunciation: 'ووتر' },
  { ar: 'بيت', en: 'HOUSE', pronunciation: 'هاوس' },
  { ar: 'صديق', en: 'FRIEND', pronunciation: 'فريند' },
  { ar: 'طعام', en: 'FOOD', pronunciation: 'فود' },
  { ar: 'وقت', en: 'TIME', pronunciation: 'تايم' },
  { ar: 'عمل', en: 'WORK', pronunciation: 'ويرك' },
  { ar: 'هاتف', en: 'PHONE', pronunciation: 'فون' },
  { ar: 'باب', en: 'DOOR', pronunciation: 'دور' },
  { ar: 'نافذة', en: 'WINDOW', pronunciation: 'ويندو' },
  { ar: 'مال', en: 'MONEY', pronunciation: 'ماني' },
  { ar: 'عائلة', en: 'FAMILY', pronunciation: 'فاميلي' },
  { ar: 'مدينة', en: 'CITY', pronunciation: 'سيتي' },
  { ar: 'طريق', en: 'ROAD', pronunciation: 'رود' },

  // الجمل والعبارات اليومية
  { ar: 'صباح الخير', en: 'GOOD MORNING', pronunciation: 'غود مورنينغ' },
  { ar: 'مساء الخير', en: 'GOOD EVENING', pronunciation: 'غود إيفنينغ' },
  { ar: 'شكراً لك', en: 'THANK YOU', pronunciation: 'ثانك يو' },
  { ar: 'كيف حالك؟', en: 'HOW ARE YOU?', pronunciation: 'هاو أر يو؟' },
  { ar: 'أنا أحبك', en: 'I LOVE YOU', pronunciation: 'آي لاف يو' },
  { ar: 'أراك لاحقاً', en: 'SEE YOU LATER', pronunciation: 'سي يو ليتر' },
  { ar: 'مع السلامة', en: 'GOODBYE', pronunciation: 'غود باي' },
  { ar: 'أنا جائع', en: 'I AM HUNGRY', pronunciation: 'آي أيم هانغري' },
  { ar: 'أنا تعبان', en: 'I AM TIRED', pronunciation: 'آي أيم تايرد' },
  { ar: 'ما اسمك؟', en: 'WHAT IS YOUR NAME?', pronunciation: 'وات إز يور نيم؟' },
  { ar: 'سررت بلقائك', en: 'NICE TO MEET YOU', pronunciation: 'نايس تو ميت يو' },
  { ar: 'من فضلك', en: 'PLEASE', pronunciation: 'بليز' },
  { ar: 'أنا لا أفهم', en: 'I DO NOT UNDERSTAND', pronunciation: 'آي دو نوت أندرستاند' },
  { ar: 'ساعدني', en: 'HELP ME', pronunciation: 'هيلب مي' },
  { ar: 'كم السعر؟', en: 'HOW MUCH IS IT?', pronunciation: 'هاو ماتش إز إت؟' },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % WORDS_DATABASE.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + WORDS_DATABASE.length) % WORDS_DATABASE.length);
  };

  const currentWord = WORDS_DATABASE[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* بطاقة الكلمة */}
      <View style={styles.card}>
        <Text style={styles.arabicText}>{currentWord.ar}</Text>
        <Text style={styles.englishText}>{currentWord.en}</Text>
        <Text style={styles.pronunciationText}>{currentWord.pronunciation}</Text>
      </View>

      {/* أزرار التنقل */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.btn} onPress={handlePrev}>
          <Ionicons name="arrow-forward" size={24} color="#000" />
          <Text style={styles.btnText}>السابقة</Text>
        </TouchableOpacity>

        <Text style={styles.counter}>{currentIndex + 1} / {WORDS_DATABASE.length}</Text>

        <TouchableOpacity style={styles.btn} onPress={handleNext}>
          <Text style={styles.btnText}>التالية</Text>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  card: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 40,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  arabicText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  englishText: {
    fontSize: 44,
    fontWeight: '900',
    color: '#DC2626',
    textAlign: 'center',
    letterSpacing: 2,
  },
  pronunciationText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#16A34A',
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    gap: 8,
    elevation: 2,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  counter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
  },
});
        
