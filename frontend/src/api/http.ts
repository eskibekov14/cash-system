import axios from 'axios';

export const http = axios.create();

export function setAuthToken(token: string | null) {
  if (token) http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete http.defaults.headers.common['Authorization'];
}

export const AuthAPI = {
  async login(username: string, password: string) {
    const res = await http.post('/auth/login', { username, password });
    return res.data?.data?.accessToken as string;
  },
};

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  available: boolean;
  modifiers: { id: number; name: string; additionalPrice: number }[];
};

export const MenuAPI = {
  async listItems() {
    const res = await http.get<MenuItem[]>('/menu/menu-item');
    return res.data;
  },
  async calculate(menuItemId: number, modifiersId: number[]) {
    const res = await http.post('/menu/prices/calculate', { menuItemId, modifiersId });
    return res.data as { basePrice: number; modifiersPrice: number };
  },
};

export const OrderAPI = {
  async createTakeaway(items: { menuItemId: number; modifiersId: number[]; quantity: number }[]) {
    const res = await http.post('/order/order/takeaway', { customer: null, tableId: null, items });
    return res.data;
  },
};


