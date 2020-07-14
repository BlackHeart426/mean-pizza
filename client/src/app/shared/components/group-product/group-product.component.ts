import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CartItem } from '../../interface';
import {ProductsService} from '../../service/products.service';
import {Observable, Subscription} from 'rxjs';
import {CartService} from '../../service/cart.service';
import {PositionsService} from '../../../modules/admin/shared/service/positions.service';
import {Category, Position} from '../../../modules/admin/shared/interfaces';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-group-product',
  templateUrl: './group-product.component.html',
  styleUrls: ['./group-product.component.scss']
})
export class GroupProductComponent implements OnInit, OnDestroy {

  @Input() category: Category
  listProductInCart$: Observable<CartItem[]>
  gSub: Subscription
  products: Position[] = []
  countProductInCart$: Observable<number>
  counterCert: number

  constructor(
    private productService: ProductsService,
    private positionsService: PositionsService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    this.listProductInCart$ = this.cartService.getItemsCart()
    this.countProductInCart$ = this.cartService.getCountCart()
    this.gSub = this.positionsService.fetch(this.category._id).subscribe(products => {
      if (products != null) {
        products.map(
          (item) => {
            item.quantity = 0
            return item
          }
        )
        this.products = products
      }
      console.log('1');
    })

  }

  getCounter(items: CartItem[], uuid): number {
    const it = items.reduce((map, obj: CartItem) => {
      map[obj.uuid] = obj;
      return map;
    }, {});
    if (it[uuid]) {
      return it[uuid].counter
    } else {
      return 0
    }
  }

  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe()
    }
  }

}
