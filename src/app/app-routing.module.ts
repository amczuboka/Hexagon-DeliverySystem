import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { MyDeliveriesComponent } from './my-deliveries/my-deliveries.component'; 

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'my-deliveries', component: MyDeliveriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
