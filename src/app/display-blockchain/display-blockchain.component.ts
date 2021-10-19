import { HttpService } from './../http.service';
import { blockInterface, User } from './../block';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-display-blockchain',
  templateUrl: './display-blockchain.component.html',
  styleUrls: ['./display-blockchain.component.css']
})
export class DisplayBlockchainComponent implements OnInit, OnDestroy {

  blockchain: blockInterface[] = [];
  // block: blockInterface | undefined;
  constructor(private _httpService: HttpService, private router: Router,private route: ActivatedRoute) { }
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  obs!: Observable<any>;
  blocksFetched=false;

  ngOnInit(){
   
    this._httpService.getBlockChain().subscribe(data =>{
      this.blockchain = data.sort((a,b)=>(a.Index>b.Index ? -1 :1));
      this.dataSource =new MatTableDataSource<blockInterface>(data)
      this.dataSource.paginator= this.paginator
      this.obs =this.dataSource.connect();
      this.blocksFetched=true;
      
    });
  }

  ngOnDestroy(){
    if (this.dataSource){
      this.dataSource.disconnect();
    }
  }
  

}
