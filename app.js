// Importar o express
const express = require("express");

// Criar var app : express
const app = express();

const bodyParser = require("body-parser");

// Caminho até a API dos alunos
const userRoutes = require("./api/routes/users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Definir que se o link terminar com /students o caminho será o que estiver na ver studentsRoutes
app.use("/users", userRoutes);

//
app.use((req, res, next) => {
	// Criar novo erro
	const err = new Error("Not found...");

	// Código de resposta
	err.status = 404;

	// Continuar com o parametro err
	next(err);
});

//
app.use((err, req, res, next) => {
	// se a var err.status não existir continuar com o erro 500
	res.status(err.status || 500);

	// Resposta
	res.json({
		error: {
			message: err.message,
		},
	});
});

// Export
module.exports = app;
