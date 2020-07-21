import { Component, OnInit } from '@angular/core';
import {CartService} from '../../shared/service/cart.service';
import {CartItem, Item, Product} from '../../shared/interface';
import {CounterService} from '../../shared/service/counter.service';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MaterialService} from '../../shared/service/material.service';
import {OrdersService} from '../../modules/admin/shared/service/orders.service';
import {Order, OrderPosition} from '../../modules/admin/shared/interfaces';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  items$: Observable<CartItem[]>
  countProductInCart$: Observable<number>
  itemsCart: CartItem[]
  counts: number
  persons: number = 1
  oSub: Subscription
  netWorth: number = 0
  netWorthProducts$: BehaviorSubject<number> = new BehaviorSubject<number>(this.cartService.getNetWorthCart())

  constructor(
    private cartService: CartService,
    private router: Router,
    private ordersService: OrdersService
  ) {
  }

  ngOnInit(): void {
    this.itemsCart = this.cartService.getItems()
    this.countProductInCart$ = this.cartService.getCountCart()
    this.cartService.getItemsCart().subscribe(items => {

      this.itemsCart = items
    })
  }

  backMenu() {
    this.router.navigate(['/menu'])
  }

  clearCart() {
    this.itemsCart = this.cartService.clearCart()
  }

  onChanged(increased: boolean, uuid: string) {
    if (increased) {
      this.cartService.increaseCartItem(uuid)
      this.netWorthProducts$.next( this.cartService.getNetWorthCart())
    } else {
      this.cartService.decreaseCartItem(uuid)
      this.netWorthProducts$.next( this.cartService.getNetWorthCart())
    }
  }

  onChangedPerson(increased: boolean) {
    this.persons = increased ? ++this.persons : -- this.persons
  }


  private getNetWorthCart() {
    return this.itemsCart.reduce((acc, item) =>
      acc + parseInt(String(item.price * item.counter)), 0)
  }

  remove(uuid: string) {
    this.cartService.removeFromCart(uuid)
    this.netWorthProducts$.next( this.cartService.getNetWorthCart())
  }

  checkout() {
    const list = []
    this.itemsCart.map(item => {
      list.push({
        name: item.name,
        quantity: item.counter,
        cost: item.price
      })
    })
    const order: Order = {
      list: list
    }

    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Заказ был добавлен. Ожидайте звонка оператора`)
        this.clearCart()
      },
      error => MaterialService.toast(error.error.message),
      () => {
      }
    )
  }
}
