import express from 'express'; // Importa a biblioteca Express, que é usada para criar o servidor web
import knex from 'knex'; // Importa o Knex, uma biblioteca que facilita a interação com bancos de dados

const app = express(); // Cria uma instância do servidor Express

app.use(express.json()); // Configura o servidor para entender e processar requisições no formato JSON

const port = 1212; // Define a porta que o servidor irá escutar (neste caso, 1212)

// Configuração do banco de dados MySQL com Knex
const bancoDeDados = knex({
    client: 'mysql2', // Define o tipo de banco de dados que estamos usando (MySQL, usando o cliente mysql2)
    connection: { // Configura as credenciais e a conexão com o banco de dados
        host: '127.0.0.1', // Endereço do servidor de banco de dados (127.0.0.1 significa que é no próprio computador)
        port: 3306, // Porta do banco de dados (3306 é a porta padrão do MySQL)
        user: 'your_database_user', // Nome de usuário do banco de dados (pode ser configurado)
        password: 'your_database_password', // Senha do banco de dados (deve ser configurado)
        database: 'myapp_test', // Nome do banco de dados que estamos utilizando
        user: "root", // Nome de usuário para acesso ao banco de dados
        password: "senacrs", // Senha do banco de dados (em produção, não é recomendado deixar a senha assim)
        database: "nave", // Nome do banco de dados específico
    },
});

// Rota para buscar todos os tipos (tipos = tipos de naves ou algo relacionado)
app.get("/tipos", async (req, res) => {
  // Aqui, estamos fazendo uma consulta para pegar todos os dados da tabela 'tipos'
  const tipos = await bancoDeDados.select("*").from("tipos");
  res.json(tipos); // Retorna os tipos encontrados em formato JSON para o cliente
});

// Rota raiz do servidor, apenas retorna "Hello World!" quando acessada
app.get('/', (req, res) => {
  res.send('Hello World!'); // Retorna a mensagem "Hello World!" quando a URL raiz for acessada
});

// Rota para criar um novo tipo, utilizando POST (geralmente usado para criar novos recursos)
app.post("/tipo", async (req,res) => {
  const { nome } = req.body; // Extrai o nome do tipo a partir do corpo da requisição
  const tipo = await bancoDeDados("tipos").insert({ nome }); // Insere o novo tipo na tabela 'tipos' do banco de dados
  res.json(tipo); // Retorna o tipo inserido para o cliente em formato JSON
});

// Rota para buscar um tipo específico através do seu ID
app.get("/tipo/:id", async (req,res) => {
  const { id } = req.params; // Extrai o parâmetro 'id' da URL
  // Realiza uma consulta na tabela 'tipos' para buscar o tipo com o id correspondente
  const tipo = await bancoDeDados.select("*").from("tipos").where({ id });
  res.json(tipo); // Retorna o tipo encontrado em formato JSON
});

// Rota para buscar todas as naves
app.get("/naves", async (req,res) => {
  const navi = await bancoDeDados.select("*").from("naves"); // Consulta todos os dados da tabela 'naves'
  res.json(navi); // Retorna as naves encontradas em formato JSON
});

// Rota para buscar uma nave específica através do seu ID
app.get("/naves/:id", async (req,res) => {
  const { id } = req.params; // Extrai o parâmetro 'id' da URL
  const naves = await bancoDeDados("naves").select("*").where({ id }); // Busca a nave pelo 'id'
  res.json(naves); // Retorna a nave encontrada em formato JSON
});

// Rota para deletar um tipo específico pelo ID
app.delete("/tipo/:id", async (req,res) => {
  const { id } = req.params; // Extrai o 'id' do tipo a ser deletado da URL
  // Realiza a exclusão do tipo com o ID correspondente na tabela 'tipos'
  const tipos = await bancoDeDados("tipos").where({ id }).del();
  res.json(tipos); // Retorna o tipo excluído (se encontrado) em formato JSON
});

// Rota para criar uma nova nave, com dados enviados via POST
app.post("/nave", async (req,res) => {
  const { nome, cor, tipos_id } = req.body; // Extrai os dados da nave (nome, cor e tipos_id) do corpo da requisição
  // Insere a nova nave na tabela 'naves' do banco de dados
  const naves = await bancoDeDados("naves").insert({ nome, cor, tipos_id });
  res.json(naves); // Retorna a nave inserida em formato JSON
});

// Rota para buscar naves e seus respectivos tipos (utilizando JOIN entre as tabelas)
app.get("/naveTunada", async (req,res) => {
  // Aqui, estamos usando JOIN para combinar os dados das tabelas 'naves' e 'tipos'
  const naves = await bancoDeDados("naves")
    .select("naves.*", "tipos.nome as tipoNome") // Seleciona todos os campos das naves e o nome do tipo
    .join("tipos", "tipos.id", "=", "naves.tipos_id"); // Faz o JOIN entre 'naves' e 'tipos' usando o campo 'tipos_id'
  res.json(naves); // Retorna as naves e seus tipos combinados em formato JSON
});

// Inicia o servidor na porta definida e exibe uma mensagem no console quando ele estiver rodando
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // Exibe a mensagem no console informando que o servidor está rodando
});
