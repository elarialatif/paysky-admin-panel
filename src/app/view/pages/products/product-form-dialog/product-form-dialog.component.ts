import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrl: './product-form-dialog.component.scss'
})
export class ProductFormDialogComponent {
  productForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.productForm = this.fb.group({
      id: [data.product ? data.product.id : null],
      title: [data.product ? data.product.title : '', Validators.required],
      description: [data.product ? data.product.description : ''],
      price: [data.product ? data.product.price : 0, Validators.required],
      image: [data.product ? data.product.image : '']
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
