import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobPost } from '../models/jobpost.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Job Post Endpoints
  getAllJobs(): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.apiUrl}/jobPosts`);
  }

  getJob(postId: number): Observable<JobPost> {
    return this.http.get<JobPost>(`${this.apiUrl}/jobPost/${postId}`);
  }

  addJob(jobPost: JobPost): Observable<JobPost> {
    return this.http.post<JobPost>(`${this.apiUrl}/jobPost`, jobPost);
  }

  updateJob(jobPost: JobPost): Observable<JobPost> {
    return this.http.put<JobPost>(`${this.apiUrl}/jobPost`, jobPost);
  }

  deleteJob(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/jobPost/${postId}`);
  }

  loadData(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/load`);
  }
}
