import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { JobPost } from '../../models/jobpost.model';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './body.html',
  styleUrl: './body.css'
})
export class BodyComponent implements OnInit {
  jobPosts: JobPost[] = [];
  loading = false;
  error: string | null = null;
  success: string | null = null;
  
  // Form states
  showAddForm = false;
  showUpdateForm = false;
  selectedJobPost: JobPost | null = null;

  // Form data
  newJobPost: JobPost = {
    postProfile: '',
    postDesc: '',
    reqExperience: 0,
    postTechStack: []
  };

  updateJobPost: JobPost = {
    postProfile: '',
    postDesc: '',
    reqExperience: 0,
    postTechStack: []
  };

  techStackInput = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Comment this out if your Spring Boot server is not running yet
    // this.loadAllJobs();
    
    // Temporary message so you know the component is loaded
    this.success = 'Component loaded! Click "Refresh Jobs" to load job posts from your Spring Boot server.';
  }

  // Load all job posts
  loadAllJobs(): void {
    this.loading = true;
    this.error = null;
    this.success = null;
    
    this.apiService.getAllJobs().subscribe({
      next: (data: JobPost[]) => {
        this.jobPosts = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load job posts. Make sure your Spring Boot server is running on http://localhost:8080';
        this.loading = false;
        console.error('API Error:', err);
      }
    });
  }

  // Get single job post
  getJobPost(postId: number | undefined): void {
    if (postId === undefined) return;
    
    this.loading = true;
    this.error = null;
    
    this.apiService.getJob(postId).subscribe({
      next: (data: JobPost) => {
        this.selectedJobPost = data;
        this.updateJobPost = { ...data };
        this.techStackInput = data.postTechStack.join(', ');
        this.showUpdateForm = true;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load job post';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Add new job post
  addJobPost(): void {
    if (!this.validateNewJobPost()) {
      this.error = 'Please fill all required fields';
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    // Convert comma-separated tech stack to array
    this.newJobPost.postTechStack = this.techStackInput
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0);

    this.apiService.addJob(this.newJobPost).subscribe({
      next: (response: JobPost) => {
        this.success = 'Job post added successfully!';
        this.resetAddForm();
        this.loadAllJobs();
      },
      error: (err: any) => {
        this.error = 'Failed to add job post';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Update job post
  updateJob(): void {
    if (!this.updateJobPost.postId) {
      this.error = 'Invalid job post ID';
      return;
    }

    if (!this.validateUpdateJobPost()) {
      this.error = 'Please fill all required fields';
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    // Convert comma-separated tech stack to array
    this.updateJobPost.postTechStack = this.techStackInput
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0);

    this.apiService.updateJob(this.updateJobPost).subscribe({
      next: (response: JobPost) => {
        this.success = 'Job post updated successfully!';
        this.resetUpdateForm();
        this.loadAllJobs();
      },
      error: (err: any) => {
        this.error = 'Failed to update job post';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Delete job post
  deleteJob(postId: number | undefined): void {
    if (postId === undefined) return;

    if (!confirm('Are you sure you want to delete this job post?')) {
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    this.apiService.deleteJob(postId).subscribe({
      next: () => {
        this.success = 'Job post deleted successfully!';
        this.loadAllJobs();
      },
      error: (err: any) => {
        this.error = 'Failed to delete job post';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Load initial data
  loadInitialData(): void {
    this.loading = true;
    this.error = null;
    this.success = null;

    this.apiService.loadData().subscribe({
      next: (response: string) => {
        this.success = 'Data loaded successfully: ' + response;
        this.loadAllJobs();
      },
      error: (err: any) => {
        this.error = 'Failed to load initial data';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Form management
  openAddForm(): void {
    this.resetAddForm();
    this.showAddForm = true;
    this.showUpdateForm = false;
  }

  closeAddForm(): void {
    this.showAddForm = false;
    this.resetAddForm();
  }

  closeUpdateForm(): void {
    this.showUpdateForm = false;
    this.resetUpdateForm();
  }

  resetAddForm(): void {
    this.newJobPost = {
      postProfile: '',
      postDesc: '',
      reqExperience: 0,
      postTechStack: []
    };
    this.techStackInput = '';
    this.error = null;
  }

  resetUpdateForm(): void {
    this.updateJobPost = {
      postProfile: '',
      postDesc: '',
      reqExperience: 0,
      postTechStack: []
    };
    this.techStackInput = '';
    this.selectedJobPost = null;
    this.error = null;
  }

  // Validation
  validateNewJobPost(): boolean {
    return (
      this.newJobPost.postProfile.trim().length > 0 &&
      this.newJobPost.postDesc.trim().length > 0 &&
      this.newJobPost.reqExperience >= 0 &&
      this.techStackInput.trim().length > 0
    );
  }

  validateUpdateJobPost(): boolean {
    return (
      this.updateJobPost.postProfile.trim().length > 0 &&
      this.updateJobPost.postDesc.trim().length > 0 &&
      this.updateJobPost.reqExperience >= 0 &&
      this.techStackInput.trim().length > 0
    );
  }

  clearMessages(): void {
    this.error = null;
    this.success = null;
  }
}
