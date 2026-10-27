// data.js - الملف الكامل والشامل لتطبيق بنيان

export const categories = [
  'الكل', 'العائلة', 'أعضاء الجسم', 'الألوان', 'الحيوانات', 'الطعام', 
  'المهن', 'المنزل', 'الملابس', 'الطبيعة', 'النقل', 'المدرسة', 
  'الرياضة', 'الطقس', 'الصفات', 'الأفعال', 'التحيات', 'جمل مفيدة'
];

export const vocabularyData = [
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
  { id: 201, arabic: 'ابن العم / الخال', english: 'COUSIN', pron: 'كازن', emoji: '🧑‍🤝‍🧑', category: 'العائلة' },
  { id: 202, arabic: 'طفل', english: 'BABY', pron: 'بيبي', emoji: '👶', category: 'العائلة' },
  { id: 203, arabic: 'والدان', english: 'PARENTS', pron: 'بيرنتس', emoji: '👩‍👦', category: 'العائلة' },
  { id: 204, arabic: 'زوج', english: 'HUSBAND', pron: 'هازباند', emoji: '🤵', category: 'العائلة' },
  { id: 205, arabic: 'زوجة', english: 'WIFE', pron: 'وايف', emoji: '👰', category: 'العائلة' },

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
  { id: 206, arabic: 'ذراع', english: 'ARM', pron: 'آرم', emoji: '🦾', category: 'أعضاء الجسم' },
  { id: 207, arabic: 'ساق', english: 'LEG', pron: 'ليج', emoji: '🦵', category: 'أعضاء الجسم' },
  { id: 208, arabic: 'إصبع', english: 'FINGER', pron: 'فينجر', emoji: '☝️', category: 'أعضاء الجسم' },
  { id: 209, arabic: 'قلب', english: 'HEART', pron: 'هارت', emoji: '❤️', category: 'أعضاء الجسم' },
  { id: 210, arabic: 'بطن', english: 'STOMACH', pron: 'ستومك', emoji: '🤰', category: 'أعضاء الجسم' },

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
  { id: 211, arabic: 'بنفسجي', english: 'PURPLE', pron: 'بيربل', emoji: '🟣', category: 'الألوان' },
  { id: 212, arabic: 'ذهبي', english: 'GOLD', pron: 'جولد', emoji: '🪙', category: 'الألوان' },
  { id: 213, arabic: 'فضّي', english: 'SILVER', pron: 'سيلفر', emoji: '🥈', category: 'الألوان' },

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
  { id: 214, arabic: 'دب', english: 'BEAR', pron: 'بير', emoji: '🐻', category: 'الحيوانات' },
  { id: 215, arabic: 'ثعبان', english: 'SNAKE', pron: 'سنيك', emoji: '🐍', category: 'الحيوانات' },
  { id: 216, arabic: 'زرافة', english: 'GIRAFFE', pron: 'جراف', emoji: '🦒', category: 'الحيوانات' },
  { id: 217, arabic: 'ثعلب', english: 'FOX', pron: 'فوكس', emoji: '🦊', category: 'الحيوانات' },

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
  { id: 218, arabic: 'شاي', english: 'TEA', pron: 'تي', emoji: '🍵', category: 'الطعام' },
  { id: 219, arabic: 'قهوة', english: 'COFFEE', pron: 'كوفي', emoji: '☕', category: 'الطعام' },
  { id: 220, arabic: 'حساء', english: 'SOUP', pron: 'سوب', emoji: '🥣', category: 'الطعام' },
  { id: 221, arabic: 'سلطة', english: 'SALAD', pron: 'سالاد', emoji: '🥗', category: 'الطعام' },
  { id: 222, arabic: 'مثلجات', english: 'ICE CREAM', pron: 'آيس كريم', emoji: '🍦', category: 'الطعام' },

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
  { id: 223, arabic: 'سائق', english: 'DRIVER', pron: 'درايفر', emoji: '🚘', category: 'المهن' },
  { id: 224, arabic: 'مبرمج', english: 'PROGRAMMER', pron: 'بروجرامر', emoji: '💻', category: 'المهن' },
  { id: 225, arabic: 'مكاتبي', english: 'CLERK', pron: 'كليرك', emoji: '📑', category: 'المهن' },

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
  { id: 226, arabic: 'مفتاح', english: 'KEY', pron: 'كي', emoji: '🔑', category: 'المنزل' },
  { id: 227, arabic: 'سقف', english: 'ROOF', pron: 'روف', emoji: '🏠', category: 'المنزل' },
  { id: 228, arabic: 'ثلاجة', english: 'FRIDGE', pron: 'فريج', emoji: '🧊', category: 'المنزل' },

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
  { id: 229, arabic: 'حقيبة يد', english: 'PURSE', pron: 'بيرس', emoji: '👛', category: 'الملابس' },
  { id: 230, arabic: 'قفازات', english: 'GLOVES', pron: 'جلوفز', emoji: '🧤', category: 'الملابس' },

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
  { id: 231, arabic: 'جزيرة', english: 'ISLAND', pron: 'آيلاند', emoji: '🏝️', category: 'الطبيعة' },
  { id: 232, arabic: 'محيط', english: 'OCEAN', pron: 'أوشن', emoji: '🌊', category: 'الطبيعة' },

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
  { id: 233, arabic: 'سيارة أجرة', english: 'TAXI', pron: 'تاكسي', emoji: '🚕', category: 'النقل' },
  { id: 234, arabic: 'مترو الأنفاق', english: 'METRO', pron: 'مترو', emoji: '🚇', category: 'النقل' },

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
  { id: 235, arabic: 'مقص', english: 'SCISSORS', pron: 'سيزارز', emoji: '✂️', category: 'المدرسة' },
  { id: 236, arabic: 'مكتبة', english: 'LIBRARY', pron: 'لايبراري', emoji: '🏛️', category: 'المدرسة' },

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
  { id: 237, arabic: 'ملاكمة', english: 'BOXING', pron: 'بوكسينج', emoji: '🥊', category: 'الرياضة' },
  { id: 238, arabic: 'مدرب', english: 'COACH', pron: 'كوتش', emoji: '🧢', category: 'الرياضة' },

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
  { id: 239, arabic: 'صيف', english: 'SUMMER', pron: 'سامر', emoji: '🏖️', category: 'الطقس' },
  { id: 240, arabic: 'خريف', english: 'AUTUMN', pron: 'أوتم', emoji: '🍂', category: 'الطقس' },

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
  { id: 241, arabic: 'غني', english: 'RICH', pron: 'ريتش', emoji: '💎', category: 'الصفات' },
  { id: 242, arabic: 'فقير', english: 'POOR', pron: 'بور', emoji: '🏚️', category: 'الصفات' },
  { id: 243, arabic: 'جديد', english: 'NEW', pron: 'نيو', emoji: '🆕', category: 'الصفات' },
  { id: 244, arabic: 'قديم', english: 'OLD', pron: 'أولد', emoji: '🕰️', category: 'الصفات' },
  { id: 245, arabic: 'سهل', english: 'EASY', pron: 'إيزي', emoji: '✅', category: 'الصفات' },
  { id: 246, arabic: 'صعب', english: 'HARD', pron: 'هارد', emoji: '🧩', category: 'الصفات' },

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
  { id: 247, arabic: 'يشترون', english: 'BUY', pron: 'باي', emoji: '🛒', category: 'الأفعال' },
  { id: 248, arabic: 'يبيع', english: 'SELL', pron: 'سيل', emoji: '🏷️', category: 'الأفعال' },
  { id: 249, arabic: 'يعطي', english: 'GIVE', pron: 'جيف', emoji: '🎁', category: 'الأفعال' },
  { id: 250, arabic: 'ياخذ', english: 'TAKE', pron: 'تيك', emoji: '🤲', category: 'الأفعال' },
  { id: 251, arabic: 'يفكر', english: 'THINK', pron: 'ثينك', emoji: '🤔', category: 'الأفعال' },
  { id: 252, arabic: 'يساعد', english: 'HELP', pron: 'هيلب', emoji: '🤝', category: 'الأفعال' },

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
  { id: 191, arabic: 'أهلاً بك', english: 'WELCOME', pron: 'ويلكم', emoji: '🤗', category: 'التحيات' },
  { id: 192, arabic: 'مع السلامة', english: 'SEE YOU LATER', pron: 'سي يو ليتر', emoji: '🙋', category: 'التحيات' },

  // --- جمل مفيدة ---
  { id: 193, arabic: 'كيف حالك؟', english: 'How are you?', pron: 'هاو آر يو؟', emoji: '❓', category: 'جمل مفيدة' },
  { id: 194, arabic: 'ما اسمك؟', english: 'What is your name?', pron: 'وات إز يور نيم؟', emoji: '🤔', category: 'جمل مفيدة' },
  { id: 195, arabic: 'كم عمرك؟', english: 'How old are you?', pron: 'هاو أولد آر يو؟', emoji: '🎂', category: 'جمل مفيدة' },
  { id: 196, arabic: 'من أين أنت؟', english: 'Where are you from?', pron: 'وير آر يو فروم؟', emoji: '🌍', category: 'جمل مفيدة' },
  { id: 197, arabic: 'أين تعيش؟', english: 'Where do you live?', pron: 'وير دو يو ليف؟', emoji: '🏠', category: 'جمل مفيدة' },
  { id: 198, arabic: 'هل تتحدث الإنجليزية؟', english: 'Do you speak English?', pron: 'دو يو سبيك إنجليش؟', emoji: '🗣️', category: 'جمل مفيدة' },
  { id: 199, arabic: 'لا أفهم', english: 'I do not understand', pron: 'آي دو نوت أندرستاند', emoji: '🤷', category: 'جمل مفيدة' },
  { id: 200, arabic: 'كم السعر؟', english: 'How much is this?', pron: 'هاو ماتش إز ذيس؟', emoji: '💰', category: 'جمل مفيدة' },
  { id: 291, arabic: 'أنا جائع', english: 'I am hungry', pron: 'آي أم هنجري', emoji: '🍔', category: 'جمل مفيدة' },
  { id: 292, arabic: 'أنا عطشان', english: 'I am thirsty', pron: 'آي أم ثيرستي', emoji: '🥤', category: 'جمل مفيدة' },
  { id: 293, arabic: 'ماذا تفعل؟', english: 'What are you doing?', pron: 'وات آر يو دوينج؟', emoji: '❓', category: 'جمل مفيدة' },
  { id: 294, arabic: 'أتمنى لك يوماً سعيداً', english: 'Have a nice day', pron: 'هاف أ نايس داي', emoji: '☀️', category: 'جمل مفيدة' },
  { id: 295, arabic: 'لا مشكلة', english: 'No problem', pron: 'نو بروبلم', emoji: '👌', category: 'جمل مفيدة' },
  { id: 296, arabic: 'أين الحمام؟', english: 'Where is the bathroom?', pron: 'وير إز ذا باثروم؟', emoji: '🚻', category: 'جمل مفيدة' },
  { id: 297, arabic: 'أحتاج إلى مساعدة', english: 'I need help', pron: 'آي نيد هيلب', emoji: '🆘', category: 'جمل مفيدة' },
  { id: 298, arabic: 'أنا بخير، شكراً', english: 'I am fine, thank you', pron: 'آي أم فاين، ثانك يو', emoji: '😊', category: 'جمل مفيدة' },
  { id: 299, arabic: 'الوقت متأخر', english: 'It is late', pron: 'إت إز ليت', emoji: '⏰', category: 'جمل مفيدة' },
  { id: 300, arabic: 'أراك غداً', english: 'See you tomorrow', pron: 'سي يو تومورو', emoji: '👋', category: 'جمل مفيدة' }
];

