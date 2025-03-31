import initApp from "./app/index.app.js";
import { config } from "./config/index.config.js";

const app = initApp();

const server = app.listen(config.PORT, () => {
  console.info(`Server listen on: http://localhost:${config.PORT}`);
});
