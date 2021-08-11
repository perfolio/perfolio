#!/bin/bash
npx nx build api --prod --outputPath=.
npx prisma migrate deploy --schema=libs/integrations/prisma/schema.prisma