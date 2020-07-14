import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {DashboardPageComponent} from './page/dashboard-page/dashboard-page.component';
import {LoginPageComponent} from './page/login-page/login-page.component';
import {AdminRoutingModule} from './admin-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {AuthGuard} from './shared/classes/auth.guard';
import {RouterModule} from '@angular/router';
import {AlertComponent} from './shared/components/alert/alert.component';
import {AlertService} from './shared/service/alert.service';
import { ProductComponent } from './page/product-page/product.component';
import { CategoriesComponent } from './page/categories-page/categories.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { TableProductsComponent } from './shared/components/table-products/table-products.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CreateProductComponent } from './page/create-product-page/create-product.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CreateCategoryComponent } from './page/create-category-page/create-category.component';
import { OrderCategoriesComponent } from './page/order-page/order-categories/order-categories.component';
import { OrderPositionsComponent } from './page/order-page/order-positions/order-positions.component';
import { HistoryFilterComponent } from './page/history-page/history-filter/history-filter.component';
import { HistoryListComponent } from './page/history-page/history-list/history-list.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardPageComponent,
    LoginPageComponent,
    AlertComponent,
    ProductComponent,
    CategoriesComponent,
    MenuComponent,
    TableProductsComponent,
    CreateProductComponent,
    CreateCategoryComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    HistoryFilterComponent,
    HistoryListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [
    RouterModule,
    HistoryListComponent,
    HistoryFilterComponent
  ],
  providers: [
    AuthGuard,
    AlertService
  ]
})
export class AdminModule {}
