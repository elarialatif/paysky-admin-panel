import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { productsReducer } from './core/store/reducers/product.reducer';
import { usersReducer } from './core/store/reducers/user.reducer';
import { ProductsEffects } from './core/store/effects/product.effects';
import { UsersEffects } from './core/store/effects/user.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { LoginComponent } from './view/pages/login/login.component';
import { MainLayoutComponent } from './view/main-layout/main-layout.component';
import { PagesModule } from './view/pages/pages.module';
import { ToasterComponent } from './view/shared/toaster/toaster.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainLayoutComponent,
    ToasterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PagesModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ products: productsReducer, users: usersReducer }),
    EffectsModule.forRoot([ProductsEffects, UsersEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
