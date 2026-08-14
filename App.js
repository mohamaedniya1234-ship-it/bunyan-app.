import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const WORDS_DATA = [
  { id: 1, word: 'BOOK', translation: 'بوك', image: { uri: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000' } },
  { id: 2, word: 'PEN', translation: 'بين', image: { uri: 'https://images.unsplash.com/photo-1585336261026-875a60a1c92f?q=80&w=1000' } },
  { id: 3, word: 'APPLE', translation: 'أبل', image: { uri: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=1000' } },
  { id: 4, word: 'CAR', translation: 'كار', image: { uri: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000' } },
  { id: 5, word: 'SCHOOL', translation: 'سكول', image: { uri: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1000' } },
  { id: 6, word: 'SUN', translation: 'سان', image: { uri: 'https://images.unsplash.com/photo-1532592935640-3cf690f3171c?q=80&w=1000' } },
  { id: 7, word: 'WATER', translation: 'ووتـر', image: { uri: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?q=80&w=1000' } }, // صورة ماء نقية وحقيقية
  { id: 8, word: 'HOUSE', translation: 'هاوس', image: { uri: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1000' } },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < WORDS_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(WORDS_DATA.length - 1);
    }
  };

  const currentItem = WORDS_DATA[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* بطاقة عرض الكلمة والنوع */}
      <View style={styles.card}>
        <Image source={currentItem.image} style={styles.image} resizeMode="cover" />
        <Text style={styles.englishWord}>{currentItem.word}</Text>
        <Text style={styles.arabicWord}>{currentItem.translation}</Text>
      </View>

      {/* أزرار التنقل والعداد */}
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
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 20,
  },
  englishWord: {
    fontSize: 34,
    fontWeight: '800',
    color: '#D32F2F',
    marginBottom: 8,
    textAlign: 'center',
  },
  arabicWord: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '700',
  },
  counter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555555',
  },
});

