const logger = (req, res, next) => {
  console.log(`The http method was: ${req.method} and ${req.originalUrl}`)
  next()
}

export default logger