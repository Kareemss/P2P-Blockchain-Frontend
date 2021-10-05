import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  //blockchain: blockInterface[] =[];
  // toDisplay:boolean= false;
  // PageList = [
  //   {page:"blockchain"},
  //   {page:"transaction"},
  //   {page:"userprofile"},
  //   {page:"login"},
  //   {page:"signup"},
  //   {page:"landingPage"},
  //   {page:"market"},
  // ]

  constructor(private _httpService:HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  
  // ngAfterViewInit(){
  //   if(this.checkSessionToken()){
  //     // session token exists, so go to landing page
  //     this.onSelect(this.PageList[5]);
  //   }
  // }
  
  // onSelect(PageList: any){
  //   this.router.navigate([PageList.page],{relativeTo:this.route});
  // }
  
  // goBack(){
  //   this._httpService.goBack();
  // }
  
  // openLandingPage(){
  //   window.open('landingPage.component.html');
  // }

  // checkSessionToken() : boolean {
  //   if(window.localStorage.getItem('session-token') != undefined){
  //     return true
      
  //   }
  //   else{
  //     return false;
  //   }

  // }

  /** Method to redirect user to landing or login page based on session token*/
  // goLogin(){
  //   if(this.checkSessionToken()){
  //     // session token exists, so go to landing page
  //     this.onSelect(this.PageList[5]);
  //   }
  //   else{
  //     // session token does not exists, so go to login page
  //     this.onSelect(this.PageList[3]);
  //   }
  // }

}







