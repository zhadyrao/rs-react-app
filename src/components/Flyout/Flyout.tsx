import React from 'react';
import { useAppDispatch, useAppSelector } from '../utils/hooks.ts';
import { downloadCSV } from '../utils/download.ts';
import { unselectAll } from '../../features/starships/starshipSlice.ts';

const Flyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) =>
    Object.values(state.starshipSlice.selected)
  );

  if (selectedItems.length === 0) return null;

  const handleDownload = () => {
    const fileName = `${selectedItems.length}_items.csv`;
    downloadCSV(selectedItems, fileName);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md px-4 py-3 flex justify-between items-center z-50">
      <span className="font-medium">
        {selectedItems.length} item(s) selected
      </span>
      <div className="space-x-2">
        <button
          className="bg-green-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          onClick={() => dispatch(unselectAll())}
        >
          Unselect all
        </button>
        <button
          className="bg-green-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Flyout;
