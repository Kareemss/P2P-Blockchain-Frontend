
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Data, dataInterface } from '../block';
import { HttpService } from '../http.service';

@Component({
    selector:'app-landingPage',
    templateUrl: './landingPage.component.html',
    styleUrls: ['./landingPage.component.css']
})
export class LandingPageComponent implements OnInit{
    
    constructor(private _http: HttpClient, private _httpService:HttpService) {}
    ngOnInit(): void{
    
    }
    goBack(){
        this._httpService.goBack();
    }

}