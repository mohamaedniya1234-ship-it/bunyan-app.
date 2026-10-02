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
import * as Speech from 'expo-speech';

SplashScreen.preventAutoHideAsync();

const categories = [
  'الكل', 'العائلة', 'أعضاء الجسم', 'الألوان', 'الحيوانات', 'الطعام', 
  'المهن', 'المنزل', 'الملابس', 'الطبيعة', 'النقل', 'المدرسة', 
  'الرياضة', 'الطقس', 'الصفات', 'الأفعال', 'التحيات', 'جمل مفيدة'
];

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
  { id: 9, arabic: 'ابن', english: 'SON', pron: 'صن', emoji: '👦', category: 'العائلة' },
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
  { id: 29, arabic: 'بنفسجي', english: 'PURPLE', pron: 'بيربل', emoji: '🟣', category: 'الألوان' },
  { id: 30, arabic: 'رمادي', english: 'GRAY', pron: 'جراي', emoji: '🔘', category: 'الألوان' },

  // --- الحيوانات ---
  { id: 31, arabic: 'أسد', english: 'LION', pron: 'لايون', emoji: '🦁', category: 'الحيوانات' },
  { id: 32, arabic: 'كلب', english: 'DOG', pron: 'دوج', emoji: '🐶', category: 'الحيوانات' },
  { id: 33, arabic: 'قطة', english: 'CAT', pron: 'كات', emoji: '🐱', category: 'الحيوانات' },
  { id: 34, arabic: 'فيل', english: 'ELEPHANT', pron: 'إليفانت', emoji: '🐘', category: 'الحيوانات' },
  { id: 35, arabic: 'حصان', english: 'HORSE', pron: 'هورس', emoji: '🐴', category: 'الحيوانات' },
  { id: 36, arabic: 'عصفور', english: 'BIRD', pron: 'بيرد', emoji: '🐦', category: 'الحيوانات' },
  { id: 37, arabic: 'سمكة', english: 'FISH', pron: 'فيش', emoji: '🐟', category: 'الحيوانات' },
  { id: 38, arabic: 'قرد', english: 'MONKEY', pron: 'مانكي', emoji: '🐒', category: 'الحيوانات' },
  { id: 39, arabic: 'بقرة', english: 'COW', pron: 'كاو', emoji: '🐄', category: 'الحيوانات' },
  { id: 40, arabic: 'دجاجة', english: 'CHICKEN', pron: 'تشيكن', emoji: '🐔', category: 'الحيوانات' },

  // --- الطعام ---
  { id: 41, arabic: 'تفاحة', english: 'APPLE', pron: 'أبل', emoji: '🍎', category: 'الطعام' },
  { id: 42, arabic: 'ماء', english: 'WATER', pron: 'ووتر', emoji: '💧', category: 'الطعام' },
  { id: 43, arabic: 'خبز', english: 'BREAD', pron: 'بريد', emoji: '🍞', category: 'الطعام' },
  { id: 44, arabic: 'حليب', english: 'MILK', pron: 'ميلك', emoji: '🥛', category: 'الطعام' },
  { id: 45, arabic: 'لحم', english: 'MEAT', pron: 'ميت', emoji: '🥩', category: 'الطعام' },
  { id: 46, arabic: 'أرز', english: 'RICE', pron: 'رايس', emoji: '🍚', category: 'الطعام' },
  { id: 47, arabic: 'سمك', english: 'FISH', pron: 'فيش', emoji: '🐟', category: 'الطعام' },
  { id: 48, arabic: 'جبن', english: 'CHEESE', pron: 'تشيز', emoji: '🧀', category: 'الطعام' },
  { id: 49, arabic: 'بيض', english: 'EGG', pron: 'إيج', emoji: '🥚', category: 'الطعام' },
  { id: 50, arabic: 'موز', english: 'BANANA', pron: 'بنانة', emoji: '🍌', category: 'الطعام' },
  { id: 51, arabic: 'عصير', english: 'JUICE', pron: 'جوس', emoji: '🧃', category: 'الطعام' },
  { id: 52, arabic: 'سكر', english: 'SUGAR', pron: 'شوجر', emoji: '🍬', category: 'الطعام' },

  // --- المهن ---
  { id: 53, arabic: 'طبيب', english: 'DOCTOR', pron: 'دكتور', emoji: '👨‍⚕️', category: 'المهن' },
  { id: 54, arabic: 'معلم', english: 'TEACHER', pron: 'تيتشر', emoji: '👨‍🏫', category: 'المهن' },
  { id: 55, arabic: 'مهندس', english: 'ENGINEER', pron: 'إنجينير', emoji: '👨‍💻', category: 'المهن' },
  { id: 56, arabic: 'شرطي', english: 'POLICE', pron: 'بوليس', emoji: '👮', category: 'المهن' },
  { id: 57, arabic: 'طباخ', english: 'CHEF', pron: 'شيف', emoji: '👨‍🍳', category: 'المهن' },
  { id: 58, arabic: 'ممرض', english: 'NURSE', pron: 'نيرس', emoji: '🧑‍⚕️', category: 'المهن' },
  { id: 59, arabic: 'طيار', english: 'PILOT', pron: 'بايلوت', emoji: '👨‍✈️', category: 'المهن' },
  { id: 60, arabic: 'فلاح', english: 'FARMER', pron: 'فارمر', emoji: '👨‍🌾', category: 'المهن' },
  { id: 61, arabic: 'محاسب', english: 'ACCOUNTANT', pron: 'أكاونتانت', emoji: '🧾', category: 'المهن' },
  { id: 62, arabic: 'محامي', english: 'LAWYER', pron: 'لوير', emoji: '⚖️', category: 'المهن' },

  // --- المنزل ---
  { id: 63, arabic: 'منزل', english: 'HOUSE', pron: 'هاوس', emoji: '🏠', category: 'المنزل' },
  { id: 64, arabic: 'باب', english: 'DOOR', pron: 'دور', emoji: '🚪', category: 'المنزل' },
  { id: 65, arabic: 'نافذة', english: 'WINDOW', pron: 'ويندو', emoji: '🪟', category: 'المنزل' },
  { id: 66, arabic: 'سرير', english: 'BED', pron: 'بيد', emoji: '🛏️', category: 'المنزل' },
  { id: 67, arabic: 'كرسي', english: 'CHAIR', pron: 'تشير', emoji: '🪑', category: 'المنزل' },
  { id: 68, arabic: 'طاولة', english: 'TABLE', pron: 'تيبل', emoji: '🍽️', category: 'المنزل' },
  { id: 69, arabic: 'مطبخ', english: 'KITCHEN', pron: 'كيتشن', emoji: '🍳', category: 'المنزل' },
  { id: 70, arabic: 'حمام', english: 'BATHROOM', pron: 'باث روم', emoji: '🛁', category: 'المنزل' },
  { id: 71, arabic: 'تلفاز', english: 'TELEVISION', pron: 'تلفيجن', emoji: '📺', category: 'المنزل' },
  { id: 72, arabic: 'مفتاح', english: 'KEY', pron: 'كي', emoji: '🔑', category: 'المنزل' },

  // --- الملابس ---
  { id: 73, arabic: 'قميص', english: 'SHIRT', pron: 'شيرت', emoji: '👔', category: 'الملابس' },
  { id: 74, arabic: 'بنطال', english: 'PANTS', pron: 'بانتس', emoji: '👖', category: 'الملابس' },
  { id: 75, arabic: 'فستان', english: 'DRESS', pron: 'دريس', emoji: '👗', category: 'الملابس' },
  { id: 76, arabic: 'حذاء', english: 'SHOES', pron: 'شوز', emoji: '👞', category: 'الملابس' },
  { id: 77, arabic: 'قبعة', english: 'HAT', pron: 'هات', emoji: '🎩', category: 'الملابس' },
  { id: 78, arabic: 'معطف', english: 'COAT', pron: 'كوت', emoji: '🧥', category: 'الملابس' },
  { id: 79, arabic: 'جوارب', english: 'SOCKS', pron: 'سوكس', emoji: '🧦', category: 'الملابس' },
  { id: 80, arabic: 'نظارات', english: 'GLASSES', pron: 'جلاسيس', emoji: '👓', category: 'الملابس' },
  { id: 81, arabic: 'ساعة', english: 'WATCH', pron: 'ووتش', emoji: '⌚', category: 'الملابس' },
  { id: 82, arabic: 'حقيبة', english: 'BAG', pron: 'باج', emoji: '👜', category: 'الملابس' },

  // --- الطبيعة ---
  { id: 83, arabic: 'شمس', english: 'SUN', pron: 'صن', emoji: '☀️', category: 'الطبيعة' },
  { id: 84, arabic: 'قمر', english: 'MOON', pron: 'مون', emoji: '🌙', category: 'الطبيعة' },
  { id: 85, arabic: 'نجمة', english: 'STAR', pron: 'ستار', emoji: '⭐', category: 'الطبيعة' },
  { id: 86, arabic: 'سماء', english: 'SKY', pron: 'سكاي', emoji: '☁️', category: 'الطبيعة' },
  { id: 87, arabic: 'شجرة', english: 'TREE', pron: 'تري', emoji: '🌳', category: 'الطبيعة' },
  { id: 88, arabic: 'وردة', english: 'FLOWER', pron: 'فلاور', emoji: '🌹', category: 'الطبيعة' },
  { id: 89, arabic: 'نهر', english: 'RIVER', pron: 'ريفر', emoji: '🏞️', category: 'الطبيعة' },
  { id: 90, arabic: 'جبل', english: 'MOUNTAIN', pron: 'ماونتن', emoji: '⛰️', category: 'الطبيعة' },
  { id: 91, arabic: 'بحر', english: 'SEA', pron: 'سي', emoji: '🌊', category: 'الطبيعة' },
  { id: 92, arabic: 'نار', english: 'FIRE', pron: 'فاير', emoji: '🔥', category: 'الطبيعة' },

  // --- وسائل النقل ---
  { id: 93, arabic: 'سيارة', english: 'CAR', pron: 'كار', emoji: '🚗', category: 'النقل' },
  { id: 94, arabic: 'حافلة', english: 'BUS', pron: 'باص', emoji: '🚌', category: 'النقل' },
  { id: 95, arabic: 'قطار', english: 'TRAIN', pron: 'ترين', emoji: '🚆', category: 'النقل' },
  { id: 96, arabic: 'طائرة', english: 'AIRPLANE', pron: 'إير بلين', emoji: '✈️', category: 'النقل' },
  { id: 97, arabic: 'دراجة', english: 'BICYCLE', pron: 'بايسكل', emoji: '🚲', category: 'النقل' },
  { id: 98, arabic: 'سفينة', english: 'SHIP', pron: 'شيب', emoji: '🚢', category: 'النقل' },
  { id: 99, arabic: 'قارب', english: 'BOAT', pron: 'بوت', emoji: '🚤', category: 'النقل' },
  { id: 100, arabic: 'دراجة نارية', english: 'MOTORCYCLE', pron: 'موتور سايكل', emoji: '🏍️', category: 'النقل' },

  // --- المدرسة ---
  { id: 101, arabic: 'مدرسة', english: 'SCHOOL', pron: 'سكول', emoji: '🏫', category: 'المدرسة' },
  { id: 102, arabic: 'كتاب', english: 'BOOK', pron: 'بوك', emoji: '📖', category: 'المدرسة' },
  { id: 103, arabic: 'قلم', english: 'PEN', pron: 'بين', emoji: '🖊️', category: 'المدرسة' },
  { id: 104, arabic: 'دفتر', english: 'NOTEBOOK', pron: 'نوت بوك', emoji: '📓', category: 'المدرسة' },
  { id: 105, arabic: 'سبورة', english: 'BOARD', pron: 'بورد', emoji: '🪵', category: 'المدرسة' },
  { id: 106, arabic: 'مسطرة', english: 'RULER', pron: 'رولر', emoji: '📏', category: 'المدرسة' },
  { id: 107, arabic: 'ممحات', english: 'ERASER', pron: 'إريزر', emoji: '🧽', category: 'المدرسة' },
  { id: 108, arabic: 'طالب', english: 'STUDENT', pron: 'ستيودنت', emoji: '🧑‍🎓', category: 'المدرسة' },
  { id: 109, arabic: 'مكتب', english: 'DESK', pron: 'ديسك', emoji: '🪑', category: 'المدرسة' },
  { id: 110, arabic: 'امتحان', english: 'EXAM', pron: 'إكزام', emoji: '📝', category: 'المدرسة' },

  // --- الرياضة ---
  { id: 111, arabic: 'رياضة', english: 'SPORT', pron: 'سبورت', emoji: '🏃', category: 'الرياضة' },
  { id: 112, arabic: 'كرة قدم', english: 'FOOTBALL', pron: 'فوت بول', emoji: '⚽', category: 'الرياضة' },
  { id: 113, arabic: 'كرة سلة', english: 'BASKETBALL', pron: 'باسكت بول', emoji: '🏀', category: 'الرياضة' },
  { id: 114, arabic: 'تنس', english: 'TENNIS', pron: 'تنس', emoji: '🎾', category: 'الرياضة' },
  { id: 115, arabic: 'سباحة', english: 'SWIMMING', pron: 'سويمينج', emoji: '🏊', category: 'الرياضة' },
  { id: 116, arabic: 'جري', english: 'RUNNING', pron: 'رانينج', emoji: '🏃‍♂️', category: 'الرياضة' },
  { id: 117, arabic: 'ملعب', english: 'STADIUM', pron: 'ستاديوم', emoji: '🏟️', category: 'الرياضة' },
  { id: 118, arabic: 'فريق', english: 'TEAM', pron: 'تيم', emoji: '🤝', category: 'الرياضة' },
  { id: 119, arabic: 'كرة', english: 'BALL', pron: 'بول', emoji: '🏐', category: 'الرياضة' },
  { id: 120, arabic: 'هدف', english: 'GOAL', pron: 'جول', emoji: '🥅', category: 'الرياضة' },

  // --- الطقس ---
  { id: 121, arabic: 'طقس', english: 'WEATHER', pron: 'ويذر', emoji: '🌡️', category: 'الطقس' },
  { id: 122, arabic: 'مشمس', english: 'SUNNY', pron: 'صاني', emoji: '☀️', category: 'الطقس' },
  { id: 123, arabic: 'غائم', english: 'CLOUDY', pron: 'كلاودي', emoji: '☁️', category: 'الطقس' },
  { id: 124, arabic: 'ممطر', english: 'RAINY', pron: 'ريني', emoji: '🌧️', category: 'الطقس' },
  { id: 125, arabic: 'عاصف', english: 'WINDY', pron: 'ويندي', emoji: '💨', category: 'الطقس' },
  { id: 126, arabic: 'حار', english: 'HOT', pron: 'هوت', emoji: '🥵', category: 'الطقس' },
  { id: 127, arabic: 'بارد', english: 'COLD', pron: 'كولد', emoji: '🥶', category: 'الطقس' },
  { id: 128, arabic: 'ثلج', english: 'SNOW', pron: 'سنو', emoji: '❄️', category: 'الطقس' },
  { id: 129, arabic: 'عاصفة', english: 'STORM', pron: 'ستورم', emoji: '⛈️', category: 'الطقس' },
  { id: 130, arabic: 'ضباب', english: 'FOG', pron: 'فوج', emoji: '🌫️', category: 'الطقس' },

  // --- الصفات ---
  { id: 131, arabic: 'كبير', english: 'BIG', pron: 'بيج', emoji: '🐘', category: 'الصفات' },
  { id: 132, arabic: 'صغير', english: 'SMALL', pron: 'سمول', emoji: '🐜', category: 'الصفات' },
  { id: 133, arabic: 'طويل', english: 'TALL', pron: 'تول', emoji: '🦒', category: 'الصفات' },
  { id: 134, arabic: 'قصير', english: 'SHORT', pron: 'شورت', emoji: '📏', category: 'الصفات' },
  { id: 135, arabic: 'سريع', english: 'FAST', pron: 'فاست', emoji: '🐆', category: 'الصفات' },
  { id: 136, arabic: 'بطيء', english: 'SLOW', pron: 'سلو', emoji: '🐢', category: 'الصفات' },
  { id: 137, arabic: 'جيد', english: 'GOOD', pron: 'جود', emoji: '👍', category: 'الصفات' },
  { id: 138, arabic: 'سيء', english: 'BAD', pron: 'باد', emoji: '👎', category: 'الصفات' },
  { id: 139, arabic: 'جميل', english: 'BEAUTIFUL', pron: 'بيوتيفل', emoji: '✨', category: 'الصفات' },
  { id: 140, arabic: 'نظيف', english: 'CLEAN', pron: 'كلين', emoji: '🧼', category: 'الصفات' },
  { id: 141, arabic: 'قوي', english: 'STRONG', pron: 'سترونج', emoji: '💪', category: 'الصفات' },
  { id: 142, arabic: 'ضعيف', english: 'WEAK', pron: 'ويك', emoji: '🥀', category: 'الصفات' },
  { id: 143, arabic: 'سعيد', english: 'HAPPY', pron: 'هابي', emoji: '😁', category: 'الصفات' },
  { id: 144, arabic: 'حزين', english: 'SAD', pron: 'ساد', emoji: '😢', category: 'الصفات' },
  { id: 145, arabic: 'غاضب', english: 'ANGRY', pron: 'أنجري', emoji: '😡', category: 'الصفات' },

  // --- الأفعال ---
  { id: 146, arabic: 'يأكل', english: 'EAT', pron: 'إيت', emoji: '🍽️', category: 'الأفعال' },
  { id: 147, arabic: 'يشرب', english: 'DRINK', pron: 'درينك', emoji: '🥤', category: 'الأفعال' },
  { id: 148, arabic: 'ينام', english: 'SLEEP', pron: 'سليب', emoji: '😴', category: 'الأفعال' },
  { id: 149, arabic: 'يذهب', english: 'GO', pron: 'جو', emoji: '🚶', category: 'الأفعال' },
  { id: 150, arabic: 'يأتي', english: 'COME', pron: 'كم', emoji: '🏃', category: 'الأفعال' },
  { id: 151, arabic: 'يعمل', english: 'WORK', pron: 'وورك', emoji: '💼', category: 'الأفعال' },
  { id: 152, arabic: 'يلعب', english: 'PLAY', pron: 'بلاي', emoji: '🎮', category: 'الأفعال' },
  { id: 153, arabic: 'يقرأ', english: 'READ', pron: 'ريد', emoji: '📖', category: 'الأفعال' },
  { id: 154, arabic: 'يكتب', english: 'WRITE', pron: 'رايت', emoji: '✍️', category: 'الأفعال' },
  { id: 155, arabic: 'يتحدث', english: 'SPEAK', pron: 'سبيك', emoji: '🗣️', category: 'الأفعال' },
  { id: 156, arabic: 'يستمع', english: 'LISTEN', pron: 'ليسن', emoji: '🎧', category: 'الأفعال' },
  { id: 157, arabic: 'يشاهد', english: 'WATCH', pron: 'ووتش', emoji: '👀', category: 'الأفعال' },
  { id: 158, arabic: 'يشتري', english: 'BUY', pron: 'باي', emoji: '🛒', category: 'الأفعال' },
  { id: 159, arabic: 'يبيع', english: 'SELL', pron: 'سيل', emoji: '💰', category: 'الأفعال' },
  { id: 160, arabic: 'يفكر', english: 'THINK', pron: 'ثينك', emoji: '🤔', category: 'الأفعال' },

  // --- التحيات ---
  { id: 161, arabic: 'مرحباً', english: 'HELLO', pron: 'هالو', emoji: '👋', category: 'التحيات' },
  { id: 162, arabic: 'وداعاً', english: 'GOODBYE', pron: 'جود باي', emoji: '🚶', category: 'التحيات' },
  { id: 163, arabic: 'شكراً', english: 'THANK YOU', pron: 'ثانك يو', emoji: '🙏', category: 'التحيات' },
  { id: 164, arabic: 'عفواً', english: 'YOU ARE WELCOME', pron: 'يو آر ويلكم', emoji: '😊', category: 'التحيات' },
  { id: 165, arabic: 'من فضلك', english: 'PLEASE', pron: 'بليز', emoji: '🥺', category: 'التحيات' },
  { id: 166, arabic: 'آسف', english: 'SORRY', pron: 'سوري', emoji: '😔', category: 'التحيات' },
  { id: 167, arabic: 'صباح الخير', english: 'GOOD MORNING', pron: 'جود مورنينج', emoji: '🌅', category: 'التحيات' },
  { id: 168, arabic: 'مساء الخير', english: 'GOOD EVENING', pron: 'جود إيفنينج', emoji: '🌇', category: 'التحيات' },
  { id: 169, arabic: 'تصبح على خير', english: 'GOOD NIGHT', pron: 'جود نايت', emoji: '🌃', category: 'التحيات' },
  { id: 170, arabic: 'كيف الحال؟', english: 'WHAT IS UP?', pron: 'واتس أب', emoji: '🤙', category: 'التحيات' },

  // --- جمل مفيدة ---
  { id: 171, arabic: 'كيف حالك؟', english: 'HOW ARE YOU?', pron: 'هاو آر يو', emoji: '❓', category: 'جمل مفيدة' },
  { id: 172, arabic: 'أنا بخير', english: 'I AM FINE', pron: 'آي أم فاين', emoji: '👍', category: 'جمل مفيدة' },
  { id: 173, arabic: 'ما اسمك؟', english: 'WHAT IS YOUR NAME?', pron: 'وات إز يور نيم', emoji: '🤔', category: 'جمل مفيدة' },
  { id: 174, arabic: 'اسمي هو...', english: 'MY NAME IS...', pron: 'ماي نيم إز', emoji: '🏷️', category: 'جمل مفيدة' },
  { id: 175, arabic: 'كم عمرك؟', english: 'HOW OLD ARE YOU?', pron: 'هاو أولد آر يو', emoji: '🎂', category: 'جمل مفيدة' },
  { id: 176, arabic: 'من أين أنت؟', english: 'WHERE ARE YOU FROM?', pron: 'وير آر يو فروم', emoji: '🌍', category: 'جمل مفيدة' },
  { id: 177, arabic: 'لا أعرف', english: 'I DO NOT KNOW', pron: 'آي دو نوت نو', emoji: '🤷', category: 'جمل مفيدة' },
  { id: 178, arabic: 'أنا أفهم', english: 'I UNDERSTAND', pron: 'آي أندرستاند', emoji: '💡', category: 'جمل مفيدة' },
  { id: 179, arabic: 'هل تتحدث الإنجليزية؟', english: 'DO YOU SPEAK ENGLISH?', pron: 'دو يو سبيك إنجليش', emoji: '🗣️', category: 'جمل مفيدة' },
  { id: 180, arabic: 'ساعدني من فضلك', english: 'HELP ME PLEASE', pron: 'هيلب مي بليز', emoji: '🆘', category: 'جمل مفيدة' },
  { id: 181, arabic: 'كم سعر هذا؟', english: 'HOW MUCH IS THIS?', pron: 'هاو ماتش إز ذيس', emoji: '💵', category: 'جمل مفيدة' },
  { id: 182, arabic: 'أين الحمام؟', english: 'WHERE IS THE BATHROOM?', pron: 'وير إز ذا باث روم', emoji: '🚽', category: 'جمل مفيدة' },
  { id: 183, arabic: 'أنا جائع', english: 'I AM HUNGRY', pron: 'آي أم هنجري', emoji: '🤤', category: 'جمل مفيدة' },
  { id: 184, arabic: 'أنا عطشان', english: 'I AM THIRSTY', pron: 'آي أم ثيرستي', emoji: '🥤', category: 'جمل مفيدة' },
  { id: 185, arabic: 'أنا متعب', english: 'I AM TIRED', pron: 'آي أم تايرد', emoji: '🥱', category: 'جمل مفيدة' },
  { id: 186, arabic: 'كم الساعة؟', english: 'WHAT TIME IS IT?', pron: 'وات تايم إز إت', emoji: '⌚', category: 'جمل مفيدة' },
  { id: 187, arabic: 'أراك لاحقاً', english: 'SEE YOU LATER', pron: 'سي يو ليتر', emoji: '👋', category: 'جمل مفيدة' },
  { id: 188, arabic: 'رحلة سعيدة', english: 'HAVE A GOOD TRIP', pron: 'هاف أ جود تريب', emoji: '✈️', category: 'جمل مفيدة' },
  { id: 189, arabic: 'أحتاج طبيباً', english: 'I NEED A DOCTOR', pron: 'آي نيد أ دكتور', emoji: '🚑', category: 'جمل مفيدة' },
  { id: 190, arabic: 'أين المستشفى؟', english: 'WHERE IS THE HOSPITAL?', pron: 'وير إز ذا هوسبيتال', emoji: '🏥', category: 'جمل مفيدة' },
  { id: 191, arabic: 'هل يمكنني الدفع بالبطاقة؟', english: 'CAN I PAY BY CARD?', pron: 'كان آي باي باي كارد', emoji: '💳', category: 'جمل مفيدة' },
  { id: 192, arabic: 'أنا ضائع', english: 'I AM LOST', pron: 'آي أم لوست', emoji: '🧭', category: 'جمل مفيدة' },
  { id: 193, arabic: 'اتصل بالشرطة', english: 'CALL THE POLICE', pron: 'كول ذا بوليس', emoji: '🚓', category: 'جمل مفيدة' },
  { id: 194, arabic: 'طاب يومك', english: 'HAVE A NICE DAY', pron: 'هاف أ نايس داي', emoji: '🌞', category: 'جمل مفيدة' },
  { id: 195, arabic: 'تشرفت بلقائك', english: 'NICE TO MEET YOU', pron: 'نايس تو ميت يو', emoji: '🤝', category: 'جمل مفيدة' },
  { id: 196, arabic: 'ما هو رأيك؟', english: 'WHAT DO YOU THINK?', pron: 'وات دو يو ثينك', emoji: '💭', category: 'جمل مفيدة' },
  { id: 197, arabic: 'لا مشكلة', english: 'NO PROBLEM', pron: 'نو بروبلم', emoji: '👌', category: 'جمل مفيدة' },
  { id: 198, arabic: 'بالطبع', english: 'OF COURSE', pron: 'أوف كورس', emoji: '💯', category: 'جمل مفيدة' },
  { id: 199, arabic: 'ماذا حدث؟', english: 'WHAT HAPPENED?', pron: 'وات هابند', emoji: '⁉️', category: 'جمل مفيدة' },
  { id: 200, arabic: 'أنا مستعد', english: 'I AM READY', pron: 'آي أم ريدي', emoji: '✅', category: 'جمل مفيدة' }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('HOME'); 
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [filteredData, setFilteredData] = useState(vocabularyData);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'الكل') {
      setFilteredData(vocabularyData);
    } else {
      const filtered = vocabularyData.filter((item) => item.category === selectedCategory);
      setFilteredData(filtered);
    }
    setCurrentIndex(0);
  }, [selectedCategory]);

  const handleNext = () => {
    if (currentIndex < filteredData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredData.length - 1);
    }
  };

  // دالة نطق الصوت (تم حل مشكلة التوقف المفاجئ)
  const speakWord = async (word) => {
    try {
      const isSpeaking = await Speech.isSpeakingAsync();
      if (isSpeaking) {
        await Speech.stop();
      }
      Speech.speak(word, {
        language: 'en-US',
        rate: 0.85, 
      });
    } catch (e) {
      console.log(e);
    }
  };

  const currentItem = filteredData[currentIndex] || filteredData[0];

  // ==========================================
  // شاشة قائمة الحروف المحيرة (أسرار النطق)
  // ==========================================
  if (currentScreen === 'PRONUNCIATION_RULES') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.topHeaderNav}>
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('HOME')}>
            <Text style={styles.backButtonText}>← القائمة الرئيسية</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.ruleScreenContent}>
          <Text style={styles.screenMainTitle}>أسرار النطق</Text>
          <Text style={styles.screenSubTitle}>اختر الحرف لمعرفة أسرار نطقه</Text>

          {/* زر حرف C */}
          <TouchableOpacity 
            style={styles.letterMenuCard} 
            onPress={() => setCurrentScreen('RULE_C')}
          >
            <View style={styles.letterIconContainer}>
              <Text style={styles.letterIcon}>C</Text>
            </View>
            <View style={styles.letterMenuText}>
              <Text style={styles.letterMenuTitle}>قاعدة حرف C</Text>
              <Text style={styles.letterMenuSubtitle}>متى ننطقه S ومتى ننطقه K؟</Text>
            </View>
            <Text style={styles.arrowIcon}>←</Text>
          </TouchableOpacity>

          {/* زر حرف G */}
          <TouchableOpacity 
            style={styles.letterMenuCard} 
            onPress={() => setCurrentScreen('RULE_G')}
          >
            <View style={styles.letterIconContainer}>
              <Text style={styles.letterIcon}>G</Text>
            </View>
            <View style={styles.letterMenuText}>
              <Text style={styles.letterMenuTitle}>قاعدة حرف G</Text>
              <Text style={styles.letterMenuSubtitle}>متى ننطقه جـ (J) ومتى ننطقه گ؟</Text>
            </View>
            <Text style={styles.arrowIcon}>←</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==========================================
  // شاشة الشرح لقاعدة حرف C
  // ==========================================
  if (currentScreen === 'RULE_C') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.topHeaderNav}>
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('PRONUNCIATION_RULES')}>
            <Text style={styles.backButtonText}>← قائمة الحروف</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.ruleScreenContent}>
          <Text style={styles.screenMainTitle}>قاعدة نطق حرف C</Text>
          <Text style={styles.screenSubTitle}>متى ننطقه S ومتى ننطقه K ؟</Text>

          {/* القاعدة الأولى: S */}
          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>S</Text>
              <Text style={styles.ruleDetailTitle}>يُنطق مثل حرف S</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              إذا جاء بعد حرف C مباشرة أحد هذه الحروف الثلاثة: ( E, I, Y )
            </Text>

            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>City <Text style={styles.exampleTranslation}>(مدينة)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('City')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Center <Text style={styles.exampleTranslation}>(مركز)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Center')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Bicycle <Text style={styles.exampleTranslation}>(دراجة)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Bicycle')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* القاعدة الثانية: K */}
          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>K</Text>
              <Text style={styles.ruleDetailTitle}>يُنطق مثل حرف K</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              إذا جاء بعده أي حرف آخر (مثل: A, O, U) أو إذا جاء في نهاية الكلمة.
            </Text>

            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Cat <Text style={styles.exampleTranslation}>(قطة)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Cat')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Cold <Text style={styles.exampleTranslation}>(بارد)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Cold')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Music <Text style={styles.exampleTranslation}>(موسيقى)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Music')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==========================================
  // شاشة الشرح لقاعدة حرف G
  // ==========================================
  if (currentScreen === 'RULE_G') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.topHeaderNav}>
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('PRONUNCIATION_RULES')}>
            <Text style={styles.backButtonText}>← قائمة الحروف</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.ruleScreenContent}>
          <Text style={styles.screenMainTitle}>قاعدة نطق حرف G</Text>
          <Text style={styles.screenSubTitle}>متى ننطقه "ج" ومتى ننطقه "گ" ؟</Text>

          {/* القاعدة الأولى: J (ج) */}
          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>J</Text>
              <Text style={styles.ruleDetailTitle}>يُنطق مثل حرف J (جـ)</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              إذا جاء بعد حرف G مباشرة أحد هذه الحروف الثلاثة: ( E, I, Y )
            </Text>

            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Gym <Text style={styles.exampleTranslation}>(نادي رياضي)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Gym')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Magic <Text style={styles.exampleTranslation}>(سحر)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Magic')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Orange <Text style={styles.exampleTranslation}>(برتقال)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Orange')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* القاعدة الثانية: G (گ) */}
          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>G</Text>
              <Text style={styles.ruleDetailTitle}>يُنطق G (گ - جيم مصرية)</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              إذا جاء بعده أي حرف آخر (مثل: A, O, U) أو إذا جاء في نهاية الكلمة.
            </Text>

            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Game <Text style={styles.exampleTranslation}>(لعبة)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Game')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Good <Text style={styles.exampleTranslation}>(جيد)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Good')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Dog <Text style={styles.exampleTranslation}>(كلب)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Dog')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{fontSize: 12, color: '#D32F2F', marginTop: 10, textAlign: 'right'}}>
              *ملاحظة: توجد بعض الكلمات الشاذة لهذه القاعدة مثل Girl (فتاة) و Give (يعطي).
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==========================================
  // الشاشة الرئيسية
  // ==========================================
  if (currentScreen === 'HOME') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.homeHeader}>
          <Text style={styles.homeTitle}>Bunyan</Text>
          <Text style={styles.homeSubtitle}>اختر القسم الذي تريد دراسته</Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            {/* بطاقة الكلمات والجمل */}
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => setCurrentScreen('VOCABULARY')}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardEmojiHeader}>👩💯👋</Text>
                <Text style={styles.cardMainText}>إلى أخ...</Text>
              </View>
              <Text style={styles.cardFooterText}>كلمات و الجمل</Text>
            </TouchableOpacity>

            {/* بطاقة أسرار النطق (التي تجمع كل الحروف) */}
            <TouchableOpacity 
              style={styles.gridCard}
              onPress={() => setCurrentScreen('PRONUNCIATION_RULES')}
            >
              <View style={styles.cardContent}>
                <Text style={{ fontSize: 35, marginBottom: 8 }}>🤔</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#F57C00', textAlign: 'center' }}>أسرار النطق</Text>
              </View>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#E65100', marginTop: 6, textAlign: 'center' }}>
                الحروف المحيرة
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.gridRow}>
            <TouchableOpacity style={styles.gridCard}>
              <View style={styles.cardContent}>
                <Text style={styles.largeCardText}>نص</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridCard}>
              <View style={styles.cardContent}>
                <Text style={styles.mediumCardText}>اساسيات اللغة الانجليزية</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // شاشة الكلمات والجمل (الأساسية)
  // ==========================================
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View style={styles.topHeaderNav}>
        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('HOME')}>
          <Text style={styles.backButtonText}>← القائمة الرئيسية</Text>
        </TouchableOpacity>
      </View>

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

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.emoji}>{currentItem.emoji}</Text>

          <Text style={styles.arabicWord}>{currentItem.arabic}</Text>

          <Text style={styles.englishWord}>
            {currentItem.pron} / {currentItem.english}
          </Text>

          <TouchableOpacity 
            style={styles.soundButton} 
            onPress={() => speakWord(currentItem.english)}
          >
            <Text style={styles.soundButtonText}>🔊 استمع للكلمة</Text>
          </TouchableOpacity>

          <View style={styles.navigationRow}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={handlePrevious}
            >
              <Text style={styles.navButtonText}>← السابقة</Text>
            </TouchableOpacity>

            <Text style={styles.counterText}>
              {currentIndex + 1} / {filteredData.length}
            </Text>

            <TouchableOpacity
              style={styles.navButton}
              onPress={handleNext}
            >
              <Text style={styles.navButtonText}>التالية →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  
  /* الشاشة الرئيسية */
  homeHeader: { paddingTop: 20, paddingHorizontal: 20, alignItems: 'center', marginBottom: 10 },
  homeTitle: { fontSize: 28, fontWeight: 'bold', color: '#0084FF' },
  homeSubtitle: { fontSize: 14, color: '#6C757D', marginTop: 4 },
  gridContainer: { flex: 1, paddingHorizontal: 16, justifyContent: 'center' },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  gridCard: { width: cardWidth, height: cardWidth * 1.05, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 12, alignItems: 'center', justifyContent: 'space-between', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 6, borderWidth: 1, borderColor: '#EFEFEF' },
  cardContent: { flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' },
  cardEmojiHeader: { fontSize: 26, marginBottom: 4 },
  cardMainText: { fontSize: 24, fontWeight: 'bold', color: '#D32F2F' },
  cardFooterText: { fontSize: 15, fontWeight: 'bold', color: '#E53935', marginTop: 6 },
  largeCardText: { fontSize: 38, fontWeight: 'bold', color: '#212529' },
  mediumCardText: { fontSize: 18, fontWeight: 'bold', color: '#212529', textAlign: 'center', lineHeight: 26 },
  
  /* التنقل العلوي */
  topHeaderNav: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10 },
  backButton: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#E9ECEF', borderRadius: 12 },
  backButtonText: { fontSize: 14, fontWeight: '600', color: '#0084FF' },
  
  /* شاشة قائمة الحروف المحيرة (أسرار النطق) */
  letterMenuCard: { flexDirection: 'row-reverse', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 15, marginBottom: 15, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, borderWidth: 1, borderColor: '#E9ECEF' },
  letterIconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginLeft: 15 },
  letterIcon: { fontSize: 24, fontWeight: 'bold', color: '#F57C00' },
  letterMenuText: { flex: 1, alignItems: 'flex-end' },
  letterMenuTitle: { fontSize: 18, fontWeight: 'bold', color: '#212529', marginBottom: 4 },
  letterMenuSubtitle: { fontSize: 13, color: '#6C757D' },
  arrowIcon: { fontSize: 20, color: '#ADB5BD', marginRight: 10 },

  /* شاشة الكلمات والجمل */
  categoryContainer: { paddingVertical: 5 },
  scrollContent: { paddingHorizontal: 15, flexDirection: 'row-reverse' },
  categoryPill: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 25, backgroundColor: '#E9ECEF', marginLeft: 8 },
  activeCategoryPill: { backgroundColor: '#0084FF' },
  categoryText: { fontSize: 14, color: '#495057', fontWeight: '600' },
  activeCategoryText: { color: '#FFFFFF' },
  cardContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },
  card: { width: width * 0.88, backgroundColor: '#FFFFFF', borderRadius: 24, paddingVertical: 30, paddingHorizontal: 20, alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, borderWidth: 1, borderColor: '#E9ECEF' },
  emoji: { fontSize: 80, marginBottom: 15 },
  arabicWord: { fontSize: 32, fontWeight: 'bold', color: '#212529', marginBottom: 10, textAlign: 'center' },
  englishWord: { fontSize: 18, fontWeight: '600', color: '#495057', letterSpacing: 1, marginBottom: 20, textAlign: 'center' },
  soundButton: { backgroundColor: '#E3F2FD', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginBottom: 30 },
  soundButtonText: { color: '#0084FF', fontSize: 16, fontWeight: 'bold' },
  navigationRow: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingTop: 15, borderTopWidth: 1, borderTopColor: '#F1F3F5' },
  navButton: { paddingVertical: 8, paddingHorizontal: 10 },
  navButtonText: { fontSize: 14, color: '#0084FF', fontWeight: 'bold' },
  counterText: { fontSize: 15, fontWeight: '700', color: '#212529' },

  /* شاشة القواعد والتفاصيل (C و G) */
  ruleScreenContent: { paddingHorizontal: 20, paddingBottom: 40 },
  screenMainTitle: { fontSize: 26, fontWeight: 'bold', color: '#212529', textAlign: 'center', marginTop: 10 },
  screenSubTitle: { fontSize: 16, color: '#6C757D', textAlign: 'center', marginBottom: 20, marginTop: 5 },
  ruleDetailCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, borderWidth: 1, borderColor: '#E9ECEF' },
  ruleDetailHeader: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 12 },
  badgeYellowBig: { backgroundColor: '#FFEB3B', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, fontWeight: 'bold', fontSize: 18, marginLeft: 10, color: '#212529' },
  ruleDetailTitle: { fontSize: 18, fontWeight: 'bold', color: '#212529' },
  ruleExplanation: { fontSize: 15, color: '#495057', lineHeight: 24, textAlign: 'right', marginBottom: 20 },
  examplesContainer: { backgroundColor: '#F8F9FA', borderRadius: 12, padding: 15 },
  exampleRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#E9ECEF' },
  exampleEnglish: { fontSize: 18, fontWeight: 'bold', color: '#0084FF', letterSpacing: 1 },
  exampleTranslation: { fontSize: 14, color: '#6C757D', fontWeight: 'normal' },
  smallSoundBtn: { backgroundColor: '#E3F2FD', padding: 8, borderRadius: 50 },
  smallSoundIcon: { fontSize: 14 }
});
