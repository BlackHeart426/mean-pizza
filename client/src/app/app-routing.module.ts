import {NgModule} from '@angular/core';
import {ExtraOptions, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {SigninPageComponent} from './page/signin-page/signin-page.component';
import {MenuPageComponent} from './page/menu-page/menu-page.component';
import {SignupPageComponent} from './page/signup-page/signup-page.component';
import {CartPageComponent} from './page/cart-page/cart-page.component';
import {PromoPageComponent} from './page/promo-page/promo-page.component';
import {ComboPageComponent} from './page/combo-page/combo-page.component';
import {PizzaPageComponent} from './page/pizza-page/pizza-page.component';
import {ProductPageComponent} from './page/product-page/product-page.component';
import {NotfoundPageComponent} from './page/notfound-page/notfound-page.component';
import {MenuContainerComponent} from './shared/components/menu-container/menu-container.component';

const routerOptions: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64]
}
const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/menu', pathMatch: 'full'},
      {path: 'menu', component: MenuContainerComponent, children: [
          {path: '', component: MenuPageComponent, pathMatch: 'full'},
          {path: ':category', component: MenuPageComponent},
          {path: ':category/:id', component: ProductPageComponent},
        ]},
      {path: 'signin', component: SigninPageComponent},
      {path: 'signup', component: SignupPageComponent},
      {path: 'cart', component: CartPageComponent},
      {path: 'promo', component: PromoPageComponent},
    ]
  },
  {
    path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'notfound', component: NotfoundPageComponent
  },
  {
    path: '**', redirectTo: '/notfound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
