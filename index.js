import express from 'express'
import knex from 'knex';

const app = express()

app.use(express.json())

const port = 1212

const bancoDeDados = knex({
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'your_database_user',
      password: 'your_database_password',
      database: 'myapp_test',
      user: "root",
      password: "senacrs",
      database: "nave",
    },
});

app.get("/tipos", async (req, res) => {
  //SELECT * FROM tipos;
  const tipos = await bancoDeDados.select("*").from("tipos");
  res.json(tipos);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/tipo", async (req,res) => {
  const { nome } = req.body;
  const tipo = await bancoDeDados("tipos").insert({ nome });
  res.json(tipo);
});

app.get("/tipo/:id", async (req,res) => {
  const { id } = req.params;
  // SELECT * FROM tipos WHERE id = :id
  const tipo = await bancoDeDados.select("*").from("tipos").where({ id });
  res.json(tipo);
});

app.get("/naves", async (req,res) => {
  const navi = await bancoDeDados.select("*").from("naves");
  res.json(navi);
});

app.get("/naves/:id", async (req,res) => {
  const { id } = req.params;
  const naves = await bancoDeDados("naves").select("*").where({ id });
  res.json(naves);
});

app.delete("/tipo/:id", async (req,res) => {
  const { id } = req.params;
  // DELETE FROM tipos WHERE id = :id
  const tipos = await bancoDeDados("tipos").where({ id }).del();
  res.json(tipos);
});
// CRIAR NAVE
app.post("/nave", async (req,res) => {
  const { nome, cor, tipos_id } = req.body;
  // INSERT INTO naves(nome,cor,tipo_id) VALUES ("nome","cor",1)
  const naves = await bancoDeDados("naves").insert({ nome, cor, tipos_id });
  res.json(naves);
});

app.get("/naveTunada", async (req,res) => {
  // INNER JOIN
  // SELECT naves.nome, tipos.nome FROM naves INNER JOIN tipos ON tipos.id = naves.tipos_id;
  const naves = await bancoDeDados("naves")
  .select("naves.*", "tipos.nome as tipoNome")
  .join("tipos", "tipos.id", "=", "naves.tipos_id");
  res.json(naves);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});