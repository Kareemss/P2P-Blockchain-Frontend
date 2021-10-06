import { ActivatedRoute, Router } from '@angular/router';
import { Order, dataInterface, User } from '../block';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { HttpService } from '../http.service';
import * as CryptoJS from 'crypto-js';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../services/dialog.service';
import { transactionDialogData } from '../services/dialog-data';

@Component({
    selector:'app-marketPage',
    templateUrl: './marketPage.component.html',
    styleUrls: ['./marketPage.component.css']
})
export class MarketPageComponent implements OnInit{
    NewOrderForm = new FormGroup({
        amount: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        type: new FormControl()
    })
    maxOrder!: number;
    title!: string;
    maxInput!: number;
    NewOrder = new Order();
    block = new Order();
    CurrentOrder= new Order();
    sellorders: Order[] = [];
    buyorders: Order[] = [];
    allorders: Order[] = [];
    IsFetched= false;
    user = new User();
    Showsell = false;
    Showbuy = false;
    // Declare this key and iv values in declaration
  private key = CryptoJS.enc.Utf8.parse('4512631236589784');
  //console.log(key)
  private iv = CryptoJS.enc.Utf8.parse('4512631236589784');
    constructor(private dialogService: DialogService, private _httpService:HttpService, private router: Router, private route: ActivatedRoute) { }

    //constructor(private _http: HttpClient, private _httpService:HttpService) {}
    ngOnInit(): void{
        this.getEncryptedSessionToken();
        
        this._httpService.getMarket().subscribe(data =>{
            this.allorders = data;
            if (data!=null){
                this.sellorders = this.allorders.filter(
                    order => order.Seller !=""
                );
                this.sellorders = this.sellorders.sort((a, b) => (
                    a.Price < b.Price ? -1 : 1));
                console.log(this.sellorders)
                this.buyorders = this.allorders.filter(
                    order => order.Buyer !=""
                );
                this.buyorders = this.buyorders.sort((a, b) => (
                    a.Price > b.Price ? -1 : 1));
                console.log(this.buyorders)
            }
            this.IsFetched = true;
        }); 

        this._httpService.getUser(this.user).subscribe(data =>{
            this.user=data;
            console.log(data)
        });
        
    } 
    
    validate(){
        if (this.NewOrderForm.get('type')?.value=="Buy"){
            this.maxOrder= this.user.CurrencyBalance/this.NewOrderForm.get('price')?.value;
        }else{
            this.maxOrder=this.user.EnergyBalance;
        }
    }

    // test(){
    //     this.dialogService.transactionDialog({
    //         title: 'Sell',
    //         message:'message',
    //         confirmText: 'Yes',
    //         cancelText: 'No',
    //         issuer: 'seller',
    //         amount: 'amount',
    //         price: 'price'

    //     }).subscribe(res=>{
    //         console.log(res);
    //     });
    // }

    clear(){
        this.NewOrderForm = new FormGroup({
            amount: new FormControl('', [Validators.required]),
            price: new FormControl('', [Validators.required]),
            type: new FormControl()
        })
    }

    // ShowBuy(){
    //     this.Showbuy=true;
    //     this.Showsell=false;
    //     console.log("showing buyers")
    // }
    // ShowSell(){
    //     this.Showbuy=false;
    //     this.Showsell=true;
    //     console.log("showing sellers")
    // }

