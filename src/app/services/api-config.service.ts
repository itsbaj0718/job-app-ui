import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  // Change this to your actual Spring Boot API base URL
  private apiBaseUrl = 'http://localhost:8080/api';

  getApiBaseUrl(): string {
    return this.apiBaseUrl;
  }

  setApiBaseUrl(url: string): void {
    this.apiBaseUrl = url;
  }
}
