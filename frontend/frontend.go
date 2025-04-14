package frontend

import (
	"embed"

	"github.com/labstack/echo/v4"
)

var (
	//go:embed all:dist
	dist embed.FS
	//go:embed dist/index.html
	indexHTML embed.FS

	distDirFS     = echo.MustSubFS(dist, "dist")
	distIndexHTML = echo.MustSubFS(indexHTML, "dist")
)

func RegisterFrondEndHandlers(e *echo.Echo) {
	// Serve the static files from the dist directory
	e.FileFS("/", "index.html", distIndexHTML)
	e.StaticFS("/", distDirFS)
}
