import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../block';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validatedUser = new User();
  constructor(private _http: HttpClientModule, private _httpService: HttpService, private route:ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
  }
  // compare to the user profile stoered in DB
  // ge user profile list from database

  loginUser(){

    this._httpService.loginUser(this.validatedUser)
    .subscribe(data=> {
      console.log(data)
  
      if (data == true){
        this.router.navigate(['../landingPage'],{relativeTo: this.route});
       
      }
      else {
        document.getElementById("error")!.innerHTML = "<p><h2>Incorrect Email or Password!!</h2></p>";
      }
    })
    
  }
  
  goBack(){
    this._httpService.goBack();
  }
}






