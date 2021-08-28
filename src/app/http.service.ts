import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { blockInterface, Data, User } from './block';
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


  constructor(private http: HttpClient, private route:ActivatedRoute, private router: Router) { }

  goBack(){
    this.router.navigate(['../'],{relativeTo: this.route});
  }


  getBlockChain(): Observable<blockInterface[]> {
    return this.http.get<blockInterface[]>(this._url);
  }
  
  /* Do transaction in transaction tab */
  AddTransaction(block: Data): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(block);
    //const body=JSON.parse(JSON.stringify(block));
    console.log(body)
    return this.http.post(this._url4, body)
  }

  /* Create user in userprofile tab */
  addUserProfile(user: User): Observable<any>{
    //const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(user);
    //const body=JSON.parse(JSON.stringify(block));
    console.log(body)
    return this.http.post(this._url2, body)

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
