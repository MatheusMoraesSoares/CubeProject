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

* Copiar o link do repositorio 

![image](https://user-images.githubusercontent.com/98968318/183947683-35bde5f3-1d66-41eb-85ad-c34189867c9c.png)
	
* Abrir o seu terminal 

![image](https://user-images.githubusercontent.com/98968318/183948052-ded93277-7206-44b8-bcb5-aa27f6748501.png)
	
* Em seguida digitar: git clone "link"
* Após isso entre na pasta pelo terminal com: cd cube-project (aperte TAB e dê ENTER) 
* Depois digite: npm install
* Após isso entre na documentação e siga os passos.


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
