import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';

describe('Header Component', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have brandName', () => {
    expect(component['brandName']).toBe('My App');
  });

  it('should render header element', () => {
    const headerElement = fixture.nativeElement.querySelector('.app-header');
    expect(headerElement).toBeTruthy();
  });
});
