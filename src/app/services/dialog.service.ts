import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
import { TransactionComponent } from '../dialogs/transaction/transaction.component';
import { confirmDialogData,transactionDialogData } from './dialog-data';
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  confirmDialog(data: confirmDialogData): Observable<boolean> {
    return this.dialog
      .open(ConfirmComponent, {
        data,
        width: '400px',
        disableClose: true,
      })
      .afterClosed();
  }

  transactionDialog(data: transactionDialogData): Observable<any> {
    return this.dialog
      .open(TransactionComponent, {
        data,
        width: '400px',
        disableClose: true,
      })
      .afterClosed();
  }

  openSnackBar(message:string, action: string | undefined) {
    this.snackBar.open(message,action, {duration: 3500});
  }
}
