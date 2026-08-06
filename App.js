import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';

const WORDS_DATABASE = [
  // كلمات أساسية
  { ar: 'كتاب', en: 'BOOK', pronunciation: 'بوك' },
  { ar: 'قلم', en: 'PEN', pronunciation: 'بين' },
  { ar: 'تفاحة', en: 'APPLE', pronunciation: 'أبل' },
  { ar: 'سيارة', en: 'CAR', pronunciation: 'كار' },
  { ar: 'مدرسة', en: 'SCHOOL', pronunciation: 'سكول' },
  { ar: 'شمس', en: 'SUN', pronunciation: 'سان' },
  { ar: 'قمر', en: 'MOON', pronunciation: 'مون' },
  { ar: 'ماء', en: 'WATER', pronunciation: 'ووتر' },
  { ar: 'بيت', en: 'HOUSE', pronunciation: 'هاوس' },
  { ar: 'صديق', en: 'FRIEND', pronunciation: 'فريند' },
  { ar: 'طعام', en: 'FOOD', pronunciation: 'فود' },
  { ar: 'وقت', en: 'TIME', pronunciation: 'تايم' },
  { ar: 'عمل', en: 'WORK', pronunciation: 'ويرك' },
  { ar: 'هاتف', en: 'PHONE', pronunciation: 'فون' },
  { ar: 'باب', en: 'DOOR', pronunciation: 'دور' },
  { ar: 'نافذة', en: 'WINDOW', pronunciation: 'ويندو' },
  { ar: 'مال', en: 'MONEY', pronunciation: 'ماني' },
  { ar: 'عائلة', en: 'FAMILY', pronunciation: 'فاميلي' },
  { ar: 'مدينة', en: 'CITY', pronunciation: 'سيتي' },
  { ar: 'طريق', en: 'ROAD', pronunciation: 'رود' },
  { ar: 'رجل', en: 'MAN', pronunciation: 'مان' },
  { ar: 'امرأة', en: 'WOMAN', pronunciation: 'وومان' },
  { ar: 'ولد', en: 'BOY', pronunciation: 'بوي' },
  { ar: 'بنت', en: 'GIRL', pronunciation: 'غيرل' },
  { ar: 'طفل', en: 'BABY', pronunciation: 'بيبي' },
  { ar: 'شجرة', en: 'TREE', pronunciation: 'تري' },
  { ar: 'وردة', en: 'FLOWER', pronunciation: 'فلاور' },
  { ar: 'بحر', en: 'SEA', pronunciation: 'سي' },
  { ar: 'سماء', en: 'SKY', pronunciation: 'سكاي' },
  { ar: 'كلب', en: 'DOG', pronunciation: 'دوغ' },
  { ar: 'قطة', en: 'CAT', pronunciation: 'كات' },
  { ar: 'طائر', en: 'BIRD', pronunciation: 'بيرد' },
  { ar: 'حليب', en: 'MILK', pronunciation: 'ميلك' },
  { ar: 'قهوة', en: 'COFFEE', pronunciation: 'كوفي' },
  { ar: 'شاي', en: 'TEA', pronunciation: 'تي' },

  // جمل وعبارات يومية
  { ar: 'صباح الخير', en: 'GOOD MORNING', pronunciation: 'غود مورنينغ' },
  { ar: 'مساء الخير', en: 'GOOD EVENING', pronunciation: 'غود إيفنينغ' },
  { ar: 'تصبح على خير', en: 'GOOD NIGHT', pronunciation: 'غود نايت' },
  { ar: 'شكراً لك', en: 'THANK YOU', pronunciation: 'ثانك يو' },
  { ar: 'كيف حالك؟', en: 'HOW ARE YOU?', pronunciation: 'هاو أر يو؟' },
  { ar: 'أنا أحبك', en: 'I LOVE YOU', pronunciation: 'آي لاف يو' },
  { ar: 'أراك لاحقاً', en: 'SEE YOU LATER', pronunciation: 'سي يو ليتر' },
  { ar: 'مع السلامة', en: 'GOODBYE', pronunciation: 'غود باي' },
  { ar: 'أنا جائع', en: 'I AM HUNGRY', pronunciation: 'آي أيم هانغري' },
  { ar: 'أنا تعبان', en: 'I AM TIRED', pronunciation: 'آي أيم تايرد' },
  { ar: 'ما اسمك؟', en: 'WHAT IS YOUR NAME?', pronunciation: 'وات إز يور نيم؟' },
  { ar: 'سررت بلقائك', en: 'NICE TO MEET YOU', pronunciation: 'نايس تو ميت يو' },
  { ar: 'من فضلك', en: 'PLEASE', pronunciation: 'بليز' },
  { ar: 'أنا لا أفهم', en: 'I DO NOT UNDERSTAND', pronunciation: 'آي دو نوت أندرستاند' },
  { ar: 'ساعدني', en: 'HELP ME', pronunciation: 'هيلب مي' },
  { ar: 'كم السعر؟', en: 'HOW MUCH IS IT?', pronunciation: 'هاو ماتش إز إت؟' },
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
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* بطاقة الكلمة */}
      <View style={styles.card}>
        <Text style={styles.arabicText}>{currentWord.ar}</Text>
        <Text style={styles.englishText}>{currentWord.en}</Text>
        <Text style={styles.pronunciationText}>{currentWord.pronunciation}</Text>
      </View>

      {/* أزرار التنقل */}
      <View style={styles.controls}>
        <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={handlePrev}>
          <Text style={styles.btnText}>الكلمة السابقة  →</Text>
        </TouchableOpacity>

        <Text style={styles.counter}>{currentIndex + 1} / {WORDS_DATABASE.length}</Text>

        <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={handleNext}>
          <Text style={styles.btnText}>←  الكلمة التالية</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  card: {
    width: '100%',
    height: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 30,
    paddingHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  arabicText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  englishText: {
    fontSize: 38,
    fontWeight: '900',
    color: '#DC2626',
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  pronunciationText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#16A34A',
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 35,
  },
  btn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  btnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },
  counter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
  },
});

