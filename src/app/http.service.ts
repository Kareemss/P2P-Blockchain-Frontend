import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { blockInterface, Order, User, dataInterface, DeleteQuery, UpdateBalanceQuery } from './block';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  
  private _url: string = "https://blockchain-p2p.herokuapp.com/";
  // private _url: string = "http://localhost:8080/";
  private _url1: string = this._url + "WriteBlock";
  private _url2: string = this._url + "WriteUser";
  private _url3: string = this._url + "UserLogin";

  private _url4: string = this._url + "WriteOrder";

  private _url5: string = this._url + "Market";
  
  private _url6: string = this._url + "Delete";
  private _url7: string = this._url + "AddBalance";
  private _url8: string = this._url + "GetUser";


  constructor(private http: HttpClient, private route:ActivatedRoute, private router: Router) { }

  goBack(){
    this.router.navigate(['../'],{relativeTo: this.route});
  }


  getBlockChain(): Observable<blockInterface[]> {
    return this.http.get<blockInterface[]>(this._url);
  }
  

  getMarket():Observable<Order[]>{
    return this.http.get<Order[]>(this._url5);
  }

  getUser(User : User):Observable<any>{
    // const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(User);
    //const body=JSON.parse(JSON.stringify(block));
    console.log(body)
    return this.http.post(this._url8, body)
    
  }

  /* Do transaction in transaction tab */
  AddOrder(Order: Order): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(Order);
    //const body=JSON.parse(JSON.stringify(block));
    console.log(body)
    return this.http.post(this._url4, body)
  }

  Deletion(DeleteQuery: DeleteQuery): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(DeleteQuery);
    //const body=JSON.parse(JSON.stringify(block));
    console.log(body)
    return this.http.post(this._url6, body)
  }

  AddBalance(UpdateBalanceP: UpdateBalanceQuery): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(UpdateBalanceP);
    //const body=JSON.parse(JSON.stringify(block));
    console.log(body)
    return this.http.post(this._url7, body)
  }


  /* Create user in userprofile tab */
  addUserProfile(user: User): Observable<any>{
    //const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(user);
    //const body=JSON.parse(JSON.stringify(block));
    console.log(body)
    return this.http.post(this._url2, body)

  }

  AddTransaction(Block:Order): Observable<any>{
    const body = JSON.stringify(Block);
    console.log(body)
    return this.http.post(this._url1, body)
  }

  /* Login user in login tab */
  loginUser(user: User): Observable<any>{
    //const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(user);
    //const body=JSON.parse(JSON.stringify(block));
    console.log(body)
    return this.http.post(this._url3, body)

  }
}
