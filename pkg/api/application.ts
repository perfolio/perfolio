import { createApplication } from "graphql-modules"
import { assetsModule } from "./modules/assets"
import { authModule } from "./modules/auth"
import { baseModule } from "./modules/base"
import { exchangeModule } from "./modules/exchange"
import { newsletterModule } from "./modules/newsletter"
import { portfolioModule } from "./modules/portfolio"
import { settingsModule } from "./modules/settings"
import { userModule } from "./modules/user"
import { utilModule } from "./modules/util"

export const application = createApplication({
  modules: [
    assetsModule,
    authModule,
    baseModule,
    exchangeModule,
    newsletterModule,
    portfolioModule,
    settingsModule,
    userModule,
    utilModule,
  ],
})
