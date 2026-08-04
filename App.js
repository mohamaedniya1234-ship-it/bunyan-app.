import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// بيانات المنهج
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
  
  // نظام التنقل وحفظ الحالة
  const [currentScreen, setCurrentScreen] = useState('HOME');
  const [activeLesson, setActiveLesson] = useState(null);
  const [userStats, setUserStats] = useState({ xp: 450, streak: 5, level: 'A1' });

  // 1. الشاشة الرئيسية (كما هي تماماً في التصميم)
  const renderHomeScreen = () => (
    <View style={styles.screenContainer}>
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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* المحادثة الصوتية AI */}
        <TouchableOpacity activeOpacity={0.8} style={styles.aiBanner} onPress={() => setCurrentScreen('AI_TUTOR')}>
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

        {/* منهج التعلم الشامل */}
        <TouchableOpacity activeOpacity={0.8} style={styles.sectionCard} onPress={() => setCurrentScreen('CURRICULUM')}>
          <View style={styles.cardHeader}>
            <Ionicons name="book-outline" size={24} color="#38bdf8" />
            <Text style={styles.cardTitle}>منهج التعلم الشامل (A0 → C2)</Text>
          </View>
          <Text style={styles.cardDesc}>تصفح المستويات والدروس التفاعلية لبناء لغتك خطوة بخطوة.</Text>
        </TouchableOpacity>

        {/* القاموس الذكي */}
        <TouchableOpacity activeOpacity={0.8} style={styles.sectionCard} onPress={() => setCurrentScreen('DICTIONARY')}>
          <View style={styles.cardHeader}>
            <Ionicons name="library-outline" size={24} color="#10b981" />
            <Text style={styles.cardTitle}>القاموس الذكي</Text>
          </View>
          <Text style={styles.cardDesc}>ابحث عن الكلمات، استمع للنطق الصحيح، وتعرف على المرادفات.</Text>
        </TouchableOpacity>

        {/* Ultra Elite (الكاميرا) */}
        <TouchableOpacity activeOpacity={0.8} style={styles.sectionCard} onPress={() => setCurrentScreen('ULTRA_ELITE')}>
          <View style={styles.cardHeader}>
            <Ionicons name="camera-outline" size={24} color="#a855f7" />
            <Text style={styles.cardTitle}>Ultra Elite</Text>
          </View>
          <Text style={styles.cardDesc}>تعلم اللغة بالكاميرا. وجه الكاميرا لأي شيء لتعرف اسمه ونطقه.</Text>
        </TouchableOpacity>

        {/* اختبار المستوى AI */}
        <TouchableOpacity activeOpacity={0.8} style={styles.sectionCard} onPress={() => setCurrentScreen('LEVEL_TEST')}>
          <View style={styles.cardHeader}>
            <Ionicons name="bar-chart-outline" size={24} color="#f43f5e" />
            <Text style={styles.cardTitle}>اختبار المستوى AI</Text>
          </View>
          <Text style={styles.cardDesc}>قم بتقييم مستواك الحالي ودع الذكاء الاصطناعي يحدد مسارك.</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  // 2. شاشة المحادثة الصوتية (AI Tutor)
  const renderAITutorScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('HOME')} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>المعلم الصوتي</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.chatBubble, styles.aiBubble]}>
          <Text style={styles.chatText}>Hello! How can I help you practice today?</Text>
        </View>
      </ScrollView>
      <View style={styles.aiControlsContainer}>
        <Text style={styles.aiStatusText}>اضغط للتحدث</Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.micBtn}>
          <Ionicons name="mic" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // 3. شاشة المنهج (Curriculum)
  const renderCurriculumScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('HOME')} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>منهج التعلم</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {CURRICULUM_DATA.map((lvl) => (
          <TouchableOpacity 
            key={lvl.id} 
            activeOpacity={0.8} 
            style={styles.levelCard}
            onPress={() => {
              setActiveLesson(lvl);
              setCurrentScreen('LESSON');
            }}
          >
            <View style={styles.levelHeader}>
              <Text style={styles.levelBadge}>{lvl.id}</Text>
              <Text style={styles.levelTitle}>{lvl.title}</Text>
            </View>
            <Text style={styles.levelDesc}>{lvl.desc}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  // 4. شاشة الدرس (Lesson)
  const renderLessonScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('CURRICULUM')} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>الدرس ({activeLesson?.id})</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.scrollContent}>
        <View style={styles.questionCard}>
          <Text style={styles.questionTag}>تمرين تفاعلي</Text>
          <Text style={styles.questionText}>اختر الترجمة الصحيحة لكلمة "Welcome"</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.optionBtn}>
          <Text style={styles.optionText}>مرحباً</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.optionBtn}>
          <Text style={styles.optionText}>شكراً</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // 5. شاشة القاموس (Dictionary)
  const renderDictionaryScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('HOME')} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>القاموس الذكي</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.dictionaryCard}>
          <Text style={styles.wordTitle}>Welcome</Text>
          <Text style={styles.ipaText}>/ˈwɛlkəm/</Text>
          <Text style={styles.translationText}>مرحباً / أهلاً وسهلاً</Text>
          <TouchableOpacity style={styles.audioPlayBtn}>
            <Ionicons name="volume-high" size={24} color="#38bdf8" />
            <Text style={styles.audioPlayText}>استمع للنطق</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  // 6. شاشة Ultra Elite
  const renderUltraEliteScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('HOME')} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Ultra Elite</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={[styles.scrollContent, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        <Ionicons name="camera" size={64} color="#a855f7" style={{ marginBottom: 20 }} />
        <Text style={styles.cardTitle}>الكاميرا قيد التحضير...</Text>
        <Text style={styles.cardDesc}>وجّه الكاميرا نحو أي مجسم للتعرف عليه.</Text>
      </View>
    </View>
  );

  // 7. شاشة اختبار المستوى
  const renderLevelTestScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('HOME')} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>اختبار تحديد المستوى</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.scrollContent}>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>أكمل الجملة: I ___ a student.</Text>
        </View>
        {['am', 'is', 'are', 'be'].map((opt, i) => (
          <TouchableOpacity key={i} activeOpacity={0.7} style={styles.optionBtn}>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // جهاز توجيه الشاشات (Router)
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'HOME': return renderHomeScreen();
      case 'AI_TUTOR': return renderAITutorScreen();
      case 'CURRICULUM': return renderCurriculumScreen();
      case 'LESSON': return renderLessonScreen();
      case 'DICTIONARY': return renderDictionaryScreen();
      case 'ULTRA_ELITE': return renderUltraEliteScreen();
      case 'LEVEL_TEST': return renderLevelTestScreen();
      default: return renderHomeScreen();
    }
  };

  return (
    <View style={[styles.mainWrapper, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor="#090d16" translucent />
      {renderCurrentScreen()}
    </View>
  );
}

// التنسيقات (لم يتم تغيير أي ألوان أو خطوط - فقط إصلاح الـ Layout والـ Responsive)
const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#090d16', // لون الخلفية الأساسي كما هو
  },
  screenContainer: {
    flex: 1,
    width: '100%',
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    paddingVertical: 14,
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
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  aiBanner: {
    backgroundColor: '#1e1b4b',
    borderColor: '#4338ca',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    width: '100%',
  },
  aiBannerBadge: {
    backgroundColor: '#6366f1',
    alignSelf: 'flex-end', // معدلة لتناسب اللغة العربية RTL
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
  },
  aiBannerBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  aiBannerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
  },
  aiBannerSub: {
    color: '#c7d2fe',
    fontSize: 14,
    marginBottom: 18,
    textAlign: 'right',
    lineHeight: 20,
  },
  aiBannerBtn: {
    backgroundColor: '#4f46e5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  aiBannerBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionCard: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
    borderWidth: 1,
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  cardDesc: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'right',
    lineHeight: 22,
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
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  levelBadge: {
    backgroundColor: '#0284c7',
    color: '#FFF',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
  },
  levelTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelDesc: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'right',
  },
  questionCard: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderColor: '#1e293b',
    borderWidth: 1,
  },
  questionTag: {
    color: '#38bdf8',
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '600',
  },
  questionText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
  },
  optionBtn: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
    borderWidth: 1,
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    alignItems: 'center',
  },
  optionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dictionaryCard: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    borderColor: '#1e293b',
    borderWidth: 1,
  },
  wordTitle: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ipaText: {
    color: '#94a3b8',
    fontSize: 18,
    marginBottom: 16,
  },
  translationText: {
    color: '#10b981',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  audioPlayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1e293b',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  audioPlayText: {
    color: '#38bdf8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatBubble: {
    maxWidth: '85%',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#1e293b',
    borderBottomLeftRadius: 4,
  },
  chatText: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 24,
  },
  aiControlsContainer: {
    padding: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    backgroundColor: '#0f172a',
  },
  aiStatusText: {
    color: '#94a3b8',
    marginBottom: 16,
    fontSize: 16,
  },
  micBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
});
    
