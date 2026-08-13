import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// قائمة الكلمات مع روابط صور مباشرة عبر الإنترنت (لا تتطلب وجود صور في مجلد assets)
const WORDS_DATA = [
  { id: 1, word: 'BOOK', translation: 'بوك', image: { uri: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000' } },
  { id: 2, word: 'PEN', translation: 'بين', image: { uri: 'https://images.unsplash.com/photo-1585336261026-875a60a1c92f?q=80&w=1000' } },
  { id: 3, word: 'APPLE', translation: 'أبل', image: { uri: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=1000' } },
  { id: 4, word: 'CAR', translation: 'كار', image: { uri: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000' } },
  { id: 5, word: 'SCHOOL', translation: 'سكول', image: { uri: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1000' } },
  { id: 6, word: 'SUN', translation: 'سان', image: { uri: 'https://images.unsplash.com/photo-1532592935640-3cf690f3171c?q=80&w=1000' } },
  { id: 7, word: 'WATER', translation: 'ووتـر', image: { uri: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?q=80&w=1000' } },
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
    <View style={styles.container}>
      {/* الصورة تغطي الخلفية بالكامل */}
      <ImageBackground source={currentItem.image} style={styles.backgroundImage} resizeMode="cover">
        <SafeAreaView style={styles.overlay}>
          
          {/* النصوص فوق الصورة */}
          <View style={styles.textContainer}>
            <Text style={styles.englishWord}>{currentItem.word}</Text>
            <Text style={styles.arabicWord}>{currentItem.translation}</Text>
          </View>

          {/* أزرار التحكم والعداد في الأسفل */}
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.25)', // ظليل خفيف حتى يظهر النص بوضوح فوق أي صورة
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  englishWord: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#D32F2F',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  arabicWord: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E7D32',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 15,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 14,
    color: '#222222',
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
  },
});
            
