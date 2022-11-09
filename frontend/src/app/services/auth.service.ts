import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  async reloadUser() {
    try {
      const user = await this.afAuth.currentUser;
      await user!.reload();
      localStorage.setItem('user', JSON.stringify(this.userData));
      JSON.parse(localStorage.getItem('user')!);
    } catch (e) {
      console.error(e);
    }
  }

  async getToken(): Promise<string | undefined> {
    let token: string | undefined;
    try {
      const user = await this.afAuth.currentUser;
      token = await user?.getIdToken(true);
      if (!token) {
        let cookie = JSON.parse(localStorage.getItem('user')!);
        token = cookie.stsTokenManager.accessToken;
      }
    } catch (e) {
      console.error(e);
    }
    return token;
  }

  // Sign in with email/password
  async SignIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );

      localStorage.setItem('user', JSON.stringify(result.user));

      this.SetUserData(result.user);
      this.router.navigate(['dashboard/students']);
    } catch (e) {
      console.error(e);
    }
  }

  // Sign up with email/password
  async SignUp(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      this.SendVerificationMail();
      this.SetUserData(result.user);
    } catch (e) {
      console.error(e);
    }
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    try {
      const user = await this.afAuth.currentUser;
      await user!.sendEmailVerification();
      this.router.navigate(['verify-email']);
    } catch (e) {
      console.error(e);
    }
  }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password reset email sent, check your inbox.');
    } catch (e) {
      console.error(e);
    }
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  async GoogleAuth() {
    try {
      await this.AuthLogin(new auth.GoogleAuthProvider());
      this.router.navigate(['dashboard/students']);
    } catch (e) {
      console.error(e);
    }
  }
  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    try {
      let result = await this.afAuth.signInWithPopup(provider);
      localStorage.setItem('user', JSON.stringify(result.user));
      this.SetUserData(result.user);
    } catch (e) {
      console.error(e);
    }
  }
  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  async SignOut() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    } catch (e) {
      console.error(e);
    }
  }
}
