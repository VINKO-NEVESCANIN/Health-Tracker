import winston from "winston";

// En la nube el sistema de archivos es efímero: en producción solo se escribe a consola.
const isProd = process.env.NODE_ENV === "production";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: isProd
    ? [new winston.transports.Console()]
    : [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/app.log" }),
      ],
});

export default logger;
