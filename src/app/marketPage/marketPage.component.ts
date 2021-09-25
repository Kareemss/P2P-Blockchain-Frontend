import { ActivatedRoute, Router } from '@angular/router';
import { Order, dataInterface, User } from '../block';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import * as CryptoJS from 'crypto-js';

@Component({
    selector:'app-marketPage',
    templateUrl: './marketPage.component.html',
    styleUrls: ['./marketPage.component.css']
})
export class MarketPageComponent implements OnInit{
    block = new Order();
    CurrentOrder= new Order();
    sellorders: Order[] = [];
    buyorders: Order[] = [];
    allorders: Order[] = [];
    IsFetched= false;
    user = new User();
    Showsell = false;
    Showbuy = false;
    // Declare this key and iv values in declaration
  private key = CryptoJS.enc.Utf8.parse('4512631236589784');
  //console.log(key)
  private iv = CryptoJS.enc.Utf8.parse('4512631236589784');
    constructor(private _httpService:HttpService, private router: Router, private route: ActivatedRoute) { }

    //constructor(private _http: HttpClient, private _httpService:HttpService) {}
    ngOnInit(): void{
        this.getEncryptedSessionToken();
        
        this._httpService.getMarket().subscribe(data =>{
            this.allorders = data;
            this.sellorders = this.allorders.filter(
                order => order.Seller !=""
            );
            this.sellorders = this.sellorders.sort((a, b) => (
                a.Price < b.Price ? -1 : 1));
            console.log(this.sellorders)
            this.buyorders = this.allorders.filter(
                order => order.Buyer !=""
            );
            this.buyorders = this.buyorders.sort((a, b) => (
                a.Price > b.Price ? -1 : 1));
            console.log(this.buyorders)
            this.IsFetched = true;
        }); 

        this._httpService.getUser(this.user).subscribe(data =>{
            this.user=data;
            console.log(data)
            document.getElementById("userId")!.innerHTML = this.user.UserName;
        });
        
    } 
    ShowBuy(){
        this.Showbuy=true;
        this.Showsell=false;
        console.log("showing buyers")
    }
    ShowSell(){
        this.Showbuy=false;
        this.Showsell=true;
        console.log("showing sellers")
    }

    PressBuy(Order: Order){
        this.CurrentOrder=Order
        document.getElementById('buyModal')!.style.display='block'
        console.log(this.CurrentOrder)
    }
    
    PressSell(Order: Order){
        this.CurrentOrder=Order
        document.getElementById('sellModal')!.style.display='block'
        console.log(this.CurrentOrder)
    }

    AddSellTransaction(){
        this.block.Seller=this.user.UserName;
        this.block.Buyer=this.CurrentOrder.Buyer;
        this.block.Issuer=this.CurrentOrder.Issuer;
        this.block.Price=this.CurrentOrder.Price;
        console.log(this.block)
        this._httpService.AddTransaction(this.block).subscribe(data=>{
            console.log(data)
        })
    }

    AddBuyTransaction(){
        this.block.Buyer=this.user.UserName;
        this.block.Seller=this.CurrentOrder.Seller;
        this.block.Issuer=this.CurrentOrder.Issuer;
        this.block.Price=this.CurrentOrder.Price;
        this._httpService.AddTransaction(this.block).subscribe(data=>{
            console.log(data)
        })
    }
    goBack(){
        this._httpService.goBack();
    }
    goLogin(){
        this.router.navigate(['../login'],{relativeTo: this.route});
    }
    goSignUp(){
        this.router.navigate(['../signup'],{relativeTo: this.route});
    }
    
    toBlockChainPage(){
        this.router.navigate(['../blockchain'],{relativeTo: this.route});
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