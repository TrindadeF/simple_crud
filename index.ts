import express from "express";
import cors from "cors";
import routes from "./routes/index";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

console.log("SECRET_KEY:", process.env.JWT_SECRET);

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
