import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageRoutingModule } from './message-routing.module';
import { OwlModule } from 'angular-owl-carousel';
import { MessageComponent } from './message.component';

@NgModule({
  imports: [
    CommonModule,
    MessageRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    OwlModule
  ],
  declarations: [MessageComponent]
})
export class MessageModule { }
