import ResultsList from './components/ResultsList/ResultsList.tsx';
import { Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound.tsx';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ResultsList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
