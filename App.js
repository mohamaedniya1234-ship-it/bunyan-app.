import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

const WORDS_DATA = [
  { id: 1, word: 'BOOK', translation: 'كتاب / بوك', color: '#4A90E2' },
  { id: 2, word: 'PEN', translation: 'قلم / بين', color: '#50E3C2' },
  { id: 3, word: 'APPLE', translation: 'تفاحة / أبل', color: '#E74C3C' },
  { id: 4, word: 'CAR', translation: 'سيارة / كار', color: '#F39C12' },
  { id: 5, word: 'SCHOOL', translation: 'مدرسة / سكول', color: '#9B59B6' },
  { id: 6, word: 'SUN', translation: 'شمس / سان', color: '#F1C40F' },
  { id: 7, word: 'WATER', translation: 'ماء / ووتر', color: '#3498DB' },
  { id: 8, word: 'HOUSE', translation: 'منزل / هاوس', color: '#2ECC71' },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < WORDS_DATA.length - 1 ? prev + 1 : 0));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : WORDS_DATA.length - 1));
  };

  const currentItem = WORDS_DATA[currentIndex];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentItem.color }]}>
      <View style={styles.card}>
        <Text style={styles.englishWord}>{currentItem.word}</Text>
        <Text style={styles.arabicWord}>{currentItem.translation}</Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePrevious}>
          <Text style={styles.buttonText}>الكلمة السابقة →</Text>
        </TouchableOpacity>

        <Text style={styles.counter}>
          {currentIndex + 1} / {WORDS_DATA.length}
        </Text>

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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  card: {
    width: '90%',
    height: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    elevation: 8,
  },
  englishWord: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 15,
  },
  arabicWord: {
    fontSize: 32,
    fontWeight: '600',
    color: '#555',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  counter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
});
    
