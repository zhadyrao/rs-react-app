import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { StarshipClientSide } from './types';
import { downloadCSV } from './download.ts';

describe('downloadCSV', () => {
  const items: StarshipClientSide[] = [
    { name: 'X-Wing', description: 'Fast', id: '1' },
    { name: 'TIE', description: 'Enemy', id: '2' },
  ];

  let link: HTMLAnchorElement;

  beforeEach(() => {
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:mock-url'),
    });

    link = document.createElement('a');
    link.click = vi.fn();

    vi.spyOn(document, 'createElement').mockReturnValue(link);
    vi.spyOn(document.body, 'appendChild');
    vi.spyOn(document.body, 'removeChild');
  });

  it('creates CSV download link and triggers click', () => {
    downloadCSV(items, 'test.csv');

    expect(link.getAttribute('download')).toBe('test.csv');
    expect(link.href).toBe('blob:mock-url');
  });
});
