import "dotenv/config.js";
import express from "express";
import router from "./src/routers/index.router.js";
import morgan from "morgan";
import cors from "cors";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { createServer } from "http";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import socketCb from "./src/routers/index.socket.js";
import dbConnect from "./src/utils/db.utils.js";

try {
  //primero, creo el server
  const server = express();
  //segundo, creamos un puerto con la variable de entorno (puerto de Mongo)
  const port = process.env.PORT || 8000;
  //tercero, definimos una callback que se ejecutara cuando se inicia el servidor
  const ready = async () => {
    console.log("PORT SERVER " + port);
    await dbConnect();
  };
  //definimos un server http con las configuraciones del server express
  const httpServer = createServer(server);
  //deinimos server TCP
  const tcpServer = new Server(httpServer);
  //configuramos las llamadas
  tcpServer.on("connection", socketCb);

  //cuarto, iniciamos el servidor, con listen escuchamos el puerto de la variable "port" para iniciar el server, luego ejecutamos la callback
  //server.listen(port, ready);

  //Iniciamos el servidor HTTP
  httpServer.listen(port, ready);

  //obligo a mi servidor a usar morgan: middleware de terceros (registro de solicitudes)
  server.use(morgan("dev"));
  //habilita la lectura de datos complejos en la url
  server.use(express.urlencoded({ extended: true }));
  //activo funcionabilidad de json
  server.use(express.json());
  //middleware: hago que se crucen los origenes de los puertos de back con los de front
  server.use(cors());
  //configuro el acceso a la carpeta public
  server.use("/public", express.static("public"));

  //activo funcionalidades del motor de plantillas
  server.engine("handlebars", engine());
  //defino que es handlebars
  server.set("view engine", "handlebars");
  //defino la ruta hacia las vistas
  server.set("views", __dirname + "/src/views");

  //hace que mi servidor use las rutas del enrutador
  server.use(router);
  server.use(errorHandler);
  server.use(pathHandler);
} catch (e) {
  console.log(e);
}
