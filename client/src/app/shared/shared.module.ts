import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {CardProductComponent} from './components/card-product/card-product.component';
import {MaterialModule} from '../modules/material/material.module';
import {SearchPipe} from './pipe/search.pipe';
import {RouterModule} from '@angular/router';
import {SwitchTemplateDirective} from './directives/switch-template.directive';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { CounterComponent } from './components/counter/counter.component';
import {RedColorDirective} from './directives/red-color.directive';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    imports: [
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        MatProgressBarModule,
        MaterialModule,
        RouterModule,
    ],
    declarations: [
        FileUploadComponent,
        CardProductComponent,
        SearchPipe,
        SwitchTemplateDirective,
        ViewCartComponent,
        CounterComponent,
        RedColorDirective,
        LoaderComponent,
    ],
  exports: [
    HttpClientModule,
    FileUploadComponent,
    CardProductComponent,
    MaterialModule,
    SearchPipe,
    ViewCartComponent,
    SwitchTemplateDirective,
    RedColorDirective,
    CounterComponent,
    LoaderComponent
  ]
})
export class SharedModule {

}
