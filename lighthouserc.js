module.exports = {
  ci: {
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.5 }],
        "categories:best-practices": ["error", { minScore: 0.7 }],
        "categories:seo": ["error", { minScore: 0.7 }],

        "first-contentful-paint": ["error", { minScore: 0.6 }],
      },
    },
  },
}