// بيانات قسم "نص" (محادثات وقصص قصيرة)
export const storiesData = [
  {
    id: 1,
    title: 'في المطعم (At the Restaurant)',
    arabicText: 'مرحباً، أود طاولة لشخصين من فضلك.',
    englishText: 'Hello, I would like a table for two, please.',
    pron: 'هلو، آي وود لايك أ تيبل فور تو، بليز.'
  },
  {
    id: 2,
    title: 'التعارف اليومي (Daily Introduction)',
    arabicText: 'سعيد بلقائك، أنا أتعلم اللغة الإنجليزية كل يوم.',
    englishText: 'Nice to meet you, I am learning English every day.',
    pron: 'نايس تو ميت يو، آي أم ليرنينج إنجليش إفري داي.'
  },
  {
    id: 3,
    title: 'السؤال عن الاتجاهات (Asking for Directions)',
    arabicText: 'عذراً، أين أقرب محطة قطار؟',
    englishText: 'Excuse me, where is the nearest train station?',
    pron: 'إكسكيوز مي، وير إز ذا نيريست ترين ستيشن؟'
  },
  {
    id: 4,
    title: 'في الفندق (At the Hotel)',
    arabicText: 'مرحباً، لدي حجز لغرفة لشخص واحد.',
    englishText: 'Hello, I have a reservation for a single room.',
    pron: 'هلو، آي هاف أ ريزرفيشن فور أ سينجل روم.'
  },
  {
    id: 5,
    title: 'التسوق (Shopping)',
    arabicText: 'كم سعر هذا قميص من فضلك؟',
    englishText: 'How much is this shirt, please?',
    pron: 'هاو ماتش إز ذيس شيرت، بليز؟'
  }
];

