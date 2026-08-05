import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WORDS_DATABASE = [
  { ar: 'كتاب', en: 'BOOK', pronunciation: 'بوك' },
  { ar: 'قلم', en: 'PEN', pronunciation: 'بين' },
  { ar: 'تفاحة', en: 'APPLE', pronunciation: 'أبل' },
  { ar: 'سيارة', en: 'CAR', pronunciation: 'كار' },
  { ar: 'مدرسة', en: 'SCHOOL', pronunciation: 'سكول' },
  { ar: 'صباح الخير', en: 'GOOD MORNING', pronunciation: 'غود مورنينغ' },
  { ar: 'شكراً لك', en: 'THANK YOU', pronunciation: 'ثانك يو' },
  { ar: 'كيف حالك؟', en: 'HOW ARE YOU?', pronunciation: 'هاو أر يو؟' },
];

export default function FlashcardScreen() {
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
    
