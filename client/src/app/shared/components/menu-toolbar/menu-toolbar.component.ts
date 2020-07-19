import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {CartService} from '../../service/cart.service';
import {CategoriesService} from '../../../modules/admin/shared/service/categories.service';
import {Category} from '../../../modules/admin/shared/interfaces';

@Component({
  selector: 'app-menu-toolbar',
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.scss']
})
export class MenuToolbarComponent implements OnInit, OnDestroy {

  pSub: Subscription
  categories: Category[] = []
  countProductInCart$: Observable<number>
  cartTemplateDisplaySwitch: boolean = false

  constructor(
    private cartService: CartService,
    // private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.countProductInCart$ = this.cartService.getCountCart()
    // this.pSub = this.categoriesService.fetch().subscribe(categories => {
    //   this.categories = categories
    // })
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }

  onShowCart(toogle: boolean) {
    setTimeout(() => {
      this.cartTemplateDisplaySwitch = toogle
    },500)

  }

}
