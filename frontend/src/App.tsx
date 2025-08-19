import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import { useAuthCtx } from './state/AuthContext';
import OrderModePage from './pages/OrderModePage';
import OrdersPage from './pages/OrdersPage';
import DineInPage from './pages/DineInPage';
import DeliveryPage from './pages/DeliveryPage';

export default function App() {
  const { token } = useAuthCtx();
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/menu" element={<RequireAuth isAuthed={!!token}><MenuPage /></RequireAuth>} />
      <Route path="/cart" element={<RequireAuth isAuthed={!!token}><CartPage /></RequireAuth>} />
      <Route path="/order-mode" element={<RequireAuth isAuthed={!!token}><OrderModePage /></RequireAuth>} />
      <Route path="/order-mode/dine-in" element={<RequireAuth isAuthed={!!token}><DineInPage /></RequireAuth>} />
      <Route path="/order-mode/delivery" element={<RequireAuth isAuthed={!!token}><DeliveryPage /></RequireAuth>} />
      <Route path="/orders" element={<RequireAuth isAuthed={!!token}><OrdersPage /></RequireAuth>} />
      <Route path="*" element={<Navigate to={token ? '/order-mode' : '/login'} replace />} />
    </Routes>
  );
}

function RequireAuth({ isAuthed, children }: { isAuthed: boolean; children: JSX.Element }) {
  if (!isAuthed) return <Navigate to="/login" replace />;
  return children;
}


