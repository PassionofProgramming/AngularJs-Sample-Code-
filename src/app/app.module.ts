import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthGuard } from './shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwlModule } from 'angular-owl-carousel';
import { TranslateModule } from '@ngx-translate/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthServiceService } from './auth-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataFilterPipe} from './data-filter.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

@NgModule({
  declarations: [
    AppComponent,
    DataFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslateModule,
    AppRoutingModule,
    AmazingTimePickerModule,
    LoadingBarRouterModule,
    NgxSpinnerModule,
    OwlModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [AuthGuard,
    AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
