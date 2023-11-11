import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NavComponent } from './components/nav/nav.component';

import { HttpClientModule } from '@angular/common/http';
import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AngularFireModule} from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {provideFirestore,getFirestore} from '@angular/fire/firestore';
import {provideStorage,getStorage} from '@angular/fire/storage';
import {provideAuth} from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import {provideDatabase,getDatabase} from '@angular/fire/database';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthguardGuard } from './services/auth.guard';
import { StorageService } from './services/storage.service';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { RoomlistComponent } from './components/roomlist/roomlist.component';
import { AddroomComponent } from './components/addroom/addroom.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LandingComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent,
    VerifyEmailComponent,
    RoomlistComponent,
    AddroomComponent,
    ChatroomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatMenuModule,
    MatSelectModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
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
    MatTableModule,
    MatSidenavModule,
    MatSortModule,
  ],
  providers: [
    CookieService,
    StorageService,
    AuthService,
    AuthguardGuard,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faCoffee);
  }
}
