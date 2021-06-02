module.exports = {
  ci: {
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      assertions: {
        "is-crawlable": ["off"],
        "errors-in-console": ["off"],
        "no-vulnerable-libraries": ["off"],
        "non-composited-animations": ["off"],
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.85 }],
        "categories:seo": ["error", { minScore: 0.9 }],
      },
    },
  },
}
