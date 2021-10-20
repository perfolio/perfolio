#!/bin/bash

npx nx build app --prod

npx prisma migrate deploy --schema=libs/integrations/prisma/schema.prisma