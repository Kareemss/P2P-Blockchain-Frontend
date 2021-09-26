import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { blockInterface, User, Order } from "../block";
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SlicePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import * as CryptoJS from 'crypto-js';

@Component({
    selector:'app-profilePage',
    templateUrl:'./profilePage.component.html',
    styleUrls: ['./profilePage.component.css']
})

export class ProfilePageComponent implements OnInit{
    user = new User();
    userorders: Order[] =[];
    blocks: blockInterface[] = [];
    userpresent= false;
    MarketFetched=false;
    BlocksFetched=false;
    Showcompleted=false;
    Showopen=false;
    private key = CryptoJS.enc.Utf8.parse('4512631236589784');
  
    private iv = CryptoJS.enc.Utf8.parse('4512631236589784');
    constructor(private _httpService:HttpService, private router: Router, private route: ActivatedRoute, private _http: HttpClient) { }
    ngOnInit(){
        this.getEncryptedSessionToken();
        this._httpService.getUser(this.user).subscribe(data =>{
          this.user=data;
          this.userpresent=true;
        })  
        this._httpService.getMarket().subscribe(data =>{
            this.userorders = data.filter( order => order.Issuer == this.user.UserName);
            console.log(this.userorders)
            this.MarketFetched = true;
        }); 
        this._httpService.getBlockChain().subscribe(data =>{
            this.blocks = data.filter(block =>
                block.AllData.Seller || block.AllData.Buyer ==this.user.UserName)
            console.log(this.blocks)
            this.BlocksFetched=true;
        });
    }
    ShowOpen(){
        this.Showopen=true;
        this.Showcompleted=false;
    }
    ShowCompleted(){
        this.Showopen=false;
        this.Showcompleted=true;
    }
    toBlockChainPage(){
        this.router.navigate(['../blockchain'],{relativeTo: this.route});
    }

    toLandingPage(){
        this.router.navigate(['../landingPage'], {relativeTo: this.route})
    }
    
    toMarketPage(){
        this.router.navigate(['../market'],{relativeTo: this.route});
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