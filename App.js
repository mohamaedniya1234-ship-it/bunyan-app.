import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);
  const [showCurriculum, setShowCurriculum] = useState(true);
  const [selectedModule, setSelectedModule] = useState(null);

  const handleUserSpeakToggle = () => {
    setIsUserSpeaking(!isUserSpeaking);
  };

  return (
    <View style={styles.container}>
      {/* شاشة الاتصال أو المحتوى الرئيسي */}
      <View style={styles.mainContent}>
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

      {/* مودال المسارات وحماية شاشة الدرس الكاملة */}
      <Modal visible={showCurriculum} animationType="slide" statusBarTranslucent={true}>
        <SafeAreaView style={styles.fullModalSafeArea}>

          {selectedModule ? (
            <View style={styles.lessonsScreenContainer}>
              <View style={styles.topModalHeader}>
                <TouchableOpacity onPress={() => setSelectedModule(null)}>
                  <Ionicons name="arrow-forward" size={26} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.modalHeaderTitle}>{selectedModule.title}</Text>
                <TouchableOpacity onPress={() => setShowCurriculum(false)}>
                  <Ionicons name="close" size={26} color="#FFF" />
                </TouchableOpacity>
              </View>

              <ScrollView contentContainerStyle={styles.lessonScrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.lessonBanner}>
                  <Text style={styles.lessonBannerTag}>منصة تفاعلي • درس بنيان</Text>
                  <Text style={styles.lessonBannerTitle}>{selectedModule.topic}</Text>
                </View>

                <View style={styles.lessonSectionCard}>
                  <Text style={styles.lessonSectionTitle}>💡 شرح الدرس والأهداف</Text>
                  <Text style={styles.lessonSectionText}>
                    إلى المستويات المتقدمة A0 في هذا الدرس سنتعرف على كيفية النطق الصحيح للمفردات واستخدامها في سياقات يومية واقعية من.
                  </Text>
                </View>

                <View style={styles.lessonSectionCard}>
                  <Text style={styles.lessonSectionTitle}>📚 المفردات والجمل الرئيسية</Text>

                  <View style={styles.vocabularyItem}>
                    <TouchableOpacity style={styles.audioPlayBtn}>
                      <Ionicons name="volume-high" size={20} color="#000" />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.vocabEnText}>Hello / Welcome</Text>
                      <Text style={styles.vocabArText}>مرحباً / أهلاً بك</Text>
                    </View>
                  </View>
                </View>
                     {/* كرت الأمثلة والتمارين */}
                <View style={styles.lessonSectionCard}>
                  <Text style={styles.lessonSectionTitle}>💬 أمثلة وتطبيقات عمليّة</Text>
                  <Text style={styles.lessonSectionText}>
                    يمكنك استخدام هذه العبارات في المحادثات اليومية لممارسة النطق والتحدث بثقة.
                  </Text>
                </View>

                {/* زر إغلاق الدرس والعودة */}
                <TouchableOpacity 
                  style={styles.closeLessonBtn} 
                  onPress={() => setSelectedModule(null)}
                >
                  <Text style={styles.closeLessonBtnText}>العودة لقائمة الدروس</Text>
                </TouchableOpacity>

              </ScrollView>
            </View>
          ) : (
            /* قائمة المسارات والدروس */
            <ScrollView contentContainerStyle={styles.curriculumListContent} showsVerticalScrollIndicator={false}>
              <View style={styles.curriculumHeaderContainer}>
                <Text style={styles.curriculumHeaderTitle}>📚 مسار التعلّم والتطبيقات</Text>
                <Text style={styles.curriculumSubTitle}>اختر وحدة دراسية للبدء في التمارين والمفردات</Text>
              </View>

              {/* بطاقة الدرس الأول */}
              <TouchableOpacity 
                style={styles.moduleCard} 
                onPress={() => setSelectedModule({
                  title: 'الدرس الأول: التعارف والتحيات',
                  topic: 'المحادثات اليومية والنطق الصحيح'
                })}
              >
                <View style={styles.moduleCardBadge}>
                  <Text style={styles.moduleCardBadgeText}>مبتدئ A0</Text>
                </View>
                <Text style={styles.moduleCardTitle}>1. التحيات والتعارف الأساسي</Text>
                <Text style={styles.moduleCardDesc}>تعلم كيف تقدم نفسك وتتعرف على الآخرين باللغة الإنجليزية بسهولة.</Text>
              </TouchableOpacity>

              {/* بطاقة الدرس الثاني */}
              <TouchableOpacity 
                style={styles.moduleCard} 
                onPress={() => setSelectedModule({
                  title: 'الدرس الثاني: الأسئلة الشائعة',
                  topic: 'التعبير عن الرأي والاستفسار'
                })}
              >
                <View style={styles.moduleCardBadge}>
                  <Text style={styles.moduleCardBadgeText}>أساسي A1</Text>
                </View>
                <Text style={styles.moduleCardTitle}>2. الأسئلة والتعبير عن الرأي</Text>
                <Text style={styles.moduleCardDesc}>صياغة الأسئلة الشائعة والتعبير عن وجهات النظر في مواقف الحياة اليومية.</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

        </SafeAreaView>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  interactiveSpeakBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  interactiveSpeakBtnActive: {
    backgroundColor: '#3b82f6',
  },
  endCallBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullModalSafeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  lessonsScreenContainer: {
    flex: 1,
  },
  topModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  modalHeaderTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lessonScrollContent: {
    padding: 16,
  },
  lessonBanner: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  lessonBannerTag: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  lessonBannerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lessonSectionCard: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  lessonSectionTitle: {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 8,
  },
  lessonSectionText: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'right',
    lineHeight: 22,
  },
  vocabularyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#334155',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  audioPlayBtn: {
    backgroundColor: '#38bdf8',
    padding: 8,
    borderRadius: 20,
  },
  vocabEnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  vocabArText: {
    color: '#cbd5e1',
    fontSize: 13,
  },
  closeLessonBtn: {
    backgroundColor: '#3b82f6',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeLessonBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  curriculumListContent: {
    padding: 16,
  },
  curriculumHeaderContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  curriculumHeaderTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  curriculumSubTitle: {
    color: '#94a3b8',
    fontSize: 14,
  },
  moduleCard: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  moduleCardBadge: {
    backgroundColor: '#0284c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  moduleCardBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  moduleCardTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'right',
  },
  moduleCardDesc: {
    color: '#94a3b8',
    fontSize: 13,
    textAlign: 'right',
  },
});
        
