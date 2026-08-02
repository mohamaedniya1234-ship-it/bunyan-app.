import React, { useState, useEffect, useRef } from 'react';
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
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ==========================================
// 1. 📚 قاعدة بيانات مستويات التعلم CEFR & A0
// ==========================================
const CEFR_LEVELS = [
  { id: 'A0', name: 'A0 - مبتدئ من الصفر', desc: 'الحروف، الأرقام، الألوان، النطق الأساسي', icon: 'sparkles' },
  { id: 'A1', name: 'A1 - المبتدئ الأساسي', desc: 'التعارف، العائلة، الحياة اليومية، جمل بسيطة', icon: 'person' },
  { id: 'A2', name: 'A2 - المبتدئ المتقدم', desc: 'التسوق، السفر، الطقس، الأفعال الماضية', icon: 'walk' },
  { id: 'B1', name: 'B1 - المتوسط', desc: 'المحادثات، العمل، الآراء، تركيب الجمل المعقدة', icon: 'bicycle' },
  { id: 'B2', name: 'B2 - فوق المتوسط', desc: 'المناقشات، التعبير عن المشاعر، النفي والأزمنة', icon: 'car' },
  { id: 'C1', name: 'C1 - المتقدم', desc: 'اللغة الرسمية، العبارات الاصطلاحية، القراءة المتقدمة', icon: 'airplane' },
  { id: 'C2', name: 'C2 - الإتقان الكامل', desc: 'الطريقة الأكاديمية، Slang، فهم السياقات المعقدة', icon: 'trophy' },
];

// مسارات التعلم من الصفر (A0 Modules)
const A0_ZERO_CURRICULUM = [
  { id: 'alphabet', title: '🔤 الحروف والأبجدية', topic: 'أصوات الحروف وطريقة النطق الصحيحة' },
  { id: 'numbers', title: '🔢 الأرقام والأعداد', topic: 'العد من 1 إلى 100 والأرقام الترتيبية' },
  { id: 'colors', title: '🎨 الألوان والأشكال', topic: 'وصف الأشياء من حولك بالألوان' },
  { id: 'family', title: '👨‍👩‍👧‍👦 أفراد العائلة', topic: 'التعريف بأسرتك وأقربائك' },
  { id: 'greetings', title: '👋 التحيات والتعارف', topic: 'كيف تقدم نفسك وتلقي التحية' },
  { id: 'time', title: '⏰ الوقت والأيام والأشهر', topic: 'قراءة الساعة، الأيام والتقويم' },
  { id: 'food', title: '🍎 الطعام والشراب', topic: 'الوجبات، الفواكه، الطلب في المطعم' },
  { id: 'transport', title: '🚌 المواصلات والأماكن', topic: 'الرحلات، التاكسي، المطار والحافلات' },
];

