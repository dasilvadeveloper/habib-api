// Importar o express
const express = require("express");

global.debug = true;

// Criar var app : express
const app = express();

const bodyParser = require("body-parser");

// Caminho até a API dos alunos
const userRoutes = require("./api/routes/users");
const profileRoutes = require("./api/routes/profiles");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define routes
app.use("/users", userRoutes);
app.use("/profiles", profileRoutes);

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
