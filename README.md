# React Interview Exercises Collection

A comprehensive collection of **26** common React interview exercises, fully refactored with **TypeScript**, **Tailwind CSS**, and modern best practices. 

This repository serves as a perfect training ground for developers preparing for technical interviews, covering everything from basic state management to complex architectural patterns.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
The application uses **React Router**. You can navigate between exercises using the sidebar or by entering the specific path (e.g., `/kanban`).

---

## 🛠️ Exercises & Learning Objectives

### 🏗️ Core Exercises
*Focus on fundamental React concepts: State, Props, and Side Effects.*
- **Accordion**: State toggling, conditional rendering.
- **Color Tool**: Random logic, string manipulation, clipboard API.
- **Star Rating**: Hover vs. Click state, array mapping.
- **Image Slider**: Asynchronous data fetching, timer logic.
- **Load More**: Pagination logic, loading states, list concatenation.
- **Guess Color**: Game state management, hex code logic.

### 🧠 Logic & State
*Focus on business logic, data filtering, and complex state updates.*
- **To-Do List**: Array CRUD operations, object state management.
- **Mirror Text**: Controlled inputs, real-time synchronization.
- **Render List**: Client-side filtering, sorting, and performance.
- **Timer**: `setInterval` management, cleanup functions in `useEffect`.
- **Select All**: Checkbox synchronization, derived state.

### 📝 Forms & Layout
*Focus on user input validation, complex forms, and component composition.*
- **Registration**: Form validation, error handling, state submission.
- **Multi-Step**: Progressive state preservation, wizard pattern.
- **Phone Input**: Input masking, regex-based formatting.
- **Props Children**: Mastery of the `children` prop and layout components.
- **Nested Selects**: Dependent state logic (e.g., selecting a country updates the city list).

### 📱 Mini Apps
*Focus on real-world integration, custom hooks, and dashboard architecture.*
- **User Directory**: Debounced API search, user profile rendering.
- **Shopping Cart**: Cart logic, total price calculation, quantity management.
- **Issue Explorer**: Advanced filtering, data aggregation using custom hooks.
- **Mini Kanban**: Status-based workflow, drag-and-drop logic (simplified).
- **Video Dashboard**: Direct DOM interaction using `useRef`.

---

## 💡 How to Add a New Exercise

1. **Create Component**: Add your component in `src/components/[category]/[Name].tsx`.
2. **Refactor & Style**: Ensure it uses **TypeScript** and **Tailwind CSS**.
3. **Update App.tsx**:
    - Add it to the `ExerciseKey` type.
    - Add it to the `EXERCISES` configuration object with its label, category, and component instance.
4. **Verify**: Run `npm run lint` and `npm run build` to ensure everything is correct.

## 🧪 Tech Stack
- **Framework**: React 19 (Vite)
- **Routing**: React Router 7
- **Language**: TypeScript
- **Styling**: Tailwind CSS
