import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  Platform,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// بيانات تجريبية للبطاقات التعليمية (Flashcards)
const FLASHCARDS = [
  { id: 1, word: 'Resilience', translation: 'المرونة / القدرة على التكيف', type: 'اسم (Noun)', example: 'His resilience helped him overcome challenges.' },
  { id: 2, word: 'Ambiguous', translation: 'غاضم / غير واضح', type: 'صفة (Adjective)', example: 'The sentence has an ambiguous meaning.' },
  { id: 3, word: 'Fluency', translation: 'الطلاقة اللغوية', type: 'اسم (Noun)', example: 'Practice daily to reach high fluency.' },
];

// بيانات تجريبية سيناريوهات محاكاة المواقف
const SCENARIOS = [
  { id: 1, title: '💼 مقابلة عمل (Job Interview)', desc: 'تدرب على أسئلة المقابلة الأكثر شيوعاً وكيفية التعريف بنفسك بطلاقة.' },
  { id: 2, title: '✈️ في المطار (At the Airport)', desc: 'تعلم كيفية إنهاء إجراءات السفر والرد على ضابط الجوازات.' },
  { id: 3, title: '☕ طلب القهوة (Coffee Shop)', desc: 'محادثة سريعة لطلب المشروبات والتعديل على المكونات.' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [dailyProgressMinutes, setDailyProgressMinutes] = useState(3);

  // شاشات ومودالات الأقسام التفاعلية
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [aiResponseText, setAiResponseText] = useState('');

  // حالة Flashcards
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // حالة محاكاة المواقف
  const [showScenarios, setShowScenarios] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);

  // حالة التحدث والنطق (Shadowing)
  const [showShadowing, setShowShadowing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState(null);

  // حالة الكاميرا المباشرة (Ultra Elite)
  const [showCameraMode, setShowCameraMode] = useState(false);

  // أنيميشن النبض
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  // مؤقت المكالمة
  useEffect(() => {
    let interval = null;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.25, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      clearInterval(interval);
      pulseAnim.setValue(1);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  // إدارة الاتصال الصوتي
  const startAiCall = () => {
    setCallDuration(0);
    setAiResponseText('مرحباً بك! أنا معلمك الذكي، أهلاً بك في تطبيق بنيان. كيف يمكنني مساعدتك اليوم؟');
    setIsCallActive(true);
  };

  const endAiCall = () => {
    setIsCallActive(false);
    const addedMinutes = Math.max(1, Math.round(callDuration / 60));
    setDailyProgressMinutes((prev) => Math.min(5, prev + addedMinutes));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // وظائف التناقل بين الكروت
  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % FLASHCARDS.length);
  };

  // التظاهر بالتسجيل وتقييم النطق
  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // تقييم عشوائي محاكي
      setPronunciationScore(Math.floor(Math.random() * 15) + 85); 
    } else {
      setPronunciationScore(null);
      setIsRecording(true);
    }
  };

  return (
    <View style={styles.fullScreenContainer}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <SafeAreaView style={styles.safeArea}>
        {/* الهيدر العلوي */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Text style={styles.appName}>بنيان | Bunyan</Text>
            <Text style={styles.welcomeText}>مرحباً بك 👋</Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statBadge}>
              <Text style={styles.statText}>🔥 7</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statText}>⚡ 1,250</Text>
            </View>
          </View>
        </View>

        {/* الشاشة الرئيسية */}
        {activeTab === 'home' && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* بنر الذكاء الاصطناعي */}
            <TouchableOpacity style={styles.aiBanner} activeOpacity={0.85} onPress={startAiCall}>
              <View style={styles.aiBannerContent}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>الذكاء الاصطناعي 🧠</Text>
                </View>
                <Text style={styles.aiTitle}>مدرس AI الشخصي</Text>
                <Text style={styles.aiSub}>
                  محادثات صوتية طبيعية، تصحيح فوري، وشرح القواعد بالسياق.
                </Text>
                <View style={styles.aiButton}>
                  <Ionicons name="mic-sharp" size={18} color="#0F172A" />
                  <Text style={styles.aiButtonText}>ابدأ المحادثة الصوتية الآن</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* مسارات التعلم التفاعلية */}
            <Text style={styles.sectionTitle}>مسارات التعلم 📚</Text>

            <View style={styles.gridContainer}>
              {/* 1. التحدث والنطق */}
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.7}
                onPress={() => setShowShadowing(true)}
              >
                <View style={[styles.iconBox, { backgroundColor: '#3B82F620' }]}>
                  <Ionicons name="mic" size={26} color="#3B82F6" />
                </View>
                <Text style={styles.cardTitle}>التحدث والنطق</Text>
                <Text style={styles.cardSub}>تحليل النطق وتمارين Shadowing</Text>
              </TouchableOpacity>

              {/* 2. محاكاة المواقف */}
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.7}
                onPress={() => setShowScenarios(true)}
              >
                <View style={[styles.iconBox, { backgroundColor: '#10B98120' }]}>
                  <Ionicons name="compass" size={26} color="#10B981" />
                </View>
                <Text style={styles.cardTitle}>محاكاة المواقف</Text>
                <Text style={styles.cardSub}>قصص تفاعلية ومقابلات عمل</Text>
              </TouchableOpacity>

              {/* 3. الكلمات والقواعد */}
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.7}
                onPress={() => setShowFlashcards(true)}
              >
                <View style={[styles.iconBox, { backgroundColor: '#8B5CF620' }]}>
                  <Ionicons name="book" size={26} color="#8B5CF6" />
                </View>
                <Text style={styles.cardTitle}>الكلمات والقواعد</Text>
                <Text style={styles.cardSub}>بطاقات Flashcards وتكرار متباعد</Text>
              </TouchableOpacity>

              {/* 4. Ultra Elite */}
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.7}
                onPress={() => setShowCameraMode(true)}
              >
                <View style={[styles.iconBox, { backgroundColor: '#F59E0B20' }]}>
                  <Ionicons name="star" size={26} color="#F59E0B" />
                </View>
                <Text style={styles.cardTitle}>Ultra Elite 💎</Text>
                <Text style={styles.cardSub}>تعلم بالكاميرا وترجمة فورية</Text>
              </TouchableOpacity>
            </View>

            {/* بطاقة التحدي اليومي */}
            <View style={styles.challengeCard}>
              <View style={styles.challengeHeader}>
                <Ionicons name="trophy" size={22} color="#F59E0B" />
                <Text style={styles.challengeTitle}>التحدي اليومي 🎮</Text>
              </View>
              <Text style={styles.challengeDesc}>تحدث لمدة 5 دقائق مع معلم الذكاء الاصطناعي</Text>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${(dailyProgressMinutes / 5) * 100}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {dailyProgressMinutes} / 5 دقائق ({Math.round((dailyProgressMinutes / 5) * 100)}%)
              </Text>
            </View>
          </ScrollView>
        )}

        {/* بقية الشاشات الرئيسية */}
        {activeTab === 'ai' && (
          <View style={styles.centerScreen}>
            <Ionicons name="hardware-chip" size={60} color="#6366F1" />
            <Text style={styles.screenTitle}>معلم الذكاء الاصطناعي 🧠</Text>
            <Text style={styles.screenSub}>اضغط على الميكروفون لبدء المحادثة الصوتية المباشرة.</Text>
            <TouchableOpacity style={styles.micCircle} onPress={startAiCall}>
              <Ionicons name="mic" size={32} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'community' && (
          <View style={styles.centerScreen}>
            <Ionicons name="people" size={60} color="#10B981" />
            <Text style={styles.screenTitle}>مجتمع بنيان 👥</Text>
            <Text style={styles.screenSub}>غرف التبادل اللغوي والدردشة المباشرة مع زملائك المتعلمين.</Text>
          </View>
        )}

        {activeTab === 'stats' && (
          <View style={styles.centerScreen}>
            <Ionicons name="stats-chart" size={60} color="#F59E0B" />
            <Text style={styles.screenTitle}>إحصائيات التعلم 📊</Text>
            <Text style={styles.screenSub}>
              الكلمات المتقنة: 142 | دقائق التحدث: {dailyProgressMinutes} دقيقة
            </Text>
          </View>
        )}

        {/* ===== 1. مودال المكالمة الصوتية المباشرة ===== */}
        <Modal visible={isCallActive} animationType="slide">
          <View style={styles.callScreenContainer}>
            <View style={styles.callHeader}>
              <Text style={styles.callStatusText}>متصل الان 🟢</Text>
              <Text style={styles.callTimerText}>{formatTime(callDuration)}</Text>
            </View>

            <View style={styles.callBody}>
              <Animated.View style={[styles.pulseCircleBackground, { transform: [{ scale: pulseAnim }] }]}>
                <View style={styles.mainCallAvatar}>
                  <Ionicons name="hardware-chip" size={54} color="#6366F1" />
                </View>
              </Animated.View>
              <Text style={styles.callAITitle}>Bunyan AI Tutor</Text>

              <View style={styles.transcriptBox}>
                <Ionicons name="chatbubbles-outline" size={18} color="#06B6D4" style={{ marginBottom: 6 }} />
                <Text style={styles.transcriptText}>"{aiResponseText}"</Text>
              </View>
            </View>

            <View style={styles.callControls}>
              <TouchableOpacity
                style={styles.controlBtnSecondary}
                onPress={() => setAiResponseText('ممتاز! حاول أن تنطق عبارة "Practice makes perfect" بصوت واثق.')}
              >
                <Ionicons name="volume-high" size={24} color="#FFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.endCallBtn} onPress={endAiCall}>
                <Ionicons name="call" size={28} color="#FFF" style={{ transform: [{ rotate: '135deg' }] }} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlBtnSecondary}>
                <Ionicons name="mic-off" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* ===== 2. مودال البطاقات التعليمية (Flashcards) ===== */}
        <Modal visible={showFlashcards} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.topModalHeader}>
              <TouchableOpacity onPress={() => setShowFlashcards(false)}>
                <Ionicons name="close" size={28} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.modalHeaderTitle}>بطاقات المفردات (Flashcards)</Text>
              <Text style={styles.cardCounterText}>
                {currentCardIndex + 1} / {FLASHCARDS.length}
              </Text>
            </View>

            <View style={styles.flashcardBody}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.flashcardBox}
                onPress={() => setIsFlipped(!isFlipped)}
              >
                <Text style={styles.cardTypeBadge}>{FLASHCARDS[currentCardIndex].type}</Text>
                
                {!isFlipped ? (
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.flashcardWord}>{FLASHCARDS[currentCardIndex].word}</Text>
                    <Text style={styles.flipHintText}>اضغط على البطاقة لكشف المعنى 🔄</Text>
                  </View>
                ) : (
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.flashcardTranslation}>{FLASHCARDS[currentCardIndex].translation}</Text>
                    <Text style={styles.flashcardExample}>"{FLASHCARDS[currentCardIndex].example}"</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.flashcardControls}>
              <TouchableOpacity style={[styles.flashBtn, { backgroundColor: '#EF444420' }]} onPress={handleNextCard}>
                <Text style={{ color: '#EF4444', fontWeight: 'bold' }}>أحتاج مراجعة ❌</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.flashBtn, { backgroundColor: '#10B98120' }]} onPress={handleNextCard}>
                <Text style={{ color: '#10B981', fontWeight: 'bold' }}>حفظتها بنجاح ✅</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* ===== 3. مودال محاكاة المواقف (Scenarios) ===== */}
        <Modal visible={showScenarios} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.topModalHeader}>
              <TouchableOpacity onPress={() => { setShowScenarios(false); setSelectedScenario(null); }}>
                <Ionicons name="close" size={28} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.modalHeaderTitle}>محاكاة المواقف الواقعية</Text>
              <View style={{ width: 28 }} />
            </View>

            {!selectedScenario ? (
              <ScrollView style={{ padding: 20 }}>
                <Text style={{ color: '#94A3B8', textAlign: 'right', marginBottom: 15 }}>اختر الموقف للبدء بالحوار التفاعلي:</Text>
                {SCENARIOS.map((sc) => (
                  <TouchableOpacity key={sc.id} style={styles.scenarioCard} onPress={() => setSelectedScenario(sc)}>
                    <Text style={styles.scenarioTitle}>{sc.title}</Text>
                    <Text style={styles.scenarioDesc}>{sc.desc}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <View style={{ flex: 1, padding: 20, justifyContent: 'space-between' }}>
                <View>
                  <Text style={styles.scenarioTitle}>{selectedScenario.title}</Text>
                  <View style={styles.chatBubbleAI}>
                    <Text style={styles.chatText}>"Welcome to the interview! Can you tell me a little bit about yourself?"</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.primaryActionButton} onPress={startAiCall}>
                  <Ionicons name="mic" size={20} color="#FFF" />
                  <Text style={styles.primaryActionText}>ابدأ الإجابة بصوتك الآن</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Modal>

        {/* ===== 4. مودال تحليل النطق (Shadowing) ===== */}
        <Modal visible={showShadowing} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.topModalHeader}>
              <TouchableOpacity onPress={() => setShowShadowing(false)}>
                <Ionicons name="close" size={28} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.modalHeaderTitle}>تمارين Shadowing والنطق</Text>
              <View style={{ width: 28 }} />
            </View>

            <View style={styles.shadowingBody}>
              <Text style={{ color: '#94A3B8', fontSize: 14, marginBottom: 10 }}>استمع للعبارة ثم أعد تسجيلها بصوتك:</Text>
              <Text style={styles.targetSentence}>"Consistency is the key to mastering any language."</Text>

              {pronunciationScore && (
                <View style={styles.scoreBadgeBox}>
                  <Text style={styles.scoreNumber}>{pronunciationScore}%</Text>
                  <Text style={{ color: '#10B981', fontWeight: 'bold' }}>نطق ممتازي! واصل التقدّم</Text>
                </View>
              )}

              <TouchableOpacity
                style={[styles.bigMicRecordBtn, isRecording && { backgroundColor: '#EF4444' }]}
                onPress={handleToggleRecording}
              >
                <Ionicons name={isRecording ? 'stop' : 'mic'} size={40} color="#FFF" />
              </TouchableOpacity>
              <Text style={{ color: '#64748B', marginTop: 15 }}>
                {isRecording ? 'جاري التسجيل والتحليل...' : 'اضغط للبدء بالتسجيل'}
              </Text>
            </View>
          </View>
        </Modal>

        {/* ===== 5. مودال الكاميرا الذكية (Ultra Elite 💎) ===== */}
        <Modal visible={showCameraMode} animationType="fade">
          <View style={styles.cameraOverlayContainer}>
            <View style={styles.cameraTopNav}>
              <TouchableOpacity onPress={() => setShowCameraMode(false)}>
                <Ionicons name="close" size={30} color="#FFF" />
              </TouchableOpacity>
              <Text style={{ color: '#F59E0B', fontWeight: 'bold', fontSize: 16 }}>Ultra Elite 💎</Text>
            </View>

            <View style={styles.cameraScannerBox}>
              <View style={styles.scanFrameCornerTL} />
              <View style={styles.scanFrameCornerTR} />
              <View style={styles.scanFrameCornerBL} />
              <View style={styles.scanFrameCornerBR} />

              <View style={styles.detectedObjectTag}>
                <Text style={{ color: '#0F172A', fontWeight: 'bold', fontSize: 12 }}>Coffee Cup (فنجان قهوة)</Text>
              </View>
            </View>

            <Text style={{ color: '#E2E8F0', textAlign: 'center', marginBottom: 40 }}>
              وجه الكاميرا نحو أي عنصر للترجمة والتعلم الفوري
            </Text>
          </View>
        </Modal>

        {/* شريط التنقل السفلي */}
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => setActiveTab('home')} style={styles.navItem}>
            <Ionicons name="home" size={22} color={activeTab === 'home' ? '#6366F1' : '#64748B'} />
            <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>الرئيسية</Text>
          </TouchableOpacity>

          <TouchableOpacity onP
