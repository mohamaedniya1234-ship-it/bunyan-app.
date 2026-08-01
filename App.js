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
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 📚 بيانات البطاقات التعليمية Legend
const FLASHCARDS = [
  {
    id: 1,
    base: { pronunciation: 'مان', english: 'Man', arabic: 'رجل' },
    phrasal: { pronunciation: 'مان أب', english: 'Man up', arabic: 'استرجل / أستجمع قواك' }
  },
  {
    id: 2,
    base: { pronunciation: 'باك', english: 'Back', arabic: 'ظهر / خلف' },
    phrasal: { pronunciation: 'باك أب', english: 'Back up', arabic: 'يدعم / تراجع احتياطي' }
  },
  {
    id: 3,
    base: { pronunciation: 'شات', english: 'Shut', arabic: 'يغلق' },
    phrasal: { pronunciation: 'شات أب', english: 'Shut up', arabic: 'اصمت / اقطع الحديث' }
  }
];

// 🎭 مواقف المحاكاة
const SCENARIOS = [
  { id: 1, title: 'مقابلة عمل (Job Interview)', desc: 'تدرب على أسئلة المقابلة الأكثر شيوعاً وكيفية التعريف بنفسك بثقة.' },
  { id: 2, title: 'في المطار (At the Airport)', desc: 'تعلم كيفية إنهاء إجراءات السفر والرد على ضابط الجوازات.' },
  { id: 3, title: 'طلب القهوة (Coffee Shop)', desc: 'محادثة سريعة لطلب المشروبات والتعديل على المكونات.' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // --- حالات الذكاء الاصطناعي والمكالمة الصوتية ---
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [aiResponseText, setAiResponseText] = useState('مرحباً بك! أنا معلمك الذكي، أهلاً بك في تطبيق بنيان. اضغط على الميكروفون للتحدث معي.');
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // --- حالات المودالات ---
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const [showScenarios, setShowScenarios] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);

  const [showShadowing, setShowShadowing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState(null);

  const [showCameraMode, setShowCameraMode] = useState(false);
  const [detectedObject, setDetectedObject] = useState({ en: 'Coffee Cup', ar: 'فنجان قهوة' });

  // أنيميشن النبض
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

  const handleUserSpeakToggle = () => {
    if (isMuted) return;
    if (!isUserSpeaking) {
      setIsUserSpeaking(true);
      setAiResponseText('جاري الاستماع إليك وتحليل نطقك ومفرداتك...');
    } else {
      setIsUserSpeaking(false);
      setAiResponseText('ممتاز! نطقك ممتاز للعبارة الأخيرة. حاول الآن تركيبها في جملة معقدة.');
    }
  };

  const startAiCall = () => {
    setCallDuration(0);
    setIsUserSpeaking(false);
    setIsMuted(false);
    setAiResponseText('مرحباً بك! أنا معلمك الذكي، أهلاً بك في تطبيق بنيان Legend. اضغط على الميكروفون بالأسفل للتحدث معي.');
    setIsCallActive(true);
  };

  const endAiCall = () => {
    setIsCallActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % FLASHCARDS.length);
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setPronunciationScore(Math.floor(Math.random() * 12) + 88);
    } else {
      setPronunciationScore(null);
      setIsRecording(true);
    }
  };

  const handleScanObject = () => {
    const objects = [
      { en: 'Laptop Keyboard', ar: 'لوحة مفاتيح الحواسيب' },
      { en: 'Smartphone Screen', ar: 'شاشة الهاتف الذكي' },
      { en: 'Book Cover', ar: 'غلاف كتاب' },
      { en: 'Coffee Cup', ar: 'فنجان قهوة' },
    ];
    setDetectedObject(objects[Math.floor(Math.random() * objects.length)]);
  };

  return (
    <View style={styles.fullScreenContainer}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <SafeAreaView style={styles.safeArea}>
        {/* 🏆 الهيدر العلوي الجديد (شعار التطبيق + اسم التطبيق بدلاً من مرحباً بك) */}
        <View style={styles.header}>
          <View style={styles.brandContainer}>
            {/* الشعار المأخوذ من الصورة البيضاء (Minimalist Target Grid Logo) */}
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
            <View style={styles.statBadge}>
              <Text style={styles.statText}>⚡ 1,250</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statText}>🔥 7</Text>
            </View>
          </View>
        </View>

        {/* 1. الشاشة الرئيسية */}
        {activeTab === 'home' && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            
            {/* بنر الذكاء الاصطناعي (مدرس AI الشخصي) - باللون الأبيض والأسود */}
            <TouchableOpacity style={styles.aiBanner} activeOpacity={0.85} onPress={startAiCall}>
              <View style={styles.aiBadge}>
                <Ionicons name="sparkles-sharp" size={14} color="#000" />
                <Text style={styles.aiBadgeText}>الذكاء الاصطناعي</Text>
              </View>

              <Text style={styles.aiTitle}>مدرس AI الشخصي</Text>
              <Text style={styles.aiSub}>
                محادثات صوتية طبيعية، تصحيح فوري، وشرح القواعد بالسياق.
              </Text>

              <View style={styles.aiButton}>
                <Ionicons name="mic-sharp" size={18} color="#000" />
                <Text style={styles.aiButtonText}>ابدأ المحادثة الصوتية الآن</Text>
              </View>
            </TouchableOpacity>

            {/* عنوان مسارات التعلم */}
            <View style={styles.sectionHeader}>
              <Ionicons name="book-sharp" size={18} color="#FFF" />
              <Text style={styles.sectionTitle}>مسارات التعلم</Text>
            </View>

            {/* الشبكة 4 كروت بتصميم أسود وأبيض فاخر */}
            <View style={styles.gridContainer}>
              {/* كارت 1: التحدث والنطق */}
              <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => setShowShadowing(true)}>
                <View style={styles.iconBox}>
                  <Ionicons name="mic-sharp" size={24} color="#FFF" />
                </View>
                <Text style={styles.cardTitle}>التحدث والنطق</Text>
                <Text style={styles.cardSub}>تحليل النطق وتمارين Shadowing</Text>
              </TouchableOpacity>

              {/* كارت 2: محاكاة المواقف */}
              <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => setShowScenarios(true)}>
                <View style={styles.iconBox}>
                  <Ionicons name="compass-sharp" size={24} color="#FFF" />
                </View>
                <Text style={styles.cardTitle}>محاكاة المواقف</Text>
                <Text style={styles.cardSub}>قصص تفاعلية ومقابلات عمل</Text>
              </TouchableOpacity>

              {/* كارت 3: الكلمات والقواعد */}
              <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => setShowFlashcards(true)}>
                <View style={styles.iconBox}>
                  <Ionicons name="book-sharp" size={24} color="#FFF" />
                </View>
                <Text style={styles.cardTitle}>الكلمات والقواعد</Text>
                <Text style={styles.cardSub}>بطاقات Flashcards وتكرار متباعد</Text>
              </TouchableOpacity>

              {/* كارت 4: Ultra Elite */}
              <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => setShowCameraMode(true)}>
                <View style={styles.iconBox}>
                  <Ionicons name="star-sharp" size={24} color="#FFF" />
                </View>
                <Text style={styles.cardTitle}>Ultra Elite 💎</Text>
                <Text style={styles.cardSub}>تعلم بالكاميرا وترجمة فورية</Text>
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
            <Text style={styles.screenTitle}>مدرس AI الشخصي</Text>
            <Text style={styles.screenSub}>محادثات صوتية تفاعلية لتطوير لغتك مئة بالمئة</Text>
            <TouchableOpacity style={styles.micCircleBtn} onPress={startAiCall}>
              <Ionicons name="mic" size={30} color="#000" />
            </TouchableOpacity>
          </View>
        )}

        {/* 3. شاشة المجتمع */}
        {activeTab === 'community' && (
          <View style={styles.centerScreen}>
            <View style={styles.iconCircleBig}>
              <Ionicons name="people" size={45} color="#000" />
            </View>
            <Text style={styles.screenTitle}>مجتمع بنيان Legend</Text>
            <Text style={styles.screenSub}>شارِك وتحدث مع بقية المتعلمين عبر العالم</Text>
          </View>
        )}

        {/* 4. شاشة الإحصائيات */}
        {activeTab === 'stats' && (
          <View style={styles.centerScreen}>
            <View style={styles.iconCircleBig}>
              <Ionicons name="stats-chart" size={45} color="#000" />
            </View>
            <Text style={styles.screenTitle}>إحصائيات التعلم</Text>
            <Text style={styles.screenSub}>الكلمات المتقنة: 142 | النقاط: 1,250</Text>
          </View>
        )}

        {/* شريط التنقل السفلي Monochromatic */}
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => setActiveTab('home')} style={styles.navItem}>
            <Ionicons name="home" size={22} color={activeTab === 'home' ? '#FFF' : '#555'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab('ai')} style={styles.navItem}>
            <Ionicons name="hardware-chip" size={22} color={activeTab === 'ai' ? '#FFF' : '#555'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab('community')} style={styles.navItem}>
            <Ionicons name="people" size={22} color={activeTab === 'community' ? '#FFF' : '#555'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab('stats')} style={styles.navItem}>
            <Ionicons name="stats-chart" size={22} color={activeTab === 'stats' ? '#FFF' : '#555'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* 🔴 1. مودال المكالمة الصوتية Legend */}
      <Modal visible={isCallActive} animationType="slide">
        <View style={styles.callScreenContainer}>
          <View style={styles.callHeader}>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.callStatusText}>AI LIVE CALL</Text>
            </View>
            <Text style={styles.callTimerText}>{formatTime(callDuration)}</Text>
          </View>

          <View style={styles.callBody}>
            <Animated.View style={[styles.pulseCircleBackground, { transform: [{ scale: pulseAnim }] }]}>
              <View style={[styles.mainCallAvatar, isUserSpeaking && { borderColor: '#FFF', borderWidth: 2 }]}>
                <Ionicons name={isUserSpeaking ? "mic" : "hardware-chip"} size={45} color="#FFF" />
              </View>
            </Animated.View>

            <Text style={styles.callAiTitle}>Bunyan AI Tutor</Text>
            <Text style={{ color: '#888', fontSize: 13, marginTop: 4 }}>
              {isUserSpeaking ? 'جاري استلام صوتك...' : 'المعلم يستمع وينحلل...'}
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

            <TouchableOpacity style={styles.endCallBtn} onPress={endAiCall}>
              <Ionicons name="call" size={24} color="#FFF" style={{ transform: [{ rotate: '135deg' }] }} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 🟡 2. مودال البطاقات التعليمية */}
      <Modal visible={showFlashcards} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.topModalHeader}>
            <TouchableOpacity onPress={() => setShowFlashcards(false)}>
              <Ionicons name="close" size={28} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>الكلمات والقواعد</Text>
            <Text style={styles.cardCounterText}>{currentCardIndex + 1} / {FLASHCARDS.length}</Text>
          </View>

          <ScrollView contentContainerStyle={styles.cardVisualContainer}>
            <View style={styles.phraseCard}>
              <Text style={styles.arabicPronunciationText}>{FLASHCARDS[currentCardIndex].base.pronunciation}</Text>
              <View style={styles.englishBadge}>
                <Text style={styles.englishBadgeText}>{FLASHCARDS[currentCardIndex].base.english}</Text>
              </View>
              <Text style={styles.arabicTranslationText}>{FLASHCARDS[currentCardIndex].base.arabic}</Text>
            </View>

            <View style={styles.dividerLine} />

            <View style={styles.phraseCard}>
              <Text style={styles.arabicPronunciationText}>{FLASHCARDS[currentCardIndex].phrasal.pronunciation}</Text>
              <View style={styles.englishBadgeInverse}>
                <Text style={styles.englishBadgeTextInverse}>{FLASHCARDS[currentCardIndex].phrasal.english}</Text>
              </View>
              <Text style={styles.arabicTranslationText}>{FLASHCARDS[currentCardIndex].phrasal.arabic}</Text>
            </View>
          </ScrollView>

          <View style={styles.flashcardControls}>
            <TouchableOpacity style={styles.flashBtn} onPress={handleNextCard}>
              <Text style={{ color: '#FFF', fontWeight: 'bold' }}>تخطي ❌</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flashBtnInverse} onPress={handleNextCard}>
              <Text style={{ color: '#000', fontWeight: 'bold' }}>التالي 🟢</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 🟢 3. مودال محاكاة المواقف */}
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
              <Text style={{ color: '#888', textAlign: 'right', marginBottom: 15 }}>اختر الموقف لبدء الحوار التفاعلي:</Text>
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
                  <Text style={styles.chatText}>"Welcome to the interactive session! How can I assist you today?"</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.primaryActionButton} onPress={startAiCall}>
                <Ionicons name="mic" size={20} color="#000" />
                <Text style={styles.primaryActionText}>ابدأ الإجابة بصوتك الآن</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>

      {/* 🔵 4. مودال التحدث والنطق Shadowing */}
      <Modal visible={showShadowing} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.topModalHeader}>
            <TouchableOpacity onPress={() => setShowShadowing(false)}>
              <Ionicons name="close" size={28} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>التحدث والنطق</Text>
            <View style={{ width: 28 }} />
          </View>

          <View style={styles.shadowingBody}>
            <Text style={{ color: '#888', fontSize: 14, marginBottom: 10 }}>استمع للعبارة ثم أعد تسجيلها بصوتك:</Text>
            <Text style={styles.targetSentence}>"Consistency is the key to mastering any language."</Text>

            {pronunciationScore && (
              <View style={styles.scoreBadgeBox}>
                <Text style={styles.scoreNumber}>{pronunciationScore}%</Text>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>دقة النطق ممتازة! واصل التقدم</Text>
              </View>
            )}

            <TouchableOpacity 
              style={[styles.bigMicRecordBtn, isRecording && { backgroundColor: '#FFF' }]} 
              onPress={handleToggleRecording}
            >
              <Ionicons name={isRecording ? 'stop' : 'mic'} size={38} color={isRecording ? '#000' : '#FFF'} />
            </TouchableOpacity>
            <Text style={{ color: '#666', marginTop: 15 }}>
              {isRecording ? 'جاري التسجيل والتحليل...' : 'اضغط للبدء بالتسجيل'}
            </Text>
          </View>
        </View>
      </Modal>

      {/* 🟣 5. مودال Ultra Elite */}
      <Modal visible={showCameraMode} animationType="fade">
        <View style={styles.cameraOverlayContainer}>
          <View style={styles.cameraTopNav}>
            <TouchableOpacity onPress={() => setShowCameraMode(false)}>
              <Ionicons name="close" size={28} color
