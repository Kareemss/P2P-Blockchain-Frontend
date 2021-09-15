import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { blockInterface, Data, User, dataInterface, DeleteQuery, UpdateBalanceQuery } from './block';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  //private _url: string = "https://p2p-go-backend.herokuapp.com/";
  private _url: string = "http://localhost:8080/";
  private _url1: string = "http://localhost:8080/WriteBlock";
  private _url2: string = "http://localhost:8080/WriteUser";
  private _url3: string = "http://localhost:8080/UserLogin";

  private _url4: string = "http://localhost:8080/WriteOrder";

  private _url5: string = "http://localhost:8080/Market";
  
  private _url6: string = "http://localhost:8080/Delete";
  private _url7: string = "http://localhost:8080/AddBalance";
  private _url8: string = "http://localhost:8080/GetUSer";


  constructor(private http: HttpClient, private route:ActivatedRoute, private router: Router) { }

  goBack(){
    this.router.navigate(['../'],{relativeTo: this.route});
  }


  getBlockChain(): Observable<blockInterface[]> {
    return this.http.get<blockInterface[]>(this._url);
  }
  

  getMarket():Observable<dataInterface[]>{
    return this.http.get<dataInterface[]>(this._url5);
  }

  getUser(User : User):Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(User);
    //const body=JSON.parse(JSON.stringify(block));
    console.log(body)
    return this.http.post(this._url8, body)
    
  }

  /* Do transaction in transaction tab */
  AddOrder(Order: Data): Observable<any>{
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

  AddTransaction(Block:Data): Observable<any>{
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
