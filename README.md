# FillMyData

FillMyData is an Expo-based React Native application designed to automate the process of filling out online forms, particularly Google Forms. It allows users to store their personal information in a profile and use it to quickly populate form fields across various websites.

## Features

- **Profile Management**: Store and manage personal information securely
- **Auto-Fill Functionality**: Automatically populate form fields with saved data
- **Cross-Platform**: Works on iOS, Android, and Web
- **User-Friendly Interface**: Intuitive design with haptic feedback and themed components

## Project Structure

```
FillMyData/
├── app/                    # Application screens (Expo Router)
│   ├── _layout.tsx        # Root layout component
│   ├── index.tsx          # Home screen
│   ├── fill.tsx           # Auto-fill functionality screen
│   ├── profile.tsx        # User profile management
│   └── modal.tsx          # Modal components
├── assets/                # Static assets
│   └── images/            # Image files
├── components/            # Reusable UI components
│   ├── ui/                # UI-specific components
│   │   ├── collapsible.tsx
│   │   ├── icon-symbol.ios.tsx
│   │   └── icon-symbol.tsx
│   ├── external-link.tsx
│   ├── haptic-tab.tsx
│   ├── hello-wave.tsx
│   ├── parallax-scroll-view.tsx
│   └── themed-text.tsx
│   └── themed-view.tsx
├── constants/             # Application constants
│   └── theme.ts          # Theme configuration
├── hooks/                 # Custom React hooks
│   ├── use-color-scheme.ts
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts
└── scripts/               # Utility scripts
    └── reset-project.js  # Project reset script
```

### Directory Explanations

- **app/**: Contains the main application screens implemented using Expo Router for file-based routing. Each `.tsx` file represents a different screen or layout in the app.
- **assets/**: Stores static assets like images, fonts, and other media files used throughout the application.
- **components/**: Houses reusable React components. The `ui/` subdirectory contains UI-specific components like collapsible elements and icons.
- **constants/**: Defines application-wide constants, including theme colors, fonts, and other configuration values.
- **hooks/**: Custom React hooks for managing state, side effects, and reusable logic across components.
- **scripts/**: Contains utility scripts for project maintenance, such as resetting the project to a clean state.

## How It Works

1. **Setup Profile**: Users create and manage their personal information in the profile screen.
2. **Auto-Fill Process**: On the fill screen, users can input form URLs or navigate to forms, and the app will automatically populate fields using the stored profile data.
3. **Cross-Platform Compatibility**: The app leverages Expo's universal platform support to run seamlessly on mobile devices and web browsers.

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd FillMyData
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

### Running the App

In the output, you'll find options to open the app in a:
- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Development

This project uses [file-based routing](https://docs.expo.dev/router/introduction) with Expo Router. Edit files in the `app/` directory to modify screens and navigation.

### Reset Project

To get a fresh project structure:

```bash
npm run reset-project
```

This moves starter code to `app-example/` and creates a blank `app/` directory.

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Framework and platform for universal React applications
- **TypeScript**: Type-safe JavaScript
- **Expo Router**: File-based routing for React Native

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)

## Community

Join the Expo community:
- [Expo on GitHub](https://github.com/expo/expo)
- [Discord Community](https://chat.expo.dev)
