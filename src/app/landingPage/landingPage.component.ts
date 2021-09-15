import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { blockInterface } from '../block';
import { Data, dataInterface } from '../block';
import { HttpService } from '../http.service';
import { ThisReceiver } from '@angular/compiler';
import * as CryptoJS from 'crypto-js';
import { SlicePipe } from '@angular/common';


@Component({
    selector:'app-landingPage',
    templateUrl: './landingPage.component.html',
    styleUrls: ['./landingPage.component.css']
})
export class LandingPageComponent implements OnInit{
    block = new Data()
    // Declare this key and iv values in declaration
  private key = CryptoJS.enc.Utf8.parse('4512631236589784');
  //console.log(key)
  private iv = CryptoJS.enc.Utf8.parse('4512631236589784');
    constructor(private _httpService:HttpService, private router: Router, private route: ActivatedRoute, private _http: HttpClient) { }

    //constructor(private _http: HttpClient, private _httpService:HttpService) {}
    ngOnInit(): void{
      
    }

    ngAfterViewInit(){
        this.getEncryptedSessionToken()
      }

    toBlockChainPage(){
        this.router.navigate(['../blockchain'],{relativeTo: this.route});
    }

    toMarketPage(){
        this.router.navigate(['../market'],{relativeTo: this.route});
    }

    goBack(){
        this._httpService.goBack();
    }
    AddTransaction(){
        this._httpService.AddOrder(this.block).subscribe(data=>{
            console.log(data)
        })
    }
    goLogin(){
        this.router.navigate(['../login'],{relativeTo: this.route});
      }
    goSignUp(){
        this.router.navigate(['../signup'],{relativeTo: this.route});
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
        document.getElementById("userId")!.innerHTML = decEmail.slice(1, (decEmail.length-1));
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