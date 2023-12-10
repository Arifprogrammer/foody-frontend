import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = new Cart();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(
    this.getCartFromLocalStorage()
  );

  getLatestCart(): Cart {
    return this.cartSubject.value;
  }

  addToCart(food: Food): void {
    const cartItem = this.cart.items.find((item) => item.food.id === food.id);
    if (cartItem) return;
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id !== foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number): void {
    // console.log(foodId, quantity);
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);
    // console.log(cartItem);
    if (!cartItem) return;
    cartItem.quantity = quantity;
    cartItem.price = cartItem.food.price * quantity;
    console.log(this.cart.items);
    // this.setCartToLocalStorage();
  }

  /* changeQuantity(foodId: string, quantity: number): void {
    let cartItemIndex = this.cart.items.findIndex(
      (item) => item.food.id === foodId
    );
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);
    if (!cartItem) return;
    cartItem.quantity = quantity;
    cartItem.price = cartItem.food.price * quantity;
    this.cart.items.splice(cartItemIndex, 1, cartItem);
    this.setCartToLocalStorage();
  } */

  clearCart(): void {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObsevable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (accumulator, currentItem) => accumulator + currentItem.price,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (accumulator, currentItem) => accumulator + currentItem.quantity,
      0
    );
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
