import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent],
  standalone: true,
  template: `
    <app-navigation />
    <div class="app-container">
      <router-outlet />
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #696969 0%, #a3a3a3 100%);
      padding: 2rem 0;
    }
  `],
})
export class App {}