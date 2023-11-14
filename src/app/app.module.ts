import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

import { MatDialogModule } from '@angular/material/dialog'; //for dialog in requst delivery/quotation
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MyDeliveriesComponent } from './pages/my-deliveries/my-deliveries.component';
import { NavComponent } from './components/nav/nav.component';

import { HttpClientModule } from '@angular/common/http';
import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthguardGuard } from './services/auth.guard';
import { StorageService } from './services/storage.service';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { DeliveryItemComponent } from './components/delivery-item/delivery-item.component';
import { AddItemDialogComponent } from './components/add-item-dialog/add-item-dialog.component';
import { RegisterComponent } from './pages/register/register.component';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { RequestDeliveryQuotationComponent } from './pages/request-delivery-quotation/request-delivery-quotation.component';
import { DeliverySummaryComponent } from './pages/delivery-summary/delivery-summary.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { ReviewComponent } from './components/review/review.component';
import { SearchComponent } from './components/search/search.component';
import { DeliveryCardComponent } from './components/delivery-card/delivery-card.component';
import { OrderSummaryDialogComponent } from './components/order-summary-dialog/order-summary-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    MyDeliveriesComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent,
    VerifyEmailComponent,
    RequestDeliveryQuotationComponent,
    DeliveryItemComponent,
    AddItemDialogComponent,
    DeliverySummaryComponent,
    TrackingComponent,
    ReviewsComponent,
    ReviewComponent,
    SearchComponent,
    DeliveryCardComponent,
    OrderSummaryDialogComponent,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatMenuModule,
    MatSelectModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,  //for dialog 
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MatProgressSpinnerModule,
    provideMessaging(() => getMessaging()),
  ],
  providers: [CookieService, StorageService, AuthService, AuthguardGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faCoffee);
  }
}
