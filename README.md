# Code Sentinel

Este projeto é um verificador de vulnerabilidades em código, utilizando três modelos distintos do Ollama. Você pode escolher qualquer um dos modelos disponíveis e enviar seu código para análise. O sistema irá avaliar o código, identificar possíveis vulnerabilidades, classificar a severidade dessas vulnerabilidades e fornecer orientações detalhadas sobre como corrigi-las.

## IA / MODELS

Ollama:

- Codellama;
- Llama3
- Mistral

## CRIAÇÃO DO BACKEND

`npm init -y`

`npm install express cors body-parser axios`

`npm install dotenv`

`npm install groq-sdk`

`npm install -D typescript @types/express @types/node @types/cors @types/body-parser`

`npx tsc --init`

## CRIAÇÃO DO FRONTEND

`npx create-react-app client --template typescript`

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
