const transpile = require("next-transpile-modules")

const withTM = transpile(["@perfolio/fauna","@perfolio/time","@perfolio/auth"])

const config = {
    future:{webpack5:true}
}

module.exports = withTM(config)