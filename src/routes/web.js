import express from "express";
import { route } from "express/lib/application";
import homeController from "../controllers/HomeControllers";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);

    router.post('/webhook', homeController.postWebhook);
    router.get('/webhook', homeController.getWebhook);

    return app.use('/', router);
};

module.exports = initWebRoutes;