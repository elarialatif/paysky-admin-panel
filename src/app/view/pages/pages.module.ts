import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { ProductFormDialogComponent } from './products/product-form-dialog/product-form-dialog.component';
import { UserFormDialogComponent } from './users/user-form-dialog/user-form-dialog.component';
import { ConfirmDialogComponent } from './../shared/confirm-dialog/confirm-dialog.component';
import { UsersListComponent } from './users/users-list/users-list.component';
@NgModule({
  declarations: [
    SpinnerComponent,
    ProductsListComponent,
    UsersListComponent,
    ProductFormDialogComponent,
    UserFormDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    SpinnerComponent,
    ProductFormDialogComponent,
    UserFormDialogComponent,
    ConfirmDialogComponent
  ]
})
export class PagesModule {}
