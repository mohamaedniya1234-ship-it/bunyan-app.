import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleCardPress = (title, desc) => {
    setSelectedFeature({ title, desc });
  };

  return (
    <View style={styles.fullScreenContainer}>
      {/* جعل شريط الحالة شفافاً ليمتد التطبيق للشاشة الكاملة */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

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

        {/* محتوى الشاشات */}
        {activeTab === 'home' && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* بنر الذكاء الاصطناعي */}
            <TouchableOpacity
              style={styles.aiBanner}
              activeOpacity={0.8}
              onPress={() => setActiveTab('ai')}
            >
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

            {/* مسارات التعلم */}
            <Text style={styles.sectionTitle}>مسارات التعلم 📚</Text>

            <View style={styles.gridContainer}>
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.7}
                onPress={() =>
                  handleCardPress(
                    'التحدث والنطق',
                    'تحليل النطق حرفاً بحرف وتقييم الطلاقة...'
                  )
                }
              >
                <View style={[styles.iconBox, { backgroundColor: '#3B82F620' }]}>
                  <Ionicons name="mic" size={26} color="#3B82F6" />
                </View>
                <Text style={styles.cardTitle}>التحدث والنطق</Text>
                <Text style={styles.cardSub}>تحليل النطق وتمارين Shadowing</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.7}
                onPress={() =>
                  handleCardPress(
                    'محاكاة المواقف',
                    'قصص تفاعلية ومحاكاة مواقف السفر والعمل...'
                  )
                }
              >
                <View style={[styles.iconBox, { backgroundColor: '#10B98120' }]}>
                  <Ionicons name="compass" size={26} color="#10B981" />
                </View>
                <Text style={styles.cardTitle}>محاكاة المواقف</Text>
                <Text style={styles.cardSub}>قصص تفاعلية ومقابلات عمل</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.7}
                onPress={() =>
                  handleCardPress(
                    'الكلمات والقواعد',
                    'بطاقات Flashcards وتكرار متباعد...'
                  )
                }
              >
                <View style={[styles.iconBox, { backgroundColor: '#8B5CF620' }]}>
                  <Ionicons name="book" size={26} color="#8B5CF6" />
                </View>
                <Text style={styles.cardTitle}>الكلمات والقواعد</Text>
                <Text style={styles.cardSub}>بطاقات Flashcards وتكرار متباعد</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.7}
                onPress={() =>
                  handleCardPress(
                    'Ultra Elite 💎',
                    'تعلم بالكاميرا والترجمة الفورية...'
                  )
                }
              >
                <View style={[styles.iconBox, { backgroundColor: '#F59E0B20' }]}>
                  <Ionicons name="star" size={26} color="#F59E0B" />
                </View>
                <Text style={styles.cardTitle}>Ultra Elite 💎</Text>
                <Text style={styles.cardSub}>تعلم بالكاميرا وترجمة فورية</Text>
              </TouchableOpacity>
            </View>

            {/* التحدي اليومي */}
            <TouchableOpacity
              style={styles.challengeCard}
              activeOpacity={0.8}
              onPress={() =>
                handleCardPress(
                  'التحدي اليومي 🎮',
                  'متبقي لك 2 دقائق لتأكيد إنجاز اليوم!'
                )
              }
            >
              <View style={styles.challengeHeader}>
                <Ionicons name="trophy" size={22} color="#F59E0B" />
                <Text style={styles.challengeTitle}>التحدي اليومي 🎮</Text>
              </View>
              <Text style={styles.challengeDesc}>
                تحدث لمدة 5 دقائق مع معلم الذكاء الاصطناعي
              </Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '60%' }]} />
              </View>
              <Text style={styles.progressText}>3 / 5 دقائق (60%)</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {/* شاشة AI Tutor */}
        {activeTab === 'ai' && (
          <View style={styles.centerScreen}>
            <Ionicons name="hardware-chip" size={60} color="#6366F1" />
            <Text style={styles.screenTitle}>معلم الذكاء الاصطناعي 🧠</Text>
            <Text style={styles.screenSub}>
              اضغط على الميكروفون لبدء المحادثة الصوتية الفورية.
            </Text>
            <TouchableOpacity
              style={styles.micCircle}
              onPress={() => Alert.alert('المحاكي الصوتي', 'جاري الاتصال بـ AI Tutor...')}
            >
              <Ionicons name="mic" size={32} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* شاشة المجتمع */}
        {activeTab === 'community' && (
          <View style={styles.centerScreen}>
            <Ionicons name="people" size={60} color="#10B981" />
            <Text style={styles.screenTitle}>مجتمع بنيان 👥</Text>
            <Text style={styles.screenSub}>
              التبادل اللغوي والدردشات الجماعية مع متحدثين أصليين.
            </Text>
          </View>
        )}

        {/* شاشة الإحصائيات */}
        {activeTab === 'stats' && (
          <View style={styles.centerScreen}>
            <Ionicons name="stats-chart" size={60} color="#F59E0B" />
            <Text style={styles.screenTitle}>إحصائيات التعلم 📊</Text>
            <Text style={styles.screenSub}>
              الكلمات المتقنة: 142 | ساعات التعلم: 8.5 ساعة
            </Text>
          </View>
        )}

        {/* النافذة المنبثقة */}
        {selectedFeature && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>{selectedFeature.title}</Text>
              <Text style={styles.modalDesc}>{selectedFeature.desc}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setSelectedFeature(null)}
              >
                <Text style={styles.modalButtonText}>إغلاق</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

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
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
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
    paddingBottom: 90,
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
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  screenTitle: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },
  screenSub: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  micCircle: {
    backgroundColor: '#6366F1',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#1E293B',
    width: '90%',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDesc: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 12,
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  bottomNav: {
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
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
                
