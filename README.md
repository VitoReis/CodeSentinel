# Code Sentinel

Este projeto é um verificador de vulnerabilidades em código, utilizando três modelos distintos do Ollama. Você pode escolher qualquer um dos modelos disponíveis e enviar seu código para análise. O sistema irá avaliar o código, identificar possíveis vulnerabilidades, classificar a severidade dessas vulnerabilidades e fornecer orientações detalhadas sobre como corrigi-las.

Na branch groqCloud você pode rodar o mesmo projeto utilizando os modelos do Groq Cloud, basta criar o arquivo .env e adicionar sua API KEY.

## IA / MODELS

Ollama (Local):

- Codellama
- Llama3
- Mistral
- Modelos criados por você

Groq Cloud (Remoto):

- Llama 3.1 405B
- Llama 3.1 70B
- Llama 3.1 8B
- Llama 3 Groq 70B Tool Use
- Llama 3 Groq 8B Tool Use
- Llama Guard 3 8B
- Meta Llama 3 70B
- Meta Llama 3 8B
- Mixtral 8x7B
- Gemma 7B
- Gemma 2 9B

## CRIAÇÃO DO BACKEND

`npm init -y`

`npm install express cors body-parser axios`

`npm install dotenv`

`npm install groq-sdk`

`npm install -D typescript @types/express @types/node @types/cors @types/body-parser`

`npx tsc --init`

## CRIAÇÃO DO FRONTEND

`npx create-react-app client --template typescript`

`npm install react-markdown`

`npm install axios`

## COMO RODAR O PROJETO

#### BACKEND:

Abra o terminal na pasta do backend e digite os seguintes códigos:

`npm install`

`npx ts-node server.ts`

#### FRONTEND:

Abra o terminal na pasta do frontend e digite os seguintes códigos:

`npm install`

`npm start`

#### DOCKER:

##### BACKEND:

`docker build -t backend .`
`docker run -it -p 8000:8000 backend`

##### FRONTEND:

`docker build -t frontend .`
`docker run -p 3000:3000 backend`

##### ALL:

`docker network create codesentinel`
`docker-compose up --build`
