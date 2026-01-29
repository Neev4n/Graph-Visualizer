export interface GNode {
  id: number;
  x: number;
  y: number;
  visited?: boolean;
  current?: boolean;
}

export interface GEdge {
  from: number;
  to: number;
  weight: number;
}

/**
 * Returns one of several hardcoded graphs chosen at random.
 * Optional seed picks a deterministic graph: Math.abs(seed) % count.
 */
export function getRandomGraph(seed?: number, excludeIndex?: number): { nodes: GNode[]; edges: GEdge[]; index: number } {
  const graphs: Array<{ nodes: GNode[]; edges: GEdge[] }> = [
    // Graph 0 - small example (matches current visualizer layout)
    {
      nodes: [
        { id: 0, x: 200, y: 200,},
        { id: 1, x: 100, y: 200,},
        { id: 2, x: 150, y: 100,},
        { id: 3, x: 150, y: 300,},
        { id: 4, x: 250, y: 300,},
        { id: 5, x: 250, y: 100,},
        { id: 6, x: 300, y: 200,},
      ],
      edges: [
        { from: 0, to: 2, weight: 0 },
        { from: 0, to: 1, weight: 0 },
        { from: 0, to: 5, weight: 0 },
        { from: 0, to: 6, weight: 0 },
        { from: 1, to: 3, weight: 0 },
        { from: 1, to: 3, weight: 0 },
        { from: 6, to: 3, weight: 0 },
        { from: 3, to: 4, weight: 0 },
      ],
    },

    // Graph 1 - includes a two-way (bidirectional) connection and a cycle
    {
      nodes: [
        { id: 0, x: 120, y: 80 },
        { id: 1, x: 60, y: 180 },
        { id: 2, x: 180, y: 180 },
        { id: 3, x: 60, y: 300 },
        { id: 4, x: 180, y: 300 },
        { id: 5, x: 300, y: 200 },
      ],
      edges: [
        { from: 0, to: 1, weight: 0 },
        { from: 1, to: 2, weight: 0 },
        { from: 2, to: 1, weight: 0 }, // two-way between 1 and 2
        { from: 1, to: 3, weight: 0 },
        { from: 2, to: 4, weight: 0 },
        { from: 4, to: 5, weight: 0 },
        { from: 5, to: 0, weight: 0 }, // cycle back to 0
      ],
    },
  ];


  const count = graphs.length;
  let idx: number;

  if (typeof seed === 'number') {
    idx = Math.abs(seed) % count;
    // if deterministic pick collided with excludeIndex, pick next available
    if (excludeIndex !== undefined && count > 1 && idx === excludeIndex) {
      idx = (idx + 1) % count;
    }
  } else {
    if (count === 1) {
      idx = 0;
    } else {
      // build list of allowed indices excluding excludeIndex
      const choices: number[] = [];
      for (let i = 0; i < count; i++) {
        if (i !== excludeIndex) choices.push(i);
      }
      idx = choices[Math.floor(Math.random() * choices.length)];
    }
  }

  const chosen = graphs[idx];

  // ensure node state fields exist and default to false
  return {
    nodes: chosen.nodes.map(n => ({ ...n, visited: false, current: false })),
    edges: chosen.edges.slice(),
    index: idx
  };
}