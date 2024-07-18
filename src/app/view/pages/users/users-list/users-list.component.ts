import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { UsersState } from '../../../../core/store/reducers/user.reducer';
import * as UsersActions from '../../../../core/store/actions/user.actions';
import { UsersService } from '../../../../core/services/user.service';
import { User } from '../../../../core/store/models/user.model';
import { selectAllUsers } from '../../../../core/store/selectors/users.selectors';
import { ToasterService } from '../../../../core/services/toater.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from  './../user-form-dialog/user-form-dialog.component'
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]>;
  displayedColumns: string[] = ['id', 'email', 'name', 'address', 'phone', 'actions'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  loading: boolean = true;
  error: string = '';
  constructor(
    private store: Store<UsersState>,
    private usersService: UsersService,
    private toastr: ToasterService,
    public dialog: MatDialog
  ) {
    this.users$ = this.store.select(selectAllUsers);
  }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());
    this.users$.subscribe({
      next: (users) => {
        this.dataSource.data = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.loading = false;
        this.toastr.showMessage('Failed to load users', err);
      }
    });
  }

  confirmDeleteUser(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(id);
      }
    });
  }

  deleteUser(id: string ): void {
    this.usersService.deleteUser(id).subscribe({
      next: () => {
        this.store.dispatch(UsersActions.deleteUser({ id }));
        console.log(`User with id ${id} deleted successfully.`);
        this.toastr.showMessage(`User with id ${id} deleted successfully.`, 'success');
      },
      error: (error) => {
        console.error('Error deleting User:', error);
        this.toastr.showMessage( `Failed to delete User with id ${id}.`, 'error');
      }
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '500px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.addUser(result).subscribe({
          next: () => {
            const user: User = result;
            this.store.dispatch(UsersActions.addUser({ user }));
            this.toastr.showMessage(`User Created successfully.`, 'success');
          },
          error: (error) => {
            console.error('Error create User:', error);
            this.toastr.showMessage( `Failed to create producr.`, 'error');
          }
        });
      }
    });
  }

  openEditUserDialog(user: any): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '500px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.updateUser(result).subscribe({
          next: () => {
            const user: User = result;
            this.store.dispatch(UsersActions.updateUser({ user }));
            this.toastr.showMessage(`User updated successfully.`, 'success');
          },
          error: (error) => {
            console.error('Error update User:', error);
            this.toastr.showMessage( `Failed to update producr.`, 'error');
          }
        });
      }

    });
  }
}