</TouchableOpacity>
<Text '#FFF', 'bold', 16 color: fontSize: fontWeight: style="{{" }}>ULTRA ELITE 💎</Text>
</View>
<View style="{styles.cameraScannerBox}">
<View style="{styles.scanFrameCornerTL}"/>
<View style="{styles.scanFrameCornerTR}"/>
<View style="{styles.scanFrameCornerBL}"/>
<View style="{styles.scanFrameCornerBR}"/>
<View style="{styles.detectedObjectTag}">
<Text '#000', 'bold', 13 color: fontSize: fontWeight: style="{{" }}>
{detectedObject.en} ({detectedObject.ar})
</Text>
</View>
</View>
<View 'center', 30 alignItems: marginBottom: style="{{" }}>
<TouchableOpacity onPress="{handleScanObject}" style="{styles.scanTriggerBtn}">
<Ionicons color="#000" name="aperture" size="{32}"/>
</TouchableOpacity>
<Text '#888', 'center', 12 color: marginTop: style="{{" textAlign: }}>
وجه الكاميرا واضغط التقاط للترجمة الفورية للأشياء
</Text>
</View>
</View>
</Modal>
</View>
);
}
// 🎨 التنسيقات الفاخرة باللونين الأبيض والأسود (Monochrome Theme مع شعار Bunyan الجديد)
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
statsContainer: { flexDirection: 'row', gap: 8 },
statBadge: { backgroundColor: '#161616', borderWidth: 1, borderColor: '#282828', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
statText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
scrollContent: { padding: 20, paddingBottom: 20 },
// بنر AI
aiBanner: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 25 },
aiBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#F0F0F0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 12 },
aiBadgeText: { color: '#000', fontSize: 12, fontWeight: 'bold' },
aiTitle: { color: '#000', fontSize: 24, fontWeight: 'bold', marginBottom: 6, textAlign: 'right' },
aiSub: { color: '#444', fontSize: 13, lineHeight: 19, textAlign: 'right', marginBottom: 18 },
aiButton: { backgroundColor: '#000', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 16, gap: 8 },
aiButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
// مسارات التعلم
sectionHeader: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8, marginBottom: 15 },
sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
card: { backgroundColor: '#141414', width: '48%', borderRadius: 20, padding: 16, alignItems: 'flex-end', borderWidth: 1, borderColor: '#222' },
iconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#222', justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
cardTitle: { color: '#FFF', fontSize: 15, fontWeight: 'bold', marginBottom: 4, textAlign: 'right' },
cardSub: { color: '#777', fontSize: 11, textAlign: 'right', lineHeight: 15 },
// شاشات التنقل
centerScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
iconCircleBig: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
screenTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
screenSub: { color: '#888', fontSize: 14, textAlign: 'center', lineHeight: 20 },
micCircleBtn: { backgroundColor: '#FFF', width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginTop: 25 },
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
// باقی المودالات
modalContainer: { flex: 1, backgroundColor: '#0A0A0A' },
topModalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40, borderBottomWidth: 1, borderBottomColor: '#1A1A1A' },
modalHeaderTitle: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
cardCounterText: { color: '#888', fontWeight: 'bold' },
cardVisualContainer: { padding: 20, alignItems: 'center', flexGrow: 1, justifyContent: 'center' },
phraseCard: { width: '100%', alignItems: 'center', marginVertical: 10 },
arabicPronunciationText: { fontSize: 30, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
englishBadge: { width: '85%', paddingVertical: 14, borderRadius: 25, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', marginVertical: 6 },
englishBadgeText: { color: '#000', fontSize: 24, fontWeight: 'bold' },
englishBadgeInverse: { width: '85%', paddingVertical: 14, borderRadius: 25, backgroundColor: '#1F1F1F', borderWidth: 1, borderColor: '#333', alignItems: 'center', justifyContent: 'center', marginVertical: 6 },
englishBadgeTextInverse: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
arabicTranslationText: { fontSize: 20, fontWeight: '600', color: '#888', marginTop: 6 },
dividerLine: { height: 1, backgroundColor: '#222', width: '80%', marginVertical: 15 },
flashcardControls: { flexDirection: 'row', justifyContent: 'space-around', padding: 25 },
flashBtn: { paddingVertical: 14, paddingHorizontal: 25, borderRadius: 16, backgroundColor: '#141414', borderWidth: 1, borderColor: '#222' },
flashBtnInverse: { paddingVertical: 14, paddingHorizontal: 25, borderRadius: 16, backgroundColor: '#FFF' },
scenarioCard: { backgroundColor: '#141414', padding: 18, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#222' },
scenarioTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textAlign: 'right', marginBottom: 4 },
scenarioDesc: { color: '#777', fontSize: 12, textAlign: 'right' },
chatBubbleAI: { backgroundColor: '#141414', padding: 18, borderRadius: 16, marginTop: 20, borderWidth: 1, borderColor: '#222' },
chatText: { color: '#FFF', fontSize: 16, lineHeight: 24 },
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
