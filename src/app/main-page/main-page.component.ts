import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { blockInterface } from '../block';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  //blockchain: blockInterface[] =[];
  toDisplay:boolean= false;
  PageList = [
    {page:"blockchain"},
    {page:"transaction"},
    {page:"userprofile"},
    {page:"landingPage"},
  ]

  constructor(private _httpService:HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  
  onSelect(PageList: any){
    this.router.navigate([PageList.page],{relativeTo:this.route});
  }
  
  goBack(){
    this._httpService.goBack();
  }
  
  openLandingPage(){
    window.open('landingPage.component.html');
  }

}







