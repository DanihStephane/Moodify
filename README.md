application under development...

# 🎨 Moodify

A modern web application for creating interactive visual mood boards. Express your creativity through a dynamic drag-and-drop interface.

![Capture d’écran du 2025-01-07 18-07-23](https://github.com/user-attachments/assets/220bda58-46e1-4d97-a932-0e8ddbb6ea28)

![Capture d’écran du 2025-01-07 18-07-29](https://github.com/user-attachments/assets/e4990237-0174-4de3-b52e-52aa26de69e7)

![Capture d’écran du 2025-01-07 18-07-53](https://github.com/user-attachments/assets/4401b906-4d2a-4052-8083-fc0409d5794f)

![Capture d’écran du 2025-01-07 18-08-03](https://github.com/user-attachments/assets/7c834b3c-292c-45bb-ac8b-c6f5be5aa813)


## ✨ Features

### 🖱️ Interactive Drag & Drop
- Drag and position elements freely on your board
- Resize elements with intuitive handles
- Snap-to-grid for precise placement

### 🎯 Element Types
- **Images**: Upload local files or paste URLs
- **Emojis**: Quick-access emoji palette
- **Text**: Customizable fonts and colors
- **Colors**: Dynamic color blocks

### 🎨 Customization
- Resize any element
- Adjust opacity and background colors
- Multiple font options for text
- Color picker for text and backgrounds

### 🌈 Color Palette
- Pre-defined color schemes
- Custom color selection
- Save favorite colors

### 💾 Export Options
- Export as PNG
- High-quality image output
- Preserves all element positions

### 🌓 Themes
- Light and dark mode
- Smooth theme transitions
- Modern UI design

## 🚀 Technical Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Image Handling**: html2canvas

## 🎯 Core Features

```typescript
interface MoodElement {
  id: string;
  type: 'image' | 'emoji' | 'text' | 'color';
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  style?: {
    backgroundColor?: string;
    opacity?: number;
    fontSize?: number;
    fontFamily?: string;
    color?: string;
  };
}
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── MoodBoard.tsx    # Main board component
│   ├── Sidebar.tsx      # Element selection panel
│   └── ui/              # UI components
├── hooks/
│   └── use-theme.ts     # Theme management
└── types.ts             # TypeScript definitions
```

## 🎨 Design Philosophy

Moodify emphasizes user experience through:
- Fluid animations
- Intuitive controls
- Modern design aesthetics
- Responsive layout

## 📱 Responsive Design

- Adapts to all screen sizes
- Touch-friendly interface
- Optimized for mobile and desktop

## 🔒 Privacy

- No data storage
- All content stays in the browser
- Fresh start on each visit

## 🎯 Use Cases

- Design inspiration
- Project planning
- Visual brainstorming
- Mood board creation
- Color scheme exploration

Licence free : https://github.com/DanihStephane

https://linkedin.com/in/danihstephane
