import express from 'express'
const app = express()
import knex from 'knex';
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

app.get("/tipos", (req, res) => {
  //SELECT * FROM tipos;
  const tipos = bancoDeDados.select("*").from("tipos");
  res.json(tipos);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})