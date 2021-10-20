#!/bin/bash

npx nx build app --prod
# copy locales over
cp  ./libs/feature/i18n/src/lib/locales/**/*.json --parents ./dist/apps/app/.next/

npx prisma migrate deploy --schema=libs/integrations/prisma/schema.prisma