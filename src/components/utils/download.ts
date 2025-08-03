import type { StarshipClientSide } from './types.ts';

export const downloadCSV = (
  items: StarshipClientSide[],
  fileName = 'N_items.csv'
) => {
  const headers = ['Name', 'Description', 'Created'];
  const rows = items.map((item) => [item.name, item.description, item.id]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
