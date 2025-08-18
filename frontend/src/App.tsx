import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import { useAuthCtx } from './state/AuthContext';

export default function App() {
  const { token } = useAuthCtx();
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/menu" element={<RequireAuth isAuthed={!!token}><MenuPage /></RequireAuth>} />
      <Route path="/cart" element={<RequireAuth isAuthed={!!token}><CartPage /></RequireAuth>} />
      <Route path="*" element={<Navigate to={token ? '/menu' : '/login'} replace />} />
    </Routes>
  );
}

function RequireAuth({ isAuthed, children }: { isAuthed: boolean; children: JSX.Element }) {
  if (!isAuthed) return <Navigate to="/login" replace />;
  return children;
}


