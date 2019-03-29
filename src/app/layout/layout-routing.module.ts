import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
{
	 path: '',
     component: LayoutComponent,
     children: [
      { path: 'popup', loadChildren: './firsttimepage/firsttimepage.module#FirsttimeModule' },
      { path: 'myteam', loadChildren: './myteam/myteam.module#MyteamModule' },
      { path: 'myscrimmage', loadChildren: './myscrimmage/myscrimmage.module#MyscrimmageModule' },
      { path: 'messagelist', loadChildren: './messagelist/messagelist.module#MessagelistModule' },
      { path: 'message', loadChildren: './message/message.module#MessageModule' },
      { path: 'message/:id/:conid', loadChildren: './message/message.module#MessageModule' },
       { path: 'message/:id', loadChildren: './message/message.module#MessageModule' },
      { path: 'notification', loadChildren: './notification/notification.module#NotificationModule' },
      { path: 'accountsetting', loadChildren: './accountsetting/accountsetting.module#AccountsettingModule' },
      { path: 'searchresult/:lat/:lng/:skill/:age/:sport', loadChildren: './searchresult/searchresult.module#SearchResultModule' },
       { path: 'searchresult', loadChildren: './searchresult/searchresult.module#SearchResultModule' },
      { path: 'createteam', loadChildren: './createteam/createteam.module#CreateteamModule' },
      { path: 'editteam/:id', loadChildren: './editteam/editteam.module#EditteamModule' },
      { path: 'myteamdetail/:id', loadChildren: './myteam-detail/myteam-detail.module#MyteamDetailModule' },
      { path: 'otherteam/:id', loadChildren: './otherteam-detail/otherteam-detail.module#OtherteamModule' },
      { path: 'newscrimmage', loadChildren: './newscrimmage/newscrimmage.module#NewscrimmageModule' }


     ]
}
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