// بيانات قسم "أساسيات اللغة الإنجليزية" (قواعد مبسطة)
export const grammarData = [
  {
    id: 1,
    title: 'الضمائر الشخصية (Subject Pronouns)',
    description: 'تُستخدَم للدلالة على فاعل الجملة وهي الأساس في تكوين أي جملة إنجليزية:',
    examples: 'I (أنا) - He (هو) - She (هي) - We (نحن) - They (هم)'
  },
  {
    id: 2,
    title: 'فعل الكينونة (Verb To Be)',
    description: 'يُستخدم للوصف أو التعريف ويتغير حسب الفاعل (Am, Is, Are):',
    examples: 'I am happy (أنا سعيد) - She is smart (هي ذكية) - They are friends (هم أصدقاء)'
  },
  {
    id: 3,
    title: 'أدوات النكرة والمعرفة (Articles)',
    description: 'نستخدم (A / An) قبل الاسم المفرد النكرة، و(The) للشيء المحدود المعروف:',
    examples: 'A cat (قطة) - An apple (تفاحة) - The sun (الشمس)'
  },
  {
    id: 4,
    title: 'المضارع البسيط (Present Simple)',
    description: 'يُستخدم للتعبير عن العادات، الحقائق والأحداث اليومية المكررة:',
    examples: 'I play football (أنا ألعب كرة القدم) - He drinks water (هو يشرب الماء)'
  }
];

