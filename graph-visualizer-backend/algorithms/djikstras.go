package algorithms

import (
	"encoding/json"
	"net/http"
)

func HandleDijkstras(w http.ResponseWriter, r *http.Request) {
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
