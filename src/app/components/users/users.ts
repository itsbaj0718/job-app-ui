import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { JobPost } from '../../models/jobpost.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class UsersComponent implements OnInit {
  jobPosts: JobPost[] = [];
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadJobPosts();
  }

  loadJobPosts(): void {
    this.loading = true;
    this.error = null;
    
    this.apiService.getAllJobs().subscribe({
      next: (data: JobPost[]) => {
        this.jobPosts = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load job posts';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteJob(postId: number | undefined): void {
    if (postId === undefined) return;
    
    this.apiService.deleteJob(postId).subscribe({
      next: () => {
        this.loadJobPosts();
      },
      error: (err: any) => {
        this.error = 'Failed to delete job post';
        console.error(err);
      }
    });
  }

  loadData(): void {
    this.loading = true;
    this.apiService.loadData().subscribe({
      next: (response: string) => {
        console.log(response);
        this.loadJobPosts();
      },
      error: (err: any) => {
        this.error = 'Failed to load data';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
