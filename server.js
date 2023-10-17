const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
//body parse, rehefa misy body ilay requete avy any am client d mila parsena en json, c'est à peu près ça.

app.use("/api/contacts", require("./routes/contactRoutes"));

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
