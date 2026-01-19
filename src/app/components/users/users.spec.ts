import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [ApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load job posts on init', () => {
    const mockJobPosts = [
      { postId: 1, postProfile: 'Frontend Developer', postDesc: 'Build UI components', reqExperience: 2, postTechStack: ['Angular', 'TypeScript'] },
      { postId: 2, postProfile: 'Backend Developer', postDesc: 'Build APIs', reqExperience: 3, postTechStack: ['Spring Boot', 'Java'] }
    ];
    
    spyOn(apiService, 'getAllJobs').and.returnValue(of(mockJobPosts));
    
    component.ngOnInit();
    
    expect(component.jobPosts.length).toBe(2);
    expect(apiService.getAllJobs).toHaveBeenCalled();
  });
});

