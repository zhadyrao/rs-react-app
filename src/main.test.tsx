import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './components/ThemeContext/ThemeContext';

describe('App integration render', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(document.body).toBeDefined();
  });
});
