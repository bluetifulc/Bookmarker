import App from "./app";
import UserController from "./controllers/UserController";
import HomeController from "./controllers/HomeController";
import BookmarksController from "./controllers/BookmarksController";

const app = new App(
    [
        new HomeController(),
        new UserController(),
        new BookmarksController(), 
    ]
);

app.listen();