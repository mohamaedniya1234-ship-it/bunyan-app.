import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const CATEGORIES = ['الكل', 'العائلة', 'أعضاء الجسم', 'الألوان', 'الحيوانات', 'الطعام', 'الملابس', 'وسائل النقل والأماكن', 'الطبيعة', 'أدوات ومتفرقات'];

const WORDS_DATA = [
  // العائلة
  { id: 51, arabic: 'أب', english: 'FATHER', pronunciation: 'فاذر', emoji: '👨', category: 'العائلة' },
  { id: 52, arabic: 'أم', english: 'MOTHER', pronunciation: 'ماذر', emoji: '👩', category: 'العائلة' },
  { id: 53, arabic: 'أخ', english: 'BROTHER', pronunciation: 'براذر', emoji: '👦', category: 'العائلة' },
  { id: 54, arabic: 'أخت', english: 'SISTER', pronunciation: 'سيستر', emoji: '👧', category: 'العائلة' },
  { id: 55, arabic: 'طفل', english: 'BABY', pronunciation: 'بيبي', emoji: '👶', category: 'العائلة' },

  // أعضاء الجسم
  { id: 56, arabic: 'عين', english: 'EYE', pronunciation: 'آي', emoji: '👁️', category: 'أعضاء الجسم' },
  { id: 57, arabic: 'أذن', english: 'EAR', pronunciation: 'إير', emoji: '👂', category: 'أعضاء الجسم' },
  { id: 58, arabic: 'أنف', english: 'NOSE', pronunciation: 'نوز', emoji: '👃', category: 'أعضاء الجسم' },
  { id: 59, arabic: 'فم', english: 'MOUTH', pronunciation: 'ماوث', emoji: '👄', category: 'أعضاء الجسم' },
  { id: 60, arabic: 'يد', english: 'HAND', pronunciation: 'هاند', emoji: '✋', category: 'أعضاء الجسم' },
  { id: 61, arabic: 'قدم', english: 'FOOT', pronunciation: 'فوت', emoji: '🦶', category: 'أعضاء الجسم' },
  { id: 62, arabic: 'ذراع', english: 'ARM', pronunciation: 'آرم', emoji: '💪', category: 'أعضاء الجسم' },
  { id: 63, arabic: 'ساق', english: 'LEG', pronunciation: 'ليغ', emoji: '🦵', category: 'أعضاء الجسم' },
  { id: 64, arabic: 'قلب', english: 'HEART', pronunciation: 'هارت', emoji: '❤️', category: 'أعضاء الجسم' },
  { id: 65, arabic: 'وجه', english: 'FACE', pronunciation: 'فيس', emoji: '🧑', category: 'أعضاء الجسم' },

  // الألوان
  { id: 66, arabic: 'أحمر', english: 'RED', pronunciation: 'ريد', emoji: '🔴', category: 'الألوان' },
  { id: 67, arabic: 'أزرق', english: 'BLUE', pronunciation: 'بلو', emoji: '🔵', category: 'الألوان' },
  { id: 68, arabic: 'أخضر', english: 'GREEN', pronunciation: 'غرين', emoji: '🟢', category: 'الألوان' },
  { id: 69, arabic: 'أصفر', english: 'YELLOW', pronunciation: 'ييلو', emoji: '🟡', category: 'الألوان' },
  { id: 70, arabic: 'أسود', english: 'BLACK', pronunciation: 'بلاك', emoji: '⚫', category: 'الألوان' },
  { id: 71, arabic: 'أبيض', english: 'WHITE', pronunciation: 'وايت', emoji: '⚪', category: 'الألوان' },
  { id: 72, arabic: 'وردي', english: 'PINK', pronunciation: 'بينك', emoji: '🩷', category: 'الألوان' },

  // الحيوانات
  { id: 9, arabic: 'قطة', english: 'CAT', pronunciation: 'كات', emoji: '🐈', category: 'الحيوانات' },
  { id: 10, arabic: 'كلب', english: 'DOG', pronunciation: 'دوغ', emoji: '🐕', category: 'الحيوانات' },
  { id: 24, arabic: 'سمك', english: 'FISH', pronunciation: 'فيش', emoji: '🐟', category: 'الحيوانات' },
  { id: 25, arabic: 'طائر', english: 'BIRD', pronunciation: 'بيرد', emoji: '🐦', category: 'الحيوانات' },
  { id: 26, arabic: 'أسد', english: 'LION', pronunciation: 'لايون', emoji: '🦁', category: 'الحيوانات' },
  { id: 27, arabic: 'فيل', english: 'ELEPHANT', pronunciation: 'إليفانت', emoji: '🐘', category: 'الحيوانات' },
  { id: 28, arabic: 'قرد', english: 'MONKEY', pronunciation: 'مانكي', emoji: '🐒', category: 'الحيوانات' },
  { id: 29, arabic: 'دب', english: 'BEAR', pronunciation: 'بير', emoji: '🐻', category: 'الحيوانات' },
  { id: 30, arabic: 'أرنب', english: 'RABBIT', pronunciation: 'رابيت', emoji: '🐰', category: 'الحيوانات' },
  { id: 73, arabic: 'حصان', english: 'HORSE', pronunciation: 'هورس', emoji: '🐴', category: 'الحيوانات' },
  { id: 74, arabic: 'بقرة', english: 'COW', pronunciation: 'كاو', emoji: '🐄', category: 'الحيوانات' },
  { id: 75, arabic: 'خروف', english: 'SHEEP', pronunciation: 'شيب', emoji: '🐑', category: 'الحيوانات' },
  { id: 76, arabic: 'دجاجة', english: 'CHICKEN', pronunciation: 'تشيكن', emoji: '🐔', category: 'الحيوانات' },
  { id: 77, arabic: 'بطة', english: 'DUCK', pronunciation: 'داك', emoji: '🦆', category: 'الحيوانات' },
  { id: 78, arabic: 'ثعبان', english: 'SNAKE', pronunciation: 'سنيك', emoji: '🐍', category: 'الحيوانات' },
  { id: 79, arabic: 'سلحفاة', english: 'TURTLE', pronunciation: 'تيرتل', emoji: '🐢', category: 'الحيوانات' },
  { id: 80, arabic: 'عنكبوت', english: 'SPIDER', pronunciation: 'سبايدر', emoji: '🕷️', category: 'الحيوانات' },
  { id: 81, arabic: 'نحلة', english: 'BEE', pronunciation: 'بي', emoji: '🐝', category: 'الحيوانات' },
  { id: 82, arabic: 'نملة', english: 'ANT', pronunciation: 'آنت', emoji: '🐜', category: 'الحيوانات' },
  { id: 83, arabic: 'فراشة', english: 'BUTTERFLY', pronunciation: 'باترفلاي', emoji: '🦋', category: 'الحيوانات' },
  { id: 84, arabic: 'تمساح', english: 'CROCODILE', pronunciation: 'كروكودايل', emoji: '🐊', category: 'الحيوانات' },
  { id: 85, arabic: 'نمر', english: 'TIGER', pronunciation: 'تايغر', emoji: '🐯', category: 'الحيوانات' },

  // الطعام
  { id: 3, arabic: 'تفاحة', english: 'APPLE', pronunciation: 'أبل', emoji: '🍎', category: 'الطعام' },
  { id: 7, arabic: 'ماء', english: 'WATER', pronunciation: 'ووتر', emoji: '💧', category: 'الطعام' },
  { id: 13, arabic: 'حليب', english: 'MILK', pronunciation: 'ميلك', emoji: '🥛', category: 'الطعام' },
  { id: 14, arabic: 'موز', english: 'BANANA', pronunciation: 'بنانة', emoji: '🍌', category: 'الطعام' },
  { id: 21, arabic: 'خبز', english: 'BREAD', pronunciation: 'بريد', emoji: '🍞', category: 'الطعام' },
  { id: 22, arabic: 'جبن', english: 'CHEESE', pronunciation: 'تشيز', emoji: '🧀', category: 'الطعام' },
  { id: 23, arabic: 'بيض', english: 'EGG', pronunciation: 'إيغ', emoji: '🥚', category: 'الطعام' },
  { id: 45, arabic: 'برتقال', english: 'ORANGE', pronunciation: 'أورانج', emoji: '🍊', category: 'الطعام' },
  { id: 46, arabic: 'عنب', english: 'GRAPES', pronunciation: 'غريبس', emoji: '🍇', category: 'الطعام' },
  { id: 47, arabic: 'بطيخ', english: 'WATERMELON', pronunciation: 'ووترميلون', emoji: '🍉', category: 'الطعام' },
  { id: 48, arabic: 'فراولة', english: 'STRAWBERRY', pronunciation: 'ستروبيري', emoji: '🍓', category: 'الطعام' },
  { id: 49, arabic: 'جزر', english: 'CARROT', pronunciation: 'كاروت', emoji: '🥕', category: 'الطعام' },
  { id: 86, arabic: 'بيتزا', english: 'PIZZA', pronunciation: 'بيتزا', emoji: '🍕', category: 'الطعام' },
  { id: 87, arabic: 'برجر', english: 'BURGER', pronunciation: 'برجر', emoji: '🍔', category: 'الطعام' },
  { id: 88, arabic: 'سلطة', english: 'SALAD', pronunciation: 'سالاد', emoji: '🥗', category: 'الطعام' },
  { id: 89, arabic: 'حساء', english: 'SOUP', pronunciation: 'سوب', emoji: '🥣', category: 'الطعام' },
  { id: 90, arabic: 'أرز', english: 'RICE', pronunciation: 'رايس', emoji: '🍚', category: 'الطعام' },
  { id: 91, arabic: 'لحم', english: 'MEAT', pronunciation: 'ميت', emoji: '🥩', category: 'الطعام' },
  { id: 92, arabic: 'كعكة', english: 'CAKE', pronunciation: 'كيك', emoji: '🍰', category: 'الطعام' },
  { id: 93, arabic: 'شوكولاتة', english: 'CHOCOLATE', pronunciation: 'تشوكليت', emoji: '🍫', category: 'الطعام' },
  { id: 94, arabic: 'آيس كريم', english: 'ICE CREAM', pronunciation: 'آيس كريم', emoji: '🍦', category: 'الطعام' },
  { id: 95, arabic: 'قهوة', english: 'COFFEE', pronunciation: 'كوفي', emoji: '☕', category: 'الطعام' },
  { id: 96, arabic: 'شاي', english: 'TEA', pronunciation: 'تي', emoji: '🍵', category: 'الطعام' },
  { id: 97, arabic: 'عصير', english: 'JUICE', pronunciation: 'جوس', emoji: '🧃', category: 'الطعام' },
  { id: 98, arabic: 'ليمون', english: 'LEMON', pronunciation: 'ليمون', emoji: '🍋', category: 'الطعام' },
  { id: 99, arabic: 'بصل', english: 'ONION', pronunciation: 'أونيون', emoji: '🧅', category: 'الطعام' },
  { id: 100, arabic: 'طماطم', english: 'TOMATO', pronunciation: 'توماتو', emoji: '🍅', category: 'الطعام' },

  // الملابس
  { id: 37, arabic: 'قبعة', english: 'HAT', pronunciation: 'هات', emoji: '🧢', category: 'الملابس' },
  { id: 38, arabic: 'حذاء', english: 'SHOES', pronunciation: 'شوز', emoji: '👞', category: 'الملابس' },
  { id: 39, arabic: 'قميص', english: 'SHIRT', pronunciation: 'شيرت', emoji: '👕', category: 'الملابس' },
  { id: 101, arabic: 'سروال', english: 'PANTS', pronunciation: 'بانتس', emoji: '👖', category: 'الملابس' },
  { id: 102, arabic: 'فستان', english: 'DRESS', pronunciation: 'دريس', emoji: '👗', category: 'الملابس' },
  { id: 103, arabic: 'سترة', english: 'JACKET', pronunciation: 'جاكيت', emoji: '🧥', category: 'الملابس' },
  { id: 104, arabic: 'جوارب', english: 'SOCKS', pronunciation: 'سوكس', emoji: '🧦', category: 'الملابس' },
  { id: 105, arabic: 'نظارات', english: 'GLASSES', pronunciation: 'غلاسيس', emoji: '👓', category: 'الملابس' },
  { id: 106, arabic: 'خاتم', english: 'RING', pronunciation: 'رينغ', emoji: '💍', category: 'الملابس' },
  { id: 107, arabic: 'ساعة يد', english: 'WATCH', pronunciation: 'ووتش', emoji: '⌚', category: 'الملابس' },
  { id: 108, arabic: 'مظلة', english: 'UMBRELLA', pronunciation: 'أمبريلا', emoji: '☂️', category: 'الملابس' },
  { id: 109, arabic: 'حقيبة سفر', english: 'SUITCASE', pronunciation: 'سوتكيس', emoji: '🧳', category: 'الملابس' },
  { id: 110, arabic: 'محفظة', english: 'WALLET', pronunciation: 'واليت', emoji: '👛', category: 'الملابس' },

  // وسائل النقل والأماكن
  { id: 4, arabic: 'سيارة', english: 'CAR', pronunciation: 'كار', emoji: '🚗', category: 'وسائل النقل والأماكن' },
  { id: 5, arabic: 'مدرسة', english: 'SCHOOL', pronunciation: 'سكول', emoji: '🏫', category: 'وسائل النقل والأماكن' },
  { id: 8, arabic: 'منزل', english: 'HOUSE', pronunciation: 'هاوس', emoji: '🏠', category: 'وسائل النقل والأماكن' },
  { id: 15, arabic: 'طائرة', english: 'PLANE', pronunciation: 'بلين', emoji: '✈️', category: 'وسائل النقل والأماكن' },
  { id: 17, arabic: 'حافلة', english: 'BUS', pronunciation: 'باص', emoji: '🚌', category: 'وسائل النقل والأماكن' },
  { id: 50, arabic: 'دراجة', english: 'BICYCLE', pronunciation: 'بايسكل', emoji: '🚲', category: 'وسائل النقل والأماكن' },
  { id: 111, arabic: 'قطار', english: 'TRAIN', pronunciation: 'ترين', emoji: '🚆', category: 'وسائل النقل والأماكن' },
  { id: 112, arabic: 'سفينة', english: 'SHIP', pronunciation: 'شيب', emoji: '🚢', category: 'وسائل النقل والأماكن' },
  { id: 113, arabic: 'قارب', english: 'BOAT', pronunciation: 'بوت', emoji: '⛵', category: 'وسائل النقل والأماكن' },
  { id: 114, arabic: 'مروحية', english: 'HELICOPTER', pronunciation: 'هيليكوبتر', emoji: '🚁', category: 'وسائل النقل والأماكن' },
  { id: 115, arabic: 'صاروخ', english: 'ROCKET', pronunciation: 'روكيت', emoji: '🚀', category: 'وسائل النقل والأماكن' },
  { id: 116, arabic: 'دراجة نارية', english: 'MOTORCYCLE', pronunciation: 'موتورسايكل', emoji: '🏍️', category: 'وسائل النقل والأماكن' },
  { id: 117, arabic: 'مستشفى', english: 'HOSPITAL', pronunciation: 'هوسبيتال', emoji: '🏥', category: 'وسائل النقل والأماكن' },
  { id: 118, arabic: 'بنك', english: 'BANK', pronunciation: 'بانك', emoji: '🏦', category: 'وسائل النقل والأماكن' },
  { id: 119, arabic: 'حديقة', english: 'PARK', pronunciation: 'بارك', emoji: '🏞️', category: 'وسائل النقل والأماكن' },
  { id: 120, arabic: 'مطعم', english: 'RESTAURANT', pronunciation: 'ريستورانت', emoji: '🍽️', category: 'وسائل النقل والأماكن' },
  { id: 121, arabic: 'متجر', english: 'STORE', pronunciation: 'ستور', emoji: '🏪', category: 'وسائل النقل والأماكن' },
  { id: 122, arabic: 'مسجد', english: 'MOSQUE', pronunciation: 'موسك', emoji: '🕌', category: 'وسائل النقل والأماكن' },
  { id: 123, arabic: 'مدينة', english: 'CITY', pronunciation: 'سيتي', emoji: '🏙️', category: 'وسائل النقل والأماكن' },
  { id: 124, arabic: 'قلعة', english: 'CASTLE', pronunciation: 'كاسل', emoji: '🏰', category: 'وسائل النقل والأماكن' },
  { id: 125, arabic: 'خيمة', english: 'TENT', pronunciation: 'تينت', emoji: '⛺', category: 'وسائل النقل والأماكن' },

  // الطبيعة
  { id: 6, arabic: 'شمس', english: 'SUN', pronunciation: 'سان', emoji: '☀️', category: 'الطبيعة' },
  { id: 11, arabic: 'شجرة', english: 'TREE', pronunciation: 'تري', emoji: '🌳', category: 'الطبيعة' },
  { id: 12, arabic: 'زهرة', english: 'FLOWER', pronunciation: 'فلاور', emoji: '🌻', category: 'الطبيعة' },
  { id: 16, arabic: 'قمر', english: 'MOON', pronunciation: 'مون', emoji: '🌙', category: 'الطبيعة' },
  { id: 41, arabic: 'مطر', english: 'RAIN', pronunciation: 'رين', emoji: '🌧️', category: 'الطبيعة' },
  { id: 42, arabic: 'نجمة', english: 'STAR', pronunciation: 'ستار', emoji: '⭐', category: 'الطبيعة' },
  { id: 43, arabic: 'سحابة', english: 'CLOUD', pronunciation: 'كلاود', emoji: '☁️', category: 'الطبيعة' },
  { id: 44, arabic: 'نار', english: 'FIRE', pronunciation: 'فاير', emoji: '🔥', category: 'الطبيعة' },
  { id: 136, arabic: 'أرض', english: 'EARTH', pronunciation: 'إيرث', emoji: '🌍', category: 'الطبيعة' },
  { id: 137, arabic: 'جبل', english: 'MOUNTAIN', pronunciation: 'ماونتن', emoji: '⛰️', category: 'الطبيعة' },
  { id: 138, arabic: 'نهر', english: 'RIVER', pronunciation: 'ريفر', emoji: '🏞️', category: 'الطبيعة' },
  { id: 139, arabic: 'محيط', english: 'OCEAN', pronunciation: 'أوشن', emoji: '🌊', category: 'الطبيعة' },
  { id: 140, arabic: 'ورقة شجر', english: 'LEAF', pronunciation: 'ليف', emoji: '🍃', category: 'الطبيعة' },
  { id: 141, arabic: 'ثلج', english: 'SNOW', pronunciation: 'سنو', emoji: '❄️', category: 'الطبيعة' },
  { id: 142, arabic: 'برق', english: 'LIGHTNING', pronunciation: 'لايتنينغ', emoji: '⚡', category: 'الطبيعة' },
  { id: 143, arabic: 'رياح', english: 'WIND', pronunciation: 'ويند', emoji: '🌬️', category: 'الطبيعة' },
  { id: 144, arabic: 'قوس قزح', english: 'RAINBOW', pronunciation: 'رينبو', emoji: '🌈', category: 'الطبيعة' },

  // أدوات ومتفرقات
  { id: 1, arabic: 'كتاب', english: 'BOOK', pronunciation: 'بوك', emoji: '📖', category: 'أدوات ومتفرقات' },
  { id: 2, arabic: 'قلم', english: 'PEN', pronunciation: 'بين', emoji: '🖊️', category: 'أدوات ومتفرقات' },
  { id: 18, arabic: 'طاولة', english: 'TABLE', pronunciation: 'تيبل', emoji: '🍽️', category: 'أدوات ومتفرقات' },
  { id: 19, arabic: 'كرسي', english: 'CHAIR', pronunciation: 'تشير', emoji: '🪑', category: 'أدوات ومتفرقات' },
  { id: 20, arabic: 'ساعة', english: 'CLOCK', pronunciation: 'كلوك', emoji: '🕒', category: 'أدوات ومتفرقات' },
  { id: 31, arabic: 'هاتف', english: 'PHONE', pronunciation: 'فون', emoji: '📱', category: 'أدوات ومتفرقات' },
  { id: 32, arabic: 'مفتاح', english: 'KEY', pronunciation: 'كي', emoji: '🔑', category: 'أدوات ومتفرقات' },
  { id: 33, arabic: 'حقيبة', english: 'BAG', pronunciation: 'باغ', emoji: '🎒', category: 'أدوات ومتفرقات' },
  { id: 34, arabic: 'باب', english: 'DOOR', pronunciation: 'دور', emoji: '🚪', category: 'أدوات ومتفرقات' },
  { id: 35, arabic: 'نافذة', english: 'WINDOW', pronunciation: 'ويندو', emoji: '🪟', category: 'أدوات ومتفرقات' },
  { id: 36, arabic: 'سرير', english: 'BED', pronunciation: 'بيد', emoji: '🛏️', category: 'أدوات ومتفرقات' },
  { id: 40, arabic: 'كرة', english: 'BALL', pronunciation: 'بول', emoji: '⚽', category: 'أدوات ومتفرقات' },
  { id: 126, arabic: 'حاسوب', english: 'COMPUTER', pronunciation: 'كمبيوتر', emoji: '💻', category: 'أدوات ومتفرقات' },
  { id: 127, arabic: 'كاميرا', english: 'CAMERA', pronunciation: 'كاميرا', emoji: '📷', category: 'أدوات ومتفرقات' },
  { id: 128, arabic: 'تلفاز', english: 'TELEVISION', pronunciation: 'تيليفيجن', emoji: '📺', category: 'أدوات ومتفرقات' },
  { id: 129, arabic: 'مذياع', english: 'RADIO', pronunciation: 'راديو', emoji: '📻', category: 'أدوات ومتفرقات' },
  { id: 130, arabic: 'قلم رصاص', english: 'PENCIL', pronunciation: 'بينسل', emoji: '✏️', category: 'أدوات ومتفرقات' },
  { id: 131, arabic: 'مقص', english: 'SCISSORS', pronunciation: 'سيزورز', emoji: '✂️', category: 'أدوات ومتفرقات' },
  { id: 132, arabic: 'دفتر', english: 'NOTEBOOK', pronunciation: 'نوتبوك', emoji: '📓', category: 'أدوات ومتفرقات' },
  { id: 133, arabic: 'رسالة', english: 'LETTER', pronunciation: 'ليتر', emoji: '✉️', category: 'أدوات ومتفرقات' },
  { id: 134, arabic: 'هدية', english: 'GIFT', pronunciation: 'غيفت', emoji: '🎁', category: 'أدوات ومتفرقات' },
  { id: 135, arabic: 'مرآة', english: 'MIRROR', pronunciation: 'ميرور', emoji: '🪞', category: 'أدوات ومتفرقات' },
  { id: 145, arabic: 'خريطة', english: 'MAP', pronunciation: 'ماب', emoji: '🗺️', category: 'أدوات ومتفرقات' },
  { id: 146, arabic: 'سعيد', english: 'HAPPY', pronunciation: 'هابي', emoji: '😄', category: 'أدوات ومتفرقات' },
  { id: 147, arabic: 'حزين', english: 'SAD', pronunciation: 'ساد', emoji: '😢', category: 'أدوات ومتفرقات' },
  { id: 148, arabic: 'غاضب', english: 'ANGRY', pronunciation: 'أنغري', emoji: '😠', category: 'أدوات ومتفرقات' },
  { id: 149, arabic: 'بطل', english: 'HERO', pronunciation: 'هيرو', emoji: '🦸', category: 'أدوات ومتفرقات' },
  { id: 150, arabic: 'تاج', english: 'CROWN', pronunciation: 'كراون', emoji: '👑', category: 'أدوات ومتفرقات' },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredWords = activeCategory === 'الكل' 
    ? WORDS_DATA 
    : WORDS_DATA.filter(word => word.category === activeCategory);

  const handleNext = () => {
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredWords.length - 1);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  const currentItem = filteredWords[currentIndex];

  if (!currentItem) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.categoriesWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.categoryButton, activeCategory === cat && styles.activeCategoryButton]}
              onPress={() => handleCategoryChange(cat)}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.activeCategoryText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.card}>
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
          {currentIndex + 1} / {filteredWords.length}
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
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  categoriesWrapper: {
    height: 60,
    marginBottom: 20,
  },
  categoriesContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  categoryButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    height: 40,
    justifyContent: 'center',
  },
  activeCategoryButton: {
    backgroundColor: '#007BFF',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555555',
  },
  activeCategoryText: {
    color: '#FFFFFF',
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
    fontSize: 120,
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
          