// بيانات قسم "أسرار النطق" (Pronunciation Secrets) الموسعة
export const pronunciationRules = [
  {
    id: 1,
    title: 'قاعدة نطق حرف C',
    subtitle: 'متى ننطقه (س) ومتى ننطقه (ك)؟',
    rule: 'إذا جاء بعد حرف C أحد الحرفين (e, i, y) فإنه يُنطق (س)، وما عدا ذلك يُنطق (ك).',
    example: 'City (مدينة - نُطقت س) / Cat (قطة - نُطقت ك)'
  },
  {
    id: 2,
    title: 'قاعدة نطق حرف G',
    subtitle: 'متى ننطقه (ج) معطشة ومتى ننطقه (گ) عادية؟',
    rule: 'غالباً إذا جاء بعد حرف G حروف (e, i, y) يُنطق (ج معطشة)، وما عدا ذلك يُنطق جيماً عادية.',
    example: 'Gym (صالة رياضية - نُطقت ج) / Game (لعبة - نُطقت جيماً عادية)'
  },
  {
    id: 3,
    title: 'الحروف الصامتة: حرف K',
    subtitle: 'حروف نكتبها ولا ننطقها',
    rule: 'إذا جاء حرف K في بداية الكلمة وجاء بعده حرف N مباشرة، فإننا لا ننطق حرف K أبداً.',
    example: 'Know (يعرف - تُنطق نو فقط بدون الكاف)'
  },
  {
    id: 4,
    title: 'قاعدة نطق الحرفين (TH)',
    subtitle: 'الصوتي (ذ) وغير الصوتي (ث)',
    rule: 'له نطقان أساسيان: صوتي يشبه الذال (مثل This)، وغير صوتي يشبه الثاء (مثل Think).',
    example: 'Think (يفكر - ث) / This (هذا - ذ)'
  },
  {
    id: 5,
    title: 'قاعدة نطق نهاية الأفعال (ED)',
    subtitle: 'كيف تنطق الـ ED في أفعال الماضي؟',
    rule: 'تُنطق (ت) إذا انتهى الفعل بحرف مهموس، أو (د) إذا انتهى بحرف مجهور، أو (إد) إذا انتهى بـ t أو d.',
    example: 'Worked (ووركت - ت) / Played (بلايد - د) / Needed (نيديد - إد)'
  },
  {
    id: 6,
    title: 'قاعدة الحروف المركبة (TION)',
    subtitle: 'كيف تُنطق نهاية الكلمات الطويلة؟',
    rule: 'إذا اجتمعت الحروف (tion) في نهاية الكلمة، فإنها تُنطق دائماً بصوت (شن).',
    example: 'Action (أكشن) / Education (إديوكيشن)'
  },
  {
    id: 7,
    title: 'قاعدة الحروف المركبة (PH)',
    subtitle: 'دمج الحرفين P و H',
    rule: 'عندما يجتمع الحرفان P و H في الكلمة، فإنهما يُنطبان تماماً مثل حرف (F).',
    example: 'Phone (فون - هاتف) / Photo (فوتو - صورة)'
  },
  {
    id: 8,
    title: 'الحروف الصامتة: حرف W',
    subtitle: 'متى لا يُنطق حرف W؟',
    rule: 'لا يُنطق حرف W إذا جاء متبوعاً مباشرة بحرف R في بداية الكلمة.',
    example: 'Write (رايت - يكتب، لا ننطق الواو) / Wrong (رونج - خطأ)'
  }
];
