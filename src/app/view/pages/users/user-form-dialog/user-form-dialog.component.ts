import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.scss'
})
export class UserFormDialogComponent {
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.userForm = this.fb.group({
      id: [data.user ? data.user.id : null],
      email: [data.user ? data.user.email : '', Validators.required],
      password: [data.user ? data.user.password : '', Validators.required],
      name: [data.user ? data.user.name : ''],
      phone: [data.user ? data.user.phone : '', Validators.required],
      address: [data.user ? data.user.address : '']
    });
  }

  onSubmit() {
    if (this.userForm.valid) {

      this.dialogRef.close(this.userForm.value);
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