// ==========================================
// 2. 📖 قاعدة بيانات القاموس الداخلي (Internal Dictionary)
// ==========================================
const INITIAL_DICTIONARY = [
  {
    word: 'Consistency',
    translation: 'الاستمرارية / المواظبة',
    phonetic: '/kənˈsɪstənsi/',
    type: 'Noun (اسم)',
    cefr: 'B2',
    simpleExample: 'Consistency is key to success.',
    advExample: 'His consistency in training made him a world champion.',
    synonyms: ['Persistence', 'Constancy', 'Stability'],
    antonyms: ['Inconsistency', 'Irregularity'],
  },
  {
    word: 'Perseverance',
    translation: 'المثابرة / الإصرار',
    phonetic: '/ˌpɜːsɪˈvɪərəns/',
    type: 'Noun (اسم)',
    cefr: 'C1',
    simpleExample: 'Through perseverance, she learned English.',
    advExample: 'Great works are performed not by strength, but by perseverance.',
    synonyms: ['Determination', 'Diligence'],
    antonyms: ['Apathy', 'Idleness'],
  },
  {
    word: 'Fluency',
    translation: 'الطلاقة اللغوية',
    phonetic: '/ˈfluːənsi/',
    type: 'Noun (اسم)',
    cefr: 'B1',
    simpleExample: 'He speaks with great fluency.',
    advExample: 'Achieving fluency requires immersive listening and daily practice.',
    synonyms: ['Articulateness', 'Eloquence'],
    antonyms: ['Hesitation'],
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // --- حالات المستخدم والتقدم ---
  const [userLevel, setUserLevel] = useState('A0');
  const [userXp, setUserXp] = useState(1250);
  const [streakDays, setStreakDays] = useState(7);
  const [savedCards, setSavedCards] = useState([]);

  // --- حالات اختبار تحديد المستوى بالذكاء الاصطناعي ---
  const [showPlacementTest, setShowPlacementTest] = useState(false);
  const [testStep, setTestStep] = useState(0);
  const [testAnswers, setTestAnswers] = useState({});

  // --- حالات المدرس الذكي والمكالمة ---
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [aiResponseText, setAiResponseText] = useState('مرحباً بك! أنا معلمك الذكي في بنيان. كيف أساعدك اليوم في رحلة التعلم؟');
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // --- حالات القاموس والمودالات ---
  const [showDictionary, setShowDictionary] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWordDetails, setSelectedWordDetails] = useState(null);

  const [showCurriculum, setShowCurriculum] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const [showShadowing, setShowShadowing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState(null);

  const [showCameraMode, setShowCameraMode] = useState(false);
  const [detectedObject, setDetectedObject] = useState({ en: 'Smart Phone', ar: 'هاتف ذكي' });

  // أنيميشن النبض للمكالمات
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let interval = null;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.3, duration: 700, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
        ])
      ).start();
    } else {
      clearInterval(interval);
      pulseAnim.setValue(1);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  // إدارة التحدث الذكي
  const handleUserSpeakToggle = () => {
    if (isMuted) return;
    if (!isUserSpeaking) {
      setIsUserSpeaking(true);
      setAiResponseText('جاري الاستماع لنطقك وتحليل التركيب اللغوي الجملة...');
    } else {
      setIsUserSpeaking(false);
      setAiResponseText('ممتاز! نطقك صحيح للكلمات، وتم تقييم الجملة بمستوى B2. يمكنك المواصلة.');
    }
  };

  const startAiCall = () => {
    setCallDuration(0);
    setIsUserSpeaking(false);
    setIsMuted(false);
    setAiResponseText(`مرحباً بك! أنا معلمك الذكي لـ مستوى ${userLevel}. اضغط الميكروفون للبدء بالحديث.`);
    setIsCallActive(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // معالجة اختيار تحديد المستوى
  const handleFinishPlacementTest = (calculatedLevel) => {
    setUserLevel(calculatedLevel);
    setShowPlacementTest(false);
    Alert.alert('تم تحديث مستواك!', `تم تحديد مستواك التلقائي بنجاح في المستوى: ${calculatedLevel}`);
  };

  // إضافة الكلمة للحفظ والتكرار المتباعد SRS
  const handleSaveToFlashcards = (wordObj) => {
    if (!savedCards.find((item) => item.word === wordObj.word)) {
      setSavedCards([...savedCards, wordObj]);
      Alert.alert('تمت الإضافة!', `تم إضافة كلمة "${wordObj.word}" إلى قائمة الحفظ والمراجعة المتباعدة.`);
    } else {
      Alert.alert('تنبيه', 'الكلمة مضافة بالفعل في محفظتك التعليمية.');
    }
  };

  const filteredDictionary = INITIAL_DICTIONARY.filter(item => 
    item.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.translation.includes(searchQuery)
  );

  return (
    <View style={styles.fullScreenContainer}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <SafeAreaView style={styles.safeArea}>
        {/* 🏆 الهيدر الفاخر (شعار بنيان + الشعار المينيمال + المستوى الحالي) */}
        <View style={styles.header}>
          <View style={styles.brandContainer}>
            <View style={styles.logoFrame}>
              <View style={styles.logoCircleOuter}>
                <View style={styles.logoCircleInner} />
              </View>
              <View style={styles.logoCrosshairH} />
              <View style={styles.logoCrosshairV} />
            </View>
            <Text style={styles.appNameText}>Bunyan | بنيان</Text>
          </View>

          <View style={styles.statsContainer}>
            <TouchableOpacity style={styles.levelBadge} onPress={() => setShowPlacementTest(true)}>
              <Text style={styles.levelBadgeText}>🎯 {userLevel}</Text>
            </TouchableOpacity>
            <View style={styles.statBadge}>
              <Text style={styles.statText}>⚡ {userXp}</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statText}>🔥 {streakDays}</Text>
            </View>
          </View>
        </View>

        {/* 1. الواجهة الرئيسية */}
        {activeTab === 'home' && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            
            {/* بنر المدرس الذكي الرئيسي */}
            <TouchableOpacity style={styles.aiBanner} activeOpacity={0.88} onPress={startAiCall}>
              <View style={styles.aiBadge}>
                <Ionicons name="sparkles-sharp" size={14} color="#000" />
                <Text style={styles.aiBadgeText}>الذكاء الاصطناعي موجه لمستواك ({userLevel})</Text>
              </View>

              <Text style={styles.aiTitle}>مدرس AI الشخصي الشامل</Text>
              <Text style={styles.aiSub}>
                محادثات صوتية تفاعلية، تصحيح الأخطاء فورياً، واقتراح الدروس حسب نقاط ضعفك.
              </Text>

              <View style={styles.aiButton}>
                <Ionicons name="mic-sharp" size={18} color="#000" />
                <Text style={styles.aiButtonText}>ابدأ المحادثة الصوتية الآن</Text>
              </View>
            </TouchableOpacity>

            {/* قسم المسارات والمنهج الشامل */}
            <View style={styles.sectionHeader}>
              <Ionicons name="school-sharp" size={18} color="#FFF" />
              <Text style={styles.sectionTitle}>منهج التعلم الشامل (A0 -> C2)</Text>
            </View>

            {/* كارت الانتقال للمنهج المنظم */}
            <TouchableOpacity style={styles.largeCurriculumCard} onPress={() => setShowCurriculum(true)}>
              <View style={{ flex: 1 }}>
                <Text style={styles.curriculumCardTitle}>📚 التدرج التعليمي الكامل</Text>
                <Text style={styles.curriculumCardSub}>من صفر الأبجدية حتى إتقان المحادثة الأكاديمية</Text>
              </View>
              <Ionicons name="chevron-back" size={24} color="#FFF" />
            </TouchableOpacity>

            {/* شبكة الأقسام الـ 4 المتقدمة */}
            <View style={styles.gridContainer}>
              {/* كارت القاموس الشامل */}
              <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => setShowDictionary(true)}>
                <View style={styles.iconBox}>
                  <Ionicons name="book-sharp" size={24} color="#FFF" />
                </View>
                <Text style={styles.cardTitle}>القاموس الذكي</Text>
                <Text style={styles.cardSub}>IPA، مرادفات، وأمثلة متقدمة</Text>
              </TouchableOpacity>

              {/* كارت التحدث والنطق */}
              <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => setShowShadowing(true)}>
                <View style={styles.iconBox}>
                  <Ionicons name="mic-sharp" size={24} color="#FFF" />
                </View>
                <Text style={styles.cardTitle}>التحدث و Shadowing</Text>
                <Text style={styles.cardSub}>تحليل وتعديل مخارج الحروف</Text>
              </TouchableOpacity>

              {/* كارت اختبار تحديد المستوى */}
              <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => setShowPlacementTest(true)}>
                <View style={styles.iconBox}>
                  <Ionicons name="fitness-sharp" size={24} color="#FFF" />
                </View>
                <Text style={styles.cardTitle}>اختبار المستوى AI</Text>
                <Text style={styles.cardSub}>تقييم دقيق لمستواك الحالي</Text>
              </TouchableOpacity>

              {/* كارت Ultra Elite */}
              <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => setShowCameraMode(true)}>
                <View style={styles.iconBox}>
                  <Ionicons name="camera-sharp" size={24} color="#FFF" />
                </View>
                <Text style={styles.cardTitle}>Ultra Elite 💎</Text>
                <Text style={styles.cardSub}>تعلم المحيط عبر الكاميرا</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {/* 2. شاشة AI Tutor */}
        {activeTab === 'ai' && (
          <View style={styles.centerScreen}>
            <View style={styles.iconCircleBig}>
              <Ionicons name="hardware-chip" size={45} color="#000" />
            </View>
            <Text style={styles.screenTitle}>المعلم الشخصي الذكي</Text>
            <Text style={styles.screenSub}>يقوم بإنشاء تمارين مخصصة وشرح الأخطاء بالتفصيل</Text>
            <TouchableOpacity style={styles.micCircleBtn} onPress={startAiCall}>
              <Ionicons name="mic" size={30} color="#000" />
            </TouchableOpacity>
          </View>
        )}

        {/* 3. شاشة القاموس والمكتبة */}
        {activeTab === 'dictionary' && (
          <View style={{ flex: 1, padding: 20 }}>
            <Text style={styles.sectionTitle}>القاموس والمحفظة اللغوية</Text>
            <TextInput 
              style={styles.searchInput}
              placeholder="ابحث عن كلمة أو ترجمة..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              {filteredDictionary.map((item, index) => (
                <TouchableOpacity key={index} style={styles.dictItemCard} onPress={() => setSelectedWordDetails(item)}>
                  <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>{item.word}</Text>
                    <View style={styles.cefrTag}><Text style={{ color: '#000', fontSize: 10, fontWeight: 'bold' }}>{item.cefr}</Text></View>
                  </View>
                  <Text style={{ color: '#888', textAlign: 'right', marginTop: 4 }}>{item.translation} • {item.phonetic}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* 4. شاشة الإحصائيات والمستويات */}
        {activeTab === 'stats' && (
          <View style={styles.centerScreen}>
            <View style={styles.iconCircleBig}>
              <Ionicons name="stats-chart" size={45} color="#000" />
            </View>
            <Text style={styles.screenTitle}>إحصائيات الإتقان (SRS)</Text>
            <Text style={styles.screenSub}>المستوى الحالي: {userLevel} | الكلمات المحفوظة: {savedCards.length}</Text>
          </View>
        )}

        {/* الشريط السفلي Monochromatic */}
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => setActiveTab('home')} style={styles.navItem}>
            <Ionicons name="home" size={22} color={activeTab === 'home' ? '#FFF' : '#555'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab('ai')} style={styles.navItem}>
            <Ionicons name="hardware-chip" size={22} color={activeTab === 'ai' ? '#FFF' : '#555'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab('dictionary')} style={styles.navItem}>
            <Ionicons name="book" size={22} color={activeTab === 'dictionary' ? '#FFF' : '#555'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab('stats')} style={styles.navItem}>
            <Ionicons name="stats-chart" size={22} color={activeTab === 'stats' ? '#FFF' : '#555'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* 🔴 1. مودال المكالمة الصوتية للمدرس الذكي */}
      <Modal visible={isCallActive} animationType="slide">
        <View style={styles.callScreenContainer}>
          <View style={styles.callHeader}>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.callStatusText}>AI LIVE TUTOR SESSION</Text>
            </View>
            <Text style={styles.callTimerText}>{formatTime(callDuration)}</Text>
          </View>

          <View style={styles.callBody}>
            <Animated.View style={[styles.pulseCircleBackground, { transform: [{ scale: pulseAnim }] }]}>
              <View style={[styles.mainCallAvatar, isUserSpeaking && { borderColor: '#FFF', borderWidth: 2 }]}>
                <Ionicons name={isUserSpeaking ? "mic" : "hardware-chip"} size={45} color="#FFF" />
              </View>
            </Animated.View>

            <Text style={styles.callAiTitle}>Bunyan AI Language Coach</Text>
            <Text style={{ color: '#888', fontSize: 13, marginTop: 4 }}>
              {isUserSpeaking ? 'جاري الاستماع لصوتك...' : 'المعلم ينتظر إجابتك...'}
            </Text>

            <View style={styles.transcriptBox}>
              <Ionicons name="sparkles" size={18} color="#FFF" style={{ marginBottom: 6 }} />
              <Text style={styles.transcriptText}>"{aiResponseText}"</Text>
            </View>
          </View>

          <View style={styles.callControls}>
            <TouchableOpacity 
              style={[styles.controlBtnSecondary, isMuted && { backgroundColor: '#333' }]}
              onPress={() => setIsMuted(!isMuted)}
            >
              <Ionicons name={isMuted ? "mic-off" : "volume-high"} size={22} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.interactiveSpeakBtn, isUserSpeaking && styles.interactiveSpeakBtnActive]} 
              onPress={handleUserSpeakToggle}
            >
              <Ionicons name="mic" size={32} color={isUserSpeaking ? "#FFF" : "#000"} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.endCallBtn} onPress={() => setIsCallActive(false)}>
              <Ionicons name="call" size={24} color="#FFF" style={{ transform: [{ rotate: '135deg' }] }} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 🔤 2. مودال المنهاج المنظم (Curriculum A0 -> C2) */}
      <Modal visible={showCurriculum} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.topModalHeader}>
            <TouchableOpacity onPress={() => setShowCurriculum(false)}>
              <Ionicons name="close" size={28} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>مسارات التعلم والتدرج</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView style={{ padding: 20 }}>
            <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'right' }}>
              🎯 المسار الأساسي للمبتدئين (A0 - Zero Level)
            </Text>
            {A0_ZERO_CURRICULUM.map((mod) => (
              <TouchableOpacity key={mod.id} style={styles.scenarioCard} onPress={() => setSelectedModule(mod)}>
                <Text style={styles.scenarioTitle}>{mod.title}</Text>
                <Text style={styles.scenarioDesc}>{mod.topic}</Text>
              </TouchableOpacity>
            ))}

            <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold', marginVertical: 15, textAlign: 'right' }}>
              🏆 المستويات المتقدمة (CEFR Framework)
            </Text>
            {CEFR_LEVELS.map((level) => (
              <View key={level.id} style={[styles.scenarioCard, userLevel === level.id && { borderColor: '#FFF' }]}>
                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                     <Text style={styles.scenarioTitle}>{level.name}</Text>
                  {userLevel === level.id && <Text style={{ color: '#FFF', fontWeight: 'bold' }}>مستواك الحالي</Text>}
                </View>
                <Text style={styles.scenarioDesc}>{level.desc}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>

      {/* 🎯 3. مودال اختبار تحديد المستوى بالذكاء الاصطناعي */}
      <Modal visible={showPlacementTest} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.topModalHeader}>
            <TouchableOpacity onPress={() => setShowPlacementTest(false)}>
              <Ionicons name="close" size={28} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>اختبار تحديد المستوى الذكي</Text>
            <View style={{ width: 28 }} />
          </View>

          <View style={{ flex: 1, padding: 24, justifyContent: 'space-between' }}>
            <View>
              <Text style={{ color: '#888', textAlign: 'right', marginBottom: 10 }}>السؤال {testStep + 1} من 3</Text>
              <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginBottom: 20 }}>
                {testStep === 0 && 'كيف تعبر عن رغبتك في طلب طعام بلغة رسمية؟'}
                {testStep === 1 && 'اختر الجملة الصحيحة لغوياً للحدث المستمر في الماضي:'}
                {testStep === 2 && 'ما معنى المفهوم الاصطلاحي "Hit the nail on the head"؟'}
              </Text>

              {testStep === 0 && (
                <>
                  <TouchableOpacity style={styles.scenarioCard} onPress={() => setTestStep(1)}>
                    <Text style={{ color: '#FFF', textAlign: 'right' }}>I want food now.</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.scenarioCard} onPress={() => setTestStep(1)}>
                    <Text style={{ color: '#FFF', textAlign: 'right' }}>I would like to order a meal, please.</Text>
                  </TouchableOpacity>
                </>
              )}

              {testStep === 1 && (
                <>
                  <TouchableOpacity style={styles.scenarioCard} onPress={() => setTestStep(2)}>
                    <Text style={{ color: '#FFF', textAlign: 'right' }}>I was walking when it started to rain.</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.scenarioCard} onPress={() => setTestStep(2)}>
                    <Text style={{ color: '#FFF', textAlign: 'right' }}>I walked when it rains.</Text>
                  </TouchableOpacity>
                </>
              )}

              {testStep === 2 && (
                <>
                  <TouchableOpacity style={styles.scenarioCard} onPress={() => handleFinishPlacementTest('B2')}>
                    <Text style={{ color: '#FFF', textAlign: 'right' }}>اصابة الهدف أو قول الحقيقة بالدقة التامة.</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.scenarioCard} onPress={() => handleFinishPlacementTest('A2')}>
                    <Text style={{ color: '#FFF', textAlign: 'right' }}>إصابة الشخص في رأسه.</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <TouchableOpacity style={styles.primaryActionButton} onPress={() => handleFinishPlacementTest('A1')}>
              <Text style={styles.primaryActionText}>تخطي والاكتفاء بالمستوى A0 من الصفر</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 📖 4. مودال تفاصيل الكلمة المحددة من القاموس */}
      <Modal visible={!!selectedWordDetails} animationType="slide">
        {selectedWordDetails && (
          <View style={styles.modalContainer}>
            <View style={styles.topModalHeader}>
              <TouchableOpacity onPress={() => setSelectedWordDetails(null)}>
                <Ionicons name="close" size={28} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.modalHeaderTitle}>تفاصيل الكلمة الشاملة</Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ color: '#FFF', fontSize: 32, fontWeight: 'bold' }}>{selectedWordDetails.word}</Text>
                <Text style={{ color: '#888', fontSize: 16, marginTop: 4 }}>{selectedWordDetails.phonetic} • {selectedWordDetails.type}</Text>
                <Text style={{ color: '#FFF', fontSize: 22, fontWeight: 'bold', marginTop: 8 }}>{selectedWordDetails.translation}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>مثال بسيط:</Text>
                <Text style={styles.detailText}>"{selectedWordDetails.simpleExample}"</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>مثال متقدم:</Text>
                <Text style={styles.detailText}>"{selectedWordDetails.advExample}"</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>المرادفات (Synonyms):</Text>
                <Text style={styles.detailText}>{selectedWordDetails.synonyms.join(' • ')}</Text>
              </View>

              <TouchableOpacity 
                style={[styles.primaryActionButton, { marginTop: 25 }]} 
                onPress={() => { handleSaveToFlashcards(selectedWordDetails); setSelectedWordDetails(null); }}
              >
                <Ionicons name="bookmark" size={20} color="#000" />
                <Text style={styles.primaryActionText}>إضافة للحفظ والمراجعة المتباعدة SRS</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </Modal>

      {/* 🔵 5. مودال Shadowing والتحدث */}
      <Modal visible={showShadowing} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.topModalHeader}>
            <TouchableOpacity onPress={() => setShowShadowing(false)}>
              <Ionicons name="close" size={28} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>مختبر النطق و Shadowing</Text>
            <View style={{ width: 28 }} />
          </View>

          <View style={styles.shadowingBody}>
            <Text style={{ color: '#888', fontSize: 14, marginBottom: 10 }}>استمع للعبارة ثم أعد تسجيلها بصوتك:</Text>
            <Text style={styles.targetSentence}>"Consistency and daily effort build language mastery."</Text>

            {pronunciationScore && (
              <View style={styles.scoreBadgeBox}>
                <Text style={styles.scoreNumber}>{pronunciationScore}%</Text>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>دقة النطق ممتازة! واصل التقدم</Text>
              </View>
            )}

            <TouchableOpacity 
              style={[styles.bigMicRecordBtn, isRecording && { backgroundColor: '#FFF' }]} 
              onPress={() => {
                if (isRecording) {
                  setIsRecording(false);
                  setPronunciationScore(94);
                } else {
                  setPronunciationScore(null);
                  setIsRecording(true);
                }
              }}
            >
              <Ionicons name={isRecording ? 'stop' : 'mic'} size={38} color={isRecording ? '#000' : '#FFF'} />
            </TouchableOpacity>
            <Text style={{ color: '#666', marginTop: 15 }}>
              {isRecording ? 'جاري تحليل مخارج الألفاظ...' : 'اضغط للبدء بالتسجيل'}
            </Text>
          </View>
        </View>
      </Modal>

      {/* 🟣 6. مودال Ultra Elite للكاميرا */}
      <Modal visible={showCameraMode} animationType="fade">
        <View style={styles.cameraOverlayContainer}>
          <View style={styles.cameraTopNav}>
            <TouchableOpacity onPress={() => setShowCameraMode(false)}>
              <Ionicons name="close" size={28} color="#FFF" />
            </TouchableOpacity>
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>ULTRA ELITE VISION 💎</Text>
          </View>

          <View style={styles.cameraScannerBox}>
            <View style={styles.scanFrameCornerTL} />
            <View style={styles.scanFrameCornerTR} />
            <View style={styles.scanFrameCornerBL} />
            <View style={styles.scanFrameCornerBR} />

            <View style={styles.detectedObjectTag}>
              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 13 }}>
                {detectedObject.en} ({detectedObject.ar})
              </Text>
            </View>
          </View>

          <View style={{ alignItems: 'center', marginBottom: 30 }}>
            <TouchableOpacity 
              style={styles.scanTriggerBtn} 
              onPress={() => setDetectedObject({ en: 'Coffee Mug', ar: 'كوب قهوة' })}
            >
              <Ionicons name="aperture" size={32} color="#000" />
            </TouchableOpacity>
            <Text style={{ color: '#888', textAlign: 'center', marginTop: 12 }}>
              وجه الكاميرا واضغط للتعرف على الأشياء وترجمتها فورياً
            </Text>
          </View>
        </View>
      </Modal>

    </View>
  );
}

