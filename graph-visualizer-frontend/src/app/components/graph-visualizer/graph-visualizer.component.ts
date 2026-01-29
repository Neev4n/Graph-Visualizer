import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getRandomGraph } from '../../utils/graph-utils';

interface Node {
  id: number;
  x: number;
  y: number;
  visited: boolean;
  current: boolean;
}

interface Edge {
  from: number;
  to: number;
  weight: number;
}

interface DFSStep {
  nodeId: number;
  visited: boolean;
  current: boolean;
  fromId: number;
}

interface DFSResponse {
  steps: DFSStep[];
}

@Component({
  selector: 'app-graph-visualizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-visualizer.component.html',
  styleUrls: ['./graph-visualizer.component.scss']
})
export class GraphVisualizerComponent {
  private readonly DFS_API_URL = 'http://localhost:8080/api/dfs';
  private readonly BFS_API_URL = 'http://localhost:8080/api/bfs';

  isRunning = signal(false);

  currentEdge = signal<{ from: number; to: number } | null>(null);

  // initialize from getRandomGraph()
  private readonly initialGraph = getRandomGraph();

  graphIdx = this.initialGraph.index;

  nodes = signal<Node[]>(
    this.initialGraph.nodes.map(n => ({ id: n.id, x: n.x, y: n.y, visited: false, current: false }))
  );

  edges = signal<Edge[]>(
    this.initialGraph.edges.slice()
  );

  
// DFS visualization using backend precomputed steps
  async startDFS(type : string) {
    if (this.isRunning()) return;

    this.isRunning.set(true);
    this.resetGraph();

    let API = type === "dfs" ? this.DFS_API_URL : type === "bfs" ? this.BFS_API_URL : "";
    

    try {
      // Call backend to get precomputed DFS steps
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes: this.nodes(),
          edges: this.edges(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch DFS steps from backend');
      }

      const data: DFSResponse = await response.json();

      // Replay the steps with delay
      for (const step of data.steps) {
        if (step.nodeId === -1) {
          // Final step: clear current marker
          this.nodes.update(nodes => nodes.map(n => ({ ...n, current: false })));
          this.currentEdge.set(null)
        } else {
          // Update node state based on step
          this.nodes.update(nodes =>
            nodes.map(n =>
              n.id === step.nodeId
                ? { ...n, visited: step.visited, current: step.current }
                : { ...n, current: false }
            )
          );
        }

        if (step.current) {
            if (step.fromId >= 0) {
              const found = this.edges().find(e => e.from === step.fromId && e.to === step.nodeId);
              if (found) {
                this.currentEdge.set({ from: found.from, to: found.to });
              } else {
                // no explicit edge, clear
                this.currentEdge.set(null);
              }
            } else {
              this.currentEdge.set(null);
            }
          } else {
            // not the active/current node -> clear currentEdge
            this.currentEdge.set(null);
          }

        await this.delay(800);
      }
    } catch (error) {
      console.error('Error running DFS:', error);
      alert('Failed to connect to backend. Make sure the Go server is running on http://localhost:8080');
    } finally {
      this.isRunning.set(false);
    }
  }

  // helper to test if an edge is the currentEdge
  public isCurrentEdge(edge: any) {
    const ce = this.currentEdge();
    return !!ce && ce.from === edge.from && ce.to === edge.to;
  }

  resetGraph() {
    this.nodes.update(nodes => nodes.map(n => ({ ...n, visited: false, current: false })));
  }

  randomizeGraph() {
    let graph = getRandomGraph(1, this.graphIdx);

    this.nodes = signal<Node[]>(
      graph.nodes.map(n => ({ id: n.id, x: n.x, y: n.y, visited: false, current: false }))
    );

    this.edges = signal<Edge[]>(
      graph.edges.slice()
    );

    this.graphIdx = graph.index
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public lineEndpoints(edge: any) {
  const from = this.nodes()[edge.from];
  const to = this.nodes()[edge.to];
  const r = 25; // keep in sync with your <circle r="..."> value (reduce if you changed it)
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  return {
    x1: from.x + ux * r,
    y1: from.y + uy * r,
    x2: to.x - ux * r,
    y2: to.y - uy * r
  };
}

public isBidirectional(edge: any) {
  return this.edges().some(e => e.from === edge.to && e.to === edge.from);
}
}