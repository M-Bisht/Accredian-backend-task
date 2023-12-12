import { app } from "./app.js";
import dbConfig from "./db/dbConfig.js";

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Listening on port " + port);
});

dbConfig();
