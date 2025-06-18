import { ThemeProvider } from '@/theme/ThemeProvider';
import { AppContent } from '@/components/AppContext';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}



