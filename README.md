# Graph Visualizer

A simple yet powerful graph visualization tool that demonstrates common graph traversal algorithms in real-time.

## Features

### Current Features

- **BFS (Breadth-First Search)**: Visualize breadth-first traversal on randomized graphs
- **DFS (Depth-First Search)**: Visualize depth-first traversal on randomized graphs
- **Real-time Visualization**: Watch algorithms execute step-by-step with animated delays
- **Randomized Graphs**: Generate random graphs for testing and visualization

### Planned Features

- Dijkstra's Shortest Path Algorithm
- Ford-Fulkerson Maximum Flow Algorithm
- Bellman-Ford Algorithm

## How It Works

1. The Angular frontend generates a graph and sends it to the Go backend
2. The backend precomputes all traversal steps for the requested algorithm (BFS/DFS)
3. Steps are sent back to the frontend
4. The frontend displays each step with a delay, creating an animated visualization

## Tech Stack

- **Frontend**: Angular, TypeScript, SCSS, HTML
- **Backend**: Go
- **Infrastructure**: Docker, Nginx
- **Containerization**: Docker Compose

## Prerequisites

- Docker
- Docker Compose

## Setup & Installation

### Using Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone https://github.com/Neev4n/Graph-Visualizer.git
   cd Graph-Visualizer
   ```

2. **Build and run with Docker Compose**

   ```bash
   docker-compose up --build
   ```

3. **Access the application**

   Open your browser and navigate to:

   ```
   http://localhost:4200
   ```

4. **Stop the application**
   ```bash
   docker-compose down
   ```

## Usage

1. Open the application in your browser
2. A randomized graph will be displayed
3. Select either BFS or DFS algorithm
4. Watch the visualization animate through each step of the algorithm
5. Generate a new random graph to try different configurations

## Project Structure

```
Graph-Visualizer/
├── frontend/          # Angular application
├── backend/           # Go API server
├── nginx/             # Nginx configuration
├── docker-compose.yml # Docker orchestration
└── README.md
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is open source and available under the MIT License.
