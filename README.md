#  Backend NODEjs pro teste da GPMH

## Requisitos
- Node.js 18.x ou superior
- npm 9.x ou superior 

## EndPoint POST http://localhost:3000/pesquisas/create-multiple
- Recebe JSON com estrutura:
```bash
body: { codigo_pesquisa: string; nota_1: number; nota_2: number; media: number }
```
- Pesquisa se codigo_pesquisa já existe no banco
- Se existe, atualiza os dados
- Se não existe, insere os dados
- Chama xlsxService pra transformar os dados do JSON em planilha xlsx
- Chama S3Service pra fazer upload da planilha gerada no bucket S3

## EndPoint GET http://localhost:3000/pesquisas/:codigo_pesquisa
- Recebe codigo_pesquisa
- Consulta no banco de dados pelo codigo_pesquisa
  
## Como Executar
```bash
git clone https://github.com/alvpimentel/gpmh-backend-node.git
cd gpmh-backend-node
npm install
npm run migration:run
npm run start

http://localhost:3000/
```
Porta Padrão: 3000

## .env
```bash
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=

PORT=
```
