import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../../../shared/service/products.service';
import {AlertService} from '../../shared/service/alert.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Product} from '../../../../shared/interface';
import {switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  formEdit: FormGroup
  uSub: Subscription
  imageLink: string = ''
  product: Product = {
    title: '',
    img: '',
    sale: 0,
    subtitle: '',
    description: '',
    id: '',
    price: 0,
    category: '',
    date: null
  }
  category: FormControl
  sale = ''
  categories = [
    {
      value: 'combo',
      viewValue: 'Combo'
    },
    {
      value: 'pizza',
      viewValue: 'Pizza'
    }
  ]

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.route.params.pipe(
    //   switchMap((params: Params) => {
    //     return this.productService.getByIdIdAndCategory(params.id, params.category)
    //   })
    // ).subscribe((product: Product) => {
    //   this.product = product
    //   this.imageLink = product.img
    //   this.category = new FormControl(product.category, Validators.required);
    //   this.formEdit = new FormGroup({
    //     title: new FormControl(product.title, Validators.required),
    //     description: new FormControl(product.description, Validators.required),
    //     subtitle: new FormControl(product.subtitle, Validators.required),
    //     price: new FormControl(product.price, Validators.required),
    //     sale: new FormControl(product.sale)
    //   })
    // })
  }

  submit() {
    if (this.formEdit.invalid || this.imageLink.length === 0 || this.category.invalid) {
      return
    }


    if ( this.formEdit.value.sale === null) {
      this.sale = ''
    } else {
      this.sale = this.formEdit.value.sale
    }


    // this.uSub = this.productService.update(
    //   {
    //     ...this.product,
    //     title: this.formEdit.value.title,
    //     description: this.formEdit.value.description,
    //     subtitle: this.formEdit.value.subtitle,
    //     price: this.formEdit.value.price,
    //     sale: this.sale,
    //     category: this.category.value,
    //     img: this.imageLink,
    //     date: new Date()
    //   },
    //   this.product.category
    // ).subscribe(() => {
    //   this.alert.success('Продукт обновлен')
    // })
  }

  onFileComplete(data: any) {
    this.imageLink = data.link
  }

  backLink() {
    this.router.navigate(['/admin', 'dashboard'])
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }
}
