import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Plus } from 'lucide-react-native'; // "+" simgesi için ikon
import * as Haptics from 'expo-haptics'; // Dokunsal geri bildirim (titreşim vb.)
import { useTheme } from '@/contexts/ThemeContext'; // Tema desteği

// Bileşenin props tipleri
interface FloatingActionButtonProps {
  onPress: () => void; // Tıklanınca çalışacak fonksiyon
}

// Floating Action Button (FAB) bileşeni
export function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  const { theme } = useTheme(); // Tema bilgisi
  const [isPressed, setIsPressed] = useState(false); // Butona basılıp basılmadığını tutar

  // Butona tıklandığında çalışacak fonksiyon
  const handlePress = () => {
    if (Platform.OS !== 'web') {
      // Web dışında cihazlarda titreşim efekti çalıştır
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress(); // Dışarıdan gelen fonksiyonu çalıştır
  };

  // Stil tanımları
  const styles = StyleSheet.create({
    container: {
      position: 'absolute', // Ekranda sabit konumlandırma
      bottom: 24, // Alt boşluk
      right: 24,  // Sağ boşluk
      width: 56,  // Buton genişliği
      height: 56, // Buton yüksekliği
      borderRadius: 28, // Yuvarlak buton
      backgroundColor: theme.colors.primary, // Temadan gelen ana renk
      alignItems: 'center', // İkonu ortala (yatay)
      justifyContent: 'center', // İkonu ortala (dikey)
      shadowColor: theme.colors.shadow, // Gölge rengi
      shadowOffset: { width: 0, height: 4 }, // Gölge yönü
      shadowOpacity: 0.3, // Gölge opaklığı
      shadowRadius: 8, // Gölge yayılımı
      elevation: 8, // Android için gölge efekti
      transform: [{ scale: isPressed ? 0.95 : 1 }], // Basılıyken küçülme efekti
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress} // Tıklama olayı
      onPressIn={() => setIsPressed(true)}  // Basılınca küçült
      onPressOut={() => setIsPressed(false)} // Bırakınca normale dön
      activeOpacity={0.8} // Basıldığında hafif şeffaflık
    >
      {/* "+" ikonu */}
      <Plus size={24} color={theme.colors.surface} strokeWidth={2.5} />
    </TouchableOpacity>
  );
}