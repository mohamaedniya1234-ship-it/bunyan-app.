import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// -------------------------------------------------------------
// بيانات القاموس والأسئلة للتفاعلية
// -------------------------------------------------------------
const DICTIONARY_DATABASE = [
  { word: 'Fluency', ipa: '/ˈfluːənsi/', translation: 'الطلاقة والتحدث بطلاقة', example: 'She speaks English with great fluency.' },
  { word: 'Vocabulary', ipa: '/vəˈkæbjələri/', translation: 'المفردات والحصيلة اللغوية', example: 'Reading daily expands your vocabulary.' },
  { word: 'Pronunciation', ipa: '/prəˌnʌnsiˈeɪʃn/', translation: 'طريقة نطق الكلمات', example: 'His accent is natural and clear.' },
];

const QUIZ_QUESTIONS = [
  { id: 1, question: 'She ___ to the coffee shop every morning.', options: ['walks', 'walk', 'walking', 'walked'], correct: 0 },
  { id: 2, question: 'If I ___ more time, I would learn Spanish.', options: ['have', 'had', 'will have', 'having'], correct: 1 },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('HOME');
  const [userStats, setUserStats] = useState({ xp: 1250, streak: 7, level: 'A0' });

  // حالات المحادثة الصوتية الذكية
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'أهلاً محمد! أنا مدرسك الشخصي، كيف يمكنني مساعدتك اليوم؟' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // حالات القاموس واختبار المستوى
  const [searchQuery, setSearchQuery] = useState('');
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);

  // إرسال رسالة للمدرس والتفاعل
  const handleSendMessage = (text) => {
    const msgText = text || inputText;
    if (!msgText.trim()) return;

    setChatMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: msgText }]);
    setInputText('');
    setIsAiTyping(true);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: 'ممتاز! استمر في التحدث بالإنجليزية. كسبت +20 نقطة XP!' },
      ]);
      setIsAiTyping(false);
      setUserStats((prev) => ({ ...prev, xp: prev.xp + 20 }));
    }, 1000);
  };

  // اختيار إجابة الاختبار
  const handleQuizSelect = (idx) => {
    setSelectedOpt(idx);
    const isCorrect = idx === QUIZ_QUESTIONS[quizIdx].correct;
    if (isCorrect) setUserStats((prev) => ({ ...prev, xp: prev.xp + 50 }));

    setTimeout(() => {
      if (quizIdx + 1 < QUIZ_QUESTIONS.length) {
        setQuizIdx((prev) => prev + 1);
        setSelectedOpt(null);
      } else {
        alert('أحسنت! أنهيت الاختبار وتم تحديث النقاط بنجاح.');
        setCurrentScreen('HOME');
        setQuizIdx(0);
        setSelectedOpt(null);
      }
    }, 800);
  };

  // -------------------------------------------------------------
  // الشاشة الرئيسية (تطابق هيكل والصورة 100%)
  // -------------------------------------------------------------
  const renderHomeScreen = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* الهيدر العلوي */}
      <View style={styles.topHeader}>
        <View style={styles.logoGroup}>
          <Ionicons name="scan-outline" size={22} color="#FFF" />
          <Text style={styles.logoText}>Bunyan | بنيان</Text>
        </View>

        <View style={styles.statsGroup}>
          <View style={styles.statPillRed}>
            <Text style={styles.statEmoji}>🎯</Text>
            <Text style={styles.statValRed}>{userStats.level}</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statEmoji}>⚡</Text>
            <Text style={styles.statVal}>{userStats.xp}</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statVal}>{userStats.streak}</Text>
          </View>
        </View>
      </View>

      {/* الكرت الأبيض الرئيسي */}
      <View style={styles.heroCard}>
        <View style={styles.aiBadge}>
          <Text style={styles.aiBadgeText}>✨ الذكاء الاصطناعي موجه لمستواك ({userStats.level})</Text>
        </View>
        <Text style={styles.heroTitle}>مدرس AI الشخصي الشامل</Text>
        <Text style={styles.heroDesc}>
          محادثات صوتية تفاعلية، تصحيح الأخطاء فورياً، واقتراح الدروس حسب نقاط ضعفك.
        </Text>

        <TouchableOpacity 
          activeOpacity={0.8} 
          style={styles.heroBtn}
          onPress={() => setCurrentScreen('AI_VOICE')}
        >
          <Text style={styles.heroBtnText}>ابدأ المحادثة الصوتية الآن</Text>
        </TouchableOpacity>
      </View>

      {/* عنوان منهج التعلم */}
      <View style={styles.sectionHeaderRTL}>
        <Text style={styles.sectionTitle}>🎓 منهج التعلم الشامل (A0 -> C2)</Text>
      </View>

      {/* الكرت العريض */}
      <TouchableOpacity 
        activeOpacity={0.8} 
        style={styles.wideCard}
        onPress={() => setCurrentScreen('CURRICULUM')}
      >
        <Ionicons name="chevron-back" size={20} color="#9CA3AF" />
        <View style={styles.wideCardTextGroup}>
          <Text style={styles.wideCardTitle}>📚 التدرج التعليمي الكامل</Text>
          <Text style={styles.wideCardSub}>من صفر الأبجدية حتى إتقان المحادثة الأكاديمية</Text>
        </View>
      </TouchableOpacity>

      {/* شبكة البطاقات (طابق الصورة بالترتيب) */}
      <View style={styles.gridContainer}>
        {/* التحدث و Shadowing */}
        <TouchableOpacity 
          activeOpacity={0.8} 
          style={styles.gridCard}
          onPress={() => setCurrentScreen('AI_VOICE')}
        >
          <View style={styles.gridIconBox}>
            <Ionicons name="mic" size={24} color="#FFF" />
          </View>
          <Text style={styles.gridTitle}>التحدث و Shadowing</Text>
          <Text style={styles.gridSub}>تحليل وتعديل مخارج الحروف</Text>
        </TouchableOpacity>

        {/* القاموس الذكي */}
        <TouchableOpacity 
          activeOpacity={0.8} 
          style={styles.gridCard}
          onPress={() => setCurrentScreen('DICTIONARY')}
        >
          <View style={styles.gridIconBox}>
            <Ionicons name="book" size={24} color="#FFF" />
          </View>
          <Text style={styles.gridTitle}>القاموس الذكي</Text>
          <Text style={styles.gridSub}>مرادفات، وأمثلة متقدمة، IPA</Text>
        </TouchableOpacity>

        {/* Ultra Elite */}
        <TouchableOpacity 
          activeOpacity={0.8} 
          style={styles.gridCard}
          onPress={() => setCurrentScreen('ULTRA_ELITE')}
        >
          <View style={styles.gridIconBox}>
            <Ionicons name="camera" size={24} color="#FFF" />
          </View>
          <Text style={styles.gridTitle}>Ultra Elite 💎</Text>
          <Text style={styles.gridSub}>تعلم المحيط عبر الكاميرا</Text>
        </TouchableOpacity>

        {/* اختبار المستوى AI */}
        <TouchableOpacity 
          activeOpacity={0.8} 
          style={styles.gridCard}
          onPress={() => setCurrentScreen('LEVEL_TEST')}
        >
          <View style={styles.gridIconBox}>
            <Ionicons name="pulse" size={24} color="#FFF" />
          </View>
          <Text style={styles.gridTitle}>اختبار المستوى AI</Text>
          <Text style={styles.gridSub}>تقييم دقيق لمستواك الحالي</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // -------------------------------------------------------------
  // الشاشات التفاعلية الفرعية عند الضغط
  // -------------------------------------------------------------
  const renderSubScreen = () => {
    if (currentScreen === 'AI_VOICE') {
      return (
        <View style={styles.subContainer}>
          <View style={styles.subHeader}>
            <TouchableOpacity onPress={() => setCurrentScreen('HOME')}>
              <Ionicons name="arrow-forward" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.subTitle}>مدرس AI الشخصي</Text>
          </View>

          <ScrollView style={{ flex: 1, padding: 16 }}>
            {chatMessages.map((m) => (
              <View key={m.id} style={[styles.bubble, m.sender === 'user' ? styles.userB : styles.aiB]}>
                <Text style={{ color: '#FFF', fontSize: 15 }}>{m.text}</Text>
              </View>
            ))}
            {isAiTyping && <ActivityIndicator color="#38bdf8" style={{ marginTop: 10 }} />}
          </ScrollView>

          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              placeholder="اكتب بالإنجليزية أو تحدث..."
              placeholderTextColor="#71717A"
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity style={styles.sendIcon} onPress={() => handleSendMessage()}>
              <Ionicons name="send" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (currentScreen === 'DICTIONARY') {
      const filtered = DICTIONARY_DATABASE.filter((i) => i.word.toLowerCase().includes(searchQuery.toLowerCase()));
      return (
        <View style={styles.subContainer}>
          <View style={styles.subHeader}>
            <TouchableOpacity onPress={() => setCurrentScreen('HOME')}>
              <Ionicons name="arrow-forward" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.subTitle}>القاموس الذكي المباشر</Text>
          </View>
          <View style={{ padding: 16 }}>
            <TextInput
              style={styles.searchInput}
              placeholder="ابحث عن كلمة..."
              placeholderTextColor="#71717A"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <ScrollView style={{ marginTop: 12 }}>
              {filtered.map((w, idx) => (
                <View key={idx} style={styles.dictBox}>
                  <Text style={styles.dictWord}>{w.word} <Text style={{ color: '#38bdf8' }}>{w.ipa}</Text></Text>
                  <Text style={styles.dictTrans}>{w.translation}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      );
    }

    if (currentScreen === 'LEVEL_TEST') {
      const q = QUIZ_QUESTIONS[quizIdx];
      return (
        <View style={styles.subContainer}>
          <View style={styles.subHeader}>
            <TouchableOpacity onPress={() => setCurrentScreen('HOME')}>
              <Ionicons name="arrow-forward" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.subTitle}>اختبار المستوى الذكي</Text>
          </View>
          <View style={{ padding: 20 }}>
            <Text style={{ color: '#FFF', fontSize: 18, marginBottom: 20 }}>{q.question}</Text>
            {q.options.map((opt, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.qOpt,
                  selectedOpt !== null && (i === q.correct ? styles.qRight : i === selectedOpt ? styles.qWrong : null),
                ]}
                onPress={() => handleQuizSelect(i)}
              >
                <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16 }}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    return renderHomeScreen();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={{ flex: 1 }}>
        {currentScreen === 'HOME' ? renderHomeScreen() : renderSubScreen()}

        {/* الشريط السفلي ثابت دون تغيير */}
        {currentScreen === 'HOME' && (
          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('HOME')}>
              <Ionicons name="home" size={22} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('DICTIONARY')}>
              <Ionicons name="book-outline" size={22} color="#6B7280" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('AI_VOICE')}>
              <Ionicons name="mic-outline" size={22} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('LEVEL_TEST')}>
              <Ionicons name="stats-chart-outline" size={22} color="#6B7280" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

// -------------------------------------------------------------
// التنسيقات المطابقة للقطة الشاشة 100%
// -------------------------------------------------------------
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000000', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 90 },

  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  logoGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  statsGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#18181B', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  statPillRed: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#18181B', borderColor: '#EF4444', borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  statEmoji: { fontSize: 12 },
  statVal: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
  statValRed: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },

  heroCard: { backgroundColor: '#FFFFFF', borderRadius: 28, padding: 22, alignItems: 'center', marginBottom: 24 },
  aiBadge: { backgroundColor: '#F4F4F5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginBottom: 14 },
  aiBadgeText: { color: '#18181B', fontSize: 12, fontWeight: '600' },
  heroTitle: { color: '#09090B', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  heroDesc: { color: '#71717A', fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  heroBtn: { backgroundColor: '#000000', width: '100%', paddingVertical: 14, borderRadius: 16, alignItems: 'center' },
  heroBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },

  sectionHeaderRTL: { alignItems: 'flex-end', marginBottom: 12 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },

  wideCard: { backgroundColor: '#121214', borderColor: '#27272A', borderWidth: 1, borderRadius: 20, padding: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  wideCardTextGroup: { alignItems: 'flex-end' },
  wideCardTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  wideCardSub: { color: '#71717A', fontSize: 12 },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  gridCard: { backgroundColor: '#121214', borderColor: '#27272A', borderWidth: 1, borderRadius: 20, padding: 16, width: '48%', alignItems: 'flex-end' },
  gridIconBox: { backgroundColor: '#27272A', padding: 10, borderRadius: 14, marginBottom: 14, alignSelf: 'flex-end' },
  gridTitle: { color: '#FFF', fontSize: 15, fontWeight: 'bold', marginBottom: 4, textAlign: 'right' },
  gridSub: { color: '#71717A', fontSize: 11, textAlign: 'right' },

  subContainer: { flex: 1, backgroundColor: '#000000' },
  subHeader: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#27272A' },
  subTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },

  bubble: { padding: 14, borderRadius: 16, marginBottom: 10, maxWidth: '80%' },
  userB: { backgroundColor: '#2563EB', alignSelf: 'flex-end' },
  aiB: { backgroundColor: '#18181B', alignSelf: 'flex-start' },

  inputArea: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderTopColor: '#27272A', alignItems: 'center', gap: 10 },
  input: { flex: 1, backgroundColor: '#18181B', borderRadius: 20, paddingHorizontal: 16, color: '#FFF', height: 44, textAlign: 'right' },
  sendIcon: { backgroundColor: '#2563EB', padding: 10, borderRadius: 22 },

  searchInput: { backgroundColor: '#18181B', borderRadius: 12, padding: 12, color: '#FFF', textAlign: 'right' },
  dictBox: { backgroundColor: '#121214', borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: '#27272A' },
  dictWord: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  dictTrans: { color: '#9CA3AF', fontSize: 13, marginTop: 4, textAlign: 'right' },

  qOpt: { backgroundColor: '#121214', borderColor: '#27272A', borderWidth: 1, padding: 16, borderRadius: 12, marginBottom: 10 },
  qRight: { backgroundColor: '#15803D' },
  qWrong: { backgroundColor: '#B91C1C' },

  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 65, backgroundColor: '#000000', borderTopWidth: 1, borderTopColor: '#18181B', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: Platform.OS === 'android' ? 10 : 0 },
  navItem: { padding: 10 },
});
          
