import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../../../../shared/interface';
import {ProductsService} from '../../../../../shared/service/products.service';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss']
})
export class TableProductsComponent implements OnInit, OnDestroy {

  @Input() category: string
  products: Product[] = []
  gSub: Subscription
  dSub: Subscription
  searchStr = ''
  displayedColumns: string[] = ['Title', 'Subtitle', 'Description', 'Image', 'Date', 'Action'];

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    // this.gSub = this.productService.getAll().subscribe(products => {
    //   this.products = products
    // })
  }

  remove(product: Product) {
    // this.dSub = this.productService.remove(product.id, product.category).subscribe(() => {
    //   this.products = this.products.filter(productList => productList.id !== product.id)
    // })
  }

  ngOnDestroy(): void {

    if (this.dSub) {
      this.dSub.unsubscribe()
    }

    if (this.gSub) {
      this.gSub.unsubscribe()
    }
  }
}
