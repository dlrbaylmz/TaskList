import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Moon, Sun, Plus } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Task } from '@/types/task';
import { useTheme } from '@/contexts/ThemeContext';
import { useTasks } from '@/contexts/TaskContext';
import { TaskItem } from '@/components/TaskItem';
import { TaskForm } from '@/components/TaskForm';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState } from '@/components/EmptyState';

type FilterType = 'all' | 'active' | 'completed';

export default function TaskList() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { tasks, loading } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchQuery.trim()) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        task =>
          task.title.toLowerCase().includes(lowercaseQuery) ||
          task.description.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Apply completion filter
    switch (filter) {
      case 'active':
        filtered = filtered.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      default:
        break;
    }

    return filtered.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [tasks, searchQuery, filter]);

  const handleAddTask = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleThemeToggle = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    toggleTheme();
  };

  const getFilterText = (filterType: FilterType) => {
    switch (filterType) {
      case 'all': return 'Tümü';
      case 'active': return 'Aktif';
      case 'completed': return 'Tamamlanan';
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.surface,
      paddingTop: 16,
      paddingBottom: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      color: theme.colors.text,
    },
    headerActions: {
      flexDirection: 'row',
      gap: 12,
    },
    themeButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    addButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    stats: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    filterContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    filterButtonActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    filterText: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.textSecondary,
    },
    filterTextActive: {
      color: theme.colors.surface,
    },
    content: {
      flex: 1,
    },
    list: {
      paddingTop: 8,
      paddingBottom: 20,
    },
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>TaskList</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.themeButton} onPress={handleThemeToggle}>
              {isDark ? (
                <Sun size={20} color={theme.colors.text} />
              ) : (
                <Moon size={20} color={theme.colors.text} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
              <Plus size={20} color={theme.colors.surface} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.stats}>
            {completedCount}/{totalCount} görev tamamlandı
          </Text>
          <View style={styles.filterContainer}>
            {(['all', 'active', 'completed'] as FilterType[]).map((filterType) => (
              <TouchableOpacity
                key={filterType}
                style={[
                  styles.filterButton,
                  filter === filterType && styles.filterButtonActive,
                ]}
                onPress={() => setFilter(filterType)}
              >
                <Text
                  style={[
                    styles.filterText,
                    filter === filterType && styles.filterTextActive,
                  ]}
                >
                  {getFilterText(filterType)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      <View style={styles.content}>
        {filteredTasks.length === 0 ? (
          <EmptyState
            title={
              searchQuery 
                ? "Arama sonucu bulunamadı"
                : filter === 'completed'
                ? "Henüz tamamlanan görev yok"
                : filter === 'active'
                ? "Aktif görev bulunamadı"
                : "Henüz görev eklenmemiş"
            }
            description={
              searchQuery
                ? "Farklı anahtar kelimeler deneyin"
                : "Yeni görev eklemek için + butonuna dokunun"
            }
          />
        ) : (
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskItem task={item} onEdit={handleEditTask} />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <TaskForm
        visible={showForm}
        onClose={handleCloseForm}
        editingTask={editingTask}
      />
    </SafeAreaView>
  );
}