import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { blockInterface } from '../block';
import { Data, dataInterface } from '../block';
import { HttpService } from '../http.service';
import { ThisReceiver } from '@angular/compiler';


@Component({
    selector:'app-landingPage',
    templateUrl: './landingPage.component.html',
    styleUrls: ['./landingPage.component.css']
})
export class LandingPageComponent implements OnInit{
    block = new Data()
    constructor(private _httpService:HttpService, private router: Router, private route: ActivatedRoute, private _http: HttpClient) { }

    //constructor(private _http: HttpClient, private _httpService:HttpService) {}
    ngOnInit(): void{
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
        this._httpService.AddTransaction(this.block).subscribe(data=>{
            console.log(data)
        })
    }
    goLogin(){
        this.router.navigate(['../login'],{relativeTo: this.route});
      }
    goSignUp(){
        this.router.navigate(['../signup'],{relativeTo: this.route});
    }

}