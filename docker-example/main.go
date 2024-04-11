package main

import (
	"encoding/base64"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
)

func main() {
	// Create a new instance of the mux router
	router := mux.NewRouter()

	// Define the route and the handler for the "/" path
	router.HandleFunc("/", handler)

	// Start the web server using the mux router
	fmt.Println("Server running on port http://localhost:8080")
	http.ListenAndServe(":8080", router)
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("[%s] GET / -\n", time.Now().Format(time.RFC3339))
	// Read the Docker logo image file
	img, err := os.ReadFile("docker-mark-blue.png")
	if err != nil {
		log.Println("Error reading image file:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// Set the content type header to text/html
	w.Header().Set("Content-Type", "text/html")

	// Write the HTML content to the response writer
	html := `
	<!DOCTYPE html>
	<html>
	<head>
	<title>Docker Logo</title>
	<style>
		body {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100vh;
			margin: 0;
		}
	</style>
	</head>
	<body>
		<img src="data:image/png;base64,` + encodeBase64(img) + `" alt="Docker Logo" width="128">
	</body>
	</html>
	`
	_, err = w.Write([]byte(html))
	if err != nil {
		log.Println("Error writing HTML content:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
}

func encodeBase64(data []byte) string {
	return base64.StdEncoding.EncodeToString(data)
}
