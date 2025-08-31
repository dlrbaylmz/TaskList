import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TaskFormData } from '@/types/task';

// Context'in dışarıya sağlayacağı API'nin tipi
interface TaskContextType {
  tasks: Task[];                                   // Tüm görevler
  loading: boolean;                                // Depodan yükleme durumu
  addTask: (taskData: TaskFormData) => Promise<void>;             // Yeni görev ekleme
  updateTask: (id: string, taskData: Partial<Task>) => Promise<void>; // Görev güncelleme
  deleteTask: (id: string) => Promise<void>;       // Görev silme
  toggleTask: (id: string) => Promise<void>;       // Tamamlandı durumunu tersine çevirme
  searchTasks: (query: string) => Task[];          // Metne göre arama
}

// Context oluşturma (başlangıçta undefined, provider içinde set edilecek)
const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode; // Alt bileşenler
}

const STORAGE_KEY = 'tasks'; // AsyncStorage anahtarı

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]); // Bellekteki görev listesi
  const [loading, setLoading] = useState(true);   // İlk yükleme göstergesi

  // Uygulama ilk açıldığında görevleri yerelden yükle
  useEffect(() => {
    loadTasks();
  }, []);

  // AsyncStorage'tan görevleri oku
  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        // Tarih alanlarını Date'e çevir (JSON parse bunları string yapar)
        const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }));
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false); // Başarılı ya da hatalı, yükleme bitti
    }
  };

  // Görevleri hem belleğe hem AsyncStorage'a yaz
  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
      setTasks(newTasks); // State'i güncelle
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  // Yeni görev oluştur ve kaydet
  const addTask = async (taskData: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(), // Basit id (isteğe göre uuid kullanılabilir)
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const newTasks = [newTask, ...tasks]; // Yeni görevi başa ekle
    await saveTasks(newTasks);
  };

  // Belirtilen id'li görevi kısmi verilerle güncelle
  const updateTask = async (id: string, taskData: Partial<Task>) => {
    const newTasks = tasks.map(task =>
      task.id === id
        ? { ...task, ...taskData, updatedAt: new Date() } // updatedAt'i her güncellemede yenile
        : task
    );
    await saveTasks(newTasks);
  };

  // Görevi listeden kaldır
  const deleteTask = async (id: string) => {
    const newTasks = tasks.filter(task => task.id !== id);
    await saveTasks(newTasks);
  };

  // Tamamlandı durumunu tersine çevir
  const toggleTask = async (id: string) => {
    const newTasks = tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    );
    await saveTasks(newTasks);
  };

  // Basit metin arama (başlık veya açıklama içinde)
  const searchTasks = (query: string): Task[] => {
    if (!query.trim()) return tasks; // Arama boşsa tümünü döndür
    
    const lowercaseQuery = query.toLowerCase();
    return tasks.filter(
      task =>
        task.title.toLowerCase().includes(lowercaseQuery) ||
        task.description.toLowerCase().includes(lowercaseQuery)
    );
  };

  return (
    // Sağlanan değerlerle context'i alt bileşenlere aç
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        searchTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// Hook: Context'e kolay erişim
export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider'); // Provider dışında kullanım hatası
  }
  return context;
}