import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../service/cart.service';
import {CartItem, Product} from '../../interface';
import {Observable, Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {

  itemsCart: CartItem[] = []
  netWorth: number = 0
  // netWorthProducts$: Subject<number> = new Subject<number>()

  constructor(
    private cartService: CartService
  ) { }

  clearCart() {
    this.itemsCart = this.cartService.clearCart()
  }

  ngOnInit(): void {
    this.itemsCart = this.cartService.getItems()
    console.log('items', this.itemsCart.length > 0);
    this.getNetWorthCart()
    // this.netWorthProducts$.next(this.cartService.getNetWorthCart())
  }

  onChangedCounter(increased: boolean, uuid: string) {
    if (increased) {
      this.cartService.increaseCartItem(uuid)
      // this.netWorthProducts$.next( this.cartService.getNetWorthCart())
      this.getNetWorthCart()
    } else {
      this.cartService.decreaseCartItem(uuid)
      // this.netWorthProducts$.next( this.cartService.getNetWorthCart())
      this.getNetWorthCart()
    }
  }


  private getNetWorthCart() {
    this.netWorth =  this.itemsCart.reduce((acc, item) =>
      acc + parseInt(String(item.price * item.counter)), 0)
  }
}
