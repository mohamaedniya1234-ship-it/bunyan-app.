import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* الهيدر العلوي - بيانات المستخدم والإحصائيات */}
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* بنر مدرس الذكاء الاصطناعي الرئيسي */}
        <TouchableOpacity style={styles.aiBanner} activeOpacity={0.85}>
          <View style={styles.aiBannerContent}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>الذكاء الاصطناعي 🧠</Text>
            </View>
            <Text style={styles.aiTitle}>مدرس AI الشخصي</Text>
            <Text style={styles.aiSub}>محادثات صوتية طبيعية، تصحيح فوري، وشرح القواعد بالسياق.</Text>
            <View style={styles.aiButton}>
              <Ionicons name="mic-sharp" size={18} color="#0F172A" />
              <Text style={styles.aiButtonText}>ابدأ المحادثة الصوتية الآن</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* أقسام التعلم الرئيسية */}
        <Text style={styles.sectionTitle}>مسارات التعلم 📚</Text>

        <View style={styles.gridContainer}>
          {/* التحدث والنطق */}
          <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={[styles.iconBox, { backgroundColor: '#3B82F620' }]}>
              <Ionicons name="mic" size={26} color="#3B82F6" />
            </View>
            <Text style={styles.cardTitle}>التحدث والنطق</Text>
            <Text style={styles.cardSub}>تحليل النطق حرفاً بحرف وتمارين Shadowing</Text>
          </TouchableOpacity>

          {/* الانغماس ومحاكاة المواقف */}
          <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={[styles.iconBox, { backgroundColor: '#10B98120' }]}>
              <Ionicons name="compass" size={26} color="#10B981" />
            </View>
            <Text style={styles.cardTitle}>محاكاة المواقف</Text>
            <Text style={styles.cardSub}>قصص تفاعلية، سفر، مقابلات عمل</Text>
          </TouchableOpacity>

          {/* القواعد والكلمات */}
          <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={[styles.iconBox, { backgroundColor: '#8B5CF620' }]}>
              <Ionicons name="book" size={26} color="#8B5CF6" />
            </View>
            <Text style={styles.cardTitle}>الكلمات والقواعد</Text>
            <Text style={styles.cardSub}>بطاقات Flashcards وتكرار متباعد</Text>
          </TouchableOpacity>

          {/* ميزات Ultra Elite */}
          <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={[styles.iconBox, { backgroundColor: '#F59E0B20' }]}>
              <Ionicons name="star" size={26} color="#F59E0B" />
            </View>
            <Text style={styles.cardTitle}>Ultra Elite 💎</Text>
            <Text style={styles.cardSub}>تعلم بالكاميرا، ترجمة فورية وأفلام</Text>
          </TouchableOpacity>
        </View>

        {/* التحدي اليومي والتحفيز */}
        <View style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <Ionicons name="trophy" size={22} color="#F59E0B" />
            <Text style={styles.challengeTitle}>التحدي اليومي 🎮</Text>
          </View>
          <Text style={styles.challengeDesc}>تحدث لمدة 5 دقائق مع معلم الذكاء الاصطناعي</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '60%' }]} />
          </View>
          <Text style={styles.progressText}>3 / 5 دقائق (60%)</Text>
        </View>

      </ScrollView>

      {/* شريط التنقل السفلي */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setActiveTab('home')} style={styles.navItem}>
          <Ionicons name="home" size={22} color={activeTab === 'home' ? '#6366F1' : '#64748B'} />
          <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>الرئيسية</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('ai')} style={styles.navItem}>
          <Ionicons name="hardware-chip" size={22} color={activeTab === 'ai' ? '#6366F1' : '#64748B'} />
          <Text style={[styles.navText, activeTab === 'ai' && styles.navTextActive]}>AI Tutor</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('community')} style={styles.navItem}>
          <Ionicons name="people" size={22} color={activeTab === 'community' ? '#6366F1' : '#64748B'} />
          <Text style={[styles.navText, activeTab === 'community' && styles.navTextActive]}>المجتمع</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('stats')} style={styles.navItem}>
          <Ionicons name="stats-chart" size={22} color={activeTab === 'stats' ? '#6366F1' : '#64748B'} />
          <Text style={[styles.navText, activeTab === 'stats' && styles.navTextActive]}>الإحصائيات</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  userInfo: {
    alignItems: 'flex-end',
  },
  appName: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: 'bold',
  },
  welcomeText: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  statBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statText: {
    color: '#F8FAFC',
    fontWeight: 'bold',
    fontSize: 13,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  aiBanner: {
    backgroundColor: '#6366F1',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  aiBannerContent: {
    alignItems: 'flex-start',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  aiTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  aiSub: {
    color: '#E0E7FF',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'left',
    marginBottom: 15,
  },
  aiButton: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  aiButtonText: {
    color: '#0F172A',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'right',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#1E293B',
    width: '48%',
    borderRadius: 16,
    padding: 15,
    alignItems: 'flex-end',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'right',
  },
  cardSub: {
    color: '#94A3B8',
    fontSize: 11,
    textAlign: 'right',
    lineHeight: 15,
  },
  challengeCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 18,
  },
  challengeHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  challengeTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  challengeDesc: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'right',
    marginBottom: 12,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 4,
  },
  progressText: {
    color: '#64748B',
    fontSize: 11,
    textAlign: 'left',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    color: '#64748B',
    fontSize: 11,
  },
  navTextActive: {
    color: '#6366F1',
    fontWeight: 'bold',
  },
});
    
