import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { productsReducer } from './core/store/reducers/product.reducer';
import { categoriesReducer } from './core/store/reducers/category.reducer';
import { ProductsEffects } from './core/store/effects/product.effects';
import { CategoriesEffects } from './core/store/effects/category.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { LoginComponent } from './view/pages/login/login.component';
import { MainLayoutComponent } from './view/main-layout/main-layout.component';
import { ProductsListComponent } from './view/pages/products/products-list/products-list.component';
import { ProductFormComponent } from './view/pages/products/product-form/product-form.component';
import { SpinnerComponent } from './view/shared/spinner/spinner.component';
import { PagesModule } from './view/pages/pages.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainLayoutComponent,
    ProductsListComponent,
    ProductFormComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ products: productsReducer, categories: categoriesReducer }),
    EffectsModule.forRoot([ProductsEffects, CategoriesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
