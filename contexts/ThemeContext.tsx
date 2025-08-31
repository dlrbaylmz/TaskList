import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tema arayüzü: renk paleti ve karanlık/aydınlık modu bilgisi
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    shadow: string;
  };
  dark: boolean; // Şu anki tema karanlık mı?
}

// Açık tema tanımı
const lightTheme: Theme = {
  colors: {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: false,
};

// Koyu tema tanımı
const darkTheme: Theme = {
  colors: {
    primary: '#60A5FA',
    secondary: '#A78BFA',
    accent: '#FBBF24',
    background: '#0F172A',
    surface: '#1E293B',
    card: '#334155',
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    border: '#475569',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
  dark: true,
};

// Context'in dışarıya sağlayacağı değerlerin tipi
interface ThemeContextType {
  theme: Theme;          // Seçili tema (renkler vs.)
  isDark: boolean;       // Koyu mod açık mı?
  toggleTheme: () => void; // Temayı manuel değiştir
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode; // Sağlayıcının sarmalayacağı alt bileşenler
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState<boolean>(false); // Varsayılan aydınlık mod

  useEffect(() => {
    loadThemePreference(); // Kaydedilmiş tercih varsa yükle
    
    // Sistem temasındaki değişiklikleri dinle (örn. kullanıcının cihaz teması değişirse)
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) {
        setIsDark(colorScheme === 'dark');
      }
    });

    // Aboneliği temizle
    return () => subscription.remove();
  }, []);

  // AsyncStorage'tan tema tercihlerini oku; yoksa sistem temasını kullan
  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
      } else {
        const systemTheme = Appearance.getColorScheme();
        setIsDark(systemTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  // Temayı aydınlık/koyu arasında değiştir ve kaydet
  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  // Seçili moda göre tema objesi
  const theme = isDark ? darkTheme : lightTheme;

  return (
    // Context üzerinden tema ve toggle fonksiyonunu çocuqlara ver
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Kullanım kolaylığı için hook: Provider içinde değilse hata fırlatır
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}