import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyComponent } from './body';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyComponent],
      providers: [ApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all job posts on init', () => {
    const mockJobPosts = [
      { 
        postId: 1, 
        postProfile: 'Frontend Developer', 
        postDesc: 'Build UI components', 
        reqExperience: 2, 
        postTechStack: ['Angular', 'TypeScript'] 
      }
    ];
    
    spyOn(apiService, 'getAllJobs').and.returnValue(of(mockJobPosts));
    
    component.ngOnInit();
    
    expect(component.jobPosts.length).toBe(1);
    expect(apiService.getAllJobs).toHaveBeenCalled();
  });

  it('should validate new job post form', () => {
    component.newJobPost = {
      postProfile: 'Developer',
      postDesc: 'Build systems',
      reqExperience: 3,
      postTechStack: []
    };
    component.techStackInput = '';

    expect(component.validateNewJobPost()).toBe(false);

    component.techStackInput = 'Angular, TypeScript';
    expect(component.validateNewJobPost()).toBe(true);
  });

  it('should open and close add form', () => {
    expect(component.showAddForm).toBe(false);
    component.openAddForm();
    expect(component.showAddForm).toBe(true);
    component.closeAddForm();
    expect(component.showAddForm).toBe(false);
  });
});
