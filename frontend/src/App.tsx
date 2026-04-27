import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { SignPath } from './pages/SignPath';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="signpath" element={<SignPath />} />
          {/* Add other routes here as they are built */}
          <Route path="*" element={<div className="p-8 text-center text-gray-500">Onprogress</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
