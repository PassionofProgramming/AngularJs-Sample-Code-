import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { OwlModule } from 'angular-owl-carousel';
import { FileDropModule } from 'ngx-file-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    LayoutRoutingModule,
    OwlModule,
    FileDropModule
    
  ],
  declarations: [LayoutComponent,HeaderComponent,
    FooterComponent]
})
export class LayoutModule { }
