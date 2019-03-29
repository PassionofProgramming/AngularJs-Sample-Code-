import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagelistComponent } from './messagelist.component';

const routes: Routes = [
    {
        path: '', component: MessagelistComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MessagelistRoutingModule {
}
