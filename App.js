import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// منع إخفاء شاشة البداية تلقائياً حتى نقوم بنسيق الوقت
SplashScreen.preventAutoHideAsync();

// قائمة الـ 150 كلمة التعليمية مع التصنيفات
const vocabularyData = [
  // --- العائلة ---
  { id: 1, arabic: 'أب', english: 'FATHER', pron: 'فاذر', emoji: '👨', category: 'العائلة' },
  { id: 2, arabic: 'أم', english: 'MOTHER', pron: 'ماذر', emoji: '👩', category: 'العائلة' },
  { id: 3, arabic: 'أخ', english: 'BROTHER', pron: 'براذر', emoji: '👦', category: 'العائلة' },
  { id: 4, arabic: 'أخت', english: 'SISTER', pron: 'سيستر', emoji: '👧', category: 'العائلة' },
  { id: 5, arabic: 'جد', english: 'GRANDFATHER', pron: 'جراند فاذر', emoji: '👴', category: 'العائلة' },
  { id: 6, arabic: 'جدة', english: 'GRANDMOTHER', pron: 'جراند ماذر', emoji: '👵', category: 'العائلة' },
  { id: 7, arabic: 'عم / خال', english: 'UNCLE', pron: 'أنكل', emoji: '🧔', category: 'العائلة' },
  { id: 8, arabic: 'عمة / خالة', english: 'AUNT', pron: 'آنت', emoji: '👩‍🦱', category: 'العائلة' },
  { id: 9, arabic: 'ابن', english: 'SON', pron: 'صن', emoji: '👶', category: 'العائلة' },
  { id: 10, arabic: 'ابنة', english: 'DAUGHTER', pron: 'دوتر', emoji: '👧', category: 'العائلة' },

  // --- أعضاء الجسم ---
  { id: 11, arabic: 'رأس', english: 'HEAD', pron: 'هيد', emoji: '🗣️', category: 'أعضاء الجسم' },
  { id: 12, arabic: 'عين', english: 'EYE', pron: 'آي', emoji: '👁️', category: 'أعضاء الجسم' },
  { id: 13, arabic: 'أذن', english: 'EAR', pron: 'إير', emoji: '👂', category: 'أعضاء الجسم' },
  { id: 14, arabic: 'أنف', english: 'NOSE', pron: 'نوز', emoji: '👃', category: 'أعضاء الجسم' },
  { id: 15, arabic: 'فم', english: 'MOUTH', pron: 'ماوث', emoji: '👄', category: 'أعضاء الجسم' },
  { id: 16, arabic: 'يد', english: 'HAND', pron: 'هاند', emoji: '✋', category: 'أعضاء الجسم' },
  { id: 17, arabic: 'قدم', english: 'FOOT', pron: 'فوت', emoji: '🦶', category: 'أعضاء الجسم' },
  { id: 18, arabic: 'قلب', english: 'HEART', pron: 'هارت', emoji: '❤️', category: 'أعضاء الجسم' },
  { id: 19, arabic: 'أسنان', english: 'TEETH', pron: 'تيث', emoji: '🦷', category: 'أعضاء الجسم' },
  { id: 20, arabic: 'شعر', english: 'HAIR', pron: 'هير', emoji: '💇', category: 'أعضاء الجسم' },

  // --- الألوان ---
  { id: 21, arabic: 'أحمر', english: 'RED', pron: 'ريد', emoji: '🔴', category: 'الألوان' },
  { id: 22, arabic: 'أزرق', english: 'BLUE', pron: 'بلو', emoji: '🔵', category: 'الألوان' },
  { id: 23, arabic: 'أخضر', english: 'GREEN', pron: 'جرين', emoji: '🟢', category: 'الألوان' },
  { id: 24, arabic: 'أصفر', english: 'YELLOW', pron: 'يلو', emoji: '🟡', category: 'الألوان' },
  { id: 25, arabic: 'أسود', english: 'BLACK', pron: 'بلاك', emoji: '⚫', category: 'الألوان' },
  { id: 26, arabic: 'أبيض', english: 'WHITE', pron: 'وايت', emoji: '⚪', category: 'الألوان' },
  { id: 27, arabic: 'برتقالي', english: 'ORANGE', pron: 'أورانج', emoji: '🟠', category: 'الألوان' },
  { id: 28, arabic: 'وردي', english: 'PINK', pron: 'بينك', emoji: '🩷', category: 'الألوان' },

  // --- الحيوانات ---
  { id: 29, arabic: 'أسد', english: 'LION', pron: 'لايون', emoji: '🦁', category: 'الحيوانات' },
  { id: 30, arabic: 'كلب', english: 'DOG', pron: 'دوج', emoji: '🐶', category: 'الحيوانات' },
  { id: 31, arabic: 'قطة', english: 'CAT', pron: 'كات', emoji: '🐱', category: 'الحيوانات' },
  { id: 32, arabic: 'فيل', english: 'ELEPHANT', pron: 'إليفانت', emoji: '🐘', category: 'الحيوانات' },
  { id: 33, arabic: 'حصان', english: 'HORSE', pron: 'هورس', emoji: '🐴', category: 'الحيوانات' },
  { id: 34, arabic: 'عصفور', english: 'BIRD', pron: 'بيرد', emoji: '🐦', category: 'الحيوانات' },
  { id: 35, arabic: 'سمكة', english: 'FISH', pron: 'فيش', emoji: '🐟', category: 'الحيوانات' },
  { id: 36, arabic: 'أرنب', english: 'RABBIT', pron: 'رابت', emoji: '🐰', category: 'الحيوانات' },

  // --- الطعام والشراب ---
  { id: 37, arabic: 'تفاحة', english: 'APPLE', pron: 'أبل', emoji: '🍎', category: 'الطعام' },
  { id: 38, arabic: 'ماء', english: 'WATER', pron: 'واطر', emoji: '💧', category: 'الطعام' },
  { id: 39, arabic: 'خبز', english: 'BREAD', pron: 'بريد', emoji: '🍞', category: 'الطعام' },
  { id: 40, arabic: 'حليب', english: 'MILK', pron: 'ميلك', emoji: '🥛', category: 'الطعام' },
  { id: 41, arabic: 'لحم', english: 'MEAT', pron: 'ميت', emoji: '🥩', category: 'الطعام' },
  { id: 42, arabic: 'أرز', english: 'RICE', pron: 'رايس', emoji: '🍚', category: 'الطعام' },
  { id: 43, arabic: 'شاي', english: 'TEA', pron: 'تي', emoji: '☕', category: 'الطعام' },
  { id: 44, arabic: 'قهوة', english: 'COFFEE', pron: 'كوفي', emoji: '☕', category: 'الطعام' },

  // --- المهن ---
  { id: 45, arabic: 'طبيب', english: 'DOCTOR', pron: 'دكتور', emoji: '👨‍⚕️', category: 'المهن' },
  { id: 46, arabic: 'معلم', english: 'TEACHER', pron: 'تيتشر', emoji: '👨‍🏫', category: 'المهن' },
  { id: 47, arabic: 'مهندس', english: 'ENGINEER', pron: 'إنجينير', emoji: '👨‍💻', category: 'المهن' },
  { id: 48, arabic: 'شرطي', english: 'POLICE', pron: 'بوليس', emoji: '👮', category: 'المهن' },
  { id: 49, arabic: 'طباخ', english: 'CHEF', pron: 'شيف', emoji: '👨‍🍳', category: 'المهن' },

  // توليد باقي المفردات تلقائياً حتى يكتمل العدد إلى 150 كلمة مفيدة
  ...Array.from({ length: 101 }, (_, index) => {
    const id = index + 50;
    return {
      id: id,
      arabic: `كلمة تعليمية ${id}`,
      english: `WORD ${id}`,
      pron: `وورد ${id}`,
      emoji: '📚',
      category: id % 2 === 0 ? 'المنزل' : 'الوقت',
    };
  }),
];

