import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './page/login-page/login-page.component';
import {DashboardPageComponent} from './page/dashboard-page/dashboard-page.component';
import {AuthGuard} from './shared/classes/auth.guard';
import {CreateProductComponent} from './page/create-product-page/create-product.component';
import {CategoriesComponent} from './page/categories-page/categories.component';
import {HistoryPageComponent} from './page/history-page/history-page.component';
import {OrderPageComponent} from './page/order-page/order-page.component';
import {AnalyticsPageComponent} from './page/analitics-page/analytics-page.component';
import {CategoriesFormComponent} from './page/categories-page/categories-form/categories-form.component';
import {OrderCategoriesComponent} from './page/order-page/order-categories/order-categories.component';
import {OrderPositionsComponent} from './page/order-page/order-positions/order-positions.component';

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardPageComponent},
      {path: 'analytics', component: AnalyticsPageComponent},
      {path: 'history', component: HistoryPageComponent},
      {path: 'order', component: OrderPageComponent, children: [
          {path: '', component: OrderCategoriesComponent},
          {path: ':id', component: OrderPositionsComponent}
        ]},
      {path: 'categories', component: CategoriesComponent},
      {path: 'categories/new', component: CategoriesFormComponent},
      {path: 'categories/:id', component: CategoriesFormComponent},
      {path: 'product/create', component: CreateProductComponent},
    ]
  },
  {
    path: 'login', component: LoginPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
