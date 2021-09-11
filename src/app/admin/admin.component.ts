import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteQuery } from '../block';
import { HtmlAstPath } from '@angular/compiler';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  DeletionQuery = new DeleteQuery();
  constructor(private _http: HttpClientModule, private _httpService: HttpService, private route:ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
  }

  DeleteObject(){
    var select = document.getElementById('DeletionType') as HTMLSelectElement;
    var value = +select.options[select.selectedIndex].value;

    let isnum = /^\d+$/.test(this.DeletionQuery.Condition);
    if (isnum){
      this.DeletionQuery.Condition = +this.DeletionQuery.Condition
    }
    this.DeletionQuery.DeletionType = value
    console.log(this.DeletionQuery)
    this._httpService.Deletion(this.DeletionQuery)
    .subscribe(data =>{
      console.log(data)
    })
  }
  
}
