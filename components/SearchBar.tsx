import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Search } from 'lucide-react-native'; // Arama ikonu
import { useTheme } from '@/contexts/ThemeContext'; // Tema desteği

// Bileşenin props tipleri
interface SearchBarProps {
  value: string; // Arama çubuğundaki mevcut değer
  onChangeText: (text: string) => void; // Kullanıcı yazdığında çağrılacak fonksiyon
  placeholder?: string; // İçinde gösterilecek ipucu yazısı (opsiyonel)
}

// Arama çubuğu bileşeni
export function SearchBar({ value, onChangeText, placeholder = 'Görevlerde ara...' }: SearchBarProps) {
  const { theme } = useTheme(); // Tema bilgisi

  // Stil tanımları
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', // Yan yana düzen (ikon + input)
      alignItems: 'center', // Dikeyde ortala
      backgroundColor: theme.colors.surface, // Temadan arka plan rengi
      borderRadius: 12, // Yuvarlatılmış köşeler
      marginHorizontal: 16, // Yatay boşluk
      marginBottom: 16, // Alt boşluk
      borderWidth: 1, // Kenarlık kalınlığı
      borderColor: theme.colors.border, // Kenarlık rengi
      paddingHorizontal: 16, // İç yatay boşluk
      shadowColor: theme.colors.shadow, // Gölge rengi
      shadowOffset: { width: 0, height: 1 }, // Gölge yönü
      shadowOpacity: 0.1, // Gölge saydamlığı
      shadowRadius: 2, // Gölge yayılımı
      elevation: 2, // Android gölge desteği
    },
    icon: {
      marginRight: 12, // İkon ile input arasında boşluk
    },
    input: {
      flex: 1, // Kalan alanı kapla
      fontSize: 16, // Yazı boyutu
      color: theme.colors.text, // Temadan yazı rengi
      paddingVertical: 16, // Üst-alt iç boşluk
    },
  });

  return (
    <View style={styles.container}>
      {/* Arama ikonu */}
      <Search size={20} color={theme.colors.textSecondary} style={styles.icon} />
      
      {/* Metin giriş alanı */}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText} // Kullanıcı yazdıkça çalışır
        placeholder={placeholder} // Boşken ipucu yazısı
        placeholderTextColor={theme.colors.textSecondary} // Placeholder rengi
      />
    </View>
  );
}