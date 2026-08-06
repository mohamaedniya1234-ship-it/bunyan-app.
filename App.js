import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';

const WORDS_DATABASE = [
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
  { ar: 'صباح الخير', en: 'GOOD MORNING', pronunciation: 'غود مورنينغ' },
  { ar: 'مساء الخير', en: 'GOOD EVENING', pronunciation: 'غود إيفنينغ' },
  { ar: 'شكراً لك', en: 'THANK YOU', pronunciation: 'ثانك يو' },
  { ar: 'كيف حالك؟', en: 'HOW ARE YOU?', pronunciation: 'هاو أر يو؟' },
  { ar: 'أنا أحبك', en: 'I LOVE YOU', pronunciation: 'آي لاف يو' }
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
      
      <View style={styles.card}>
        <Text style={styles.arabicText}>{currentWord.ar}</Text>
        <Text style={styles.englishText}>{currentWord.en}</Text>
        <Text style={styles.pronunciationText}>{currentWord.pronunciation}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.btn} onPress={handlePrev}>
          <Text style={styles.btnText}>السابقة</Text>
        </TouchableOpacity>

        <Text style={styles.counter}>{currentIndex + 1} / {WORDS_DATABASE.length}</Text>

        <TouchableOpacity style={styles.btn} onPress={handleNext}>
          <Text style={styles.btnText}>التالية</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    height: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  arabicText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#000000',
  },
  englishText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#DC2626',
    letterSpacing: 2,
  },
  pronunciationText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
  },
  btn: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  counter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B5563',
  },
});
                                      
