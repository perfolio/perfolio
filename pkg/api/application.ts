import { createApplication } from "graphql-modules"
import { assetsModule } from "./modules/assets"
import { baseModule } from "./modules/base"
import { exchangeModule } from "./modules/exchange"
import { portfolioModule } from "./modules/portfolio"
import { settingsModule } from "./modules/settings"
import { userModule } from "./modules/user"
import { utilModule } from "./modules/util"

export const application = createApplication({
  modules: [
    baseModule,
    userModule,
    portfolioModule,
    assetsModule,
    settingsModule,
    exchangeModule,
    utilModule,
  ],
})
