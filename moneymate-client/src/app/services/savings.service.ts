import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SavingsGoal } from '../models/savings.model';

@Injectable({
  providedIn: 'root'
})
export class SavingsService {
  private apiUrl = `https://nexus-capital.onrender.com/api/savings`;

  constructor(private http: HttpClient) {}

  getSavingsGoals(email: string): Observable<SavingsGoal[]> {
    return this.http.get<SavingsGoal[]>(`${this.apiUrl}/get-savings/${email}`).pipe(
      catchError(this.handleError)
    );
  }

  addSavingsGoal(email: string, goal: Partial<SavingsGoal>): Observable<SavingsGoal> {
    return this.http.post<SavingsGoal>(`${this.apiUrl}/add-savings`, { 
      email, 
      ...goal 
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateSavingsGoal(id: string, goal: Partial<SavingsGoal>): Observable<SavingsGoal> {
    return this.http.put<SavingsGoal>(`${this.apiUrl}/update-savings/${id}`, goal).pipe(
      catchError(this.handleError)
    );
  }

  deleteSavingsGoal(id: string, email: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-savings/${id}`, {
      body: { email }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      console.error(error);
      errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
