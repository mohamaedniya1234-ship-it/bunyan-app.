import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// البيانات الأولية للمستويات والدروس
const CURRICULUM_DATA = [
  { id: 'A0', title: 'مبتدئ جداً (A0)', desc: 'الأصوات الأساسية، التحيات، والأرقام', progress: 0.8 },
  { id: 'A1', title: 'مبتدئ (A1)', desc: 'التعريف بالنفس والأسئلة اليومية البسيطة', progress: 0.4 },
  { id: 'A2', title: 'فوق المبتدئ (A2)', desc: 'التسوق، العمل، والأنشطة اليومية', progress: 0.1 },
  { id: 'B1', title: 'متوسط (B1)', desc: 'السفر، التعبير عن الرأي، والمشاعر', progress: 0.0 },
  { id: 'B2', title: 'فوق المتوسط (B2)', desc: 'المناقشات التفصيلية والأخبار', progress: 0.0 },
  { id: 'C1', title: 'متقدم (C1)', desc: 'المحادثات الأكاديمية والمهنية المعقدة', progress: 0.0 },
  { id: 'C2', title: 'إتقان تام (C2)', desc: 'التحدث بطلاقة تشبه أهل اللغة', progress: 0.0 },
];

export default function App() {
  return (
    <SafeAreaProvider>
      <BunyanCoreApp />
    </SafeAreaProvider>
  );
}

