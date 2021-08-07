#!bin/bash

root="$(pwd)"

cd apps/api && npx vercel env pull && mv .env .env.local
cd $root

cd apps/app && npx vercel env pull && mv .env .env.local
cd $root

# Copy over database connections for prisma
cp apps/api/.env.local libs/integrations/prisma/.env