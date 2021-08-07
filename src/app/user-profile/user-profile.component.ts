import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../block';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  user = new User();
  //newPage: boolean = false;

  constructor(private _http: HttpClientModule, private _httpService:HttpService) { }

  ngOnInit(): void {
  }

  addUserProfile(){
    this._httpService.addUserProfile(this.user)
    .subscribe(data=> {
      console.log(data)
    })
  }

  goBack(){
    this._httpService.goBack();
  }

}



