import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayBlockchainComponent } from './display-blockchain/display-blockchain.component';
import { LandingPageComponent } from './landingPage/landingPage.component';
import { MarketPageComponent } from './marketPage/marketPage.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:'',redirectTo:'/mainpage',pathMatch:'full'},
  {path:'mainpage',component: MainPageComponent},  
  {path:'mainpage/blockchain',component:DisplayBlockchainComponent},
  {path:'mainpage/transaction',component:TransactionComponent},
  {path:'mainpage/userprofile',component:UserProfileComponent},
  {path:'mainpage/login',component:LoginComponent},
  {path:'mainpage/landingPage',component:LandingPageComponent},
  {path:'mainpage/market',component:MarketPageComponent}
];

// const routes: Routes = [
//   {path:'',redirectTo:'/mainpage',pathMatch:'full'},
//   {
//     path:'mainpage',
//     component: MainPageComponent,
//     children:[
//       {path:'blockchain',component:DisplayBlockchainComponent},
//       {path:'transaction',component:TransactionComponent},
//       {path:'userprofile',component:UserProfileComponent}
//     ]
//   },  
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MainPageComponent,DisplayBlockchainComponent, TransactionComponent,UserProfileComponent,LoginComponent,LandingPageComponent];
