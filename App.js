      {/* 🌟 مودال المكالمة الصوتية الأسطوري (Iconic AI Call) */}
      <Modal visible={isCallActive} animationType="fade">
        <View style={styles.iconicCallContainer}>
          {/* شريط العلوي للمكالمة */}
          <View style={styles.iconicCallHeader}>
            <View style={styles.liveIndicatorBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>AI LIVE HD</Text>
            </View>
            <Text style={styles.iconicTimerText}>{formatTime(callDuration)}</Text>
            <TouchableOpacity style={styles.headerIconBtn}>
              <Ionicons name="volume-high" size={22} color="#E2E8F0" />
            </TouchableOpacity>
          </View>

          {/* مركز الشاشة: الأفاتار والموجات التفاعلية */}
          <View style={styles.iconicCenterContent}>
            <Animated.View style={[styles.outerGlowRing, { transform: [{ scale: pulseAnim }] }]}>
              <View style={styles.innerGlowRing}>
                <View style={styles.aiCoreAvatar}>
                  <Ionicons name="hardware-chip" size={56} color="#38BDF8" />
                </View>
              </View>
            </Animated.View>

            <Text style={styles.iconicAiName}>Bunyan Neural Tutor</Text>
            <Text style={styles.iconicAiSubStatus}>الاستماع بتركيز وتحليل النطق...</Text>

            {/* صندوق الحوار الحي المتحرك */}
            <View style={styles.iconicTranscriptCard}>
              <View style={styles.transcriptHeaderRow}>
                <Ionicons name="sparkles" size={16} color="#F59E0B" />
                <Text style={styles.transcriptTitleLabel}>رد المعلم المباشر</Text>
              </View>
              <Text style={styles.iconicTranscriptText}>"{aiResponseText}"</Text>
            </View>
          </View>

          {/* أدوات التحكم السفلية */}
          <View style={styles.iconicFooterControls}>
            <TouchableOpacity 
              style={styles.secondaryActionChip} 
              onPress={() => setAiResponseText('رائع جداً! هل يمكنك إعادة صياغة هذه الجملة باستخدام مفردات أقدم؟')}
            >
              <Ionicons name="refresh" size={18} color="#38BDF8" />
              <Text style={styles.chipText}>اطلب تبسيط</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconicEndCallBtn} onPress={endAiCall}>
              <Ionicons name="call" size={30} color="#FFF" style={{ transform: [{ rotate: '135deg' }] }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryActionChip} onPress={() => setAiResponseText('أنا أستمع إليك، تفضل بالحديث...')}>
              <Ionicons name="mic-off" size={18} color="#EF4444" />
              <Text style={styles.chipText}>كتم الميكروفون</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        iconicCallContainer: {
    flex: 1,
    backgroundColor: '#030712',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 50,
    paddingBottom: 35,
    justifyContent: 'space-between',
  },
  iconicCallHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveIndicatorBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  liveText: {
    color: '#10B981',
    fontWeight: 'bold',
    fontSize: 12,
  },
  iconicTimerText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconicCenterContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginVertical: 20,
  },
  outerGlowRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerGlowRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiCoreAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#38BDF8',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
  },
  iconicAiName: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 25,
  },
  iconicAiSubStatus: {
    color: '#38BDF8',
    fontSize: 13,
    marginTop: 6,
    marginBottom: 25,
  },
  iconicTranscriptCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#1F2937',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  transcriptHeaderRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  transcriptTitleLabel: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: 'bold',
  },
  iconicTranscriptText: {
    color: '#E2E8F0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  iconicFooterControls: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  secondaryActionChip: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  chipText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
  },
  iconicEndCallBtn: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
                       
