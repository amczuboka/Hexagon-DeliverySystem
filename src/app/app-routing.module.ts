import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthguardGuard } from './services/auth.guard';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { DeliverySummaryComponent } from './pages/delivery-summary/delivery-summary.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';

const routes: Routes = [
  { path: '', component: LandingComponent, canActivate: [AuthguardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  {
    path: 'delivery-summary',
    component: DeliverySummaryComponent,
    canActivate: [AuthguardGuard],
  },
  { path: 'reviews', component: ReviewsComponent, canActivate: [AuthguardGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