// 🎨 التنسيقات الفاخرة باللونين الأبيض والأسود (Monochrome Theme مع شعار Bunyan الأصلي)
const styles = StyleSheet.create({
  fullScreenContainer: { flex: 1, backgroundColor: '#0A0A0A' },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  
  // الهيدر والبراند
  header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#1A1A1A' },
  brandContainer: { flexDirection: 'row-reverse', alignItems: 'center', gap: 10 },
  logoFrame: { width: 28, height: 28, borderWidth: 1, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  logoCircleOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  logoCircleInner: { width: 8, height: 8, borderRadius: 4, borderWidth: 1, borderColor: '#FFF' },
  logoCrosshairH: { position: 'absolute', width: '100%', height: 1, backgroundColor: '#FFF' },
  logoCrosshairV: { position: 'absolute', height: '100%', width: 1, backgroundColor: '#FFF' },
  appNameText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  
  statsContainer: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  levelBadge: { backgroundColor: '#FFF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 14 },
  levelBadgeText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  statBadge: { backgroundColor: '#161616', borderWidth: 1, borderColor: '#282828', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 14 },
  statText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },

  scrollContent: { padding: 20, paddingBottom: 20 },

  // بنر AI
  aiBanner: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 20 },
  aiBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#F0F0F0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 12 },
  aiBadgeText: { color: '#000', fontSize: 11, fontWeight: 'bold' },
  aiTitle: { color: '#000', fontSize: 24, fontWeight: 'bold', marginBottom: 6, textAlign: 'right' },
  aiSub: { color: '#444', fontSize: 13, lineHeight: 19, textAlign: 'right', marginBottom: 18 },
  aiButton: { backgroundColor: '#000', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 16, gap: 8 },
  aiButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },

  // مسارات التعلم
  sectionHeader: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  largeCurriculumCard: { backgroundColor: '#141414', borderRadius: 18, padding: 18, borderWidth: 1, borderColor: '#333', flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 20 },
  curriculumCardTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textAlign: 'right' },
  curriculumCardSub: { color: '#777', fontSize: 12, textAlign: 'right', marginTop: 4 },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  card: { backgroundColor: '#141414', width: '48%', borderRadius: 20, padding: 16, alignItems: 'flex-end', borderWidth: 1, borderColor: '#222' },
  iconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#222', justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  cardTitle: { color: '#FFF', fontSize: 15, fontWeight: 'bold', marginBottom: 4, textAlign: 'right' },
  cardSub: { color: '#777', fontSize: 11, textAlign: 'right', lineHeight: 15 },

  // الشاشات الوسطية
  centerScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  iconCircleBig: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  screenTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  screenSub: { color: '#888', fontSize: 14, textAlign: 'center', lineHeight: 20 },
  micCircleBtn: { backgroundColor: '#FFF', width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginTop: 25 },

  // القاموس
  searchInput: { backgroundColor: '#141414', borderWidth: 1, borderColor: '#222', borderRadius: 16, padding: 14, color: '#FFF', textAlign: 'right', marginBottom: 15 },
  dictItemCard: { backgroundColor: '#141414', borderRadius: 16, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#222' },
  cefrTag: { backgroundColor: '#FFF', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },

  // تفاصيل الكلمة
  detailSection: { backgroundColor: '#141414', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#222' },
  detailTitle: { color: '#888', fontSize: 12, textAlign: 'right', marginBottom: 4 },
  detailText: { color: '#FFF', fontSize: 15, textAlign: 'right' },

  // مودال المكالمة
  callScreenContainer: { flex: 1, backgroundColor: '#0A0A0A', padding: 24, justifyContent: 'space-between' },
  callHeader: { alignItems: 'center', marginTop: 40 },
  liveIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#141414', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#222' },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFF' },
  callStatusText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  callTimerText: { color: '#666', fontSize: 16, marginTop: 8, fontWeight: 'bold' },
  callBody: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  pulseCircleBackground: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#141414', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  mainCallAvatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#222', justifyContent: 'center', alignItems: 'center' },
  callAiTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginTop: 20 },
  transcriptBox: { backgroundColor: '#141414', padding: 18, borderRadius: 16, marginTop: 25, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  transcriptText: { color: '#DDD', fontSize: 15, textAlign: 'center', lineHeight: 22 },
  callControls: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 30 },
  controlBtnSecondary: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#141414', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  interactiveSpeakBtn: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  interactiveSpeakBtnActive: { backgroundColor: '#444' },
  endCallBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },

  // مودالات عامة
  modalContainer: { flex: 1, backgroundColor: '#0A0A0A' },
  topModalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40, borderBottomWidth: 1, borderBottomColor: '#1A1A1A' },
  modalHeaderTitle: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
  scenarioCard: { backgroundColor: '#141414', padding: 18, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#222' },
  scenarioTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textAlign: 'right', marginBottom: 4 },
  scenarioDesc: { color: '#777', fontSize: 12, textAlign: 'right' },
  primaryActionButton: { backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 16, gap: 10 },
  primaryActionText: { color: '#000', fontWeight: 'bold', fontSize: 16 },

  shadowingBody: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 25 },
  targetSentence: { color: '#FFF', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, lineHeight: 30 },
  bigMicRecordBtn: { backgroundColor: '#141414', width: 90, height: 90, borderRadius: 45, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  scoreBadgeBox: { backgroundColor: '#141414', padding: 16, borderRadius: 16, alignItems: 'center', marginVertical: 10, borderWidth: 1, borderColor: '#222' },
  scoreNumber: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },

  cameraOverlayContainer: { flex: 1, backgroundColor: '#0A0A0A', padding: 20, justifyContent: 'space-between' },
  cameraTopNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40 },
  cameraScannerBox: { height: 320, borderWidth: 1, borderColor: '#222', borderRadius: 20, position: 'relative', justifyContent: 'center', alignItems: 'center', backgroundColor: '#050505' },
  scanFrameCornerTL: { position: 'absolute', top: 12, left: 12, width: 25, height: 25, borderTopWidth: 3, borderLeftWidth: 3, borderColor: '#FFF' },
  scanFrameCornerTR: { position: 'absolute', top: 12, right: 12, width: 25, height: 25, borderTopWidth: 3, borderRightWidth: 3, borderColor: '#FFF' },
  scanFrameCornerBL: { position: 'absolute', bottom: 12, left: 12, width: 25, height: 25, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: '#FFF' },
  scanFrameCornerBR: { position: 'absolute', bottom: 12, right: 12, width: 25, height: 25, borderBottomWidth: 3, borderRightWidth: 3, borderColor: '#FFF' },
  detectedObjectTag: { backgroundColor: '#FFF', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  scanTriggerBtn: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },

  // الشريط السفلي
  bottomNav: { backgroundColor: '#0A0A0A', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 14, paddingBottom: 16, borderTopWidth: 1, borderTopColor: '#1A1A1A' },
  navItem: { alignItems: 'center' },
});
        
