CREATE TABLE usuario(
	id VARCHAR(255) PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL
);

CREATE TABLE permissao(
	list_id VARCHAR(255) NOT NULL,
	user_id VARCHAR(255) NOT NULL,
	FOREIGN KEY (list_id) REFERENCES lista(id),
	FOREIGN KEY (user_id) REFERENCES usuario(id),
	PRIMARY KEY (list_id, user_id)
);

CREATE TABLE lista(
	id VARCHAR(255) PRIMARY KEY,
	nome_da_lista VARCHAR(255) NOT NULL
);

CREATE TABLE dados(
	name VARCHAR(255) NOT NULL,
	participation FLOAT NOT NULL,
	list_id VARCHAR(255) NOT NULL,
	FOREIGN KEY (list_id) REFERENCES lista(id),
	PRIMARY KEY (name, list_id)
)