package main

import (
	algorithms "graph-visualizer-backend/algorithms"
	"log"
	"net/http"
)

func main() {
	// Register only the API endpoints with CORS
	http.Handle("/api/dfs", enableCORS(http.HandlerFunc(algorithms.HandleDFS)))
	http.Handle("/api/bfs", enableCORS(http.HandlerFunc(algorithms.HandleBFS)))

	log.Println("Server starting on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}

// enableCORS wraps handler with CORS headers
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
