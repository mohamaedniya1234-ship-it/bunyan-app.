import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

const WORDS_DATA = [
  // 1-10
  { id: 1, arabic: 'كتاب', english: 'BOOK', pronunciation: 'بوك', emoji: '📖' },
  { id: 2, arabic: 'قلم', english: 'PEN', pronunciation: 'بين', emoji: '🖊️' },
  { id: 3, arabic: 'تفاحة', english: 'APPLE', pronunciation: 'أبل', emoji: '🍎' },
  { id: 4, arabic: 'سيارة', english: 'CAR', pronunciation: 'كار', emoji: '🚗' },
  { id: 5, arabic: 'مدرسة', english: 'SCHOOL', pronunciation: 'سكول', emoji: '🏫' },
  { id: 6, arabic: 'شمس', english: 'SUN', pronunciation: 'سان', emoji: '☀️' },
  { id: 7, arabic: 'ماء', english: 'WATER', pronunciation: 'ووتر', emoji: '💧' },
  { id: 8, arabic: 'منزل', english: 'HOUSE', pronunciation: 'هاوس', emoji: '🏠' },
  { id: 9, arabic: 'قطة', english: 'CAT', pronunciation: 'كات', emoji: '🐈' },
  { id: 10, arabic: 'كلب', english: 'DOG', pronunciation: 'دوغ', emoji: '🐕' },

  // 11-20
  { id: 11, arabic: 'شجرة', english: 'TREE', pronunciation: 'تري', emoji: '🌳' },
  { id: 12, arabic: 'زهرة', english: 'FLOWER', pronunciation: 'فلاور', emoji: '🌻' },
  { id: 13, arabic: 'حليب', english: 'MILK', pronunciation: 'ميلك', emoji: '🥛' },
  { id: 14, arabic: 'موز', english: 'BANANA', pronunciation: 'بنانة', emoji: '🍌' },
  { id: 15, arabic: 'طائرة', english: 'PLANE', pronunciation: 'بلين', emoji: '✈️' },
  { id: 16, arabic: 'قمر', english: 'MOON', pronunciation: 'مون', emoji: '🌙' },
  { id: 17, arabic: 'حافلة', english: 'BUS', pronunciation: 'باص', emoji: '🚌' },
  { id: 18, arabic: 'طاولة', english: 'TABLE', pronunciation: 'تيبل', emoji: '🍽️' },
  { id: 19, arabic: 'كرسي', english: 'CHAIR', pronunciation: 'تشير', emoji: '🪑' },
  { id: 20, arabic: 'ساعة', english: 'CLOCK', pronunciation: 'كلوك', emoji: '🕒' },

  // 21-30
  { id: 21, arabic: 'خبز', english: 'BREAD', pronunciation: 'بريد', emoji: '🍞' },
  { id: 22, arabic: 'جبن', english: 'CHEESE', pronunciation: 'تشيز', emoji: '🧀' },
  { id: 23, arabic: 'بيض', english: 'EGG', pronunciation: 'إيغ', emoji: '🥚' },
  { id: 24, arabic: 'سمك', english: 'FISH', pronunciation: 'فيش', emoji: '🐟' },
  { id: 25, arabic: 'طائر', english: 'BIRD', pronunciation: 'بيرد', emoji: '🐦' },
  { id: 26, arabic: 'أسد', english: 'LION', pronunciation: 'لايون', emoji: '🦁' },
  { id: 27, arabic: 'فيل', english: 'ELEPHANT', pronunciation: 'إليفانت', emoji: '🐘' },
  { id: 28, arabic: 'قرد', english: 'MONKEY', pronunciation: 'مانكي', emoji: '🐒' },
  { id: 29, arabic: 'دب', english: 'BEAR', pronunciation: 'بير', emoji: '🐻' },
  { id: 30, arabic: 'أرنب', english: 'RABBIT', pronunciation: 'رابيت', emoji: '🐰' },

  // 31-40
  { id: 31, arabic: 'هاتف', english: 'PHONE', pronunciation: 'فون', emoji: '📱' },
  { id: 32, arabic: 'مفتاح', english: 'KEY', pronunciation: 'كي', emoji: '🔑' },
  { id: 33, arabic: 'حقيبة', english: 'BAG', pronunciation: 'باغ', emoji: '🎒' },
  { id: 34, arabic: 'باب', english: 'DOOR', pronunciation: 'دور', emoji: '🚪' },
  { id: 35, arabic: 'نافذة', english: 'WINDOW', pronunciation: 'ويندو', emoji: '🪟' },
  { id: 36, arabic: 'سرير', english: 'BED', pronunciation: 'بيد', emoji: '🛏️' },
  { id: 37, arabic: 'قبعة', english: 'HAT', pronunciation: 'هات', emoji: '🧢' },
  { id: 38, arabic: 'حذاء', english: 'SHOES', pronunciation: 'شوز', emoji: '👞' },
  { id: 39, arabic: 'قميص', english: 'SHIRT', pronunciation: 'شيرت', emoji: '👕' },
  { id: 40, arabic: 'كرة', english: 'BALL', pronunciation: 'بول', emoji: '⚽' },

  // 41-50
  { id: 41, arabic: 'مطر', english: 'RAIN', pronunciation: 'رين', emoji: '🌧️' },
  { id: 42, arabic: 'نجمة', english: 'STAR', pronunciation: 'ستار', emoji: '⭐' },
  { id: 43, arabic: 'سحابة', english: 'CLOUD', pronunciation: 'كلاود', emoji: '☁️' },
  { id: 44, arabic: 'نار', english: 'FIRE', pronunciation: 'فاير', emoji: '🔥' },
  { id: 45, arabic: 'برتقال', english: 'ORANGE', pronunciation: 'أورانج', emoji: '🍊' },
  { id: 46, arabic: 'عنب', english: 'GRAPES', pronunciation: 'غريبس', emoji: '🍇' },
  { id: 47, arabic: 'بطيخ', english: 'WATERMELON', pronunciation: 'ووترميلون', emoji: '🍉' },
  { id: 48, arabic: 'فراولة', english: 'STRAWBERRY', pronunciation: 'ستروبيري', emoji: '🍓' },
  { id: 49, arabic: 'جزر', english: 'CARROT', pronunciation: 'كاروت', emoji: '🥕' },
  { id: 50, arabic: 'دراجة', english: 'BICYCLE', pronunciation: 'بايسكل', emoji: '🚲' },
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
        {/* استبدلنا مكون الصورة بمكون نصي يعرض الإيموجي بحجم ضخم */}
        <Text style={styles.emojiIcon}>{currentItem.emoji}</Text>
        
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
  emojiIcon: {
    fontSize: 120, // حجم كبير جداً ليظهر كأنه صورة
    marginBottom: 20,
    textAlign: 'center',
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
  
