import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../../../shared/service/categories.service';
import {Category} from '../../../../shared/interface';
import {Subscription} from 'rxjs';
import {AlertService} from '../../shared/service/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit, OnDestroy {

  form: FormGroup
  pSub: Subscription

  constructor(
    private categoriesService: CategoriesService,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      url: new FormControl(null, Validators.required),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const category: Category = {
      name: this.form.value.name,
      url: this.form.value.url,
      date: new Date()
    }

    // this.pSub = this.categoriesService.create(category).subscribe(() => {
    //   this.alert.success('Category created')
    //   this.form.reset()
    // },() => {
    //   this.alert.danger('Error')
    // })

  }

  backLink() {
    this.router.navigate(['/admin', 'dashboard'])
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }
}
