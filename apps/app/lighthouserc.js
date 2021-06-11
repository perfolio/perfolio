module.exports = {
    ci: {
      collect: {
        staticDistDir: "dist/apps/app/.next/server/pages",
        maxAutodiscoverUrls: 0,
      },
      upload: {
        target: "temporary-public-storage",
      },
      assert: {
        assertions: {
          "is-crawlable": ["off"],
          "errors-in-console": ["off"],
          "no-vulnerable-libraries": ["off"],
          "non-composited-animations": ["off"],
          "categories:accessibility": ["error", { minScore: 0.7 }],
          "categories:best-practices": ["error", { minScore: 0.7 }],
          "categories:seo": ["error", { minScore: 0.7 }],
        },
      },
    },
  }