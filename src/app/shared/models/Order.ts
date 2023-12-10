import { CartItem } from './CartItem';

export class Order {
  id!: string;
  items!: CartItem[];
  totalPrice!: number;
  name!: string;
  email!: string;
  isAdmin!: boolean;
  paymentId!: string;
  createdAt!: string;
  status!: string;
}
