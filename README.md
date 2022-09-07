# cube-project
Cube-project consiste em usuários calcularem a porcentagem de trabalho realizado pelos seus colegas ou funcionários. O usuário pode criar várias listas de empregados e os usuários podem compartilhar a permissão de fazer alterações nas listas(usando a Id correta). Made with: REACT, JS, TS, MYSQL, NODEJS.

# Requisitos executados:

* Criar usuário
* Login
* Criar Lista
* Pegar todas as listas
* Inserir dados em uma lista
* Pegar pegar todos os dados de uma lista

#Como rodar

* Seguir a documentação - https://documenter.getpostman.com/view/20351968/VVBUxS1f

# Modelagem do bando de dados

```
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

OBS: O projeto está incompleto, FrontEnd e testes automatizados ainda em andamento.
