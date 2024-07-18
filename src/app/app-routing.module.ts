import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './view/pages/login/login.component';
import { MainLayoutComponent } from './view/main-layout/main-layout.component';
import { ProductsListComponent } from './view/pages/products/products-list/products-list.component';
import { UsersListComponent } from './view/pages/users/users-list/users-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'products', component: ProductsListComponent },
      { path: 'users', component: UsersListComponent },
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
