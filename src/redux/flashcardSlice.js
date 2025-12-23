import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('flashCardApp');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state from localStorage', err);
    return {};
  }
};

// Save state to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('flashCardApp', serializedState);
  } catch (err) {
    console.error('Could not save state to localStorage', err);
  }
};

const initialState = {
  flashcards: loadFromLocalStorage(),
};

const flashcardSlice = createSlice({
  name: 'flashcards',
  initialState,
  reducers: {
    addFlashcard: (state, action) => {
      const { id, data } = action.payload;
      state.flashcards[id] = data;
      // Save to localStorage whenever state changes
      saveToLocalStorage(state.flashcards);
    },
    updateFlashcard: (state, action) => {
      const { id, data } = action.payload;
      if (state.flashcards[id]) {
        state.flashcards[id] = { ...state.flashcards[id], ...data };
        saveToLocalStorage(state.flashcards);
      }
    },
    deleteFlashcard: (state, action) => {
      const id = action.payload;
      delete state.flashcards[id];
      saveToLocalStorage(state.flashcards);
    },
    clearAllFlashcards: (state) => {
      state.flashcards = {};
      saveToLocalStorage(state.flashcards);
    },
    loadFlashcards: (state) => {
      state.flashcards = loadFromLocalStorage();
    },
  },
});

export const {
  addFlashcard,
  updateFlashcard,
  deleteFlashcard,
  clearAllFlashcards,
  loadFlashcards,
} = flashcardSlice.actions;

// Selectors
export const selectAllFlashcards = (state) => state.flashcards.flashcards;
export const selectFlashcardById = (state, id) => state.flashcards.flashcards[id];
export const selectFlashcardsArray = (state) => Object.values(state.flashcards.flashcards);

export default flashcardSlice.reducer;
