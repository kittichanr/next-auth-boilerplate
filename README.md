## Next Auth Boilerplate

This repository is boilerplate for start project next.js with nextauth.js. in this repository is contain about setup nextauth with credentials and provider signup. and also initial basic ui signin and signup for demo.


### Stack

1. Next.js
2. Tailwind
3. NextAuth.js
4. Prisma
5. Postgresql

### Installation

1. `yarn install` for install dependencies
2.  run docker compose for instance database container `docker-compose -f docker-compose.yml up`
3.  `.env` file you need to fill your config ex:
   >>> 
   
    GITHUB_ID= // get from provider

    GITHUB_SECRET= // get from provider

    NEXTAUTH_SECRET= // random in command -> openssl rand -hex 32

    DATABASE_URL="postgresql://postgres:password@localhost:5432/next-auth-boilerplate-db"

4. migrate prisma `yarn prisma:migrate`
5. generate type of prisma schema `yarn prisma:generate`
6. `yarn dev` to start `http://localhost:3000`
