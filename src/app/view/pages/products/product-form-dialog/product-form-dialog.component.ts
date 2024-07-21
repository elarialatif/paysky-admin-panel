import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from './../../../../core/services/product.service';
@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.scss']
})
export class ProductFormDialogComponent implements OnInit {
  productForm: FormGroup;
  categories: string[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService
  ) {
    this.productForm = this.fb.group({
      id: [data.product ? data.product.id : null],
      title: [data.product ? data.product.title : '', Validators.required],
      description: [data.product ? data.product.description : ''],
      price: [data.product ? data.product.price : 0, Validators.required],
      image: [data.product ? data.product.image : ''],
      category: [data.product ? data.product.category : '']
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.productsService.getProductCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  onSubmit() {
    if (this.productForm.valid) {

      this.dialogRef.close(this.productForm.value);
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
