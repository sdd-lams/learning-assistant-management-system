import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });

        return this.http.get<Student[]>(url, {
          headers: headers,
        });
      })
    );
  }

  postStudents(students: Student[]): Observable<String> {
    let url: string = 'http://localhost:3000/students';

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });

        return this.http.post<String>(
          url,
          {
            data: students,
          },
          {
            headers: headers,
          }
        );
      })
    );
  }

  // Send student update data to the backend to update a single student entry
  putStudent(student: Student): Observable<String> {
    let url: string = `http://localhost:3000/students/${student.rin}`;

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });

        const params = new HttpParams()
          .set('ccode', student.ccode)
          .set('csubject', student.csubject);

        return this.http.put<String>(url, student, {
          headers: headers,
          params: params,
        });
      })
    );
  }
}
