


import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { blockInterface } from '../block';
import { Data, dataInterface } from '../block';
import { HttpService } from '../http.service';

@Component({
    selector:'app-landingPage',
    templateUrl: './landingPage.component.html',
    styleUrls: ['./landingPage.component.css']
})
export class LandingPageComponent implements OnInit{

    constructor(private _httpService:HttpService, private router: Router, private route: ActivatedRoute) { }

    //constructor(private _http: HttpClient, private _httpService:HttpService) {}
    ngOnInit(): void{
    }

    onSelect(){
        this.router.navigate(['../blockchain'],{relativeTo: this.route});
    }

    goBack(){
        this._httpService.goBack();
    }

}