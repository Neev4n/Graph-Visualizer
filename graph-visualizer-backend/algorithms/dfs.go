package algorithms

import (
	"encoding/json"
	"net/http"
)

func HandleDFS(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req GraphRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	steps := computeDFS(req.Nodes, req.Edges)

	response := GraphResponse{Steps: steps}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func computeDFS(nodes []Node, edges []Edge) []GraphStep {
	// Build adjacency list
	adjacencyList := make(map[int][]int)
	for _, node := range nodes {
		adjacencyList[node.ID] = []int{}
	}

	for _, edge := range edges {
		adjacencyList[edge.From] = append(adjacencyList[edge.From], edge.To)
		adjacencyList[edge.To] = append(adjacencyList[edge.To], edge.From) // Undirected
	}

	visited := make(map[int]bool)
	steps := []GraphStep{}

	// Start DFS from node 0
	dfs(0, visited, adjacencyList, &steps, -1)

	// Add final step to clear current marker
	steps = append(steps, GraphStep{NodeID: -1, Visited: false, Current: false})

	return steps
}

func dfs(nodeID int, visited map[int]bool, adjacencyList map[int][]int, steps *[]GraphStep, prevNodeId int) {
	// Mark as visited
	visited[nodeID] = true

	// Add step: mark node as current and visited
	*steps = append(*steps, GraphStep{
		NodeID:  nodeID,
		Visited: true,
		Current: true,
		FromID:  prevNodeId,
	})

	// Visit all neighbors
	neighbors := adjacencyList[nodeID]
	for _, neighborID := range neighbors {
		if !visited[neighborID] {
			dfs(neighborID, visited, adjacencyList, steps, nodeID)
		}
	}
}
