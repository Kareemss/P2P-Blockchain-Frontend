import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../block';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userSource =new Subject<User>();
  user$ = this._userSource.asObservable();
  constructor() { }

  sendUser(user: User){
    this._userSource.next(user);
  }


}

