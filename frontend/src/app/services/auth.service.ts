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
      if (user != null) {
        if (user.reload() != null) {
          await user.reload()
        }
      }
      localStorage.setItem('user', JSON.stringify(this.userData));
      // JSON.parse(localStorage.getItem('user')!);
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
        if (localStorage.getItem('user') != null) {
          const localStor: string =  localStorage.getItem('user') as string;
          const cookie = JSON.parse(localStor);
          token = cookie.stsTokenManager.accessToken;
        }
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
      const user= await this.afAuth.currentUser;
      if (user != null) {
        await user.sendEmailVerification();
        this.router.navigate(['verify-email']);
      }
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
    if (localStorage.getItem('user') != null) {
      const localStor: string = localStorage.getItem('user') as string;
      const user = JSON.parse(localStor);
      return user !== null && user.emailVerified !== false ? true : false;
    }
    return false;
  }

  get isLa(): Promise<boolean> {
    const localStor: string = localStorage.getItem('user') as string
    
    const user = JSON.parse(localStor);

    return this.afs
      .doc<User>(`users/${user.uid}`)
      .ref.get()
      .then((doc) => {
        const data = doc.data();
        if (data?.role === undefined) {
          return false;
        }
        if (data != null) {
          return data.role == 'la';
        }
        return false;
      });
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
      const result = await this.afAuth.signInWithPopup(provider);
      localStorage.setItem('user', JSON.stringify(result.user));
      this.SetUserData(result.user);
    } catch (e) {
      console.error(e);
    }
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  async SetUserData(user: any) {
    console.log(user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    let role: string | undefined = 'none';
    const docRef = this.afs.collection('users').doc<User>(user.uid);
    await docRef.ref.get().then((userDoc) => {
      if (userDoc.exists) {
        const data = userDoc.data();
        if (data?.role !== undefined) {
          role = data?.role;
        }
      }
    });

    console.log(role);

    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      role: role,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  async GetUsers(): Promise<any> {
    return this.afs
      .collection<User>('users')
      .ref.get()
      .then((ref) => {
        return ref;
      });
  }

  AddRole(uid: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      role: 'la',
    };

    return userRef.update(data);
  }

  RemoveRole(uid: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      role: 'none',
    };

    return userRef.update(data);
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
