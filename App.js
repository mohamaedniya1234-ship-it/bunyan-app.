import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const WORDS_DATA = [
  { 
    id: 1, 
    arabic: 'كتاب', 
    english: 'BOOK', 
    pronunciation: 'بوك', 
    image: { uri: 'https://cdn-icons-png.flaticon.com/512/3389/3389081.png' } 
  },
  { 
    id: 2, 
    arabic: 'قلم', 
    english: 'PEN', 
    pronunciation: 'بين', 
    image: { uri: 'https://cdn-icons-png.flaticon.com/512/1250/1250615.png' } 
  },
  { 
    id: 3, 
    arabic: 'تفاحة', 
    english: 'APPLE', 
    pronunciation: 'أبل', 
    image: { uri: 'https://cdn-icons-png.flaticon.com/512/415/415733.png' } 
  },
  { 
    id: 4, 
    arabic: 'سيارة', 
    english: 'CAR', 
    pronunciation: 'كار', 
    image: { uri: 'https://cdn-icons-png.flaticon.com/512/741/741407.png' } 
  },
  { 
    id: 5, 
    arabic: 'مدرسة', 
    english: 'SCHOOL', 
    pronunciation: 'سكول', 
    image: { uri: 'https://cdn-icons-png.flaticon.com/512/167/167707.png' } 
  },
  { 
    id: 6, 
    arabic: 'شمس', 
    english: 'SUN', 
    pronunciation: 'سان', 
    image: { uri: 'https://cdn-icons-png.flaticon.com/512/869/869869.png' } 
  },
  { 
    id: 7, 
    arabic: 'ماء', 
    english: 'WATER', 
    pronunciation: 'ووتر', 
    image: { uri: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png' } // صورة كرتونية لكأس ماء
  },
  { 
    id: 8, 
    arabic: 'منزل', 
    english: 'HOUSE', 
    pronunciation: 'هاوس', 
    image: { uri: 'https://cdn-icons-png.flaticon.com/512/619/619153.png' } 
  },
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
      {/* بطاقة العرض الرئيسية */}
      <View style={styles.card}>
        <Image source={currentItem.image} style={styles.image} resizeMode="contain" />
        
        {/* المعنى بالعربي في الأعلى */}
        <Text style={styles.arabicWord}>{currentItem.arabic}</Text>
        
        {/* الكلمة الإنجليزية والنطق الصوتي بالأسفل */}
        <Text style={styles.englishAndPronunciation}>
          {currentItem.english} / {currentItem.pronunciation}
        </Text>
      </View>

      {/* أزرار التحكم والعداد */}
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  arabicWord: {
    fontSize: 40,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  englishAndPronunciation: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
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
    paddingHorizontal: 8,
  },
  buttonText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '700',
  },
  counter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444444',
  },
});
    
