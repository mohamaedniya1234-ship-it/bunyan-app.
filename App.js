import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// بيانات المنهج التعليمي
const CURRICULUM_DATA = [
  { id: 'A0', title: 'مبتدئ جداً (A0)', desc: 'الأصوات الأساسية، التحيات، والأرقام' },
  { id: 'A1', title: 'مبتدئ (A1)', desc: 'التعريف بالنفس والأسئلة اليومية البسيطة' },
  { id: 'A2', title: 'فوق المبتدئ (A2)', desc: 'التسوق، العمل، والأنشطة اليومية' },
  { id: 'B1', title: 'متوسط (B1)', desc: 'السفر، التعبير عن الرأي، والمشاعر' },
  { id: 'B2', title: 'فوق المتوسط (B2)', desc: 'المناقشات التفصيلية والأخبار' },
  { id: 'C1', title: 'متقدم (C1)', desc: 'المحادثات الأكاديمية والمهنية المعقدة' },
  { id: 'C2', title: 'إتقان تام (C2)', desc: 'التحدث بطلاقة تشبه أهل اللغة' },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('HOME');
  const [activeLesson, setActiveLesson] = useState(null);
  const [userStats] = useState({ xp: 450, streak: 5, level: 'A1' });

  // -------------------------------------------------------------
  // 1. الشاشة الرئيسية (طابق الأصل 100%)
  // -------------------------------------------------------------
  const renderHomeScreen = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* شريط الإحصائيات العلوي */}
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

      {/* منهج التعلم الشامل */}
      <TouchableOpacity activeOpacity={0.7} style={styles.fullCard} onPress={() => setCurrentScreen('CURRICULUM')}>
        <View style={styles.cardHeaderRTL}>
          <Ionicons name="chevron-back" size={20} color="#94a3b8" />
          <View style={styles.cardTitleGroup}>
            <Text style={styles.cardMainTitle}>🎓 منهج التعلم الشامل (A0 -> C2)</Text>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginTop: 4 }}>
              <Text style={styles.cardMainTitleBold}>📚 التدرج التعليمي الكامل</Text>
            </View>
            <Text style={styles.cardSubTitle}>من صفر الأبجدية حتى إتقان المحادثة الأكاديمية</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* شبكة الميزات (2x2) */}
      <View style={styles.gridContainer}>
        {/* القاموس الذكي */}
        <TouchableOpacity activeOpacity={0.7} style={styles.gridCard} onPress={() => setCurrentScreen('DICTIONARY')}>
          <View style={styles.iconBox}>
            <Ionicons name="book-outline" size={28} color="#FFF" />
          </View>
          <Text style={styles.gridTitle}>القاموس الذكي</Text>
          <Text style={styles.gridSub}>مرادفات، وأمثلة متقدمة، IPA</Text>
        </TouchableOpacity>

        {/* التحدث و Shadowing */}
        <TouchableOpacity activeOpacity={0.7} style={styles.gridCard} onPress={() => setCurrentScreen('AI_TUTOR')}>
          <View style={styles.iconBox}>
            <Ionicons name="mic-outline" size={28} color="#FFF" />
          </View>
          <Text style={styles.gridTitle}>التحدث و Shadowing</Text>
          <Text style={styles.gridSub}>تحليل وتعديل مخارج الحروف</Text>
        </TouchableOpacity>

        {/* اختبار المستوى AI */}
        <TouchableOpacity activeOpacity={0.7} style={styles.gridCard} onPress={() => setCurrentScreen('LEVEL_TEST')}>
          <View style={styles.iconBox}>
            <Ionicons name="pulse-outline" size={28} color="#FFF" />
          </View>
          <Text style={styles.gridTitle}>اختبار المستوى AI</Text>
          <Text style={styles.gridSub}>تقييم دقيق لمستواك الحالي</Text>
        </TouchableOpacity>

        {/* Ultra Elite */}
        <TouchableOpacity activeOpacity={0.7} style={styles.gridCard} onPress={() => setCurrentScreen('ULTRA_ELITE')}>
          <View style={styles.iconBox}>
            <Ionicons name="camera-outline" size={28} color="#FFF" />
          </View>
          <Text style={styles.gridTitle}>Ultra Elite 💎</Text>
          <Text style={styles.gridSub}>تعلم المحيط عبر الكاميرا</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // -------------------------------------------------------------
  // 2. الشاشات الفرعية (فتح الشاشات بنظام Full Screen)
  // -------------------------------------------------------------
  
  // شاشة المنهج
  const renderCurriculumScreen = () => (
    <View style={styles.fullScreenInner}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('HOME')} style={styles.backBtn}>
          <Ionicons name="arrow-forward" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>مسارات التعلم (A0 - C2)</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {CURRICULUM_DATA.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            activeOpacity={0.7} 
            style={styles.levelCard}
            onPress={() => {
              setActiveLesson(item);
              setCurrentScreen('LESSON');
            }}
          >
            <View style={styles.levelHeader}>
              <Text style={styles.levelBadge}>{item.id}</Text>
              <Text style={styles.levelTitle}>{item.title}</Text>
            </View>
            <Text style={styles.levelDesc}>{item.desc}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  // شاشة الدرس
  const renderLessonScreen = () => (
    <View style={styles.fullScreenInner}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('CURRICULUM')} style={styles.backBtn}>
          <Ionicons name="arrow-forward" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>الدرس ({activeLesson?.id || 'A1'})</Text>
      </View>
      <View style={styles.paddedContent}>
        <View style={styles.interactiveBox}>
          <Text style={styles.boxTag}>تمرين استماع وتكرار</Text>
          <Text style={styles.boxTitle}>"How are you doing today?"</Text>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="volume-medium" size={24} color="#FFF" />
            <Text style={styles.actionBtnText}>استمع للنطق الأصلي</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // شاشة التحدث و Shadowing
  const renderAITutorScreen = () => (
    <View style={styles.fullScreenInner}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('HOME')} style={styles.backBtn}>
          <Ionicons name="arrow-forward" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>التحدث و Shadowing</Text>
      </View>
      <View style={styles.paddedContentCenter}>
        <View style={styles.aiMicWrapper}>
          <TouchableOpacity activeOpacity={0.8} style={styles.aiMicBtn}>
            <Ionicons name="mic" size={48} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.aiStatusText}>اضغط على الميكروفون وابدأ بالتحدث</Text>
      </View>
    </View>
  );

  // شاشة القاموس الذكي
  const renderDictionaryScreen = () => (
    <View style={styles.fullScreenInner}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('HOME')} style={styles.backBtn}>
          <Ionicons name="arrow-forward" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>القاموس الذكي</Text>
      </View>
      <View style={styles.paddedContent}>
        <View style={styles.interactiveBox}>
          <Text style={styles.wordMain}>Fluency</Text>
          <Text style={styles.wordIPA}>/ˈfluːənsi/</Text>
          <Text style={styles.wordTranslation}>الطلاقة في التحدث والتعبير</Text>
        </View>
      </View>
    </View>
  );

  // شاشة اختبار المستوى
  const renderLevelTestScreen = () => (
    <View style={styles.fullScreenInner}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('HOME')} style={styles.backBtn}>
          <Ionicons name="arrow-forward" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>اختبار المستوى AI</Text>
      </View>
      <View style={styles.paddedContent}>
        <View style={styles.interactiveBox}>
          <Text style={styles.boxTag}>السؤال 1 من 10</Text>
          <Text style={styles.boxTitle}>She ___ to school every morning.</Text>
        </View>
        {['walks', 'walk', 'walking', 'walked'].map((opt, i) => (
          <TouchableOpacity key={i} activeOpacity={0.7} style={styles.quizOptionBtn}>
            <Text style={styles.quizOptionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // شاشة Ultra Elite
  const renderUltraEliteScreen = () => (
    <View style={styles.fullScreenInner}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('HOME')} style={styles.backBtn}>
          <Ionicons name="arrow-forward" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Ultra Elite 💎</Text>
      </View>
      <View style={styles.paddedContentCenter}>
        <Ionicons name="camera" size={64} color="#38bdf8" style={{ marginBottom: 16 }} />
        <Text style={styles.boxTitle}>تعلم عبر الكاميرا</Text>
        <Text style={styles.cardSubTitle}>وجه الكاميرا نحو الأشياء للتعرف على أسمائها فورياً</Text>
      </View>
    </View>
  );

  // موجه الشاشات
  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'HOME': return renderHomeScreen();
      case 'CURRICULUM': return renderCurriculumScreen();
      case 'LESSON': return renderLessonScreen();
      case 'AI_TUTOR': return renderAITutorScreen();
      case 'DICTIONARY': return renderDictionaryScreen();
      case 'LEVEL_TEST': return renderLevelTestScreen();
      case 'ULTRA_ELITE': return renderUltraEliteScreen();
      default: return renderHomeScreen();
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <View style={styles.mainWrapper}>
        {renderActiveScreen()}

        {/* شريط التنقل السفلي المرفوع للحماية من الحافة السفلية للنظام */}
        {currentScreen === 'HOME' && (
          <View style={styles.bottomNavBar}>
            <TouchableOpacity style={styles.navNavItem} onPress={() => setCurrentScreen('HOME')}>
              <Ionicons name="home" size={24} color="#38bdf8" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.navNavItem} onPress={() => setCurrentScreen('CURRICULUM')}>
              <Ionicons name="book" size={24} color="#64748b" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.navNavItem} onPress={() => setCurrentScreen('DICTIONARY')}>
              <Ionicons name="library" size={24} color="#64748b" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.navNavItem} onPress={() => setCurrentScreen('LEVEL_TEST')}>
              <Ionicons name="stats-chart" size={24} color="#64748b" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

// -------------------------------------------------------------
// 3. التنسيقات (المطابقة لـ 1000016082.jpg)
// -------------------------------------------------------------
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: '#000000',
  },
  fullScreenInner: {
    flex: 1,
    backgroundColor: '#000000',
  },
  navHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  navTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backBtn: {
    padding: 6,
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#0f172a',
    borderRadius: 12,
    marginBottom: 16,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 110, // منع احتجاب الأزرار في أسفل الشاشة
  },
  paddedContent: {
    padding: 16,
  },
  paddedContentCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  fullCard: {
    backgroundColor: '#111827',
    borderColor: '#1f2937',
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  cardHeaderRTL: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitleGroup: {
    alignItems: 'flex-end',
    flex: 1,
    paddingLeft: 10,
  },
  cardMainTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  cardMainTitleBold: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'right',
  },
  cardSubTitle: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'right',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  gridCard: {
    backgroundColor: '#111827',
    borderColor: '#1f2937',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    width: '48%',
    alignItems: 'flex-end',
  },
  iconBox: {
    backgroundColor: '#1f2937',
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  gridTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'right',
  },
  gridSub: {
    color: '#9ca3af',
    fontSize: 11,
    textAlign: 'right',
  },
  levelCard: {
    backgroundColor: '#111827',
    borderColor: '#1f2937',
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  levelHeader: {
    flexDirection: 'row-reverse',
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
    borderRadius: 6,
    fontSize: 12,
  },
  levelTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelDesc: {
    color: '#9ca3af',
    fontSize: 13,
    textAlign: 'right',
  },
  interactiveBox: {
    backgroundColor: '#111827',
    borderColor: '#1f2937',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  boxTag: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  boxTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  actionBtn: {
    backgroundColor: '#0284c7',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 8,
  },
  actionBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  wordMain: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  wordIPA: {
    color: '#38bdf8',
    fontSize: 16,
    marginBottom: 12,
  },
  wordTranslation: {
    color: '#9ca3af',
    fontSize: 16,
  },
  quizOptionBtn: {
    backgroundColor: '#111827',
    borderColor: '#1f2937',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    alignItems: 'center',
  },
  quizOptionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  aiMicWrapper: {
    marginBottom: 24,
  },
  aiMicBtn: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#0284c7',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  aiStatusText: {
    color: '#9ca3af',
    fontSize: 16,
  },
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 18, // رفع الأزرار فوق شريط النظام السفلي
  },
  navNavItem: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
});
  
