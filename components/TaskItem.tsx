import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Check, Edit3, Trash2 } from 'lucide-react-native'; // Tamamlandı işareti, düzenle ve sil ikonları
import * as Haptics from 'expo-haptics'; // Dokunsal geri bildirim (titreşim)
import { Task } from '@/types/task'; // Görev tipi
import { useTheme } from '@/contexts/ThemeContext'; // Tema renkleri
import { useTasks } from '@/contexts/TaskContext'; // Görev işlemleri (toggle/sil)

interface TaskItemProps {
  task: Task;                 // Gösterilecek görev
  onEdit: (task: Task) => void; // Düzenleme tıklandığında çağrılır
}

export function TaskItem({ task, onEdit }: TaskItemProps) {
  const { theme } = useTheme(); // Temadan renkleri al
  const { toggleTask, deleteTask } = useTasks(); // Görev tamamlama/silme işlemleri
  const [isPressed, setIsPressed] = useState(false); // Basılı animasyon durumu

  // Tamamlandı durumunu değiştir
  const handleToggle = async () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Hafif titreşim
    }
    await toggleTask(task.id);
  };

  // Görevi sil
  const handleDelete = async () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); // Orta titreşim
    }
    await deleteTask(task.id);
  };

  // Düzenleme modalını aç
  const handleEdit = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onEdit(task);
  };

  // Stil tanımları (tema ve durumlara göre dinamik)
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      marginVertical: 6,
      marginHorizontal: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      transform: [{ scale: isPressed ? 0.98 : 1 }], // Basılıyken hafif küçülme efekti
    },
    content: {
      flexDirection: 'row', // Checkbox + metin + aksiyonlar yanyana
      alignItems: 'flex-start',
      flex: 1,
    },
    checkboxContainer: {
      marginRight: 12,
      marginTop: 2,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: task.completed ? theme.colors.success : theme.colors.border, // Duruma göre kenarlık
      backgroundColor: task.completed ? theme.colors.success : 'transparent', // Tamamlandıysa dolu
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      flex: 1, // Metin alanı kalan genişliği kaplar
      marginRight: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      textDecorationLine: task.completed ? 'line-through' : 'none', // Tamamlandıysa üstü çizili
      opacity: task.completed ? 0.6 : 1, // Tamamlandıysa soluk
      marginBottom: 4,
    },
    description: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      lineHeight: 20,
      textDecorationLine: task.completed ? 'line-through' : 'none',
      opacity: task.completed ? 0.6 : 1,
    },
    actions: {
      flexDirection: 'row',
      gap: 8, // Düzenle/Sil butonları arası boşluk
    },
    actionButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface, // Nötr zemin
    },
    editButton: {
      backgroundColor: theme.colors.secondary + '20', // Sekonder renk ile hafif vurgu
    },
    deleteButton: {
      backgroundColor: theme.colors.error + '20', // Hata rengi ile hafif vurgu
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPressIn={() => setIsPressed(true)}    // Basılınca küçülme efekti başlasın
      onPressOut={() => setIsPressed(false)}  // Bırakınca normale dönsün
      onPress={handleToggle}                  // Kartın kendisine basınca tamamlandı/tamamlanmadı değişir
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Checkbox alanı: sadece checkbox'a basınca da toggle çalışsın */}
        <TouchableOpacity style={styles.checkboxContainer} onPress={handleToggle}>
          <View style={styles.checkbox}>
            {task.completed && (
              <Check size={14} color={theme.colors.surface} strokeWidth={3} /> // Tamamlandı ikonunu doldur
            )}
          </View>
        </TouchableOpacity>

        {/* Başlık + açıklama */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{task.title}</Text>
          {task.description ? (
            <Text style={styles.description}>{task.description}</Text>
          ) : null}
        </View>

        {/* Aksiyon butonları: düzenle ve sil */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={handleEdit}
          >
            <Edit3 size={16} color={theme.colors.secondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Trash2 size={16} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}