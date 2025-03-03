import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Budget } from '../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = `https://nexus-capital.onrender.com/api/budget`;

  constructor(private http: HttpClient) {}

  getBudgets(email: string): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.apiUrl}/get-budgets/${email}`).pipe(
      catchError(this.handleError)
    );
  }

  addBudget(email: string, budget: Partial<Budget>): Observable<Budget> {
    return this.http.post<Budget>(`${this.apiUrl}/add-budget`, { 
      email, 
      ...budget 
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateBudget(id: string, budget: Partial<Budget>): Observable<Budget> {
    return this.http.put<Budget>(`${this.apiUrl}/update-budget/${id}`, budget).pipe(
      catchError(this.handleError)
    );
  }

  deleteBudget(id: string, email: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-budget/${id}`, {
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
