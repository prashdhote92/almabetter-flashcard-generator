# 📚 Flashcard Generator

Create custom flashcard sets with terms, definitions, and images to enhance your learning experience.

## ✨ Features

### 🎨 Create Flashcard Page
- **Create Flashcard Groups**: Add a title, description, and optional cover image for your flashcard set
- **Add Multiple Terms**: Each flashcard can contain multiple terms with definitions and images
- **Dynamic Term Management**: 
  - Add unlimited terms using the "Add More" button
  - Delete unwanted terms with the trash icon
  - Edit existing terms with the edit icon
- **Form Validation**: Built with Formik for robust form handling and validation
- **Image Upload**: Support for visual learning with optional images for both groups and terms

### 📖 My Flashcards Page
- **Flashcard Gallery**: View all your created flashcard sets in an organized grid layout
- **Quick Access**: Click on any flashcard to view its details
- **Persistent Storage**: All flashcards are saved in local storage for persistence across sessions

### 🔍 Flashcard Details Page
- **Interactive View**: 
  - Terms displayed on the left sidebar for easy navigation
  - Selected term details shown in the center panel
  - Carousel navigation with arrows to browse through terms
- **Share Functionality**: 
  - Share button opens a modal with the flashcard link
  - One-click copy to clipboard functionality
  - Social media sharing options (optional)
- **Download & Print** (Optional): Generate PDF versions of your flashcards

## 🛠️ Technologies Used

- **[React](https://react.dev/)** - UI library for building interactive interfaces
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server
- **[React Router DOM](https://reactrouter.com/)** - Client-side routing
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - Modern Redux for state management
- **[React Redux](https://react-redux.js.org/)** - Official React bindings for Redux
- **[Formik](https://formik.org/)** - Form handling and validation
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library
- **Local Storage API** - Data persistence


## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd almabetter-flashcard-generator-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The optimized production build will be generated in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🔄 Redux State Management

This project uses **Redux Toolkit** for centralized state management, providing a predictable state container for your flashcard data.

### Redux Architecture

**Store Configuration** ([`src/redux/store.js`](src/redux/store.js))
- Configured using `configureStore` from Redux Toolkit
- Includes the flashcard reducer for managing flashcard state

**Flashcard Slice** ([`src/redux/flashcardSlice.js`](src/redux/flashcardSlice.js))
- Manages all flashcard-related state and actions
- Automatically syncs with localStorage for data persistence

### Available Actions

```javascript
import { addFlashcard, updateFlashcard, deleteFlashcard } from './redux/flashcardSlice'

// Add a new flashcard
dispatch(addFlashcard({ 
  id: 'flashcard-name', 
  data: { groupName, description, image, flashCards } 
}))

// Update an existing flashcard
dispatch(updateFlashcard({ 
  id: 'flashcard-name', 
  data: updatedData 
}))

// Delete a flashcard
dispatch(deleteFlashcard('flashcard-name'))
```

### Selectors

```javascript
import { selectAllFlashcards, selectFlashcardById } from './redux/flashcardSlice'

// Get all flashcards as an object
const flashcards = useSelector(selectAllFlashcards)

// Get a specific flashcard by ID
const flashcard = useSelector(state => selectFlashcardById(state, 'flashcard-name'))
```

### Benefits of Redux Implementation

- ✅ **Centralized State**: All flashcard data in one place
- ✅ **Predictable Updates**: Actions clearly define how state changes
- ✅ **Easy Debugging**: Redux DevTools support for time-travel debugging
- ✅ **Persistent Data**: Automatic localStorage sync
- ✅ **Better Testing**: Easy to test actions and reducers independently
- ✅ **Scalability**: Easy to add new features and state slices

---