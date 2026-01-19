import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { BodyComponent } from './components/body/body';

@Component({
  selector: 'app-root',
  imports: [Header, BodyComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dummy-angular-app');
}
