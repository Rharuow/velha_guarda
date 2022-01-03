import express from "express";
import cors from "cors";
import formData from "express-form-data";

import router from "./routes";
import { csrfToken } from "./middlewares/csrfToken";

class App {
  app: any;

  constructor() {
    this.app = express();

    this.middleWare();
    this.routes();
  }

  middleWare() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(csrfToken);
    this.app.use(formData.format());
    this.app.use(formData.stream());
    this.app.use(formData.union());
  }

  routes() {
    this.app.use("/", router);
  }
}

export default new App().app;
