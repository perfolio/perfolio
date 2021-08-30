#!/bin/bash

npx nx build app --prod --outputPath=.
npx prisma migrate deploy --schema=libs/integrations/prisma/schema.prisma