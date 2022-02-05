const express = require("express");
const path = require("path");
const db = require("./config/connection");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const multer = require("multer");
const upload = multer({ dest: "./assets" });
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log("here");
  return next();
});

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// image to save into assets folder and link to be saved as a string to mongodb
// app.get("/profile", upload.single("image"), (req, res) => {
//   let fileType = req.file.mimetype.split("/")[1];
//   let newFileName = req.file.filename + "." + fileType;

//   fs.rename(
//     `./assets/${req.file.filename}`,
//     `./assets/${newFileName}`,
//     function () {
//       console.log("cb");
//       res.send("200");
//     }
//   );
//   res.send("200");
// });

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
