import { HttpService } from './../http.service';
import { blockInterface } from './../block';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-blockchain',
  templateUrl: './display-blockchain.component.html',
  styleUrls: ['./display-blockchain.component.css']
})
export class DisplayBlockchainComponent implements OnInit {

  blockchain: blockInterface[] = [];

  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this._httpService.getBlockChain().subscribe(data => this.blockchain = data);
  }

}
