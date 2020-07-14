export interface User {
  email: string,
  password: string,
  returnSecureToken?: boolean
}

export interface imageFile {
  expiry: string
  key: string
  link: string
  success?: true
  error?: true
}

export interface Category {
  id?: string,
  name: string,
  url: string,
  date: Date
}

export interface Product {
  id?: string,
  title: string,
  description: string,
  subtitle: string,
  price: number,
  sale?: number,
  category?: string,
  img: string
  date: Date
}

export interface Item {
  id: string,
  count?: number
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
}

export interface FbCreateResponse {
  name: string
}

export interface Totals {
  subTot: number;
  tax: number;
  grandTot: number;
}

export interface CartItem {
  price: number;
  image: string;
  name: string;
  counter: number;
  description: string;
  heart?: boolean;
  uuid?: any;
  sale?: number;
}

export interface StateTree {
  store: CartItem[];
  cart: CartItem[];
  tot: Totals,
  checkout: boolean;
};
