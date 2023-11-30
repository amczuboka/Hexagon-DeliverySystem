import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthguardGuard } from './services/auth.guard';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { RequestDeliveryQuotationComponent } from './pages/request-delivery-quotation/request-delivery-quotation.component';
import { DeliverySummaryComponent } from './pages/delivery-summary/delivery-summary.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { MyDeliveriesComponent } from './pages/my-deliveries/my-deliveries.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: LandingComponent, canActivate: [AuthguardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  {
    path: 'request-delivery-quotation',
    component: RequestDeliveryQuotationComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'delivery-summary',
    component: DeliverySummaryComponent,
    canActivate: [AuthguardGuard],
  },
  { path: 'reviews', component: ReviewsComponent, canActivate: [AuthguardGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthguardGuard] },
  { path: 'my-deliveries', component: MyDeliveriesComponent, canActivate: [AuthguardGuard] },
  { path: 'roomlist', component: RoomlistComponent, canActivate: [AuthguardGuard] },
  { path: 'addroom', component: AddroomComponent,canActivate: [AuthguardGuard]  },
  { path: 'chatroom/:roomname', component: ChatroomComponent,canActivate: [AuthguardGuard]  },
  { path: 'user-profile', component: UserProfileComponent},
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthguardGuard],
  },

  //needs to be at the bottom or else it will override all the other routes
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
    canActivate: [AuthguardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
