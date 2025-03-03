import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = `https://nexus-capital.onrender.com/api/transaction`;

  constructor(private http: HttpClient) {}

  addTransaction(email: string, category: string, amount: number, description: string, date: string | Date): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-transaction`, { email, category, amount, description, date }).pipe(
      catchError(this.handleError)
    );
  }

  getTransactions(email: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/get-transactions/${email}`).pipe(
      catchError(this.handleError)
    );
  }

  editTransaction(id: string, category: string, amount: number, description: string, date: string | Date): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit-transaction/${id}`, { category, amount, description, date }).pipe(
      catchError(this.handleError)
    );
  }

  deleteTransaction(id: string, email: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-transaction/${id}`, {
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
