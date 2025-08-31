import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { X, Plus, Save } from 'lucide-react-native'; // Kapatma, ekleme ve kaydetme ikonları
import * as Haptics from 'expo-haptics'; // Dokunsal geri bildirim
import { Task, TaskFormData } from '@/types/task'; // Tür tanımları
import { useTheme } from '@/contexts/ThemeContext'; // Tema context'i
import { useTasks } from '@/contexts/TaskContext'; // Görev ekleme/güncelleme işlemleri

interface TaskFormProps {
  visible: boolean;     // Modal görünür mü?
  onClose: () => void;  // Modal kapatma callback'i
  editingTask?: Task | null; // Düzenlenen görev (varsa)
}

export function TaskForm({ visible, onClose, editingTask }: TaskFormProps) {
  const { theme } = useTheme(); // Tema renkleri
  const { addTask, updateTask } = useTasks(); // Görev işlemleri
  const [title, setTitle] = useState(''); // Başlık alanı
  const [description, setDescription] = useState(''); // Açıklama alanı
  const [isSubmitting, setIsSubmitting] = useState(false); // Kaydetme sırasında durum

  // Modal açıldığında veya editingTask değiştiğinde formu doldur/temizle
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask, visible]);

  // Kaydet/Güncelle işlemi
  const handleSubmit = async () => {
    if (!title.trim()) return; // Boş başlıkla kaydetme

    setIsSubmitting(true);
    
    if (Platform.OS !== 'web') {
      // Dokunsal geri bildirim (web'de çalışmaz)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    try {
      const taskData: TaskFormData = {
        title: title.trim(),
        description: description.trim(),
      };

      // Düzenleme modunda ise güncelle, değilse yeni görev ekle
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
      } else {
        await addTask(taskData);
      }

      handleClose(); // Başarılı işlem sonrası kapat
    } catch (error) {
      console.error('Error saving task:', error); // Hata loglama
    } finally {
      setIsSubmitting(false);
    }
  };

  // Formu sıfırla ve modalı kapat
  const handleClose = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  // Stil tanımları (tema ile dinamik)
  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Yarı saydam arka plan
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 24,
      margin: 20,
      width: '90%',
      maxWidth: 400,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 8,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      gap: 16, // Alanlar arası dikey boşluk
    },
    inputContainer: {
      gap: 8, // Etiket ile input arası boşluk
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },
    input: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: theme.colors.text,
      minHeight: 52,
    },
    textArea: {
      minHeight: 100,
      textAlignVertical: 'top', // Android'de çok satırlı hizalama
    },
    submitButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginTop: 8,
      opacity: isSubmitting ? 0.7 : 1, // Kaydetme esnasında görsel geri bildirim
    },
    submitButtonText: {
      color: theme.colors.surface,
      fontSize: 16,
      fontWeight: '600',
    },
    submitIcon: {
      marginRight: 8,
    },
    submitContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    // Modal: dışarı tıklayınca kapanacak, içerik fade ile gelir
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      {/* Klavye açıldığında içeriklerin kapanmaması için */}
      <KeyboardAvoidingView 
        style={styles.overlay} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Overlay'e tıklayınca modal kapanır */}
        <TouchableOpacity style={styles.overlay} onPress={handleClose} activeOpacity={1}>
          {/* İçerik alanına tıklamaların overlay'e düşmemesi için */}
          <TouchableOpacity style={styles.container} activeOpacity={1}>
            {/* Başlık ve kapatma butonu */}
            <View style={styles.header}>
              <Text style={styles.title}>
                {editingTask ? 'Görevi Düzenle' : 'Yeni Görev'}
              </Text>
              <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <X size={18} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Form alanları (kaydırılabilir) */}
            <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
              {/* Başlık alanı (zorunlu) */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Başlık *</Text>
                <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Görev başlığını girin..."
                  placeholderTextColor={theme.colors.textSecondary}
                  autoFocus // Modal açıldığında klavye odak
                />
              </View>

              {/* Açıklama alanı (opsiyonel) */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Açıklama</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Görev açıklamasını girin..."
                  placeholderTextColor={theme.colors.textSecondary}
                  multiline
                  numberOfLines={4}
                />
              </View>

              {/* Kaydet/Ekle butonu */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={!title.trim() || isSubmitting} // Başlık boşsa veya işlem sürüyorsa pasif
              >
                <View style={styles.submitContent}>
                  {editingTask ? (
                    <Save size={20} color={theme.colors.surface} style={styles.submitIcon} />
                  ) : (
                    <Plus size={20} color={theme.colors.surface} style={styles.submitIcon} />
                  )}
                  <Text style={styles.submitButtonText}>
                    {isSubmitting ? 'Kaydediliyor...' : editingTask ? 'Güncelle' : 'Ekle'}
                  </Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
}