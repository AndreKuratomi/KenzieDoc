## KENZIEDOC

- [Sobre](#sobre)
- [Instalação](#instalação)
- [Documentação](#documentação)
- [Desenvolvedores da API](#desenvolvedores-da-api)
- [Termos de uso](#termos-de-uso)

<br>

# Sobre

<p>A aplicação KenzieDoc se propõe a cadastrar médicos e pacientes na plataforma possibilitando o agendamento de consultas de maneira simples e intuitiva, além de fazer a gestão de consultas agendadas e a da lista de espera.
O objetivo da aplicação é ser uma ferramenta que possibilite o profissional de saúde cadastrar sua especialidade e seus locais de atendimento e possibilitar ao paciente  fazer uma busca pelo profissional mais adequado para sua necessidade e  agendar a consulta de forma confortável , prática e rápida.
Esta API utiliza o ambiente de desenvolvimento <b>Node.js</b> e o framework <b>Express.js</b></p>
<br>

Frontend repository: https://github.com/AndreKuratomi/Capstone-Q4-Frontend

# Instalação

<h5>0. Primeiramente, é necessário já ter instalado na própria máquina:</h5>

- Um <b>editor de código</b>, conhecido também como <b>IDE</b>. Por exemplo, o <b>[Visual Studio Code (VSCode)](https://code.visualstudio.com/)</b>.

- Uma <b>ferramenta cliente de API REST</b>. Por exemplo, o <b>[Insomnia](https://insomnia.rest/download)</b> ou o <b>[Postman](https://www.postman.com/product/rest-client/)</b>.

- <p> E versionar o diretório para receber o clone da aplicação:</p>

```
git init
```

<br>
<h5>1. Fazer o clone do reposítório <span style="text-decoration: underline">Users service</span> na sua máquina pelo terminal do computador ou pelo do IDE:</h5>

```
https://github.com/AndreKuratomi/KenzieDoc.git
```

<p>Entrar na pasta criada:</p>

```
cd KenzieDoc
```

<p>Instalar as dependências:</p>

```
yarn
```

<p><b>Obs:</b> caso não tenha o gerenciador de pacotes <b>yarn</b> instalar desta maneira:</p>

```
npm install --global yarn
```

<p>E rodar a aplicação:</p>

```
code .
```

<br>

Após feito o clone do repositório KenzieDoc, instalar :

1. O arquivo oculto <b>.env<b> com o comando:

```
touch .env
```

E dentro do arquivo .env configurar os seguintes comandos:

```
POSTGRES_PASSWORD=digite_sua_senha
POSTGRES_USER=digite_seu_usuário
POSTGRES_DB=digite_seu_banco_de_dados
POSTGRES_HOST=digite_seu_localhost
SECRET=digite_sua_chave_de_segurança

```


# Documentação

Para ter acesso ao descrições detalhes das rotas e seus retornos, conferir documentação completa no link a seguir:

https://kenziedoc-omega.vercel.app/

# Desenvolvedores da API

<div> 
<span>André Kuratomi  </span><div> 
<a href="https://www.linkedin.com/in/andre-kuratomi/" target="_blank" ><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
  <a href = "https://github.com/AndreKuratomi"><img src="https://www.kindpng.com/picc/m/128-1280187_github-logo-png-github-transparent-png.png" width= 106px height=27px target="_blank"> </a> 
 
<p>David Avanci </p>
<a href="https://www.linkedin.com/in/davidavanci/" target="_blank" ><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
  <a href = "https://github.com/DavidAvanci"><img src="https://www.kindpng.com/picc/m/128-1280187_github-logo-png-github-transparent-png.png" width= 106px height=27px target="_blank"> </a>

<p>Keila Passos</p> 
<a href="https://www.linkedin.com/in/keila-aparecida-rodrigues-passos" target="_blank" ><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
  <a href = "https://github.com/keilapassos"><img src="https://www.kindpng.com/picc/m/128-1280187_github-logo-png-github-transparent-png.png" width= 106px height=27px target="_blank"> </a> 
 
<p>Leonardo Pereira</p>
<a href="https://www.linkedin.com/in/leonardo-m-pereira/" target="_blank" ><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
  <a href = "https://github.com/leokito"><img src="https://www.kindpng.com/picc/m/128-1280187_github-logo-png-github-transparent-png.png" width= 106px height=27px target="_blank"> </a>

<p>Pierre Kalil  </p>
<a href="https://www.linkedin.com/in/pierre-kalil/" target="_blank" ><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
  <a href = "https://github.com/Pierre-Kalil"><img src="https://www.kindpng.com/picc/m/128-1280187_github-logo-png-github-transparent-png.png" width= 106px height=27px target="_blank"> </a>

# Termos de uso

Esse projeto atende a fins exclusivamente didáticos e sem nenhum intuito comercial.
