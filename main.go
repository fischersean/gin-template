package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func serveMain(c *gin.Context) {
	c.HTML(http.StatusOK, "main.html", gin.H{"title": "Application"})
}

func main() {
	r := gin.Default()
	r.LoadHTMLGlob("./templates/*")
	r.Static("/static", "./static")
	r.GET("/", serveMain)
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
