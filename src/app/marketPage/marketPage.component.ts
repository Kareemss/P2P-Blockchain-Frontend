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
    }

    getMarket(){
        this._httpService.getMarket().subscribe(data => this.market = data);
        this.toDisplay = true;
    }

    onSelect(){
        this.router.navigate(['../blockchain'],{relativeTo: this.route});
    }

    goBack(){
        this._httpService.goBack();
    }
}