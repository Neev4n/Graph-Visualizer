import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mst-visualizer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="visualizer-container">
      <h2>Minimum Spanning Tree Visualizer</h2>
      <p class="placeholder-text">This visualizer is under construction. Implement Kruskal's or Prim's algorithm here!</p>
      
      <div class="coming-soon">
        <span class="icon">🚧</span>
        <p>Coming Soon</p>
      </div>
    </div>
  `,
  styles: [`
    .visualizer-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #667eea;
      margin-bottom: 1rem;
    }

    .placeholder-text {
      color: #666;
      margin-bottom: 2rem;
    }

    .coming-soon {
      text-align: center;
      padding: 3rem;
      background: #f8f9fa;
      border-radius: 8px;
      
      .icon {
        font-size: 4rem;
        display: block;
        margin-bottom: 1rem;
      }
      
      p {
        font-size: 1.25rem;
        color: #999;
        margin: 0;
      }
    }
  `]
})
export class MstVisualizerComponent {}
