import { ActivatedRoute, Router } from '@angular/router';
import { dataInterface } from '../block';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
    selector:'app-marketPage',
    templateUrl: './marketPage.component.html',
    styleUrls: ['./marketPage.component.css']
})
export class MarketPageComponent implements OnInit{

    market: dataInterface[] = [];
    toDisplay:boolean = false;
    constructor(private _httpService:HttpService, private router: Router, private route: ActivatedRoute) { }

    //constructor(private _http: HttpClient, private _httpService:HttpService) {}
    ngOnInit(): void{
        this.getMarket();
    }

    getMarket(){
        this._httpService.getMarket().subscribe(data => this.market = data);
        this.toDisplay = true;
        
    }

    /** Show all sellers when "buy" is clicked */
    showSellers(){
        let htmlStr = ""
        let sellerCount = 0
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
                htmlStr += "<button class='w3-button w3-black w3-padding-small w3-margin-right' (click)=''>Buy</button>";
                htmlStr += "</div>";
                
                htmlStr += "</div>";
                htmlStr += "</div>";
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
                htmlStr += "<button class='w3-button w3-black w3-padding-small w3-margin-right' (click)=''>Sell</button>";
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


    ngAfterViewInit(){
        // call the get blockchain meh=thod when page is loaded
        // this.showSellers()
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
}