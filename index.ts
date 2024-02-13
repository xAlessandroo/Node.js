import express from "express";
import "express-async-errors";
import morgan from "morgan";
import Joi from "joi";

const app = express();
const port = 3000;
app.use(morgan("dev"));
app.use(express.json());

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

const planetSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
});

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello World!" });
});

app.get("/planets", (req, res) => {
  res.status(200).json(planets);
});

app.post("/api/planets", (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { id, name } = req.body;
  const newPlanet = { id, name };
  planets = [...planets, newPlanet];

  console.log(planets);

  res.status(201).json({ msg: "The planet was created!" });
});

app.put("/api/planets/:id", (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  console.log(planets);

  res.status(200).json({ msg: "The planet was updated!" });
});

app.delete("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));

  res.status(200).json({ msg: "The planet was deleted!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
