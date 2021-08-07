#!/bin/bash
npx nx build api --prod --outputPath=.
DATABASE_URL=$DATABASE_URL_DIRECT npx prisma migrate deploy --schema=libs/integrations/prisma/schema.prisma