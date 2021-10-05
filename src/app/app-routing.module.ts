import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayBlockchainComponent } from './display-blockchain/display-blockchain.component';

import { MarketPageComponent } from './marketPage/marketPage.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminComponent } from './admin/admin.component';
import { ProfilePageComponent } from './profilePage/profilePage.component';

const routes: Routes = [
  {path:'',redirectTo:'/mainpage',pathMatch:'full'},
  {path:'mainpage',component: MainPageComponent},  
  {path:'blockchain',component:DisplayBlockchainComponent},
  
  {path:'signup',component:UserProfileComponent},
  {path:'login',component:LoginComponent},
  {path:'market',component:MarketPageComponent},
  {path:'admin',component:AdminComponent},
  {path: 'profilepage', component: ProfilePageComponent}
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
export const routingComponents = [MainPageComponent,DisplayBlockchainComponent,UserProfileComponent,LoginComponent, ProfilePageComponent];
