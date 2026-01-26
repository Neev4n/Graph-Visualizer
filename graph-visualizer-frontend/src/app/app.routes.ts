import { Routes } from '@angular/router';
import { GraphVisualizerComponent } from './components/graph-visualizer/graph-visualizer.component';
import { BfsVisualizerComponent } from './components/bfs-visualizer/bfs-visualizer.component';
import { DijkstraVisualizerComponent } from './components/dijkstra-visualizer/dijkstra-visualizer.component';
import { FordFulkersonVisualizerComponent } from './components/ford-fulkerson-visualizer/ford-fulkerson-visualizer.component';
import { MstVisualizerComponent } from './components/mst-visualizer/mst-visualizer.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dfs', pathMatch: 'full' },
  { path: 'dfs', component: GraphVisualizerComponent },
  { path: 'bfs', component: BfsVisualizerComponent },
  { path: 'dijkstra', component: DijkstraVisualizerComponent },
  { path: 'ford-fulkerson', component: FordFulkersonVisualizerComponent },
  { path: 'mst', component: MstVisualizerComponent },
];
