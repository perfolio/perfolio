import { createApplication } from "graphql-modules"
import { baseModule } from "./modules/base"
import { userModule } from "./modules/user"
import { portfolioModule } from "./modules/portfolio"
import { assetsModule } from "./modules/assets"
import { settingsModule } from "./modules/settings"
import { exchangeModule } from "./modules/exchange"
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
