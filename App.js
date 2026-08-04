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

export default function App() {
  return (
    <SafeAreaProvider>
      <BunyanCoreApp />
    </SafeAreaProvider>
  );
}

function BunyanCoreApp() {
  const insets = useSafeAreaInsets();
  
  const [currentScreen, setCurrentScreen] = useState('HOME');
  const [userStats] = useState({ xp: 450, streak: 5, level: 'A1' });

  // شريط التنقل السفلي التفاعلي
  const renderBottomNav = () => (
    <View style={[styles.bottomNavBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
      <TouchableOpacity style={styles.navNavItem} onPress={() => setCurrentScreen('HOME')}>
        <Ionicons name="home" size={24} color={currentScreen === 'HOME' ? '#38bdf8' : '#64748b'} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navNavItem} onPress={() => setCurrentScreen('CURRICULUM')}>
        <Ionicons name="book" size={24} color={currentScreen === 'CURRICULUM' ? '#38bdf8' : '#64748b'} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navNavItem} onPress={() => setCurrentScreen('DICTIONARY')}>
        <Ionicons name="library" size={24} color={currentScreen === 'DICTIONARY' ? '#38bdf8' : '#64748b'} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navNavItem} onPress={() => setCurrentScreen('LEVEL_TEST')}>
        <Ionicons name="stats-chart" size={24} color={currentScreen === 'LEVEL_TEST' ? '#38bdf8' : '#64748b'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.mainWrapper, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#090d16" translucent />
      
      {/* محتوى الشاشة */}
      <View style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={[
            styles.scrollContent, 
            { paddingBottom: 100 + insets.bottom } // مساحة إضافية لمنع اختفاء البطاقات خلف الشريط السفلي
          ]} 
          showsVerticalScrollIndicator={false}
        >
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
          <TouchableOpacity activeOpacity={0.8} style={styles.fullCard} onPress={() => setCurrentScreen('CURRICULUM')}>
            <View style={styles.cardHeaderRTL}>
              <Ionicons name="chevron-back" size={20} color="#94a3b8" />
              <View style={styles.cardTitleGroup}>
                <Text style={styles.cardMainTitle}>📚 التدرج التعليمي الكامل</Text>
                <Text style={styles.cardSubTitle}>من صفر الأبجدية حتى إتقان المحادثة الأكاديمية</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* شبكة الميزات (2x2) */}
          <View style={styles.gridContainer}>
            {/* القاموس الذكي */}
            <TouchableOpacity activeOpacity={0.8} style={styles.gridCard} onPress={() => setCurrentScreen('DICTIONARY')}>
              <View style={styles.iconBox}>
                <Ionicons name="book-outline" size={28} color="#FFF" />
              </View>
              <Text style={styles.gridTitle}>القاموس الذكي</Text>
              <Text style={styles.gridSub}>مرادفات، وأمثلة متقدمة، IPA</Text>
            </TouchableOpacity>

            {/* التحدث و Shadowing */}
            <TouchableOpacity activeOpacity={0.8} style={styles.gridCard} onPress={() => setCurrentScreen('AI_TUTOR')}>
              <View style={styles.iconBox}>
                <Ionicons name="mic-outline" size={28} color="#FFF" />
              </View>
              <Text style={styles.gridTitle}>التحدث و Shadowing</Text>
              <Text style={styles.gridSub}>تحليل وتعديل مخارج الحروف</Text>
            </TouchableOpacity>

            {/* اختبار المستوى AI */}
            <TouchableOpacity activeOpacity={0.8} style={styles.gridCard} onPress={() => setCurrentScreen('LEVEL_TEST')}>
              <View style={styles.iconBox}>
                <Ionicons name="pulse-outline" size={28} color="#FFF" />
              </View>
              <Text style={styles.gridTitle}>اختبار المستوى AI</Text>
              <Text style={styles.gridSub}>تقييم دقيق لمستواك الحالي</Text>
            </TouchableOpacity>

            {/* Ultra Elite */}
            <TouchableOpacity activeOpacity={0.8} style={styles.gridCard} onPress={() => setCurrentScreen('ULTRA_ELITE')}>
              <View style={styles.iconBox}>
                <Ionicons name="camera-outline" size={28} color="#FFF" />
              </View>
              <Text style={styles.gridTitle}>Ultra Elite 💎</Text>
              <Text style={styles.gridSub}>تعلم المحيط عبر الكاميرا</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* شريط التنقل السفلي المرفع عن حافة النظام */}
      {renderBottomNav()}
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#000000', // خلفية سوداء مطابقة لتصميمك
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
  },
  cardMainTitle: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubTitle: {
    color: '#9ca3af',
    fontSize: 12,
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
    width: '48%', // كرتين في كل صف
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
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#090d16',
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 12,
  },
  navNavItem: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    alignItems: 'center',
  },
});
  
