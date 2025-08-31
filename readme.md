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


Screenshots

 <img width="1125" height="2436" alt="IMG_3144" src="https://github.com/user-attachments/assets/f95451dd-84d1-4d3b-b7ae-abf0fb34bf58" />
<img width="1125" height="2436" alt="IMG_3145" src="https://github.com/user-attachments/assets/dd53eb0a-1f26-4a49-bc7d-91eeac0ec661" />
<img width="1125" height="2436" alt="IMG_3149" src="https://github.com/user-attachments/assets/ffbd2211-7a99-469b-b125-677e163c32c8" />
<img width="1125" height="2436" alt="IMG_3147" src="https://github.com/user-attachments/assets/d06f61f0-cbfc-459c-a4bd-c2317ee8c979" />
<img width="1125" height="2436" alt="IMG_3150" src="https://github.com/user-attachments/assets/f1549f74-22b4-4483-bbed-dd2a8040d887" />
<img width="1125" height="2436" alt="IMG_3148" src="https://github.com/user-attachments/assets/1e30c150-5666-4d17-9146-745287bf249c" />
<img width="1125" height="2436" alt="IMG_3146" src="https://github.com/user-attachments/assets/d7df3776-c1de-4af1-a015-4e2d8a21109d" />

	
