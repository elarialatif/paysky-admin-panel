import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsState } from '../../../../core/store/reducers/product.reducer';
import * as ProductsActions from '../../../../core/store/actions/product.actions';
import { ProductsService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/store/models/product.model';
import { selectAllProducts } from '../../../../core/store/selectors/products.selectors';
import { ToasterService } from '../../../../core/services/toater.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormDialogComponent } from  './../product-form-dialog/product-form-dialog.component'
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products$: Observable<Product[]>;
  displayedColumns: string[] = ['id', 'image', 'title', 'description', 'category', 'price', 'actions'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  loading: boolean = true;
  error: string = '';

  constructor(
    private store: Store<ProductsState>,
    private productsService: ProductsService,
    private toastr: ToasterService,
    public dialog: MatDialog
  ) {
    this.products$ = this.store.select(selectAllProducts);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.loadProducts());
    this.products$.subscribe({
      next: (products) => {
        this.dataSource.data = products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.loading = false;
        this.toastr.showMessage('Failed to load products', err);
      }
    });
  }

  confirmDeleteProduct(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(id);
      }
    });
  }
  deleteProduct(id: string ): void {
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        this.store.dispatch(ProductsActions.deleteProduct({ id }));
        console.log(`Product with id ${id} deleted successfully.`);
        this.toastr.showMessage(`Product with id ${id} deleted successfully.`, 'success');
      },
      error: (error) => {
        console.error('Error deleting product:', error);
        this.toastr.showMessage( `Failed to delete product with id ${id}.`, 'error');
      }
    });
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '500px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productsService.addProduct(result).subscribe({
          next: () => {
            const product: Product = result;
            this.store.dispatch(ProductsActions.addProduct({ product }));
            this.toastr.showMessage(`Product Created successfully.`, 'success');
          },
          error: (error) => {
            console.error('Error create product:', error);
            this.toastr.showMessage( `Failed to create producr.`, 'error');
          }
        });
      }
    });
  }

  openEditProductDialog(product: any): void {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '500px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productsService.updateProduct(result).subscribe({
          next: () => {
            const product: Product = result;
            this.store.dispatch(ProductsActions.updateProduct({ product }));
            this.toastr.showMessage(`Product updated successfully.`, 'success');
          },
          error: (error) => {
            console.error('Error update product:', error);
            this.toastr.showMessage( `Failed to update producr.`, 'error');
          }
        });
      }

    });
  }
}
