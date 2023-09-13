import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninPageComponent } from './page/signin-page/signin-page.component';
import { SignupPageComponent } from './page/signup-page/signup-page.component';
import { RecoveryPageComponent } from './page/recovery-page/recovery-page.component';
import { CartPageComponent } from './page/cart-page/cart-page.component';
import { PromoPageComponent } from './page/promo-page/promo-page.component';
import { PizzaPageComponent } from './page/pizza-page/pizza-page.component';
import { ComboPageComponent } from './page/combo-page/combo-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { MenuToolbarComponent } from './shared/components/menu-toolbar/menu-toolbar.component';
import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { GroupProductComponent } from './shared/components/group-product/group-product.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuPageComponent } from './page/menu-page/menu-page.component';
import { ProductPageComponent } from './page/product-page/product-page.component';
import { NotfoundPageComponent } from './page/notfound-page/notfound-page.component';
import { ContentComponent } from './shared/components/content/content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './modules/admin/shared/classes/auth.interceptor';
import { AnalyticsPageComponent } from './modules/admin/page/analitics-page/analytics-page.component';
import { HistoryPageComponent } from './modules/admin/page/history-page/history-page.component';
import { OrderPageComponent } from './modules/admin/page/order-page/order-page.component';
import { OverviewPageComponent } from './modules/admin/page/overview-page/overview-page.component';
import { CategoriesFormComponent } from './modules/admin/page/categories-page/categories-form/categories-form.component';
import { PositionsFormComponent } from './modules/admin/page/categories-page/categories-form/positions-form/positions-form.component';
import { MenuContainerComponent } from './shared/components/menu-container/menu-container.component';
import { AdminModule } from './modules/admin/admin.module';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    SigninPageComponent,
    SignupPageComponent,
    RecoveryPageComponent,
    CartPageComponent,
    PromoPageComponent,
    PizzaPageComponent,
    ComboPageComponent,
    MainLayoutComponent,
    MenuToolbarComponent,
    CarouselComponent,
    HeaderComponent,
    FooterComponent,
    GroupProductComponent,
    MenuPageComponent,
    ProductPageComponent,
    NotfoundPageComponent,
    ContentComponent,
    MenuContainerComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    OverviewPageComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminModule,
  ],
  providers: [INTERCEPTOR_PROVIDER],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
