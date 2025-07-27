import React from 'react';
import ResultsList from '../ResultsList/ResultsList.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail.tsx';
import NotFound from '../NotFound/NotFound.tsx';

const MasterDetailPage = () => {
  const { page, detailsId } = useParams();
  const navigate = useNavigate();
  const pageNum = Number(page) || 1;

  const closeDetails = () => {
    navigate(`/${pageNum}`);
  };

  const isValidPage = page && /^\d+$/.test(page);
  if (!isValidPage) return <NotFound />;

  return (
    <div className="flex min-h-screen">
      <div className={`w-full ${detailsId ? 'md:w-1/2' : ''} p-4`}>
        <ResultsList
          currentPage={pageNum.toString()}
          selectedId={detailsId?.toString()}
        />
      </div>
      {detailsId && (
        <div className="w-full md:w-1/2 border-l p-4 bg-gray-50 relative">
          <button
            onClick={closeDetails}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          >
            ✖
          </button>
          <ItemDetail id={detailsId} />
        </div>
      )}
    </div>
  );
};

export default MasterDetailPage;
