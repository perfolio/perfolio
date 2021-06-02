module.exports = {
  ci: {
    upload: {
      target: "temporary-public-storage",
    },
  },
  assert: {
    preset: "lighthouse:recommend",
    assertions: {
      "categories:performance": ["error", { minScore: 0.9 }],
      "categories:accessibility": ["error", { minScore: 0.9 }],
      "categories:best-practices": ["error", { minScore: 0.9 }],
      "categories:seo": ["error", { minScore: 0.9 }],
    },
  },
}
