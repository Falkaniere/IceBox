# 🧊 My Fridge App

A minimalist React Native app to help you **track what’s in your fridge**, manage expiration dates, and avoid food waste.  
Built with **React Native** and designed for both **iOS and Android**.

---

## ✨ Features

- 📦 Register fridge items with name, quantity, and expiration date
- 🔎 Search and filter items (All, Expiring Soon, Expired)
- 🧾 Minimalist card-style item list
- ⚡ Floating Action Button (FAB) for quick item addition
- 🎨 Cross-platform UI (Android & iOS)

---

## 📱 Screenshots

**need to be update**

_(Add screenshots or mockups here)_

---

## 🚀 Getting Started

**need to be update**

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) or React Native CLI
- iOS Simulator (Xcode) or Android Emulator (Android Studio) / physical device

### Installation

```bash

# Clone repository
git clone https://github.com/your-username/my-fridge-app.git

# Navigate to project folder
cd my-fridge-app

# Install dependencies
npm install
# or
yarn install
```

## Run the App

```bash
# Start development server
npx expo start

# Run on iOS
npx expo run:ios

# Run on Android
npx expo run:android

```

## Project struct

IceBox/
│
├── src/
│ ├── app/
│ │ ├── config/ # App configurations (Firebase, env, etc.)
│ │ │ └── firebase.ts
│ │ │
│ │ ├── navigation/ # Navigation configuration
│ │ │ └── RootNavigator.tsx
│ │ │
│ │ ├── providers/ # Global providers (Auth, Theme, etc.)
│ │ │ └── AuthProvider.tsx
│ │ │
│ │ ├── utils/ # Shared utilities
│ │ │ └── expiry.ts
│ │ │
│ │ └── index.tsx # App entry point
│ │
│ ├── features/ # Feature-based architecture
│ │
│ │ ├── auth/
│ │ │ ├── api/ # Auth API logic
│ │ │ └── model/ # Auth types & business logic
│ │ │
│ │ ├── fridge/
│ │ │ ├── components/
│ │ │ │ ├── AddItem/
│ │ │ │ ├── FridgeItem/
│ │ │ │ ├── FridgeList/
│ │ │ │ ├── Header/
│ │ │ │ └── Search/
│ │ │ │
│ │ │ ├── hooks/ # Custom hooks (useFridgeItems)
│ │ │ ├── model/ # fridgeItem, filters, etc.
│ │ │ └── api/ # Fridge-related API logic
│ │ │
│ │ ├── products/
│ │ │ ├── api/
│ │ │ └── model/
│ │ │
│ │ └── scanner/
│ │ ├── api/
│ │ ├── model/
│ │ └── screens/
│ │
│ └── screens/ # App-level screens
│ ├── Home/
│ │ ├── index.tsx
│ │ └── styles.ts
│ │
│ └── Login/
│ ├── index.tsx
│ └── styles.ts
│
└── package.json
