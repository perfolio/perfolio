module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:3000/",
        "http://localhost:3000/imprint",
        "http://localhost:3000/privacy",
        "http://localhost:3000/signin",
        "http://localhost:3000/signup",
        "http://localhost:3000/subscribe",
        "http://localhost:3000/forgot-password",
        "http://localhost:3000/reset-password",
      ],
      startServerCommand: "yarn start",
      startServerReadyTimeout: 3 * 60 * 1000,
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
  assert: {
    assertions: {
      "categories:performance": ["error", { minScore: 0.9 }],
      "categories:accessibility": ["error", { minScore: 0.9 }],
      "categories:best-practices": ["error", { minScore: 0.9 }],
      "categories:seo": ["error", { minScore: 0.9 }],
    },
  },
}
