import { blockInterface } from './block';
import { HttpService } from './http.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'P2P-Blockchain-Frontend';
  blockchain: blockInterface[] = [];
  toDisplay: boolean = false;

  constructor(private _httpService: HttpService) { }

  // ngOnInit() {
  //   this._httpService.getBlockChain().subscribe(data => this.blockchain = data);
  // }

  getBlockchain() {
    this._httpService.getBlockChain().subscribe(data => this.blockchain = data);
    this.toDisplay = true;
  }
}
