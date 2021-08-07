import { blockInterface } from './block';
import { HttpService } from './http.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'P2P-Blockchain-Frontend';
  //blockchain: blockInterface[] = [];
  //toDisplay: boolean = false;


  // PageList = [
  //   {page:"transaction"},
  //   {page:"userprofile"}
  // ]

  constructor(private _httpService: HttpService, private router: Router, private route: ActivatedRoute) { }

  // ngOnInit() {
  //   this._httpService.getBlockChain().subscribe(data => this.blockchain = data);
  // }

  // onSelect(PageList: any){
  //   this.router.navigate([PageList.page],{relativeTo:this.route});
  // }


  // getBlockchain() {
  //   this._httpService.getBlockChain().subscribe(data => this.blockchain = data);
  //   this.toDisplay = true;
  // }
}
