import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// نستخدم مصفوفة الكلمات بنفس روابط الصور الموجودة في مشروعك
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
      {/* الصورة تغطي الشاشة بالكامل */}
      <ImageBackground source={currentItem.image} style={styles.backgroundImage} resizeMode="cover">
        <SafeAreaView style={styles.overlay}>
          
          {/* محتوى النصوص فوق الصورة */}
          <View style={styles.textContainer}>
            <Text style={styles.englishWord}>{currentItem.word}</Text>
            <Text style={styles.arabicWord}>{currentItem.translation}</Text>
          </View>

          {/* شريط التحكم في الأسفل */}
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // طبقة شفافة بسيطة لإبراز النصوص
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  englishWord: {
    fontSize: 42,
    fontWeight: '900',
    color: '#D32F2F',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginBottom: 10,
  },
  arabicWord: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E7D32',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
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
    color: '#333333',
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
  },
});
            
