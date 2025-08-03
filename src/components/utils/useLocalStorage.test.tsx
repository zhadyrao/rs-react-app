import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  const key = 'test-key';

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('returns initial value if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'default'));

    const [value] = result.current;
    expect(value).toBe('default');
  });

  it('returns value from localStorage if available', () => {
    localStorage.setItem(key, JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage(key, 'default'));

    const [value] = result.current;
    expect(value).toBe('stored');
  });

  it('sets a new value and updates localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'init'));

    act(() => {
      const [, setValue] = result.current;
      setValue('newValue');
    });

    const [value] = result.current;
    expect(value).toBe('newValue');
    expect(localStorage.getItem(key)).toBe(JSON.stringify('newValue'));
  });

  it('removes item from localStorage and resets value', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'init'));

    act(() => {
      const [, setValue] = result.current;
      setValue('temp');
    });

    act(() => {
      const [, , remove] = result.current;
      remove();
    });

    const [value] = result.current;
    expect(value).toBe('init');
    expect(localStorage.getItem(key)).toBeNull();
  });

  it('handles JSON parse error gracefully', () => {
    localStorage.setItem(key, 'invalid json');

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { result } = renderHook(() => useLocalStorage(key, 'fallback'));

    const [value] = result.current;
    expect(value).toBe('fallback');
    expect(warnSpy).toHaveBeenCalled();
  });
});
