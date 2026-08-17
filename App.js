import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';

// روابط تعتمد على أسماء الكلمات مباشرة لضمان التطابق 100%
const WORDS_DATA = [
  // 1-10
  { id: 1, arabic: 'كتاب', english: 'BOOK', pronunciation: 'بوك', image: { uri: 'https://img.icons8.com/color/256/book.png' } },
  { id: 2, arabic: 'قلم', english: 'PEN', pronunciation: 'بين', image: { uri: 'https://img.icons8.com/color/256/pen.png' } },
  { id: 3, arabic: 'تفاحة', english: 'APPLE', pronunciation: 'أبل', image: { uri: 'https://img.icons8.com/color/256/apple.png' } },
  { id: 4, arabic: 'سيارة', english: 'CAR', pronunciation: 'كار', image: { uri: 'https://img.icons8.com/color/256/car.png' } },
  { id: 5, arabic: 'مدرسة', english: 'SCHOOL', pronunciation: 'سكول', image: { uri: 'https://img.icons8.com/color/256/school.png' } },
  { id: 6, arabic: 'شمس', english: 'SUN', pronunciation: 'سان', image: { uri: 'https://img.icons8.com/color/256/sun.png' } },
  { id: 7, arabic: 'ماء', english: 'WATER', pronunciation: 'ووتر', image: { uri: 'https://img.icons8.com/color/256/glass-of-water.png' } },
  { id: 8, arabic: 'منزل', english: 'HOUSE', pronunciation: 'هاوس', image: { uri: 'https://img.icons8.com/color/256/home.png' } },
  { id: 9, arabic: 'قطة', english: 'CAT', pronunciation: 'كات', image: { uri: 'https://img.icons8.com/color/256/cat.png' } },
  { id: 10, arabic: 'كلب', english: 'DOG', pronunciation: 'دوغ', image: { uri: 'https://img.icons8.com/color/256/dog.png' } },

  // 11-20
  { id: 11, arabic: 'شجرة', english: 'TREE', pronunciation: 'تري', image: { uri: 'https://img.icons8.com/color/256/tree.png' } },
  { id: 12, arabic: 'زهرة', english: 'FLOWER', pronunciation: 'فلاور', image: { uri: 'https://img.icons8.com/color/256/flower.png' } },
  { id: 13, arabic: 'حليب', english: 'MILK', pronunciation: 'ميلك', image: { uri: 'https://img.icons8.com/color/256/milk.png' } },
  { id: 14, arabic: 'موز', english: 'BANANA', pronunciation: 'بنانة', image: { uri: 'https://img.icons8.com/color/256/banana.png' } },
  { id: 15, arabic: 'طائرة', english: 'PLANE', pronunciation: 'بلين', image: { uri: 'https://img.icons8.com/color/256/airplane.png' } },
  { id: 16, arabic: 'قمر', english: 'MOON', pronunciation: 'مون', image: { uri: 'https://img.icons8.com/color/256/moon.png' } },
  { id: 17, arabic: 'حافلة', english: 'BUS', pronunciation: 'باص', image: { uri: 'https://img.icons8.com/color/256/bus.png' } },
  { id: 18, arabic: 'طاولة', english: 'TABLE', pronunciation: 'تيبل', image: { uri: 'https://img.icons8.com/color/256/table.png' } },
  { id: 19, arabic: 'كرسي', english: 'CHAIR', pronunciation: 'تشير', image: { uri: 'https://img.icons8.com/color/256/chair.png' } },
  { id: 20, arabic: 'ساعة', english: 'CLOCK', pronunciation: 'كلوك', image: { uri: 'https://img.icons8.com/color/256/clock.png' } },

  // 21-30
  { id: 21, arabic: 'خبز', english: 'BREAD', pronunciation: 'بريد', image: { uri: 'https://img.icons8.com/color/256/bread.png' } },
  { id: 22, arabic: 'جبن', english: 'CHEESE', pronunciation: 'تشيز', image: { uri: 'https://img.icons8.com/color/256/cheese.png' } },
  { id: 23, arabic: 'بيض', english: 'EGG', pronunciation: 'إيغ', image: { uri: 'https://img.icons8.com/color/256/eggs.png' } },
  { id: 24, arabic: 'سمك', english: 'FISH', pronunciation: 'فيش', image: { uri: 'https://img.icons8.com/color/256/fish.png' } },
  { id: 25, arabic: 'طائر', english: 'BIRD', pronunciation: 'بيرد', image: { uri: 'https://img.icons8.com/color/256/bird.png' } },
  { id: 26, arabic: 'أسد', english: 'LION', pronunciation: 'لايون', image: { uri: 'https://img.icons8.com/color/256/lion.png' } },
  { id: 27, arabic: 'فيل', english: 'ELEPHANT', pronunciation: 'إليفانت', image: { uri: 'https://img.icons8.com/color/256/elephant.png' } },
  { id: 28, arabic: 'قرد', english: 'MONKEY', pronunciation: 'مانكي', image: { uri: 'https://img.icons8.com/color/256/monkey.png' } },
  { id: 29, arabic: 'دب', english: 'BEAR', pronunciation: 'بير', image: { uri: 'https://img.icons8.com/color/256/bear.png' } },
  { id: 30, arabic: 'أرنب', english: 'RABBIT', pronunciation: 'رابيت', image: { uri: 'https://img.icons8.com/color/256/rabbit.png' } },

  // 31-40
  { id: 31, arabic: 'هاتف', english: 'PHONE', pronunciation: 'فون', image: { uri: 'https://img.icons8.com/color/256/smartphone.png' } },
  { id: 32, arabic: 'مفتاح', english: 'KEY', pronunciation: 'كي', image: { uri: 'https://img.icons8.com/color/256/key.png' } },
  { id: 33, arabic: 'حقيبة', english: 'BAG', pronunciation: 'باغ', image: { uri: 'https://img.icons8.com/color/256/backpack.png' } },
  { id: 34, arabic: 'باب', english: 'DOOR', pronunciation: 'دور', image: { uri: 'https://img.icons8.com/color/256/door.png' } },
  { id: 35, arabic: 'نافذة', english: 'WINDOW', pronunciation: 'ويندو', image: { uri: 'https://img.icons8.com/color/256/window.png' } },
  { id: 36, arabic: 'سرير', english: 'BED', pronunciation: 'بيد', image: { uri: 'https://img.icons8.com/color/256/bed.png' } },
  { id: 37, arabic: 'قبعة', english: 'HAT', pronunciation: 'هات', image: { uri: 'https://img.icons8.com/color/256/hat.png' } },
  { id: 38, arabic: 'حذاء', english: 'SHOES', pronunciation: 'شوز', image: { uri: 'https://img.icons8.com/color/256/shoes.png' } },
  { id: 39, arabic: 'قميص', english: 'SHIRT', pronunciation: 'شيرت', image: { uri: 'https://img.icons8.com/color/256/t-shirt.png' } },
  { id: 40, arabic: 'كرة', english: 'BALL', pronunciation: 'بول', image: { uri: 'https://img.icons8.com/color/256/soccer-ball.png' } },

  // 41-50
  { id: 41, arabic: 'مطر', english: 'RAIN', pronunciation: 'رين', image: { uri: 'https://img.icons8.com/color/256/rain.png' } },
  { id: 42, arabic: 'نجمة', english: 'STAR', pronunciation: 'ستار', image: { uri: 'https://img.icons8.com/color/256/star.png' } },
  { id: 43, arabic: 'سحابة', english: 'CLOUD', pronunciation: 'كلاود', image: { uri: 'https://img.icons8.com/color/256/clouds.png' } },
  { id: 44, arabic: 'نار', english: 'FIRE', pronunciation: 'فاير', image: { uri: 'https://img.icons8.com/color/256/fire-element.png' } },
  { id: 45, arabic: 'برتقال', english: 'ORANGE', pronunciation: 'أورانج', image: { uri: 'https://img.icons8.com/color/256/orange.png' } },
  { id: 46, arabic: 'عنب', english: 'GRAPES', pronunciation: 'غريبس', image: { uri: 'https://img.icons8.com/color/256/grapes.png' } },
  { id: 47, arabic: 'بطيخ', english: 'WATERMELON', pronunciation: 'ووترميلون', image: { uri: 'https://img.icons8.com/color/256/watermelon.png' } },
  { id: 48, arabic: 'فراولة', english: 'STRAWBERRY', pronunciation: 'ستروبيري', image: { uri: 'https://img.icons8.com/color/256/strawberry.png' } },
  { id: 49, arabic: 'جزر', english: 'CARROT', pronunciation: 'كاروت', image: { uri: 'https://img.icons8.com/color/256/carrot.png' } },
  { id: 50, arabic: 'دراجة', english: 'BICYCLE', pronunciation: 'بايسكل', image: { uri: 'https://img.icons8.com/color/256/bicycle.png' } },
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
    
