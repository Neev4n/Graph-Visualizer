# Graph Visualizer Backend

Simple Go backend for DFS graph traversal computation.

## Running the server

```bash
go run main.go
```

Server runs on `http://localhost:8080`

## API Endpoints

### POST /api/dfs

Computes DFS traversal steps for a given graph.

**Request Body:**

```json
{
  "nodes": [
    { "id": 0, "x": 150, "y": 100, "visited": false, "current": false },
    { "id": 1, "x": 100, "y": 200, "visited": false, "current": false }
  ],
  "edges": [{ "from": 0, "to": 1 }]
}
```

**Response:**

```json
{
  "steps": [
    { "nodeId": 0, "visited": true, "current": true },
    { "nodeId": 1, "visited": true, "current": true },
    { "nodeId": -1, "visited": false, "current": false }
  ]
}
```
