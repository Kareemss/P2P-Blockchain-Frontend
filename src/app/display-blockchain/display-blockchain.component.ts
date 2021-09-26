import { HttpService } from './../http.service';
import { blockInterface, User } from './../block';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-display-blockchain',
  templateUrl: './display-blockchain.component.html',
  styleUrls: ['./display-blockchain.component.css']
})
export class DisplayBlockchainComponent implements OnInit {

  blockchain: blockInterface[] = [];
  block: blockInterface | undefined;
  user = new User();
  private key = CryptoJS.enc.Utf8.parse('4512631236589784');
  //console.log(key)
  private iv = CryptoJS.enc.Utf8.parse('4512631236589784');
  constructor(private _httpService: HttpService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(){
    this.getBlockchain();
    this.getEncryptedSessionToken();
      this._httpService.getUser(this.user).subscribe(data =>{
        this.user=data;
        // document.getElementById("userId")!.innerHTML = this.user.UserName;
        // console.log(this.user.UserName)
      })
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
  toProfilePage(){
    this.router.navigate(['../profilePage'], {relativeTo: this.route});
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
