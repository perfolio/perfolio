const { getJestProjects } = require("@nrwl/jest")

module.exports = {
  projects: [
    ...getJestProjects(),
    "<rootDir>/libs/data-access/cache",
    "<rootDir>/libs/data-access/db",
    "<rootDir>/libs/data-access/iexcloud",
    "<rootDir>/libs/data-access/localstorage",
    "<rootDir>/libs/feature/time",
    "<rootDir>/libs/util/i18n",
    "<rootDir>/libs/data-access/openfigi",
    "<rootDir>/libs/api/apollo",
    "<rootDir>/libs/hooks/queries",
  ],
}
