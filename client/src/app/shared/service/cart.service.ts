import { Injectable } from '@angular/core';
import {CartItem, Item, Product} from '../interface';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {OrderService} from '../../modules/admin/page/order-page/order.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: CartItem[] = []
  listProductInCart$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(this.items)
  itemsCountInCart$: BehaviorSubject<number> = new BehaviorSubject<number>(this.items.length)
  counterItem$: Subject<number> = new Subject<number>()

  constructor(
  ) {
  }

  addToCart(product: CartItem): void {
    product.counter = 1
    this.items.push(product)
    this.listProductInCart$.next(this.items)
    this.itemsCountInCart$.next(this.items.length)
  }

  removeFromCart(uuid: string): void {
    this.items = this.items.filter(item => item.uuid !== uuid)
    this.listProductInCart$.next(this.items)
    this.itemsCountInCart$.next(this.items.length)
  }

  increaseCartItem(uuid: string): void {
      this.items.map(item => (
        item.uuid === uuid && item.counter++
      ))
      this.listProductInCart$.next(this.items)
  }

  decreaseCartItem(uuid: string): void {
    this.items.map(item => (
      item.uuid === uuid
        ? item.counter === 1 ? item.counter : item.counter--
        : item.counter
    ))
    this.listProductInCart$.next(this.items)
  }


  getItemsCart(): Observable<CartItem[]> {
    return this.listProductInCart$
  }

  getItems(): CartItem[] {
    return this.items
  }

  getNetWorthCart(): number {
    return this.items.reduce((acc, item) =>
      acc + parseInt(String(item.price * item.counter)), 0)
  }

  getCountCart(): Observable<number> {
    return this.itemsCountInCart$
  }

  clearCart(): CartItem[] {
    // this.items = []
    // this.items.map(item => {
    //   item.counter = 0
    // })
    // this.listProductInCart$.next(this.items)
    // setTimeout(()=>{
    //
    // },100)

    this.items = []
    this.listProductInCart$.next(this.items)

    this.itemsCountInCart$.next(this.items.length)
    return this.items
  }
}
