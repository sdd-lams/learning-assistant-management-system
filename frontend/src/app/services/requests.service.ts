import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

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
}
