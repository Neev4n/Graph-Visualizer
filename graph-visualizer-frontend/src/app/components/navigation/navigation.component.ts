import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface AlgorithmRoute {
  path: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isOpen = signal(false);

  algorithms: AlgorithmRoute[] = [
    { path: '/dfs', label: 'DFS/BFS', description: 'Depth-First Search' },
    { path: '/dijkstra', label: 'Dijkstra', description: "Dijkstra's Shortest Path" },
    { path: '/ford-fulkerson', label: 'Ford-Fulkerson', description: 'Maximum Flow' },
    { path: '/mst', label: 'MST', description: 'Minimum Spanning Tree' },
  ];

  toggleMenu() {
    this.isOpen.update(value => !value);
  }

  closeMenu() {
    this.isOpen.set(false);
  }
}
