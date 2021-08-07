import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Data, dataInterface } from '../block';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  private _url: string = "http://localhost:8080/";

  block = new Data();
  
  /* See whether want use the same http service or separate between GET and POST */
  //constructor(private _http: HttpClient, private postService:PostService) {}
  constructor(private _http: HttpClient, private _httpService:HttpService) {}

  ngOnInit(): void {

  }
  //subscribe to the post service 
  addTransaction() {
    this._httpService.addTransaction(this.block)
      .subscribe(data => {
        console.log(data)
      })      
  }

  goBack(){
    this._httpService.goBack();
  }
}
