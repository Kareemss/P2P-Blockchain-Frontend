import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { transactionDialogData } from 'src/app/services/dialog-data';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  amountForm= new FormGroup(
    {
      amount: new FormControl('',[Validators.required])
    }
  );
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: transactionDialogData,
    private dialogRef: MatDialogRef<TransactionComponent>) { }

  ngOnInit(): void {
    // if (this.data?.title=="Buy"){

    // }
  }

  // getVal(){
  //   this
  // }

  cancel() {
    // closing itself and sending data to parent component
    this.dialogRef.close(false)
  }

  confirm() {
    // closing itself and sending data to parent component
    if (!this.amountForm.valid){
      return
    }
    this.dialogRef.close(this.amountForm.get('amount')?.value)
  }
}
