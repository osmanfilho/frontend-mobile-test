<p align="center">
  <img src="logo.jpg" />
</p>

# PhComics
Encontre o melhor dos quadrinhos

# Objetivo 
Criar um app de uma loja de revistas em quadrinhos utilizando a API da Marvel para todos os consumos de dados

# Funcionamento e a Solução adotada

Na tela de listagem dos quadrinhos, foi consumido os dados da api da Marvel através do axios e montadas num componente FlatList para dar
uma melhor perfomance no carregamento dos dados, realizando a paginação através do modelo de scroll infinito.

Para construção do carrinho foi usado o hook de contexto para que os dados do carrinho fossem compartilhado por toda aplicação, foi utilizado o asyncstorage
para persistir os dados no dispositivo e as informação do carrinho serem preservadas mesmo aplicação sendo encerrada.

# Resultado 

<p align="center">
  <img src="resultado.gif" />
</p>


# Tecnologias Utilizadas
React Native ⚛️ <br />
Typescript <br />
React Hooks ⚛️ <br />
Styled-Components 💅🏻 <br />
Jest 🃏 <br />
React Icons ⚛️❤️ <br />



# Como rodar o projeto? 🤔
Para obter esse projeto, siga os passos:
1. Clone esse repositório utilizando <code>git clone</code>.
2. Rode o comando <code> yarn </code> na raíz da pasta do projeto clonado para baixar as dependências.
3. Conecte um aparelho android na usb, Rode <code> yarn android </code> na raíz da pasta do projeto

Feito com 💜 por <a href="https://www.linkedin.com/in/osman-setuval-9711a0a2/" target="blank">osmanfilho</a>.
