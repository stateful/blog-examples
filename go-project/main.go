package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type TimeResponse struct {
	Time string `json:"time"`
}

func getTime(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	currentTime := TimeResponse{Time: time.Now().UTC().Format(time.RFC3339)}
	json.NewEncoder(w).Encode(currentTime)
}

func main() {
	http.HandleFunc("/time", getTime)
	fmt.Println("Starting server on port 8080...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("Error starting server:", err)
	}
}