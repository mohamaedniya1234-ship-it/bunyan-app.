import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const WORDS_DATA = [
  { id: 1, arabic: 'كتاب', english: 'BOOK', pronunciation: 'بوك', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3389/3389081.png' } },
  { id: 2, arabic: 'قلم', english: 'PEN', pronunciation: 'بين', image: { uri: 'https://cdn-icons-png.flaticon.com/512/1250/1250615.png' } },
  { id: 3, arabic: 'تفاحة', english: 'APPLE', pronunciation: 'أبل', image: { uri: 'https://cdn-icons-png.flaticon.com/512/415/415733.png' } },
  { id: 4, arabic: 'سيارة', english: 'CAR', pronunciation: 'كار', image: { uri: 'https://cdn-icons-png.flaticon.com/512/741/741407.png' } },
  { id: 5, arabic: 'مدرسة', english: 'SCHOOL', pronunciation: 'سكول', image: { uri: 'https://cdn-icons-png.flaticon.com/512/167/167707.png' } },
  { id: 6, arabic: 'شمس', english: 'SUN', pronunciation: 'سان', image: { uri: 'https://cdn-icons-png.flaticon.com/512/869/869869.png' } },
  { id: 7, arabic: 'ماء', english: 'WATER', pronunciation: 'ووتر', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png' } },
  { id: 8, arabic: 'منزل', english: 'HOUSE', pronunciation: 'هاوس', image: { uri: 'https://cdn-icons-png.flaticon.com/512/619/619153.png' } },
  { id: 9, arabic: 'قطة', english: 'CAT', pronunciation: 'كات', image: { uri: 'https://cdn-icons-png.flaticon.com/512/616/616430.png' } },
  { id: 10, arabic: 'كلب', english: 'DOG', pronunciation: 'دوغ', image: { uri: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' } },
  { id: 11, arabic: 'شجرة', english: 'TREE', pronunciation: 'تري', image: { uri: 'https://cdn-icons-png.flaticon.com/512/489/489969.png' } },
  { id: 12, arabic: 'زهرة', english: 'FLOWER', pronunciation: 'فلاور', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2926/2926754.png' } },
  { id: 13, arabic: 'حليب', english: 'MILK', pronunciation: 'ميلك', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3050/3050146.png' } },
  { id: 14, arabic: 'موز', english: 'BANANA', pronunciation: 'بنانة', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3137/3137044.png' } },
  { id: 15, arabic: 'طائرة', english: 'PLANE', pronunciation: 'بلين', image: { uri: 'https://cdn-icons-png.flaticon.com/512/789/789393.png' } },
  { id: 16, arabic: 'قمر', english: 'MOON', pronunciation: 'مون', image: { uri: 'https://cdn-icons-png.flaticon.com/512/1823/1823324.png' } },
  { id: 17, arabic: 'حافلة', english: 'BUS', pronunciation: 'باص', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png' } },
  { id: 18, arabic: 'طاولة', english: 'TABLE', pronunciation: 'تيبل', image: { uri: 'https://cdn-icons-png.flaticon.com/512/1663/1663942.png' } },
  { id: 19, arabic: 'كرسي', english: 'CHAIR', pronunciation: 'تشير', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2622/2622289.png' } },
  { id: 20, arabic: 'ساعة', english: 'CLOCK', pronunciation: 'كلوك', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2928/2928738.png' } },
  { id: 21, arabic: 'أسد', english: 'LION', pronunciation: 'لايون', image: { uri: 'https://cdn-icons-png.flaticon.com/512/616/616412.png' } },
  { id: 22, arabic: 'فيل', english: 'ELEPHANT', pronunciation: 'إليفانت', image: { uri: 'https://cdn-icons-png.flaticon.com/512/616/616410.png' } },
  { id: 23, arabic: 'قرد', english: 'MONKEY', pronunciation: 'مانكي', image: { uri: 'https://cdn-icons-png.flaticon.com/512/616/616417.png' } },
  { id: 24, arabic: 'طائر', english: 'BIRD', pronunciation: 'بيرد', image: { uri: 'https://cdn-icons-png.flaticon.com/512/616/616432.png' } },
  { id: 25, arabic: 'سمك', english: 'FISH', pronunciation: 'فيش', image: { uri: 'https://cdn-icons-png.flaticon.com/512/616/616433.png' } },
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
      <View style={styles.card}>
        <Image 
          key={currentItem.id} 
          source={currentItem.image} 
          style={styles.image} 
          resizeMode="contain" 
        />
        
        <Text style={styles.arabicWord}>{currentItem.arabic}</Text>
        
        <Text style={styles.englishAndPronunciation}>
          {currentItem.english} / {currentItem.pronunciation}
        </Text>
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
                                                                           
