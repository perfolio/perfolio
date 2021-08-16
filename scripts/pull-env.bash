#!bin/bash

root="$(pwd)"

cd apps/app && npx vercel env pull && mv .env .env.local
cd $root

# Copy over database connections for prisma
cp apps/app/.env.local libs/integrations/prisma/.env