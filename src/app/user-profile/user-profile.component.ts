import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../block';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  SignUpForm!: FormGroup;
  hide: boolean = true;
  user = new User();
  //newPage: boolean = false;

  constructor(private _http: HttpClientModule, private _httpService:HttpService, private route:ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
    this.SignUpForm= new FormGroup(
      {
        email : new FormControl('',[Validators.required, Validators.email]),
        password : new FormControl('',[Validators.required, Validators.minLength(4)])
        
      }
    );
  }

  addUserProfile(){
    if (!this.SignUpForm.valid) {
      return;
    }
    this.user.Email=this.SignUpForm.get('email')?.value;
    this.user.PasswordHash=this.SignUpForm.get('password')?.value;
    
    this._httpService.addUserProfile(this.user)
    .subscribe(data=> {
      this.router.navigate(['/login'],{relativeTo: this.route});
      
    })
  }

}



