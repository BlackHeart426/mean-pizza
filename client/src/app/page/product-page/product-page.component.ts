import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../shared/service/products.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {CartItem, Product} from '../../shared/interface';
import {AlertService} from '../../modules/admin/shared/service/alert.service';
import {PositionsService} from '../../modules/admin/shared/service/positions.service';
import {Position} from '../../modules/admin/shared/interfaces';
import {CartService} from '../../shared/service/cart.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product: CartItem
  loading = true
  listProductInCart$: Observable<any>

  constructor(
    private positionsService: PositionsService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.listProductInCart$ = this.cartService.getItemsCart()
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.positionsService.getById(params.id)
        })
      ).subscribe((position: Position) => {
      this.loading = false;
      this.product = {
        name: position.name,
        counter: position.counter,
        image: position.imageSrc,
        description: position.description,
        price: position.cost,
        sale: position.sale,
        uuid: position._id,
      }
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

  onChangedCounter(increased: boolean, uuid: string): void {
    if (increased) {
      this.cartService.increaseCartItem(uuid)
    } else {
      this.cartService.decreaseCartItem(uuid)
    }
  }

  getUrl() {
    return "url("+this.product.image+"), url('/assets/image/patternCover.png')"
  }

  addToCart(product: CartItem): void {
    console.log(product)
    this.cartService.addToCart(product)
    this.alertService.success('Товар добален')
  }
}
