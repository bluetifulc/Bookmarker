import App from "./app";
import UserController from "./controllers/UserController";
import HomeController from "./controllers/HomeController";

const app = new App(
    [
        new HomeController(),
        new UserController(),
    ]
);

app.listen();