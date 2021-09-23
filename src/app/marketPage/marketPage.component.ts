import { ActivatedRoute, Router } from '@angular/router';
import { Data, dataInterface, User } from '../block';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import * as CryptoJS from 'crypto-js';
import { SlicePipe } from '@angular/common';

@Component({
    selector:'app-marketPage',
    templateUrl: './marketPage.component.html',
    styleUrls: ['./marketPage.component.css']
})
export class MarketPageComponent implements OnInit{
    block = new Data();
    market: dataInterface[] = [];
    IsFetched= false;
    user = new User();
    // Declare this key and iv values in declaration
  private key = CryptoJS.enc.Utf8.parse('4512631236589784');
  //console.log(key)
  private iv = CryptoJS.enc.Utf8.parse('4512631236589784');
    constructor(private _httpService:HttpService, private router: Router, private route: ActivatedRoute) { }

    //constructor(private _http: HttpClient, private _httpService:HttpService) {}
    ngOnInit(): void{
        this.getEncryptedSessionToken();
        
        this._httpService.getUser(this.user).subscribe(data =>{
            this.user=data;
            document.getElementById("userId")!.innerHTML = this.user.UserName;
        });
          this._httpService.getMarket().subscribe(data => {
            this.market = data;
            this.IsFetched = true;
        }); 
    }

    
        
        
    

    /** Show all sellers when "buy" is clicked */
    showSellers(){
        let htmlStr = ""
        let sellerCount = 0
        this.sortOrdersByPriceAscending()
        for(let i=0; i<this.market.length; i++){
            let marketData = this.market[i]
            let seller = marketData.Seller
            if (seller != ""){
                sellerCount += 1
                htmlStr += "<div class='w3-card-4 w3-margin w3-padding'>"
                htmlStr += "<div class='row'>"
                
                htmlStr += "<div class='col-4'>"
                htmlStr += "<p> Seller: " + seller +"</p>"
                htmlStr += "</div>";

                htmlStr += "<div class='col-4'>"
                htmlStr += "<p> Price: " + marketData.Price +"</p>"
                htmlStr += "</div>";
                
                htmlStr += "<div class='col-4'>"
                htmlStr += "<p> Amount: " + marketData.Amount +"</p>"
                htmlStr += "<button class='w3-button w3-black w3-padding-small w3-margin-right' onclick=\"document.getElementById('buyModal').style.display='block'\">Buy</button>";
                htmlStr += "</div>";
                
                htmlStr += "</div>";
                htmlStr += "</div>";
                // onclick=\"document.getElementById('sellModal').style.display='block'\"
            }


        }
        if(sellerCount == 0){
            document.getElementById("showMarketDetails")!.innerHTML = "<p><h2>No Sellers Yet !!</h2></p>";
        }
        else{
            document.getElementById("showMarketDetails")!.innerHTML = htmlStr;
        }
    }

    /** Show all sellers when "buy" is clicked */
    showBuyers(){
        document.getElementById("showMarketDetails")!.innerHTML = "";
        let htmlStr = ""
        let buyerCount = 0
        this.sortOrdersByPriceDescending()
        for(let i=0; i<this.market.length; i++){
            let marketData = this.market[i]
            let buyer = marketData.Buyer
            if (buyer != ""){
                buyerCount += 1
                htmlStr += "<div class='w3-card-4 w3-margin w3-padding'>"
                htmlStr += "<div class='row'>"
                
                htmlStr += "<div class='col-4'>"
                htmlStr += "<p> Buyer: " + buyer +"</p>"
                htmlStr += "</div>";

                htmlStr += "<div class='col-4'>"
                htmlStr += "<p> Price: " + marketData.Price +"</p>"
                htmlStr += "</div>";
                
                htmlStr += "<div class='col-4'>"
                htmlStr += "<p> Amount: " + marketData.Amount +"</p>"
                htmlStr += "<button class='w3-button w3-black w3-padding-small w3-margin-right' onclick=\"document.getElementById('sellModal').style.display='block'\">Sell</button>";
                htmlStr += "</div>";
                
                htmlStr += "</div>";
                htmlStr += "</div>";
            }


        }
        if(buyerCount == 0){
            document.getElementById("showMarketDetails")!.innerHTML = "<p><h2>No Buyers Yet !!</h2></p>";
        }
        else{
            document.getElementById("showMarketDetails")!.innerHTML = htmlStr;
        }
        
    }

    sortOrdersByPriceDescending(){
        let sortedMarket = this.market.sort((a, b) => (a.Price > b.Price ? -1 : 1));
        // assign the sorted market array to the market attribute
        this.market = sortedMarket
        return this.market;
    }

    sortOrdersByPriceAscending(){
        let sortedMarket = this.market.sort((a, b) => (a.Price < b.Price ? -1 : 1));
        // assign the sorted market array to the market attribute
        this.market = sortedMarket
        return this.market;
    }

    AddSellTransaction(){
        this.block.Seller=this.user.UserName;
        this._httpService.AddTransaction(this.block).subscribe(data=>{
            console.log(data)
        })
    }

    AddBuyTransaction(){
        this.block.Buyer=this.user.UserName;
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