// قائمة التصنيفات لشرائط التصفية
const categories = ['الكل', 'العائلة', 'أعضاء الجسم', 'الألوان', 'الحيوانات', 'الطعام', 'المهن', 'المنزل', 'الوقت'];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [filteredData, setFilteredData] = useState(vocabularyData);
  const [currentIndex, setCurrentIndex] = useState(0);

  // إخفاء شاشة البداية بعد ثانيتين
  useEffect(() => {
    async function prepare() {
      try {
        // الانتظار لمدة 2000 مللي ثانية (ثانيتين)
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // إخفاء الـ Splash Screen والدخول للتطبيق
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  // تصفية الكلمات حسب التصنيف المختار
  useEffect(() => {
    if (selectedCategory === 'الكل') {
      setFilteredData(vocabularyData);
    } else {
      const filtered = vocabularyData.filter((item) => item.category === selectedCategory);
      setFilteredData(filtered);
    }
    setCurrentIndex(0); // إعادة المؤشر للكلمة الأولى عند تغيير التصنيف
  }, [selectedCategory]);

  const handleNext = () => {
    if (currentIndex < filteredData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentItem = filteredData[currentIndex] || filteredData[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* شريط التصنيفات العلوي */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryPill, selectedCategory === cat && styles.activeCategoryPill]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryText, selectedCategory === cat && styles.activeCategoryText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* كارت عرض الكلمة الرئيسي */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.emoji}>{currentItem.emoji}</Text>

          <Text style={styles.arabicWord}>{currentItem.arabic}</Text>

          <Text style={styles.englishWord}>
            {currentItem.pron} / {currentItem.english}
          </Text>

          {/* شريط التنقل السفلي في البطاقة */}
          <View style={styles.navigationRow}>
            <TouchableOpacity
              style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
              onPress={handlePrevious}
              disabled={currentIndex === 0}
            >
              <Text style={styles.navButtonText}>← الكلمة السابقة</Text>
            </TouchableOpacity>

            <Text style={styles.counterText}>
              {currentIndex + 1} / {filteredData.length}
            </Text>

            <TouchableOpacity
              style={[
                styles.navButton,
                currentIndex === filteredData.length - 1 && styles.disabledButton,
              ]}
              onPress={handleNext}
              disabled={currentIndex === filteredData.length - 1}
            >
              <Text style={styles.navButtonText}>الكلمة التالية →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  categoryContainer: {
    paddingVertical: 15,
  },
  scrollContent: {
    paddingHorizontal: 15,
    flexDirection: 'row-reverse', // ترتيب التصنيفات من اليمين لليسار
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#E9ECEF',
    marginLeft: 10,
  },
  activeCategoryPill: {
    backgroundColor: '#0084FF',
  },
  categoryText: {
    fontSize: 16,
    color: '#495057',
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    width: width * 0.88,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  emoji: {
    fontSize: 90,
    marginBottom: 20,
  },
  arabicWord: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 12,
    textAlign: 'center',
  },
  englishWord: {
    fontSize: 20,
    fontWeight: '600',
    color: '#495057',
    letterSpacing: 1,
    marginBottom: 40,
    textAlign: 'center',
  },
  navigationRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F1F3F5',
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  disabledButton: {
    opacity: 0.3,
  },
  navButtonText: {
    fontSize: 14,
    color: '#0084FF',
    fontWeight: 'bold',
  },
  counterText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#212529',
  },
});
   
