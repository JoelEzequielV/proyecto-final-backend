
export function notFoundHandler(req, res, next) {
    res.status(404).json({ message: "Ruta no encontrada" });
  }
  
  export function errorHandler(err, req, res, next) {
    console.error(err);
    const status = err.status || 500;
  
    if (status === 400) {
      return res.status(400).json({ message: err.message || "Bad Request" });
    }
    if (status === 401) {
      return res.status(401).json({ message: err.message || "Unauthorized" });
    }
    if (status === 403) {
      return res.status(403).json({ message: err.message || "Forbidden" });
    }
  
    // default 500
    return res.status(status).json({ message: err.message || "Internal Server Error" });
  }
  