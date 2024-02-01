# API de Criptografia

<div align="right">
  <sub>Criado em</sub>  
  
  `22/01/2024`
</div>

<br>

> Status: Concluido

<h3 align="center">APi para criptografia</h3>

<br>

<h1>Requisitos</h1>

<h4>Requisitos para emprestimo</h4>

- Implemente um CRUD simples considerando os campos como sensíveis(userDocument, creditCardToken).

<h1>EndPoints</h1>

<ul>
  <li>POST {host}:{port}/users/postuser</li>
  <li>GET {host}:{port}/users/getAll</li>
  <li>GET {host}:{port}/users/getByID/:id</li>
  <li>DELETE {host}:{port}/users/deleteByID/:id</li>
  <li>PATCH {host}:{port}/users/patchByID/:id</li>
</ul>

<br>

<h3>Campos para requests</h3>
<pre>userDocument<br>creditCardToken<br>value</pre>

<h1>Deselvovimento</h1>

<h3>Desenvolvido em: </h3>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
</ul>
  <h3>Banco de Dados: </h3>
<ul>
  <li>MongoDB</li>
</ul>
  <h3>Modulos: </h3>
<ul>
  <li>Mongoose</li>
  <li>Nodemon</li>
  <li>Dotenv</li>
  <li>Express</li>
  <li>Crypto</li>
  
</ul>
<hr>

<h3 align="center">Obrigado pela atenção!</h3>
