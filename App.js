import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// مصفوفة الكلمات بنفس الترتيب وبدون ألوان
const WORDS_DATA = [
  { id: 1, word: 'BOOK', translation: 'بوك', image: require('./assets/book.png') },
  { id: 2, word: 'PEN', translation: 'بين', image: require('./assets/pen.png') },
  { id: 3, word: 'APPLE', translation: 'أبل', image: require('./assets/apple.png') },
  { id: 4, word: 'CAR', translation: 'كار', image: require('./assets/car.png') },
  { id: 5, word: 'SCHOOL', translation: 'سكول', image: require('./assets/school.png') },
  { id: 6, word: 'SUN', translation: 'سان', image: require('./assets/sun.png') },
  { id: 7, word: 'WATER', translation: 'ووتـر', image: require('./assets/water.png') },
  { id: 8, word: 'HOUSE', translation: 'هاوس', image: require('./assets/house.png') },
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
    <View style={styles.container}>
      <ImageBackground source={currentItem.image} style={styles.backgroundImage} resizeMode="cover">
        <SafeAreaView style={styles.overlay}>
          
          <View style={styles.textContainer}>
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
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  englishWord: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 10,
  },
  arabicWord: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
  
