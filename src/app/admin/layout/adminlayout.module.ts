import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './adminlayout-routing.module';
import { LayoutComponent } from './adminlayout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

// export function createTranslateLoader(http: HttpClient) {
//     // for development
//     // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
//     return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
// }

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule.forRoot(),
        NgbDropdownModule.forRoot()
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent]
})
export class LayoutModule {}
