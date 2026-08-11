import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const WORDS_DATA = [
  { id: 1, word: 'BOOK', translation: 'كتاب', image: require('./assets/book.png') },
  { id: 2, word: 'PEN', translation: 'قلم', image: require('./assets/pen.png') },
  { id: 3, word: 'APPLE', translation: 'تفاحة', image: require('./assets/apple.png') },
  { id: 4, word: 'CAR', translation: 'سيارة', image: require('./assets/car.png') },
  { id: 5, word: 'SCHOOL', translation: 'مدرسة', image: require('./assets/school.png') },
  { id: 6, word: 'SUN', translation: 'شمس', image: require('./assets/sun.png') },
  { id: 7, word: 'WATER', translation: 'ماء', image: require('./assets/water.png') },
  { id: 8, word: 'HOUSE', translation: 'منزل', image: require('./assets/house.png') },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < WORDS_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // العودة للكلمة الأولى عند الوصول للنهاية
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(WORDS_DATA.length - 1); // الانتقال للكلمة الأخيرة
    }
  };

  const currentWord = WORDS_DATA[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image source={currentWord.image} style={styles.image} resizeMode="cover" />
        <Text style={styles.englishWord}>{currentWord.word}</Text>
        <Text style={styles.arabicWord}>{currentWord.translation}</Text>
      </View>

      <View style={styles.controlsContainer}>
        {/* زر الكلمة السابقة - مع سهم يتجه لليمين */}
        <TouchableOpacity style={styles.button} onPress={handlePrevious}>
          <Text style={styles.buttonText}>الكلمة السابقة →</Text>
        </TouchableOpacity>

        {/* العداد بتنسيق صحيح: الحالي / الإجمالي */}
        <Text style={styles.counter}>
          {currentIndex + 1} / {WORDS_DATA.length}
        </Text>

        {/* زر الكلمة التالية - مع سهم يتجه لليسار */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>← الكلمة التالية</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  englishWord: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 10,
    textAlign: 'center',
  },
  arabicWord: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 350,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
  },
  counter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555555',
  },
});
  
