import {Component, Input, OnInit} from '@angular/core';
import {CartItem, Product} from '../../interface';
import {CartService} from '../../service/cart.service';
import {Observable, Subject} from 'rxjs';
import {debounce} from 'rxjs/operators';
import {Position} from '../../../modules/admin/shared/interfaces';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {

  @Input() title = ''
  @Input() subtitle = ''
  @Input() imageLink = ''
  @Input() description = ''
  @Input() price = 0
  @Input() sale = 0
  @Input() id = ''
  @Input() category = ''
  @Input() counter = 0
  @Input() showMode = false
  product: CartItem
  showBtnCart: boolean

  constructor(
    private cartService: CartService
  ) {

  }

  ngOnInit(): void {
    console.log('counter', this.counter);
    this.product = {
      name: this.title,
      counter: this.counter,
      image: this.imageLink,
      description: this.description,
      price: this.price,
      sale: this.sale,
      uuid: this.id,
    }
  }

  addToCart(): void {
    console.log('this.product', this.product);
    this.showBtnCart = false
    this.cartService.addToCart(this.product)
  }

  onChangedCounter(increased: boolean, uuid: string): void {
    if (increased) {
      this.cartService.increaseCartItem(uuid)
    } else {
      this.cartService.decreaseCartItem(uuid)
    }
  }
}
