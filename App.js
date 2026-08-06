import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';

const WORDS_DATABASE = [
  { 
    en: 'BOOK', 
    pronunciation: 'بوك', 
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80' 
  },
  { 
    en: 'PEN', 
    pronunciation: 'بين', 
    image: 'https://images.unsplash.com/photo-1585336261026-675768e74ed2?w=500&q=80' 
  },
  { 
    en: 'APPLE', 
    pronunciation: 'أبل', 
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80' 
  },
  { 
    en: 'CAR', 
    pronunciation: 'كار', 
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&q=80' 
  },
  { 
    en: 'SCHOOL', 
    pronunciation: 'سكول', 
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&q=80' 
  },
  { 
    en: 'SUN', 
    pronunciation: 'سان', 
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80' 
  },
  { 
    en: 'WATER', 
    pronunciation: 'ووتر', 
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=500&q=80' 
  },
  { 
    en: 'HOUSE', 
    pronunciation: 'هاوس', 
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&q=80' 
  },
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
      
      {/* بطاقة الكلمة والصورة */}
      <View style={styles.card}>
        <Image 
          source={{ uri: currentWord.image }} 
          style={styles.cardImage} 
          resizeMode="cover"
        />
        <Text style={styles.englishText}>{currentWord.en}</Text>
        <Text style={styles.pronunciationText}>{currentWord.pronunciation}</Text>
      </View>

      {/* أزرار التنقل */}
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
    height: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
  },
  cardImage: {
    width: '90%',
    height: 180,
    borderRadius: 16,
  },
  englishText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#DC2626',
    letterSpacing: 2,
    marginTop: 10,
  },
  pronunciationText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#16A34A',
    marginBottom: 10,
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
      