    PressBuySell(order: Order){
        console.log(order)
        if (order.Issuer==order.Seller){
            this.title= "Buy"
            console.log(this.title)
            let maxPayed = order.Price*order.Amount;
            if (this.user.CurrencyBalance<=maxPayed){
                this.maxInput=this.user.CurrencyBalance/order.Price
            }else{
                this.maxInput=order.Amount
            }
        }else{
            this.title= "Sell"
            console.log(this.title)
            if (this.user.EnergyBalance<=order.Amount){
                this.maxInput=this.user.EnergyBalance
            }else{
                this.maxInput=order.Amount
            }
        }
        this.dialogService.transactionDialog({
            title: this.title,
            issuer: order.Issuer,
            amount: order.Amount,
            price: order.Price,
            maxInput: this.maxInput,
            userEBalance: this.user.EnergyBalance,
            userCBalance: this.user.CurrencyBalance
        }).subscribe(res=>{
            if (res==false){
                return
            }
            order.Amount=res
            if (this.title=="Buy"){
                order.Buyer=this.user.UserName;
            }else{
                order.Seller=this.user.UserName;
            }
            this.dialogService.confirmDialog({
                title: 'Please Confirm Your Order:',
                message:'Amount: '+ order.Amount+' KWh'+
                    '<br/>Price: '+order.Price + ' $/KWh'+
                    '<br/> Total: ' + order.Price*order.Amount +' $',
                confirmText: 'Yes',
                cancelText: 'No',
            }).subscribe(res=>{
                if (res==true){
                    console.log(order);
                    this._httpService.AddTransaction(order).subscribe(data=>{
                        console.log(data)
                        this.dialogService.openSnackBar("Order submitted successfully ", "Dismiss");
                        this.ngOnInit()
                    })
                }
            });
        });
    }

    AddNewOrder() {
        if (!this.NewOrderForm.valid) {
            return;
        }
        this.NewOrder= new Order();
        if (this.NewOrderForm.get('type')?.value =="Buy"){
            this.NewOrder.Buyer=this.user.UserName;
            this.NewOrder.Issuer=this.NewOrder.Buyer;
        }else{
            this.NewOrder.Seller=this.user.UserName;
            this.NewOrder.Issuer=this.NewOrder.Seller;
        }
        this.NewOrder.Amount=this.NewOrderForm.get('amount')?.value;
        this.NewOrder.Price=this.NewOrderForm.get('price')?.value;
        this.dialogService.confirmDialog({
            title: 'Please Confirm Your Order:',
            message:'Amount: '+ this.NewOrder.Amount +' KWh'+
            '<br/>Price: '+this.NewOrder.Price+ ' $/KWh',
            confirmText: 'Yes',
            cancelText: 'No',
        }).subscribe(res=>{
            if (res==true){
                console.log(this.NewOrder);
                this._httpService.AddOrder(this.NewOrder).subscribe(data=>{
                    // console.log(data)
                    this.dialogService.openSnackBar("Order submitted successfully ", "Dismiss");
                    this.ngOnInit()
                })
                
                // console.log(2)
            }
        });
        
        
    }

    // AddSellTransaction(){
    //     this.block.Seller=this.user.UserName;
    //     this.block.Buyer=this.CurrentOrder.Buyer;
    //     this.block.Issuer=this.CurrentOrder.Issuer;
    //     this.block.Price=this.CurrentOrder.Price;
    //     this.block.OrderID=this.CurrentOrder.OrderID;
    //     console.log(this.block)
    //     this._httpService.AddTransaction(this.block).subscribe(data=>{
    //         console.log(data)
    //     })
    // }

    // AddBuyTransaction(){
    //     this.block.Buyer=this.user.UserName;
    //     this.block.Seller=this.CurrentOrder.Seller;
    //     this.block.Issuer=this.CurrentOrder.Issuer;
    //     this.block.Price=this.CurrentOrder.Price;
    //     this.block.OrderID=this.CurrentOrder.OrderID;
    //     console.log(this.block)
    //     this._httpService.AddTransaction(this.block).subscribe(data=>{
    //         console.log(data)
    //     })
    // }
    // goBack(){
    //     this._httpService.goBack();
    // }
    // goLogin(){
    //     this.router.navigate(['../login'],{relativeTo: this.route});
    // }
    // goSignUp(){
    //     this.router.navigate(['../signup'],{relativeTo: this.route});
    // }
    
    // toBlockChainPage(){
    //     this.router.navigate(['../blockchain'],{relativeTo: this.route});
    // }
    // toProfilePage(){
    //     this.router.navigate(['../profilePage'], {relativeTo: this.route});
    // }
    
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