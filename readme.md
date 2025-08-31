├── app/
│   ├── _layout.tsx
│   ├── +not-found.tsx
│   ├── index.tsx
├── assets/
│   ├── images/
├── components/
│   ├── EmptyState.tsx
│   ├── FloatingActionButton.tsx
│   ├── SearchBar.tsx
│   ├── TaskForm.tsx
│   ├── TaskItem.tsx
├── contexts/
│   ├── TaskContext.tsx
│   ├── ThemeContext.tsx
├── hooks/
│   ├── useFrameworkReady.ts
├── types/
│   ├── task.ts
│   ├── router.d.ts
├── .expo/
├── .gitignore
├── app.json
├── package.json
├── tsconfig.json


Önemli Dosya ve Klasörler
	•	app/: Ana sayfa ve yönlendirme dosyaları.
	•	components/: Yeniden kullanılabilir bileşenler.
	•	TaskForm.tsx: Görev ekleme/düzenleme formu.
	•	TaskItem.tsx: Tek bir görevi temsil eden bileşen.
	•	EmptyState.tsx: Görev olmadığında gösterilen bileşen.
	•	contexts/: TaskContext ve ThemeContext gibi global context dosyaları.
	•	hooks/: Özel React hook’ları.
	•	types/: TypeScript tip tanımları.
	•	task.ts: Görevle ilgili tipler (Task, TaskForm

    Özellikler
	•	✅ Görev ekleme, düzenleme ve silme
	•	✅ Görevleri tamamlanmış veya tamamlanmamış olarak işaretleme
	•	✅ Başlık ve açıklamaya göre arama
	•	✅ Görevleri filtreleme (Tümü, Aktif, Tamamlanmış)
	•	✅ Koyu ve aydınlık tema desteği


    Kullanılan Teknolojiler
	•	React Native – Mobil uygulama geliştirme
	•	TypeScript – Tip güvenliği ve daha iyi geliştirme deneyimi
	•	AsyncStorage – Yerel veri depolama
	•	Lucide Icons – Modern ikon seti
	•	Expo – React Native geliştirme ortamı


Kurulum
	1.	Projeyi klonlayın:
    git clone <repository-url>
    cd <repository-folder>
    
    2.  Bağımlılıkları yükleyin:
    npm install

     3.Uygulamayı başlatın:
    npm start


    Kullanım
	•	➕ Yeni görev eklemek için sağ alt köşedeki “+” butonuna tıklayın.
	•	✏️ Görevleri düzenlemek için görev kartındaki düzenle ikonuna basın.
	•	🗑️ Görevleri silmek için çöp kutusu ikonunu kullanın.
	•	☑️ Görevleri tamamlamak için görev kartına veya checkbox’a tıklayın.
	•	🔍 Görevleri filtrelemek için üst kısımdaki filtre butonlarını kullanın.


    
