import axios from 'axios';

export const http = axios.create();

export function setAuthToken(token: string | null) {
  if (token) {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Auth token set:', token);
    console.log('Current headers:', http.defaults.headers.common);
  } else {
    delete http.defaults.headers.common['Authorization'];
    console.log('Auth token removed');
  }
}

export const AuthAPI = {
  async login(username: string, password: string) {
    console.log('AuthAPI.login called with:', { username, password });
    const res = await http.post('/auth/login', { username, password });
    console.log('AuthAPI.login response:', res.data);
    return res.data?.data?.accessToken as string;
  },

  async quickLogin(quickAccessCode: string) {
    console.log('AuthAPI.quickLogin called with:', { quickAccessCode });
    const res = await http.post('/auth/quick-login', { quickAccessCode });
    console.log('AuthAPI.quickLogin response:', res.data);
    return res.data?.data?.accessToken as string;
  },
};

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  available: boolean;
  imageUrl?: string;
  modifiers: { id: number; name: string; additionalPrice: number }[];
};

export type Category = { id: number; name: string };
export type SubCategory = { id: number; name: string; category?: Category };

export const MenuAPI = {
  async listItems(filter?: { categoryId?: number | null; subCategoryId?: number | null }) {
    const params: any = {};
    if (filter?.categoryId) params.categoryId = filter.categoryId;
    if (filter?.subCategoryId) params.subCategoryId = filter.subCategoryId;
    const res = await http.get<MenuItem[]>('/menu/menu-item', { params });
    return res.data;
  },
  async calculate(menuItemId: number, modifiersId: number[]) {
    const res = await http.post('/menu/prices/calculate', { menuItemId, modifiersId });
    return res.data as { basePrice: number; modifiersPrice: number };
  },
};

export const CategoryAPI = {
  async listCategories() {
    const res = await http.get<Category[]>('/menu/category');
    return res.data;
  },
  async listSubCategories() {
    const res = await http.get<SubCategory[]>('/menu/category/sub');
    return res.data;
  }
};

export const OrderAPI = {
  async createTakeaway(items: { menuItemId: number; modifiersId: number[]; quantity: number }[]) {
    console.log('OrderAPI.createTakeaway called with:', { items });
    console.log('Request headers:', http.defaults.headers.common);
    const res = await http.post('/order/order/takeaway', { customer: null, tableId: null, items });
    console.log('OrderAPI.createTakeaway response:', res.data);
    return res.data;
  },
  async createDineIn(tableId: number, items: { menuItemId: number; modifiersId: number[]; quantity: number }[]) {
    const res = await http.post('/order/order', { customer: null, tableId, items });
    return res.data;
  },
  async createDelivery(customer: { name: string; phone: string; address?: string } | null, items: { menuItemId: number; modifiersId: number[]; quantity: number }[]) {
    const res = await http.post('/order/order/delivery', { customer, tableId: null, items });
    return res.data;
  },
  async listOrders() {
    const res = await http.get('/order/order/list');
    return res.data;
  },
  async updateOrderStatus(orderId: number, status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED') {
    const res = await http.put(`/order/order/${orderId}/status`, { status });
    return res.data;
  }
};

export type GuestTable = {
  id: number;
  name: string;
  capacity: number;
  location: string;
  status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED';
};

export const TableAPI = {
  async listTables() {
    const res = await http.get<GuestTable[]>('/order/order/tables');
    return res.data;
  }
};


