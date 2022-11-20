import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Student } from '../interfaces/student';
import { User } from '../interfaces/user';
import { La } from './../interfaces/la';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getLas(): Observable<La[]> {
    let url: string = 'http://localhost:3000/las';

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        return this.http.get<La[]>(url, {
          headers: reqHeader,
        });
      })
    );
  }

  // Subscribe to the return of this method to access the values in the observable
  // Get all exercises
  getStudents(): Observable<Student[]> {
    let url: string = 'http://localhost:3000/students';

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        return this.http.get<Student[]>(url, {
          headers: reqHeader,
        });
      })
    );
  }

  insertStudents(students: Student[]): Observable<String> {
    let url: string = 'http://localhost:3000/students';

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        return this.http.post<String>(
          url,
          {
            data: students,
          },
          {
            headers: reqHeader,
          }
        );
      })
    );
  }

  deleteStudent(student: Student): Observable<String> {
    let url: string = `http://localhost:3000/students/${student.rin}`;
    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        return this.http.request<String>('delete', url, {
          headers: reqHeader,
          body: student,
        });
      })
    );
  }

  getUsers(): Observable<User[]> {
    let url: string = 'http://localhost:3000/users';
    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        return this.http.get<User[]>(url, {
          headers: reqHeader,
        });
      })
    );
  }
}
