import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { blockInterface, User, Order, DeleteQuery } from "../block";
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SlicePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import * as CryptoJS from 'crypto-js';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DialogService } from "../services/dialog.service";

@Component({
    selector:'app-profilePage',
    templateUrl:'./profilePage.component.html',
    styleUrls: ['./profilePage.component.css']
})

export class ProfilePageComponent implements OnInit, OnDestroy{
    user = new User();
    // deletion = new DeleteQuery();
    userorders: Order[] =[];
    blocks: blockInterface[] = [];
    userpresent= false;
    MarketFetched=false;
    BlocksFetched=false;
    // Showcompleted=false;
    // Showopen=false;
    // order = new Order();
    private key = CryptoJS.enc.Utf8.parse('4512631236589784');
  
    private iv = CryptoJS.enc.Utf8.parse('4512631236589784');
    
    constructor(private dialogService: DialogService,private _httpService:HttpService, private router: Router, private route: ActivatedRoute, private _http: HttpClient) { }
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    obs!: Observable<any>;
    
    ngOnDestroy(): void {
        if (this.dataSource){
            this.dataSource.disconnect();
        }
    }
    ngOnInit(){
        this.getEncryptedSessionToken();
        this._httpService.getUser(this.user).subscribe(data =>{
          this.user=data;
          this.userpresent=true;
          this._httpService.getMarket().subscribe(data =>{
            if (data!=null){
                this.userorders = data.filter( order => 
                    order.Issuer == this.user.UserName);
            }
            this.MarketFetched = true;
            this._httpService.getBlockChain().subscribe(data =>{
                if (data!=null){
                    console.log(data)
                    this.blocks = data.filter( block => (block.AllData.Seller == this.user.UserName || block.AllData.Buyer == this.user.UserName));
                        this.dataSource =new MatTableDataSource<blockInterface>(this.blocks)
                        this.dataSource.paginator= this.paginator
                        this.obs =this.dataSource.connect();
                }
                console.log(this.blocks)
                this.BlocksFetched=true;
            });
        }); 
        });  
        
    }
    


    DeleteOrder(order: Order){
        
            
        this.dialogService.confirmDialog({
            title: 'Delete Order:',
            message:'Are you sure you want to delete this order?',
            confirmText: 'Yes',
            cancelText: 'No',
        }).subscribe(res=>{
            if (res==true){
                this._httpService.DeleteOrder(order).subscribe(data =>{
                    if (this.userorders.length==1){
                        this.userorders=[];
                    }
                    this.dialogService.openSnackBar("Order Deleted", "Dismiss");
                    this.ngOnInit()
                })
                
                // console.log(2)
            }
        });
        
    }
    


    getEncryptedSessionToken(){
        // get encrypted session token as a string 
        let tknStr = localStorage.getItem("session-token")
        console.log("Retrieved session token")
        console.log(tknStr)
        // split the string in two parts, userEmail and userPassword
        let tknArr = tknStr?.split(",")
        //console.log(tknArr)

        // retrieve session token if not undefined
        if (tknArr != undefined){
          this.retrieveSessionToken(tknArr)
        }
    }

    retrieveSessionToken(tknArr : string[]){
        // split the token array into two separate parts
        let uEmailArr = tknArr[0].split('\"')
        let uPassArr = tknArr[1].split('\"')
    
        // encrypted value at index 3 for both email and password
        let encEmail = uEmailArr[3]
        let encPass = uPassArr[3]
        
        // decrypt the email and password
        let decEmail = this.decryptUsingAES256(encEmail)
        let decPass = this.decryptUsingAES256(encPass)
    
        
        console.log("Encrypted email: ", encEmail)
        console.log("Decrypted email: ", decEmail)
        console.log("Encrypted password hash: ", encPass)
        console.log("Decrypted password hash: ", decPass)
        this.user.Email=decEmail.slice(1, (decEmail.length-1));
        
        // console.log(this.user)
        // console.log(this.user.UserName)
        
      }

      decryptUsingAES256(decString: string){
        var decrypted = CryptoJS.AES.decrypt(decString, this.key, {
            keySize: 128 / 8,
            iv: this.iv,
            mode: CryptoJS.mode.CBC,                       
            padding: CryptoJS.pad.Pkcs7
        });
        //console.log('Decrypted : ' + decrypted);
        //console.log('Decrypted = ' + decrypted.toString(CryptoJS.enc.Utf8));
        return decrypted.toString(CryptoJS.enc.Utf8);
      }
}