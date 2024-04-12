package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Do stuff here
		log.Println(r.RequestURI)
		// Call the next handler, which can be another middleware in the chain, or the final handler.
		next.ServeHTTP(w, r)
	})
}

func main() {
	var htmlDir string

	flag.StringVar(&htmlDir, "htmlDir", "./html", "the directory to serve files from. Defaults to html dir")
	flag.Parse()

	// Create a new instance of the mux router
	router := mux.NewRouter()

	// Define the route and the handler for the "/" path
	router.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir(htmlDir))))

	router.Use(loggingMiddleware)

	// Start the web server using the mux router
	fmt.Println("Server running on port http://localhost:8080")

	srv := &http.Server{
		Handler: router,
		Addr:    ":8080",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	srv.ListenAndServe()
}
