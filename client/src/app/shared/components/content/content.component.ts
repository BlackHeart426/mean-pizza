import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {CategoriesService} from '../../../modules/admin/shared/service/categories.service';
import {Category} from '../../../modules/admin/shared/interfaces';
import {PositionsService} from '../../../modules/admin/shared/service/positions.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {

  categories$: Observable<Category[]>
  gSub: Subscription
  categories: Category[]

  constructor(
    private categoriesService: CategoriesService,
    private positionsService: PositionsService
  ) { }

  ngOnInit(): void {
    // this.gSub = this.categoriesService.fetch().subscribe(categories => {
    //   console.log(categories);
    //   this.categories = categories
    // })
    this.categories$ = this.categoriesService.fetch()
  }

  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe()
    }
  }

}
