import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Dimensions, BackHandler } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

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
  { id: 7, arabic: 'عم / خال', english: 'UNCLE', pron: 'أنكل', emoji: '👨‍s', category: 'العائلة' },
  { id: 8, arabic: 'عمة / خالة', english: 'AUNT', pron: 'آنت', emoji: '👩‍🦱', category: 'العائلة' },
  { id: 9, arabic: 'ابن', english: 'SON', pron: 'صن', emoji: '👶', category: 'العائلة' },
  { id: 10, arabic: 'ابنة', english: 'DAUGHTER', pron: 'دوتر', emoji: '👧', category: 'العائلة' },

  // --- أعضاء الجسم ---
  { id: 11, arabic: 'رأس', english: 'HEAD', pron: 'هيد', emoji: '🗣️', category: 'أعضاء الجسم' },
  { id: 12, arabic: 'عين', english: 'EYE', pron: 'آي', emoji: '👁️', category: 'أعضاء الجسم' },
  { id: 13, arabic: 'أذن', english: 'EAR', pron: 'إير', emoji: '👂', category: 'أعضاء الجسم' },
  { id: 14, arabic: 'أنف', english: 'NOSE', pron: 'نوز', emoji: '👃', category: 'أعضاء الجسم' },
  { id: 15, arabic: 'فم', english: 'MOUTH', pron: 'ماوث', emoji: '👄', category: 'أعضاء الجسم' },
  { id: 16, arabic: 'يد', english: 'HAND', pron: 'هاند', emoji: '🖐️', category: 'أعضاء الجسم' },
  { id: 17, arabic: 'قدم', english: 'FOOT', pron: 'فوت', emoji: '🦶', category: 'أعضاء الجسم' },
  { id: 18, arabic: 'شعر', english: 'HAIR', pron: 'هير', emoji: '💇', category: 'أعضاء الجسم' },
  { id: 19, arabic: 'وجه', english: 'FACE', pron: 'فيس', emoji: '👱', category: 'أعضاء الجسم' },
  { id: 20, arabic: 'أسنان', english: 'TEETH', pron: 'تيث', emoji: '🦷', category: 'أعضاء الجسم' },

  // --- الألوان ---
  { id: 21, arabic: 'أحمر', english: 'RED', pron: 'ريد', emoji: '🔴', category: 'الألوان' },
  { id: 22, arabic: 'أزرق', english: 'BLUE', pron: 'بلو', emoji: '🔵', category: 'الألوان' },
  { id: 23, arabic: 'أخضر', english: 'GREEN', pron: 'جرين', emoji: '🟢', category: 'الألوان' },
  { id: 24, arabic: 'أصفر', english: 'YELLOW', pron: 'ييلو', emoji: '🟡', category: 'الألوان' },
  { id: 25, arabic: 'أسود', english: 'BLACK', pron: 'بلاك', emoji: '⚫', category: 'الألوان' },
  { id: 26, arabic: 'أبيض', english: 'WHITE', pron: 'وايت', emoji: '⚪', category: 'الألوان' },
  { id: 27, arabic: 'برتقالي', english: 'ORANGE', pron: 'أورانج', emoji: '🟠', category: 'الألوان' },
  { id: 28, arabic: 'وردي', english: 'PINK', pron: 'بينك', emoji: '🌸', category: 'الألوان' },
  { id: 29, arabic: 'بني', english: 'BROWN', pron: 'براون', emoji: '🟤', category: 'الألوان' },
  { id: 30, arabic: 'رمادي', english: 'GRAY', pron: 'جراي', emoji: '🔘', category: 'الألوان' },

  // --- الحيوانات ---
  { id: 31, arabic: 'قطة', english: 'CAT', pron: 'كات', emoji: '🐱', category: 'الحيوانات' },
  { id: 32, arabic: 'كلب', english: 'DOG', pron: 'دوج', emoji: '🐶', category: 'الحيوانات' },
  { id: 33, arabic: 'عصفور', english: 'BIRD', pron: 'بيرد', emoji: '🐦', category: 'الحيوانات' },
  { id: 34, arabic: 'سمكة', english: 'FISH', pron: 'فيش', emoji: '🐟', category: 'الحيوانات' },
  { id: 35, arabic: 'أسد', english: 'LION', pron: 'لايون', emoji: '🦁', category: 'الحيوانات' },
  { id: 36, arabic: 'نمر', english: 'TIGER', pron: 'تايجر', emoji: '🐯', category: 'الحيوانات' },
  { id: 37, arabic: 'فيل', english: 'ELEPHANT', pron: 'إيليفانت', emoji: '🐘', category: 'الحيوانات' },
  { id: 38, arabic: 'حصان', english: 'HORSE', pron: 'هورس', emoji: '🐴', category: 'الحيوانات' },
  { id: 39, arabic: 'بقرة', english: 'COW', pron: 'كاو', emoji: '🐮', category: 'الحيوانات' },
  { id: 40, arabic: 'قرد', english: 'MONKEY', pron: 'مونكي', emoji: '🐒', category: 'الحيوانات' },
  { id: 41, arabic: 'أرنب', english: 'RABBIT', pron: 'رابيت', emoji: '🐰', category: 'الحيوانات' },
  { id: 42, arabic: 'دجاجة', english: 'CHICKEN', pron: 'تشيكن', emoji: '🐔', category: 'الحيوانات' },

  // --- الطعام ---
  { id: 43, arabic: 'تفاحة', english: 'APPLE', pron: 'آبل', emoji: '🍎', category: 'الطعام' },
  { id: 44, arabic: 'برتقالة', english: 'ORANGE', pron: 'أورانج', emoji: '🍊', category: 'الطعام' },
  { id: 45, arabic: 'موز', english: 'BANANA', pron: 'بنانة', emoji: '🍌', category: 'الطعام' },
  { id: 46, arabic: 'لحم', english: 'MEAT', pron: 'ميت', emoji: '🥩', category: 'الطعام' },
  { id: 47, arabic: 'دجاج', english: 'CHICKEN', pron: 'تشيكن', emoji: '🍗', category: 'الطعام' },
  { id: 48, arabic: 'سمك', english: 'FISH', pron: 'فيش', emoji: '🐟', category: 'الطعام' },
  { id: 49, arabic: 'بيض', english: 'EGG', pron: 'إيج', emoji: '🥚', category: 'الطعام' },
  { id: 50, arabic: 'حليب', english: 'MILK', pron: 'ميلك', emoji: '🥛', category: 'الطعام' },
  { id: 51, arabic: 'ماء', english: 'WATER', pron: 'ووتر', emoji: '💧', category: 'الطعام' },
  { id: 52, arabic: 'خبز', english: 'BREAD', pron: 'بريد', emoji: '🍞', category: 'الطعام' },
  { id: 53, arabic: 'أرز', english: 'RICE', pron: 'رايس', emoji: '🍚', category: 'الطعام' },
  { id: 54, arabic: 'جبن', english: 'CHEESE', pron: 'تشيز', emoji: '🧀', category: 'الطعام' },
  { id: 55, arabic: 'عصير', english: 'JUICE', pron: 'جوس', emoji: '🧃', category: 'الطعام' },

  // --- المهن ---
  { id: 56, arabic: 'طبيب', english: 'DOCTOR', pron: 'دكتور', emoji: '👨‍⚕️', category: 'المهن' },
  { id: 57, arabic: 'معلم', english: 'TEACHER', pron: 'تيتشر', emoji: '👨‍🏫', category: 'المهن' },
  { id: 58, arabic: 'مهندس', english: 'ENGINEER', pron: 'إنجينير', emoji: '👷', category: 'المهن' },
  { id: 59, arabic: 'شرطي', english: 'POLICEMAN', pron: 'بوليس مان', emoji: '👮', category: 'المهن' },
  { id: 60, arabic: 'ممرضة', english: 'NURSE', pron: 'نيرس', emoji: '👩‍⚕️', category: 'المهن' },
  { id: 61, arabic: 'طيار', english: 'PILOT', pron: 'بايلوت', emoji: '👨‍✈️', category: 'المهن' },
  { id: 62, arabic: 'طباخ', english: 'CHEF', pron: 'شيف', emoji: '👨‍🍳', category: 'المهن' },
  { id: 63, arabic: 'نجار', english: 'CARPENTER', pron: 'كاربنتر', emoji: '🪚', category: 'المهن' },
  { id: 64, arabic: 'فلاح', english: 'FARMER', pron: 'فارمر', emoji: '👨‍🌾', category: 'المهن' },
  { id: 65, arabic: 'محامي', english: 'LAWYER', pron: 'لوير', emoji: '💼', category: 'المهن' },
  { id: 66, arabic: 'محاسب', english: 'ACCOUNTANT', pron: 'أكاونتانت', emoji: '📊', category: 'المهن' },
  { id: 67, arabic: 'صحفي', english: 'JOURNALIST', pron: 'جورناليست', emoji: '🎤', category: 'المهن' },

  // --- المنزل ---
  { id: 68, arabic: 'باب', english: 'DOOR', pron: 'دور', emoji: '🚪', category: 'المنزل' },
  { id: 69, arabic: 'نافذة', english: 'WINDOW', pron: 'ويندو', emoji: '🪟', category: 'المنزل' },
  { id: 70, arabic: 'غرفة', english: 'ROOM', pron: 'روم', emoji: '🛋️', category: 'المنزل' },
  { id: 71, arabic: 'سرير', english: 'BED', pron: 'بيد', emoji: '🛏️', category: 'المنزل' },
  { id: 72, arabic: 'كرسي', english: 'CHAIR', pron: 'تشير', emoji: '🪑', category: 'المنزل' },
  { id: 73, arabic: 'طاولة', english: 'TABLE', pron: 'تيبل', emoji: '🍽️', category: 'المنزل' },
  { id: 74, arabic: 'مطبخ', english: 'KITCHEN', pron: 'كيتشن', emoji: '🍳', category: 'المنزل' },
  { id: 75, arabic: 'حمام', english: 'BATHROOM', pron: 'باثروم', emoji: '🛁', category: 'المنزل' },
  { id: 76, arabic: 'تلفاز', english: 'TELEVISION', pron: 'تلفيجن', emoji: '📺', category: 'المنزل' },
  { id: 77, arabic: 'أريكة', english: 'SOFA', pron: 'سوفا', emoji: '🛋️', category: 'المنزل' },
  { id: 78, arabic: 'مصباح', english: 'LAMP', pron: 'لامب', emoji: '💡', category: 'المنزل' },
  { id: 79, arabic: 'جدار', english: 'WALL', pron: 'وول', emoji: '🧱', category: 'المنزل' },

  // --- الملابس ---
  { id: 80, arabic: 'قميص', english: 'SHIRT', pron: 'شيرت', emoji: '👔', category: 'الملابس' },
  { id: 81, arabic: 'بنطال', english: 'PANTS', pron: 'بانتس', emoji: '👖', category: 'الملابس' },
  { id: 82, arabic: 'فستان', english: 'DRESS', pron: 'دريس', emoji: '👗', category: 'الملابس' },
  { id: 83, arabic: 'حذاء', english: 'SHOES', pron: 'شوز', emoji: '👞', category: 'الملابس' },
  { id: 84, arabic: 'قبعة', english: 'HAT', pron: 'هات', emoji: '🎩', category: 'الملابس' },
  { id: 85, arabic: 'معطف', english: 'COAT', pron: 'كوت', emoji: '🧥', category: 'الملابس' },
  { id: 86, arabic: 'جوارب', english: 'SOCKS', pron: 'سوكس', emoji: '🧦', category: 'الملابس' },
  { id: 87, arabic: 'تنورة', english: 'SKIRT', pron: 'سكيرت', emoji: '👗', category: 'الملابس' },
  { id: 88, arabic: 'سترة', english: 'JACKET', pron: 'جاكيت', emoji: '🧥', category: 'الملابس' },
  { id: 89, arabic: 'حزام', english: 'BELT', pron: 'بيلت', emoji: '🎗️', category: 'الملابس' },
  { id: 90, arabic: 'نظارات', english: 'GLASSES', pron: 'جلاسيس', emoji: '👓', category: 'الملابس' },

  // --- الطبيعة ---
  { id: 91, arabic: 'شمس', english: 'SUN', pron: 'صن', emoji: '☀️', category: 'الطبيعة' },
  { id: 92, arabic: 'قمر', english: 'MOON', pron: 'مون', emoji: '🌙', category: 'الطبيعة' },
  { id: 93, arabic: 'نجمة', english: 'STAR', pron: 'ستار', emoji: '⭐', category: 'الطبيعة' },
  { id: 94, arabic: 'سماء', english: 'SKY', pron: 'سكاي', emoji: '🌌', category: 'الطبيعة' },
  { id: 95, arabic: 'بحر', english: 'SEA', pron: 'سي', emoji: '🌊', category: 'الطبيعة' },
  { id: 96, arabic: 'شجرة', english: 'TREE', pron: 'تري', emoji: '🌳', category: 'الطبيعة' },
  { id: 97, arabic: 'زهرة', english: 'FLOWER', pron: 'فلاور', emoji: '🌻', category: 'الطبيعة' },
  { id: 98, arabic: 'جبل', english: 'MOUNTAIN', pron: 'ماونتن', emoji: '⛰️', category: 'الطبيعة' },
  { id: 99, arabic: 'نهر', english: 'RIVER', pron: 'ريفر', emoji: '🏞️', category: 'الطبيعة' },
  { id: 100, arabic: 'صحراء', english: 'DESERT', pron: 'ديزيرت', emoji: '🏜️', category: 'الطبيعة' },
  { id: 101, arabic: 'غابة', english: 'FOREST', pron: 'فوريست', emoji: '🌲', category: 'الطبيعة' },
  { id: 102, arabic: 'حجر', english: 'STONE', pron: 'ستون', emoji: '🪨', category: 'الطبيعة' },

  // --- النقل ---
  { id: 103, arabic: 'سيارة', english: 'CAR', pron: 'كار', emoji: '🚗', category: 'النقل' },
  { id: 104, arabic: 'حافلة', english: 'BUS', pron: 'باص', emoji: '🚌', category: 'النقل' },
  { id: 105, arabic: 'قطار', english: 'TRAIN', pron: 'ترين', emoji: '🚂', category: 'النقل' },
  { id: 106, arabic: 'طائرة', english: 'AIRPLANE', pron: 'إيربلين', emoji: '✈️', category: 'النقل' },
  { id: 107, arabic: 'دراجة', english: 'BICYCLE', pron: 'بايسكل', emoji: '🚲', category: 'النقل' },
  { id: 108, arabic: 'قارب', english: 'BOAT', pron: 'بوت', emoji: '⛵', category: 'النقل' },
  { id: 109, arabic: 'سفينة', english: 'SHIP', pron: 'شيب', emoji: '🛳️', category: 'النقل' },
  { id: 110, arabic: 'شاحنة', english: 'TRUCK', pron: 'تراك', emoji: '🚛', category: 'النقل' },
  { id: 111, arabic: 'دراجة نارية', english: 'MOTORCYCLE', pron: 'موتورسيكل', emoji: '🏍️', category: 'النقل' },
  { id: 112, arabic: 'هليكوبتر', english: 'HELICOPTER', pron: 'هليكوبتر', emoji: '🚁', category: 'النقل' },

  // --- المدرسة ---
  { id: 113, arabic: 'قلم', english: 'PEN', pron: 'بين', emoji: '🖊️', category: 'المدرسة' },
  { id: 114, arabic: 'كتاب', english: 'BOOK', pron: 'بوك', emoji: '📚', category: 'المدرسة' },
  { id: 115, arabic: 'دفتر', english: 'NOTEBOOK', pron: 'نوتبوك', emoji: '📓', category: 'المدرسة' },
  { id: 116, arabic: 'ممحاة', english: 'ERASER', pron: 'إريزر', emoji: '🧽', category: 'المدرسة' },
  { id: 117, arabic: 'مسطرة', english: 'RULER', pron: 'رولر', emoji: '📏', category: 'المدرسة' },
  { id: 118, arabic: 'حقيبة', english: 'BAG', pron: 'باج', emoji: '🎒', category: 'المدرسة' },
  { id: 119, arabic: 'سبورة', english: 'BOARD', pron: 'بورد', emoji: '🏫', category: 'المدرسة' },
  { id: 120, arabic: 'قسم', english: 'CLASSROOM', pron: 'كلاس روم', emoji: '👨‍🏫', category: 'المدرسة' },
  { id: 121, arabic: 'مكتب', english: 'DESK', pron: 'ديسك', emoji: '🪑', category: 'المدرسة' },
  { id: 122, arabic: 'طالب', english: 'STUDENT', pron: 'ستيودنت', emoji: '👨‍🎓', category: 'المدرسة' },
  { id: 123, arabic: 'امتحان', english: 'EXAM', pron: 'إكزام', emoji: '📝', category: 'المدرسة' },
  { id: 124, arabic: 'درس', english: 'LESSON', pron: 'ليسون', emoji: '📖', category: 'المدرسة' },

  // --- الرياضة ---
  { id: 125, arabic: 'كرة قدم', english: 'FOOTBALL', pron: 'فوتبول', emoji: '⚽', category: 'الرياضة' },
  { id: 126, arabic: 'كرة سلة', english: 'BASKETBALL', pron: 'باسكتبول', emoji: '🏀', category: 'الرياضة' },
  { id: 127, arabic: 'تنس', english: 'TENNIS', pron: 'تينيس', emoji: '🎾', category: 'الرياضة' },
  { id: 128, arabic: 'سباحة', english: 'SWIMMING', pron: 'سويمينج', emoji: '🏊', category: 'الرياضة' },
  { id: 129, arabic: 'جري', english: 'RUNNING', pron: 'رانينج', emoji: '🏃', category: 'الرياضة' },
  { id: 130, arabic: 'قفز', english: 'JUMPING', pron: 'جامبينج', emoji: '🤾', category: 'الرياضة' },
  { id: 131, arabic: 'فريق', english: 'TEAM', pron: 'تيم', emoji: '👥', category: 'الرياضة' },
  { id: 132, arabic: 'هدف', english: 'GOAL', pron: 'جول', emoji: '🥅', category: 'الرياضة' },
  { id: 133, arabic: 'ملعب', english: 'STADIUM', pron: 'ستاديوم', emoji: '🏟️', category: 'الرياضة' },
  { id: 134, arabic: 'بطل', english: 'CHAMPION', pron: 'تشامبيون', emoji: '🏆', category: 'الرياضة' },
  { id: 135, arabic: 'مباراة', english: 'MATCH', pron: 'ماتش', emoji: '⏱️', category: 'الرياضة' },

  // --- الطقس ---
  { id: 136, arabic: 'حار', english: 'HOT', pron: 'هوت', emoji: '🥵', category: 'الطقس' },
  { id: 137, arabic: 'بارد', english: 'COLD', pron: 'كولد', emoji: '🥶', category: 'الطقس' },
  { id: 138, arabic: 'مشمس', english: 'SUNNY', pron: 'صاني', emoji: '☀️', category: 'الطقس' },
  { id: 139, arabic: 'ممطر', english: 'RAINY', pron: 'ريني', emoji: '🌧️', category: 'الطقس' },
  { id: 140, arabic: 'غائم', english: 'CLOUDY', pron: 'كلاودي', emoji: '☁️', category: 'الطقس' },
  { id: 141, arabic: 'ثلج', english: 'SNOW', pron: 'سنو', emoji: '❄️', category: 'الطقس' },
  { id: 142, arabic: 'رياح', english: 'WIND', pron: 'ويند', emoji: '🌬️', category: 'الطقس' },
  { id: 143, arabic: 'عاصفة', english: 'STORM', pron: 'ستورم', emoji: '🌩️', category: 'الطقس' },
  { id: 144, arabic: 'ربيع', english: 'SPRING', pron: 'سبرينج', emoji: '🌸', category: 'الطقس' },
  { id: 145, arabic: 'شتاء', english: 'WINTER', pron: 'وينتر', emoji: '🌨️', category: 'الطقس' },

  // --- الصفات ---
  { id: 146, arabic: 'كبير', english: 'BIG', pron: 'بيج', emoji: '🐘', category: 'الصفات' },
  { id: 147, arabic: 'صغير', english: 'SMALL', pron: 'سمول', emoji: '🐜', category: 'الصفات' },
  { id: 148, arabic: 'طويل', english: 'TALL', pron: 'تول', emoji: '🦒', category: 'الصفات' },
  { id: 149, arabic: 'قصير', english: 'SHORT', pron: 'شورت', emoji: '📏', category: 'الصفات' },
  { id: 150, arabic: 'جميل', english: 'BEAUTIFUL', pron: 'بيوتيفول', emoji: '✨', category: 'الصفات' },
  { id: 151, arabic: 'قبيح', english: 'UGLY', pron: 'أجلي', emoji: '🧟', category: 'الصفات' },
  { id: 152, arabic: 'قوي', english: 'STRONG', pron: 'سترونج', emoji: '💪', category: 'الصفات' },
  { id: 153, arabic: 'ضعيف', english: 'WEAK', pron: 'ويك', emoji: '🥀', category: 'الصفات' },
  { id: 154, arabic: 'سريع', english: 'FAST', pron: 'فاست', emoji: '⚡', category: 'الصفات' },
  { id: 155, arabic: 'بطيء', english: 'SLOW', pron: 'سلو', emoji: '🐢', category: 'الصفات' },
  { id: 156, arabic: 'سعيد', english: 'HAPPY', pron: 'هابي', emoji: '😊', category: 'الصفات' },
  { id: 157, arabic: 'حزين', english: 'SAD', pron: 'ساد', emoji: '😢', category: 'الصفات' },
  { id: 158, arabic: 'غاضب', english: 'ANGRY', pron: 'آنجري', emoji: '😡', category: 'الصفات' },
  { id: 159, arabic: 'متعب', english: 'TIRED', pron: 'تايرد', emoji: '😫', category: 'الصفات' },
  { id: 160, arabic: 'ذكي', english: 'SMART', pron: 'سمارت', emoji: '🧠', category: 'الصفات' },

  // --- الأفعال ---
  { id: 161, arabic: 'يأكل', english: 'EAT', pron: 'إيت', emoji: '🍽️', category: 'الأفعال' },
  { id: 162, arabic: 'يشرب', english: 'DRINK', pron: 'درينك', emoji: '🥤', category: 'الأفعال' },
  { id: 163, arabic: 'ينام', english: 'SLEEP', pron: 'سليب', emoji: '😴', category: 'الأفعال' },
  { id: 164, arabic: 'يستيقظ', english: 'WAKE UP', pron: 'ويك أب', emoji: '🥱', category: 'الأفعال' },
  { id: 165, arabic: 'يذهب', english: 'GO', pron: 'جو', emoji: '🚶', category: 'الأفعال' },
  { id: 166, arabic: 'يأتي', english: 'COME', pron: 'كام', emoji: '🙋', category: 'الأفعال' },
  { id: 167, arabic: 'يلعب', english: 'PLAY', pron: 'بلاي', emoji: '🎮', category: 'الأفعال' },
  { id: 168, arabic: 'يعمل', english: 'WORK', pron: 'وورك', emoji: '💼', category: 'الأفعال' },
  { id: 169, arabic: 'يقرأ', english: 'READ', pron: 'ريد', emoji: '📖', category: 'الأفعال' },
  { id: 170, arabic: 'يكتب', english: 'WRITE', pron: 'رايت', emoji: '✍️', category: 'الأفعال' },
  { id: 171, arabic: 'يتحدث', english: 'SPEAK', pron: 'سبيك', emoji: '🗣️', category: 'الأفعال' },
  { id: 172, arabic: 'يستمع', english: 'LISTEN', pron: 'ليسن', emoji: '🎧', category: 'الأفعال' },
  { id: 173, arabic: 'يرى', english: 'SEE', pron: 'سي', emoji: '👁️', category: 'الأفعال' },
  { id: 174, arabic: 'ينظر', english: 'LOOK', pron: 'لوك', emoji: '👀', category: 'الأفعال' },
  { id: 175, arabic: 'يحب', english: 'LOVE', pron: 'لوف', emoji: '❤️', category: 'الأفعال' },
  { id: 176, arabic: 'يكره', english: 'HATE', pron: 'هيت', emoji: '💔', category: 'الأفعال' },
  { id: 177, arabic: 'يفتح', english: 'OPEN', pron: 'أوبن', emoji: '🔓', category: 'الأفعال' },
  { id: 178, arabic: 'يغلق', english: 'CLOSE', pron: 'كلوز', emoji: '🔒', category: 'الأفعال' },
  { id: 179, arabic: 'يمشي', english: 'WALK', pron: 'ووك', emoji: '🚶', category: 'الأفعال' },
  { id: 180, arabic: 'يجري', english: 'RUN', pron: 'ران', emoji: '🏃', category: 'الأفعال' },

  // --- التحيات ---
  { id: 181, arabic: 'مرحباً', english: 'HELLO', pron: 'هيلو', emoji: '👋', category: 'التحيات' },
  { id: 182, arabic: 'صباح الخير', english: 'GOOD MORNING', pron: 'جود مورنينج', emoji: '🌅', category: 'التحيات' },
  { id: 183, arabic: 'مساء الخير', english: 'GOOD EVENING', pron: 'جود إيفنينج', emoji: '🌇', category: 'التحيات' },
  { id: 184, arabic: 'تصبح على خير', english: 'GOOD NIGHT', pron: 'جود نايت', emoji: '🌃', category: 'التحيات' },
  { id: 185, arabic: 'وداعاً', english: 'GOODBYE', pron: 'جود باي', emoji: '👋', category: 'التحيات' },
  { id: 186, arabic: 'شكراً', english: 'THANK YOU', pron: 'ثانك يو', emoji: '🙏', category: 'التحيات' },
  { id: 187, arabic: 'عفواً', english: 'YOU ARE WELCOME', pron: 'يور ويلكم', emoji: '🤝', category: 'التحيات' },
  { id: 188, arabic: 'آسف', english: 'SORRY', pron: 'سوري', emoji: '😔', category: 'التحيات' },
  { id: 189, arabic: 'نعم', english: 'YES', pron: 'يس', emoji: '👍', category: 'التحيات' },
  { id: 190, arabic: 'لا', english: 'NO', pron: 'نو', emoji: '👎', category: 'التحيات' },

  // --- جمل مفيدة ---
  { id: 191, arabic: 'كيف حالك؟', english: 'How are you?', pron: 'هاو آر يو؟', emoji: '❓', category: 'جمل مفيدة' },
  { id: 192, arabic: 'ما اسمك؟', english: 'What is your name?', pron: 'وات إز يور نيم؟', emoji: '🤔', category: 'جمل مفيدة' },
  { id: 193, arabic: 'كم عمرك؟', english: 'How old are you?', pron: 'هاو أولد آر يو؟', emoji: '🎂', category: 'جمل مفيدة' },
  { id: 194, arabic: 'من أين أنت؟', english: 'Where are you from?', pron: 'وير آر يو فروم؟', emoji: '🌍', category: 'جمل مفيدة' },
  { id: 195, arabic: 'أين تعيش؟', english: 'Where do you live?', pron: 'وير دو يو ليف؟', emoji: '🏠', category: 'جمل مفيدة' },
  { id: 196, arabic: 'هل تتحدث الإنجليزية؟', english: 'Do you speak English?', pron: 'دو يو سبيك إنجليش؟', emoji: '🗣️', category: 'جمل مفيدة' },
  { id: 197, arabic: 'لا أفهم', english: 'I do not understand', pron: 'آي دو نوت أندرستاند', emoji: '🤷', category: 'جمل مفيدة' },
  { id: 198, arabic: 'كم السعر؟', english: 'How much is this?', pron: 'هاو ماتش إز ذيس؟', emoji: '💰', category: 'جمل مفيدة' },
  { id: 199, arabic: 'هل يمكنك مساعدتي؟', english: 'Can you help me?', pron: 'كان يو هيلب مي؟', emoji: '🆘', category: 'جمل مفيدة' },
  { id: 200, arabic: 'سررت بلقائك', english: 'Nice to meet you', pron: 'نايس تو ميت يو', emoji: '🤝', category: 'جمل مفيدة' }
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

  useEffect(() => {
    const backAction = () => {
      if (currentScreen === 'HOME') {
        return false; 
      } else if (['PRONUNCIATION_RULES', 'VOCABULARY'].includes(currentScreen)) {
        setCurrentScreen('HOME'); 
        return true; 
      } else if (['RULE_C', 'RULE_G', 'RULE_SILENT'].includes(currentScreen)) {
        setCurrentScreen('PRONUNCIATION_RULES'); 
        return true; 
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [currentScreen]);

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

  if (currentScreen === 'PRONUNCIATION_RULES') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.topHeaderNav}>
          <TouchableOpacity style={styles.iconBackButton} onPress={() => setCurrentScreen('HOME')}>
            <Ionicons name="home" size={24} color="#0084FF" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.ruleScreenContent}>
          <Text style={styles.screenMainTitle}>أسرار النطق</Text>
          <Text style={styles.screenSubTitle}>اختر الحرف لمعرفة أسرار نطقه</Text>

          <TouchableOpacity style={styles.letterMenuCard} onPress={() => setCurrentScreen('RULE_C')}>
            <View style={styles.letterIconContainer}>
              <Text style={styles.letterIcon}>C</Text>
            </View>
            <View style={styles.letterMenuText}>
              <Text style={styles.letterMenuTitle}>قاعدة حرف C</Text>
              <Text style={styles.letterMenuSubtitle}>متى ننطقه S ومتى ننطقه K؟</Text>
            </View>
            <Ionicons name="chevron-back" size={20} color="#ADB5BD" style={styles.arrowIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.letterMenuCard} onPress={() => setCurrentScreen('RULE_G')}>
            <View style={[styles.letterIconContainer, { backgroundColor: '#E3F2FD' }]}>
              <Text style={[styles.letterIcon, { color: '#0084FF' }]}>G</Text>
            </View>
            <View style={styles.letterMenuText}>
              <Text style={styles.letterMenuTitle}>قاعدة حرف G</Text>
              <Text style={styles.letterMenuSubtitle}>متى ننطقه جـ (J) ومتى ننطقه گ؟</Text>
            </View>
            <Ionicons name="chevron-back" size={20} color="#ADB5BD" style={styles.arrowIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.letterMenuCard} onPress={() => setCurrentScreen('RULE_SILENT')}>
            <View style={[styles.letterIconContainer, { backgroundColor: '#FCE4EC' }]}>
              <Ionicons name="volume-mute" size={24} color="#E91E63" />
            </View>
            <View style={styles.letterMenuText}>
              <Text style={styles.letterMenuTitle}>الحروف الصامتة</Text>
              <Text style={styles.letterMenuSubtitle}>تُكتب ولا تُنطق (مثل K و W)</Text>
            </View>
            <Ionicons name="chevron-back" size={20} color="#ADB5BD" style={styles.arrowIcon} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (currentScreen === 'RULE_SILENT') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.topHeaderNav}>
          <TouchableOpacity style={styles.iconBackButton} onPress={() => setCurrentScreen('PRONUNCIATION_RULES')}>
            <Ionicons name="arrow-back" size={24} color="#0084FF" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.ruleScreenContent}>
          <Text style={styles.screenMainTitle}>الحروف الصامتة</Text>
          <Text style={styles.screenSubTitle}>حروف نكتبها ولا ننطقها</Text>

          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>K</Text>
              <Text style={styles.ruleDetailTitle}>حرف K لا يُنطق</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              إذا جاء حرف K في بداية الكلمة وجاء بعده مباشرة حرف N، فإننا لا ننطق حرف K.
            </Text>
            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Know <Text style={styles.exampleTranslation}>(يَعرف - "نو")</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Know')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Knife <Text style={styles.exampleTranslation}>(سكين - "نايف")</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Knife')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>W</Text>
              <Text style={styles.ruleDetailTitle}>حرف W لا يُنطق</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              إذا جاء حرف W في بداية الكلمة وجاء بعده مباشرة حرف R، فإننا لا ننطق حرف W.
            </Text>
            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Write <Text style={styles.exampleTranslation}>(يَكتب - "رايت")</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Write')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>Wrong <Text style={styles.exampleTranslation}>(خاطئ - "رونج")</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Wrong')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (currentScreen === 'RULE_C') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.topHeaderNav}>
          <TouchableOpacity style={styles.iconBackButton} onPress={() => setCurrentScreen('PRONUNCIATION_RULES')}>
            <Ionicons name="arrow-back" size={24} color="#0084FF" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.ruleScreenContent}>
          <Text style={styles.screenMainTitle}>قاعدة نطق حرف C</Text>
          <Text style={styles.screenSubTitle}>متى ننطقه S ومتى ننطقه K؟</Text>

          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>S</Text>
              <Text style={styles.ruleDetailTitle}>يُنطق مثل السين (S)</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              إذا جاء بعد حرف C أحد هذه الحروف الثلاثة: ( e, i, y ) فإنه يُنطق (س).
            </Text>
            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>C<Text style={{color: '#E53935'}}>i</Text>ty <Text style={styles.exampleTranslation}>(مدينة)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('City')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>C<Text style={{color: '#E53935'}}>e</Text>nter <Text style={styles.exampleTranslation}>(مركز)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Center')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>K</Text>
              <Text style={styles.ruleDetailTitle}>يُنطق مثل الكاف (K)</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              إذا جاء بعده أي حرف آخر غير (e, i, y) فإنه يُنطق (ك).
            </Text>
            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>C<Text style={{color: '#0084FF'}}>a</Text>t <Text style={styles.exampleTranslation}>(قطة)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Cat')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>C<Text style={{color: '#0084FF'}}>o</Text>ld <Text style={styles.exampleTranslation}>(بارد)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Cold')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (currentScreen === 'RULE_G') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.topHeaderNav}>
          <TouchableOpacity style={styles.iconBackButton} onPress={() => setCurrentScreen('PRONUNCIATION_RULES')}>
            <Ionicons name="arrow-back" size={24} color="#0084FF" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.ruleScreenContent}>
          <Text style={styles.screenMainTitle}>قاعدة نطق حرف G</Text>
          <Text style={styles.screenSubTitle}>متى ننطقه جـ ومتى ننطقه گ؟</Text>

          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>J</Text>
              <Text style={styles.ruleDetailTitle}>يُنطق (جـ) معطشة</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              غالباً إذا جاء بعد حرف G أحد الحروف: ( e, i, y ) فإنه يُنطق (جـ).
            </Text>
            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>G<Text style={{color: '#E53935'}}>y</Text>m <Text style={styles.exampleTranslation}>(صالة رياضية)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Gym')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>G<Text style={{color: '#E53935'}}>i</Text>ant <Text style={styles.exampleTranslation}>(عملاق)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Giant')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.ruleDetailCard}>
            <View style={styles.ruleDetailHeader}>
              <Text style={styles.badgeYellowBig}>G</Text>
              <Text style={styles.ruleDetailTitle}>يُنطق (گ) مصرية</Text>
            </View>
            <Text style={styles.ruleExplanation}>
              إذا جاء بعده أي حرف آخر (مثل a, o, u) فإنه يُنطق (گ).
            </Text>
            <View style={styles.examplesContainer}>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>G<Text style={{color: '#0084FF'}}>o</Text>od <Text style={styles.exampleTranslation}>(جيد)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Good')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.exampleRow}>
                <View>
                  <Text style={styles.exampleEnglish}>G<Text style={{color: '#0084FF'}}>a</Text>me <Text style={styles.exampleTranslation}>(لعبة)</Text></Text>
                </View>
                <TouchableOpacity onPress={() => speakWord('Game')} style={styles.smallSoundBtn}>
                  <Text style={styles.smallSoundIcon}>🔊</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
            <TouchableOpacity style={styles.gridCard} onPress={() => setCurrentScreen('VOCABULARY')}>
              <View style={styles.cardContent}>
                <Text style={styles.cardEmojiHeader}>👩💯👋</Text>
                <Text style={styles.cardMainText}>إلى أخ...</Text>
              </View>
              <Text style={styles.cardFooterText}>الكلمات والجمل</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridCard} onPress={() => setCurrentScreen('PRONUNCIATION_RULES')}>
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <View style={styles.topHeaderNav}>
        <TouchableOpacity style={styles.iconBackButton} onPress={() => setCurrentScreen('HOME')}>
          <Ionicons name="home" size={22} color="#0084FF" />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {categories.map((cat, index) => (
            <TouchableOpacity key={index} style={[styles.categoryPill, selectedCategory === cat && styles.activeCategoryPill]} onPress={() => setSelectedCategory(cat)}>
              <Text style={[styles.categoryText, selectedCategory === cat && styles.activeCategoryText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.emoji}>{currentItem?.emoji}</Text>
          <Text style={styles.arabicWord}>{currentItem?.arabic}</Text>
          <Text style={styles.englishWord}>{currentItem?.pron} / {currentItem?.english}</Text>
          <TouchableOpacity style={styles.soundButton} onPress={() => speakWord(currentItem?.english)}>
            <Text style={styles.soundButtonText}>🔊 استمع</Text>
          </TouchableOpacity>

          <View style={styles.navigationRow}>
            <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
              <Text style={styles.navButtonText}>← السابقة</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>{currentIndex + 1} / {filteredData.length}</Text>
            <TouchableOpacity style={styles.navButton} onPress={handleNext}>
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
  
  topHeaderNav: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 10, flexDirection: 'row' },
  iconBackButton: { width: 44, height: 44, backgroundColor: '#E3F2FD', borderRadius: 22, justifyContent: 'center', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  
  letterMenuCard: { flexDirection: 'row-reverse', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 15, marginBottom: 15, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, borderWidth: 1, borderColor: '#E9ECEF' },
  letterIconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginLeft: 15 },
  letterIcon: { fontSize: 24, fontWeight: 'bold', color: '#F57C00' },
  letterMenuText: { flex: 1, alignItems: 'flex-end' },
  letterMenuTitle: { fontSize: 18, fontWeight: 'bold', color: '#212529', marginBottom: 4 },
  letterMenuSubtitle: { fontSize: 13, color: '#6C757D' },
  arrowIcon: { marginRight: 10 },
  
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
