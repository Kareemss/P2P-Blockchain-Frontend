import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { blockInterface, User } from "../block";
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SlicePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';

@Component({
    selector:'app-profilePage',
    templateUrl:'./profilePage.component.html',
    styleUrls: ['./profilePage.component.css']
})

export class ProfilePageComponent implements OnInit{
    user = new User();

    
    
    constructor(private _httpService:HttpService, private router: Router, private route: ActivatedRoute, private _http: HttpClient) { }
    ngOnInit(){
        
       
    }

    ngAfterViewInit(){
        this._httpService.getUser(this.user).subscribe(data =>{
            this.user=data;
            //document.getElementById("userDetails")!.innerHTML = this.user.UserName;
            console.log(this.user.UserName);
          })
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
}