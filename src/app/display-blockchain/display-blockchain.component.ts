import { HttpService } from './../http.service';
import { blockInterface } from './../block';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-blockchain',
  templateUrl: './display-blockchain.component.html',
  styleUrls: ['./display-blockchain.component.css']
})
export class DisplayBlockchainComponent implements OnInit {

  blockchain: blockInterface[] = [];
  block: blockInterface | undefined;
  constructor(private _httpService: HttpService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBlockchain();
  }
  
  getBlockchain() {
    this._httpService.getBlockChain().subscribe(data =>{
      this.blockchain = data
    });
    
  }

  ngAfterViewInit(){
    // call the get blockchain method when page is loaded
    
  }

  
  //resue the same function from httpSerive, may need to open new service that store all common function
  goBack(){
    this._httpService.goBack();
  }
  toMarketPage(){
    this.router.navigate(['../market'],{relativeTo: this.route});
  }
  goLogin(){
    this.router.navigate(['../login'],{relativeTo: this.route});
  }
  goSignUp(){
    this.router.navigate(['../signup'],{relativeTo: this.route});
  }

}
