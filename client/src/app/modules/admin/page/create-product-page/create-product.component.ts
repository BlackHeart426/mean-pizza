import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category, imageFile, Product} from '../../../../shared/interface';
import {ProductsService} from '../../../../shared/service/products.service';
import {AlertService} from '../../shared/service/alert.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CategoriesService} from '../../../../shared/service/categories.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit, OnDestroy {

  form: FormGroup
  imageLink: string = ''
  category: FormControl
  sale = 0
  categories: Category[] = []
  pSub: Subscription

  constructor(
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
        if (this.pSub) {
          this.pSub.unsubscribe()
        }
    }

  ngOnInit(): void {

    // this.pSub = this.categoriesService.getAll().subscribe(categories => {
    //   this.categories = categories
    // })

    this.category = new FormControl('', Validators.required);
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      subtitle: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      sale: new FormControl(null)
    })


  }

  submit() {
    if (this.form.invalid ||  this.category.invalid) {
      return
    }



    const product: Product = {
      title: this.form.value.title,
      description: this.form.value.description,
      subtitle: this.form.value.subtitle,
      price: this.form.value.price,
      sale: this.form.value.sale,
      category: this.category.value,
      img: this.imageLink,
      date: new Date()
    };

    if ( this.form.value.sale === null) {
      product.sale = 0
      this.sale = 0
    } else {
      this.sale = this.form.value.sale
    }

    // this.productService.create(product, product.category).subscribe(() => {
    //   this.form.reset()
    //   this.alert.success('Продукт добален')
    // })
  }

  backLink() {
    this.router.navigate(['/admin', 'dashboard'])
  }

  onFileComplete(data: imageFile) {
    this.imageLink = data.link
  }
}
