import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../block';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validatedUser = new User();
  constructor(private _http: HttpClientModule, private _httpService: HttpService) { }

  ngOnInit(): void {
  }
  // compare to the user profile stoered in DB
  // ge user profile list from database

  loginUser(){
    this._httpService.loginUser(this.validatedUser)
    .subscribe(data=> {
      console.log(data)
    })
  }

  goBack(){
    this._httpService.goBack();
  }
}






