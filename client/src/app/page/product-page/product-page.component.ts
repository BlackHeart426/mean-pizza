import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../shared/service/products.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Product} from '../../shared/interface';
import {CartService} from '../../shared/service/cart.service';
import {AlertService} from '../../modules/admin/shared/service/alert.service';
import {PositionsService} from '../../modules/admin/shared/service/positions.service';
import {Position} from '../../modules/admin/shared/interfaces';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product: Position
  loading = true

  constructor(
    private positionsService: PositionsService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.positionsService.getById(params.id)
        })
      ).subscribe((position: Position) => {
         this.loading = false;
         this.product = {
            ...position
         }
    })
  }

  getUrl() {
    return "url("+this.product.imageSrc+"), url('/assets/image/patternCover.png')"
  }

  addToCart(product: Position) {
    // this.cartService.addToCart(product)
    this.alertService.success('Товар добален')
  }
}
