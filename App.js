const FLASHCARDS = [
  {
    id: 1,
    base: {
      pronunciation: 'مان',
      english: 'Man',
      arabic: 'رجل',
      badgeColor: '#00897B' // أخضر
    },
    phrasal: {
      pronunciation: 'مان أَب',
      english: 'Man up',
      arabic: 'استرجل / تشجع',
      badgeColor: '#E53935' // أحمر
    }
  },
  {
    id: 2,
    base: {
      pronunciation: 'باك',
      english: 'Back',
      arabic: 'ظهر / خلف',
      badgeColor: '#00897B'
    },
    phrasal: {
      pronunciation: 'باك أَب',
      english: 'Back up',
      arabic: 'يدعم / يدعم بالنسخ الاحتياطي',
      badgeColor: '#E53935'
    }
  },
  {
    id: 3,
    base: {
      pronunciation: 'شات',
      english: 'Shut',
      arabic: 'يغلق',
      badgeColor: '#00897B'
    },
    phrasal: {
      pronunciation: 'شات أَب',
      english: 'Shut up',
      arabic: 'اخرس / اصمت',
      badgeColor: '#E53935'
    }
  }
];
{/* ===== مودال البطاقات التعليمية بنفس تصميم الصورة ===== */}
<Modal visible={showFlashcards} animationType="slide">
  <View style={styles.modalContainer}>
    {/* هيدر المودال */}
    <View style={styles.topModalHeader}>
      <TouchableOpacity onPress={() => setShowFlashcards(false)}>
        <Ionicons name="close" size={28} color="#FFF" />
      </TouchableOpacity>
      <Text style={styles.modalHeaderTitle}>تعلم المفردات والتعابير</Text>
      <Text style={styles.cardCounterText}>
        {currentCardIndex + 1} / {FLASHCARDS.length}
      </Text>
    </View>

    {/* جسم البطاقة */}
    <ScrollView contentContainerStyle={styles.cardVisualContainer}>
      {/* القسم الأول: الكلمة الأساسية */}
      <View style={styles.phraseCard}>
        {/* النص المنطوق باللغة العربية */}
        <Text style={styles.arabicPronunciationText}>
          {FLASHCARDS[currentCardIndex].base.pronunciation}
        </Text>

        {/* الشريط الملون للكلمة الإنجليزية */}
        <View style={[styles.englishBadge, { backgroundColor: FLASHCARDS[currentCardIndex].base.badgeColor }]}>
          <Text style={styles.englishBadgeText}>
            {FLASHCARDS[currentCardIndex].base.english}
          </Text>
        </View>

        {/* الترجمة العربية */}
        <Text style={styles.arabicTranslationText}>
          {FLASHCARDS[currentCardIndex].base.arabic}
        </Text>
      </View>

      <View style={styles.dividerLine} />

      {/* القسم الثاني: التعبير المركب */}
      <View style={styles.phraseCard}>
        {/* النص المنطوق باللغة العربية */}
        <Text style={styles.arabicPronunciationText}>
          {FLASHCARDS[currentCardIndex].phrasal.pronunciation}
        </Text>

        {/* الشريط الملون للتعبير الإنجليزي */}
        <View style={[styles.englishBadge, { backgroundColor: FLASHCARDS[currentCardIndex].phrasal.badgeColor }]}>
          <Text style={styles.englishBadgeText}>
            {FLASHCARDS[currentCardIndex].phrasal.english}
          </Text>
        </View>

        {/* الترجمة العربية */}
        <Text style={styles.arabicTranslationText}>
          {FLASHCARDS[currentCardIndex].phrasal.arabic}
        </Text>
      </View>
    </ScrollView>

    {/* أزرار التنقل */}
    <View style={styles.flashcardControls}>
      <TouchableOpacity style={[styles.flashBtn, { backgroundColor: '#EF444420' }]} onPress={handleNextCard}>
        <Text style={{ color: '#EF4444', fontWeight: 'bold' }}>تخطي ❌</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.flashBtn, { backgroundColor: '#10B98120' }]} onPress={handleNextCard}>
        <Text style={{ color: '#10B981', fontWeight: 'bold' }}>التالي ➔</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
  // تنسيقات البطاقة المماثلة للصورة
  cardVisualContainer: {
    padding: 20,
    alignItems: 'center',
    justify: 'center',
    flexGrow: 1,
  },
  phraseCard: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  arabicPronunciationText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  englishBadge: {
    width: '85%',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  englishBadgeText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  arabicTranslationText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 6,
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#334155',
    width: '80%',
    marginVertical: 15,
  },
      
