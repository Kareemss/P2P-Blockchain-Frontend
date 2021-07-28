import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { blockInterface } from './block';

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
}
