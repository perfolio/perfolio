module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/",
      "http://localhost:3000/imprint",
      "http://localhost:3000/privacy",
      "http://localhost:3000/login",
      "http://localhost:3000/signup",
      "http://localhost:3000/subscribe",
      "http://localhost:3000/forgot-password",
      "http://localhost:3000/reset-password",
  ],
      startServerCommand: "yarn start",
      startServerReadyTimeout: 3 * 60 * 1000,
      // startServerReadyPattern: "started server on 0.0.0.0:3000"
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
