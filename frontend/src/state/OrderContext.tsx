import React, { createContext, useContext, useMemo, useState } from 'react';

export type OrderMode = 'TAKEAWAY' | 'DINE_IN' | 'DELIVERY';

type OrderContextValue = {
  mode: OrderMode;
  setMode: (m: OrderMode) => void;
  tableId: number | null;
  setTableId: (id: number | null) => void;
  deliveryNote: string;
  setDeliveryNote: (s: string) => void;
  customerName: string;
  setCustomerName: (s: string) => void;
  customerPhone: string;
  setCustomerPhone: (s: string) => void;
};

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<OrderMode>('TAKEAWAY');
  const [tableId, setTableId] = useState<number | null>(null);
  const [deliveryNote, setDeliveryNote] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');

  const value = useMemo(
    () => ({ mode, setMode, tableId, setTableId, deliveryNote, setDeliveryNote, customerName, setCustomerName, customerPhone, setCustomerPhone }),
    [mode, tableId, deliveryNote, customerName, customerPhone]
  );
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrderCtx() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrderCtx must be used within <OrderProvider>');
  return ctx;
}


