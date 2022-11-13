// Angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Firebase Imports for Auth
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

// Env
import { environment } from '../environments/environment';

// App Component
import { AppComponent } from './app.component';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { InputDataModalComponent } from './components/input-data-modal/input-data-modal.component';
import { EditStudentModalComponent } from './components/edit-student-modal/edit-student-modal.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';

// Services
import { AuthService } from './services/auth.service';
import { RequestsService } from './services/requests.service';
import { StudentListComponent } from './components/student-list/student-list.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    StudentListComponent,
    InputDataModalComponent,
    EditStudentModalComponent,
    DropDownComponent,
    UserListComponent,
  ],
  imports: [
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, RequestsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
