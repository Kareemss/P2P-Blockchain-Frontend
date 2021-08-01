import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { blockInterface, Data } from './block';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  //private _url: string = "https://p2p-go-backend.herokuapp.com/";
  private _url: string = "http://localhost:8080/";


  constructor(private http: HttpClient) { }

  getBlockChain(): Observable<blockInterface[]> {
    return this.http.get<blockInterface[]>(this._url);
  }

  addTransaction(block: Data): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(block);
    //const body=JSON.parse(JSON.stringify(block));
    console.log(body)
    return this.http.post(this._url, body)

  }
}
