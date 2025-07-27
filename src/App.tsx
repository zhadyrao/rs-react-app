import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound.tsx';
import MasterDetailPage from './components/MasterDetailPage/MasterDetailPage.tsx';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/1" replace />} />
      <Route path="/:page" element={<MasterDetailPage />} />
      <Route path="/:page/:detailsId" element={<MasterDetailPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
