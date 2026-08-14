import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const WORDS_DATA = [
  // 1-10: أساسيات وحيوانات
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

  // 11-20: طبيعة وأغذية
  { id: 11, arabic: 'شجرة', english: 'TREE', pronunciation: 'تري', image: { uri: 'https://cdn-icons-png.flaticon.com/512/490/490084.png' } },
  { id: 12, arabic: 'زهرة', english: 'FLOWER', pronunciation: 'فلاور', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2926/2926754.png' } },
  { id: 13, arabic: 'حليب', english: 'MILK', pronunciation: 'ميلك', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3050/3050146.png' } },
  { id: 14, arabic: 'موز', english: 'BANANA', pronunciation: 'بنانة', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3137/3137044.png' } },
  { id: 15, arabic: 'طائرة', english: 'PLANE', pronunciation: 'بلين', image: { uri: 'https://cdn-icons-png.flaticon.com/512/789/789393.png' } },
  { id: 16, arabic: 'قمر', english: 'MOON', pronunciation: 'مون', image: { uri: 'https://cdn-icons-png.flaticon.com/512/1823/1823324.png' } },
  { id: 17, arabic: 'حافلة', english: 'BUS', pronunciation: 'باص', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png' } },
  { id: 18, arabic: 'طاولة', english: 'TABLE', pronunciation: 'تيبل', image: { uri: 'https://cdn-icons-png.flaticon.com/512/1663/1663942.png' } },
  { id: 19, arabic: 'كرسي', english: 'CHAIR', pronunciation: 'تشير', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2622/2622289.png' } },
  { id: 20, arabic: 'ساعة', english: 'CLOCK', pronunciation: 'كلوك', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2928/2928738.png' } },

  // 21-30: طعام وجماد
  { id: 21, arabic: 'خبز', english: 'BREAD', pronunciation: 'بريد', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3014/3014524.png' } },
  { id: 22, arabic: 'جبن', english: 'CHEESE', pronunciation: 'تشيز', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3050/3050158.png' } },
  { id: 23, arabic: 'بيض', english: 'EGG', pronunciation: 'إيغ', image: { uri: 'https://cdn-icons-png.flaticon.com/512/833/833324.png' } },
  { id: 24, arabic: 'سمك', english: 'FISH', pronunciation: 'فيش', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3082/3082050.png' } },
  { id: 25, arabic: 'طائر', english: 'BIRD', pronunciation: 'بيرد', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3069/3069172.png' } },
  { id: 26, arabic: 'أسد', english: 'LION', pronunciation: 'لايون', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3069/3069224.png' } },
  { id: 27, arabic: 'فيل', english: 'ELEPHANT', pronunciation: 'إليفانت', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3069/3069188.png' } },
  { id: 28, arabic: 'قرد', english: 'MONKEY', pronunciation: 'مانكي', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3069/3069236.png' } },
  { id: 29, arabic: 'دب', english: 'BEAR', pronunciation: 'بير', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3069/3069160.png' } },
  { id: 30, arabic: 'أرنب', english: 'RABBIT', pronunciation: 'رابيت', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3069/3069252.png' } },

  // 31-40: أدوات وأشياء
  { id: 31, arabic: 'هاتف', english: 'PHONE', pronunciation: 'فون', image: { uri: 'https://cdn-icons-png.flaticon.com/512/15/15874.png' } },
  { id: 32, arabic: 'مفتاح', english: 'KEY', pronunciation: 'كي', image: { uri: 'https://cdn-icons-png.flaticon.com/512/619/619032.png' } },
  { id: 33, arabic: 'حقيبة', english: 'BAG', pronunciation: 'باغ', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2906/2906270.png' } },
  { id: 34, arabic: 'باب', english: 'DOOR', pronunciation: 'دور', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2928/2928828.png' } },
  { id: 35, arabic: 'نافذة', english: 'WINDOW', pronunciation: 'ويندو', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2928/2928834.png' } },
  { id: 36, arabic: 'سرير', english: 'BED', pronunciation: 'بيد', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3030/3030336.png' } },
  { id: 37, arabic: 'قبعة', english: 'HAT', pronunciation: 'هات', image: { uri: 'https://cdn-icons-png.flaticon.com/512/884/884082.png' } },
  { id: 38, arabic: 'حذاء', english: 'SHOES', pronunciation: 'شوز', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589903.png' } },
  { id: 39, arabic: 'قميص', english: 'SHIRT', pronunciation: 'شيرت', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589892.png' } },
  { id: 40, arabic: 'كرة', english: 'BALL', pronunciation: 'بول', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png' } },

  // 41-50: طقس وفواكه وعناصر متنوعة
  { id: 41, arabic: 'مطر', english: 'RAIN', pronunciation: 'رين', image: { uri: 'https://cdn-icons-png.flaticon.com/512/1164/1164949.png' } },
  { id: 42, arabic: 'نجمة', english: 'STAR', pronunciation: 'ستار', image: { uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png' } },
  { id: 43, arabic: 'سحابة', english: 'CLOUD', pronunciation: 'كلاود', image: { uri: 'https://cdn-icons-png.flaticon.com/512/1164/1164958.png' } },
  { id: 44, arabic: 'نار', english: 'FIRE', pronunciation: 'فاير', image: { uri: 'https://cdn-icons-png.flaticon.com/512/785/785116.png' } },
  { id: 45, arabic: 'برتقال', english: 'ORANGE', pronunciation: 'أورانج', image: { uri: 'https://cdn-icons-png.flaticon.com/512/1728/1728729.png' } },
  { id: 46, arabic: 'عنب', english: 'GRAPES', pronunciation: 'غريبس', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3137/3137022.png' } },
  { id: 47, arabic: 'بطيخ', english: 'WATERMELON', pronunciation: 'ووترميلون', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3137/3137088.png' } },
  { id: 48, arabic: 'فراولة', english: 'STRAWBERRY', pronunciation: 'ستروبيري', image: { uri: 'https://cdn-icons-png.flaticon.com/512/590/590685.png' } },
  { id: 49, arabic: 'جزر', english: 'CARROT', pronunciation: 'كاروت', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2909/2909761.png' } },
  { id: 50, arabic: 'دراجة', english: 'BICYCLE', pronunciation: 'بايسكل', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png' } },
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
        <Image source={currentItem.image} style={styles.image} resizeMode="contain" />
        
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
    
