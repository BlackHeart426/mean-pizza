import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../../shared/service/categories.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Category} from '../../shared/interfaces';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<Category[]>

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch()
  }

}
