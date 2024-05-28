# Use a versão oficial do Node.js como a imagem base
FROM node:20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto, incluindo ts-node e typescript
RUN yarn install

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Exponha a porta que a aplicação usará
EXPOSE 3002


# Comando para iniciar a aplicação usando ts-node-dev para recarregamento automático
CMD ["yarn", "dev"]
