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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

  const renderHomeScreen = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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

      <TouchableOpacity activeOpacity={0.7} style={styles.fullCard} onPress={() => setCurrentScreen('CURRICULUM')}>
        <View style={styles.cardHeaderRTL}>
          <Ionicons name="chevron-back" size={20} color="#94a3b8" />
          <View style={styles.cardTitleGroup}>
            <Text style={styles.cardMainTitle}>🎓 منهج التعلم الشامل (A0 -> C2)</Text>
            <Text style={styles.cardMainTitleBold}>📚 التدرج التعليمي الكامل</Text>
            <Text style={styles.cardSubTitle}>من صفر الأبجدية حتى إتقان المحادثة الأكاديمية</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.gridContainer}>
        <TouchableOpacity activeOpacity={0.7} style={styles.gridCard} onPress={() => setCurrentScreen('DICTIONARY')}>
          <View style={styles.iconBox}>
            <Ionicons name="book-outline" size={28} color="#FFF" />
          </View>
          <Text style={styles.gridTitle}>القاموس الذكي</Text>
          <Text style={styles.gridSub}>مرادفات، وأمثلة متقدمة، IPA</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styles.gridCard} onPress={() => setCurrentScreen('AI_TUTOR')}>
          <View style={styles.iconBox}>
            <Ionicons name="mic-outline" size={28} color="#FFF" />
          </View>
          <Text style={styles.gridTitle}>التحدث و Shadowing</Text>
          <Text style={styles.gridSub}>تحليل وتعديل مخارج الحروف</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styles.gridCard} onPress={() => setCurrentScreen('LEVEL_TEST')}>
          <View style={styles.iconBox}>
            <Ionicons name="pulse-outline" size={28} color="#FFF" />
          </View>
          <Text style={styles.gridTitle}>اختبار المستوى AI</Text>
          <Text style={styles.gridSub}>تقييم دقيق لمستواك الحالي</Text>
        </TouchableOpacity>

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

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'HOME': return renderHomeScreen();
      case 'CURRICULUM': return renderCurriculumScreen();
      default: return renderHomeScreen();
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <View style={styles.mainWrapper}>
        {renderActiveScreen()}

        {/* شريط التنقل السفلي المرفوع بمسافة أمان كبيرة جداً */}
        {currentScreen === 'HOME' && (
          <View style={styles.bottomNavBar}>
            <TouchableOpacity style={styles.navNavItem} onPress={() => setCurrentScreen('HOME')}>
              <Ionicons name="home" size={26} color="#38bdf8" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.navNavItem} onPress={() => setCurrentScreen('CURRICULUM')}>
              <Ionicons name="book" size={26} color="#64748b" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.navNavItem} onPress={() => setCurrentScreen('DICTIONARY')}>
              <Ionicons name="library" size={26} color="#64748b" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.navNavItem} onPress={() => setCurrentScreen('LEVEL_TEST')}>
              <Ionicons name="stats-chart" size={26} color="#64748b" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

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
    paddingBottom: 130, // مساحة ضخمة أسفل القائمة لضمان عدم اختفاء أي كرت خلف الشريط
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
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'right',
  },
  cardMainTitleBold: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'right',
  },
  cardSubTitle: {
    color: '#9ca3af',
    fontSize: 11,
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
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75, // ارتفاع ثابت وواضح
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'android' ? 35 : 20, // رفع الأيقونات بشكل قاطع فوق أزرار الأندرويد
  },
  navNavItem: {
    padding: 10,
    alignItems: 'center',
  },
});
  
