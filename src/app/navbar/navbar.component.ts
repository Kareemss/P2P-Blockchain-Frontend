import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { HttpService } from '../http.service';
import { User } from '../block';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  isTrue = false;
  user = new User();
  private key = CryptoJS.enc.Utf8.parse('4512631236589784');
  //console.log(key)
  private iv = CryptoJS.enc.Utf8.parse('4512631236589784');
  constructor(private userService: UserService, private breakpointObserver: BreakpointObserver, private _httpService:HttpService, private router: Router, private route: ActivatedRoute, private _http: HttpClient) {}
  ngOnInit(){
    this.getEncryptedSessionToken();
    if (this.user.Email != undefined){
      this._httpService.getUser(this.user).subscribe(data =>{
        this.user=data;
      })
    }else{
      this.userService.user$.subscribe(user =>{
        this.user=user;
      })
    }
    
    
    
  }
  theme() {
    this.isTrue =!this.isTrue;
  }

  Logout(){
    localStorage.removeItem("session-token");
    this.user= new User;
    this.ngOnInit();
  }

  getEncryptedSessionToken(){
    // get encrypted session token as a string 
    let tknStr = localStorage.getItem("session-token")
    console.log("Retrieved session token")
    console.log(tknStr)
    // split the string in two parts, userEmail and userPassword
    let tknArr = tknStr?.split(",")
    //console.log(tknArr)

    // retrieve session token if not undefined
    if (tknArr != undefined){
      this.retrieveSessionToken(tknArr)
    }
}

retrieveSessionToken(tknArr : string[]){
    // split the token array into two separate parts
    let uEmailArr = tknArr[0].split('\"')
    let uPassArr = tknArr[1].split('\"')

    // encrypted value at index 3 for both email and password
    let encEmail = uEmailArr[3]
    let encPass = uPassArr[3]
    
    // decrypt the email and password
    let decEmail = this.decryptUsingAES256(encEmail)
    let decPass = this.decryptUsingAES256(encPass)

    
    console.log("Encrypted email: ", encEmail)
    console.log("Decrypted email: ", decEmail)
    console.log("Encrypted password hash: ", encPass)
    console.log("Decrypted password hash: ", decPass)
    this.user.Email=decEmail.slice(1, (decEmail.length-1));
    
    // console.log(this.user)
    // console.log(this.user.UserName)
    
  }

  decryptUsingAES256(decString: string){
    var decrypted = CryptoJS.AES.decrypt(decString, this.key, {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,                       
        padding: CryptoJS.pad.Pkcs7
    });
    //console.log('Decrypted : ' + decrypted);
    //console.log('Decrypted = ' + decrypted.toString(CryptoJS.enc.Utf8));
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