function BunyanCoreApp() {
  const insets = useSafeAreaInsets();

  // الحالة المركزية للتطبيق (User State)
  const [userStats, setUserStats] = useState({
    xp: 450,
    streak: 5,
    level: 'A1',
    completedLessons: 12,
    learnedWords: 84,
  });

  // إدارة الشاشات (Navigation State)
  // Screens: 'HOME' | 'CURRICULUM' | 'LESSON' | 'AI_TUTOR'
  const [currentScreen, setCurrentScreen] = useState('HOME');
  const [activeLevel, setActiveLevel] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  // زيادة النقاط
  const addXP = (points) => {
    setUserStats((prev) => ({ ...prev, xp: prev.xp + points }));
  };

  // -------------------------------------------------------------
  // 1. شاشة المساعد الصوتي التفاعلي (AI Tutor Screen)
  // -------------------------------------------------------------
  const renderAITutorScreen = () => {
    const [isListening, setIsListening] = useState(false);
    const [messages, setMessages] = useState([
      { id: 1, sender: 'ai', text: 'Hello Mohamed! Ready to practice your speaking today?', correction: null },
    ]);

    const handleMicPress = () => {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const userMsg = { id: Date.now(), sender: 'user', text: 'Yes, I want to practice speaking about travel.' };
        const aiResponse = { 
          id: Date.now() + 1, 
          sender: 'ai', 
          text: 'Great choice! Where would you like to travel next?',
          correction: 'Tip: Excellent grammar!' 
        };
        setMessages((prev) => [...prev, userMsg, aiResponse]);
        addXP(15);
      }, 2500);
    };

    return (
      <View style={[styles.fullScreen, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        {/* Header */}
        <View style={styles.navHeader}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentScreen('HOME')}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>المعلم الصوتي الذكي</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Chat History */}
        <ScrollView contentContainerStyle={styles.chatScroll} showsVerticalScrollIndicator={false}>
          {messages.map((msg) => (
            <View key={msg.id} style={[styles.chatBubble, msg.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
              <Text style={styles.chatText}>{msg.text}</Text>
              {msg.correction && <Text style={styles.correctionText}>{msg.correction}</Text>}
            </View>
          ))}
          {isListening && (
            <View style={[styles.chatBubble, styles.userBubble, { opacity: 0.7 }]}>
              <Text style={styles.chatText}>جاري الاستماع إليك الان...</Text>
            </View>
          )}
        </ScrollView>

        {/* Voice Control Section */}
        <View style={styles.aiControlsContainer}>
          <Text style={styles.aiStatusText}>{isListening ? 'أنصت إليك...' : 'اضغط الميكروفون للتحدث'}</Text>
          <TouchableOpacity 
            style={[styles.micBtn, isListening && styles.micBtnActive]} 
            onPress={handleMicPress}
          >
            <Ionicons name={isListening ? "radio" : "mic"} size={36} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // -------------------------------------------------------------
  // 2. شاشة منهج التعلم الشامل (Curriculum Screen)
  // -------------------------------------------------------------
  const renderCurriculumScreen = () => {
    return (
      <View style={[styles.fullScreen, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        {/* Navigation Header */}
        <View style={styles.navHeader}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentScreen('HOME')}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>منهج التعلم الشامل</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>اختر المستوى للبدء</Text>
          
          {CURRICULUM_DATA.map((lvl) => (
            <TouchableOpacity 
              key={lvl.id} 
              style={styles.levelCard}
              onPress={() => {
                setActiveLevel(lvl);
                setActiveLesson({ id: 1, title: `درس تفاعلي - ${lvl.id}`, question: 'اختر الترجمة الصحيحة لـ "Welcome"' });
                setCurrentScreen('LESSON');
              }}
            >
              <View style={styles.levelHeader}>
                <Text style={styles.levelBadge}>{lvl.id}</Text>
                <Text style={styles.levelTitle}>{lvl.title}</Text>
              </View>
              <Text style={styles.levelDesc}>{lvl.desc}</Text>
              
              {/* Progress Bar */}
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${lvl.progress * 100}%` }]} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  // -------------------------------------------------------------
  // 3. شاشة الدرس التفاعلي والتمارين (Lesson Screen)
  // -------------------------------------------------------------
  const renderLessonScreen = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const options = ['مرحباً', 'شكراً', 'وداعاً', 'نعم'];
    const correctAnswer = 'مرحباً';

    const handleAnswer = (option) => {
      setSelectedOption(option);
      if (option === correctAnswer) {
        setFeedback('success');
        addXP(20);
      } else {
        setFeedback('error');
      }
    };

    return (
      <View style={[styles.fullScreen, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        {/* Header */}
        <View style={styles.navHeader}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentScreen('CURRICULUM')}>
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>{activeLesson ? activeLesson.title : 'الدرس'}</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.questionCard}>
            <Text style={styles.questionTag}>تمرين التفاعل والمفردات</Text>
            <Text style={styles.questionText}>{activeLesson?.question || 'اختر الإجابة الصحيحة'}</Text>
            
            <TouchableOpacity style={styles.audioBtn}>
              <Ionicons name="volume-high" size={24} color="#38bdf8" />
              <Text style={styles.audioBtnText}>استمع للنطق</Text>
            </TouchableOpacity>
          </View>

          {/* Options */}
          {options.map((opt, idx) => (
            <TouchableOpacity 
              key={idx} 
              style={[
                styles.optionBtn,
                selectedOption === opt && (feedback === 'success' ? styles.optionSuccess : styles.optionError)
              ]}
              onPress={() => handleAnswer(opt)}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}

          {/* Instant Feedback Notice */}
          {feedback === 'success' && (
            <View style={styles.feedbackSuccessBox}>
              <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
              <Text style={styles.feedbackSuccessText}>إجابة صحيحة! +20 XP</Text>
            </View>
          )}

          {feedback === 'error' && (
            <View style={styles.feedbackErrorBox}>
              <Ionicons name="alert-circle" size={24} color="#ef4444" />
              <Text style={styles.feedbackErrorText}>إجابة خاطئة. الإجابة الصحيحة هي: "مرحباً"</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  // -------------------------------------------------------------
  // 4. الشاشة الرئيسية (Home Screen)
  // -------------------------------------------------------------
  const renderHomeScreen = () => {
    return (
      <View style={[styles.fullScreen, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <StatusBar barStyle="light-content" />
        
        {/* Top User Stats Bar */}
        <View style={styles.statsBar}>
          <View style={styles.statBadge}>
            <Ionicons name="flash" size={18} color="#eab308" />
            <Text style={styles.statText}>{userStats.xp} XP</Text>
          </View>
          <View style={styles.statBadge}>
            <Ionicons name="flame" size={18} color="#f97316" />
            <Text style={styles.statText}>{userStats.streak} أيام</Text>
          </View>
          <View style={styles.statBadge}>
            <Ionicons name="ribbon" size={18} color="#38bdf8" />
            <Text style={styles.statText}>المستوى {userStats.level}</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Main Action Banner: AI Tutor */}
          <TouchableOpacity style={styles.aiBanner} onPress={() => setCurrentScreen('AI_TUTOR')}>
            <View style={styles.aiBannerBadge}>
              <Text style={styles.aiBannerBadgeText}>مباشر 24/7</Text>
            </View>
            <Text style={styles.aiBannerTitle}>ابدأ المحادثة الصوتية الآن</Text>
            <Text style={styles.aiBannerSub}>تحدث مع المعلم الذكي لتحسين النطق وتصحيح الأخطاء فورياً.</Text>
            <View style={styles.aiBannerBtn}>
              <Text style={styles.aiBannerBtnText}>انقر لبدء المحادثة</Text>
              <Ionicons name="mic-outline" size={20} color="#FFF" />
            </View>
          </TouchableOpacity>

          {/* Curriculum Section */}
          <TouchableOpacity style={styles.sectionCard} onPress={() => setCurrentScreen('CURRICULUM')}>
            <View style={styles.cardHeader}>
              <Ionicons name="book-outline" size={24} color="#38bdf8" />
              <Text style={styles.cardTitle}>منهج التعلم الشامل</Text>
            </View>
            <Text style={styles.cardDesc}>تصفح المستويات من A0 حتى C2 مع الدروس والتمارين التفاعلية.</Text>
          </TouchableOpacity>

          {/* Quick Word Bank Card */}
          <View style={styles.sectionCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="school-outline" size={24} color="#a855f7" />
              <Text style={styles.cardTitle}>حصيلة المفردات</Text>
            </View>
            <Text style={styles.cardDesc}>تعلمت حتى الآن {userStats.learnedWords} كلمة. تابع التمارين لزيادة حصيلتك.</Text>
          </View>
        </ScrollView>
      </View>
    );
  };

  // Switch Screen Controller
  switch (currentScreen) {
    case 'AI_TUTOR':
      return renderAITutorScreen();
    case 'CURRICULUM':
      return renderCurriculumScreen();
    case 'LESSON':
      return renderLessonScreen();
    default:
      return renderHomeScreen();
  }
}

// -------------------------------------------------------------
// Style Sheet (Minimal, Dark Glassmorphism, Safe Layout)
// -------------------------------------------------------------
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  scrollContainer: {
    padding: 16,
  },
  navHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  navTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backBtn: {
    padding: 8,
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  aiBanner: {
    backgroundColor: '#1e1b4b',
    borderColor: '#4338ca',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  aiBannerBadge: {
    backgroundColor: '#6366f1',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  aiBannerBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  aiBannerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  aiBannerSub: {
    color: '#c7d2fe',
    fontSize: 13,
    marginBottom: 16,
  },
  aiBannerBtn: {
    backgroundColor: '#4f46e5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
  },
  aiBannerBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  sectionCard: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDesc: {
    color: '#94a3b8',
    fontSize: 13,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  levelCard: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  levelBadge: {
    backgroundColor: '#0284c7',
    color: '#FFF',
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
  },
  levelTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelDesc: {
    color: '#94a3b8',
    fontSize: 13,
    marginBottom: 12,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#1e293b',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#38bdf8',
  },
  questionCard: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  questionTag: {
    color: '#38bdf8',
    fontSize: 12,
    marginBottom: 8,
  },
  questionText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  audioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1e293b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  audioBtnText: {
    color: '#38bdf8',
    fontWeight: '600',
  },
  optionBtn: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    alignItems: 'center',
  },
  optionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionSuccess: {
    borderColor: '#22c55e',
    backgroundColor: '#14532d',
  },
  optionError: {
    borderColor: '#ef4444',
    backgroundColor: '#7f1d1d',
  },
  feedbackSuccessBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#052e16',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  feedbackSuccessText: {
    color: '#4ade80',
    fontWeight: 'bold',
  },
  feedbackErrorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#450a0a',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  feedbackErrorText: {
    color: '#fca5a5',
    fontWeight: 'bold',
  },
  chatScroll: {
    padding: 16,
    gap: 12,
  },
  chatBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#1e293b',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2563eb',
  },
  chatText: {
    color: '#FFF',
    fontSize: 15,
  },
  correctionText: {
    color: '#38bdf8',
    fontSize: 11,
    marginTop: 4,
  },
  aiControlsContainer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  aiStatusText: {
    color: '#94a3b8',
    marginBottom: 12,
  },
  micBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micBtnActive: {
    backgroundColor: '#ef4444',
  },
});
              
