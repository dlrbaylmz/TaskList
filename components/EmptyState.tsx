import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckSquare } from 'lucide-react-native'; // İkon kütüphanesi
import { useTheme } from '@/contexts/ThemeContext'; // Tema bilgisini almak için context

// Bileşenin alacağı props tipleri
interface EmptyStateProps {
  title: string;        // Başlık metni
  description: string;  // Açıklama metni
}

// Boş durum ekranı bileşeni
export function EmptyState({ title, description }: EmptyStateProps) {
  const { theme } = useTheme(); // Uygulamanın temasını alıyoruz

  // Stil tanımları
  const styles = StyleSheet.create({
    container: {
      flex: 1, // Tüm alanı kapla
      alignItems: 'center', // Ortaya hizala (yatay)
      justifyContent: 'center', // Ortaya hizala (dikey)
      padding: 32, // İç boşluk
    },
    icon: {
      marginBottom: 16, // İkon ile yazı arasında boşluk
      opacity: 0.6, // Biraz şeffaflık
    },
    title: {
      fontSize: 18, // Başlık boyutu
      fontWeight: '600', // Orta kalın yazı
      color: theme.colors.text, // Temadan gelen yazı rengi
      textAlign: 'center', // Ortalanmış yazı
      marginBottom: 8, // Başlık ile açıklama arasına boşluk
    },
    description: {
      fontSize: 14, // Açıklama yazı boyutu
      color: theme.colors.textSecondary, // İkincil yazı rengi
      textAlign: 'center', // Ortalanmış yazı
      lineHeight: 20, // Satır yüksekliği
    },
  });

  return (
    <View style={styles.container}>
      {/* İkon */}
      <CheckSquare 
        size={64} 
        color={theme.colors.textSecondary} 
        style={styles.icon}
      />
      {/* Başlık */}
      <Text style={styles.title}>{title}</Text>
      {/* Açıklama */}
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}