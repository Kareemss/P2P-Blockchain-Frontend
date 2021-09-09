import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../block';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
//Inside imports of your TS file include 
import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validatedUser = new User();
  constructor(private _http: HttpClientModule, private _httpService: HttpService, private route:ActivatedRoute , private router: Router) { }

  // Declare this key and iv values in declaration
  private key = CryptoJS.enc.Utf8.parse('4512631236589784');
  //console.log(key)
  private iv = CryptoJS.enc.Utf8.parse('4512631236589784');

  ngOnInit(): void {
  }
  // compare to the user profile stoered in DB
  // ge user profile list from database

  loginUser(){

    this._httpService.loginUser(this.validatedUser)
    .subscribe(data=> {
      console.log(data)
      //this.encryptUsingAES256();
      if (data.Res == true){
        this.router.navigate(['../landingPage'],{relativeTo: this.route});
        this.createSessionToken(data.Email, data.PasswordHash)
        var sa= localStorage.getItem('session-token')
        console.log(sa)
        // let ss= JSON.parse(localStorage.getItem("session-token"))
        // console.log(ss)
        // let st= JSON.parse(ss)
        // console.log(st)
        // let str1 = st.split("userEmail")
        // console.log(str1)
        // console.log(this.decryptUsingAES256(st.userEmail))
        // console.log(this.decryptUsingAES256(st.userPassword))

        // this.decryptUsingAES256(st.userEmail)
        // console.log()
      }
      else {
        document.getElementById("error")!.innerHTML = "<p><h2>Incorrect Email or Password!!</h2></p>";
      }
    })
  }

  createSessionToken(email: string, passwordHash: string){
    console.log(email)
    console.log(passwordHash)
    let token = {
      userEmail : this.encryptUsingAES256(email),
      userPassword : this.encryptUsingAES256(passwordHash)
    }
    // store cookie in local storage
    localStorage.setItem("session-token", JSON.stringify(token))

    
  }

  encryptUsingAES256(plainText: string) {
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(plainText)), this.key, {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    console.log('Encrypted :\n' + encrypted.toString());
    //console.log(this.key);
    return encrypted.toString();
  }

    
  decryptUsingAES256(decString: string){
    var decrypted = CryptoJS.AES.decrypt(decString, this.key, {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,                       
        padding: CryptoJS.pad.Pkcs7
    });
    console.log('Decrypted : ' + decrypted);
    console.log('Decrypted = ' + decrypted.toString(CryptoJS.enc.Utf8));
    // return decrypted.toString(CryptoJS.enc.Utf8);
  }
  

  goBack(){
    this._httpService.goBack();
  }
}






