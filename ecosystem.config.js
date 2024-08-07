module.exports = {
  apps: [
    {
      name: "API",
      script: "dist/src/main.js",
      env: {
        PORT: 8080,
        SECRET_KEY: "Sava-secret-token",
        DATABASE_USER: "s4v4-uZer",
        DATABASE_PASSWORD: "yB53Axeic90r9TaDSvxn",
        DATABASE_NAME: "sava-club",
        DATABASE_PORT: "3306",
        DATABASE_HOST: "localhost",
        MAIL_HOST: "smtp.gmail.com",
        MAIL_PORT: 465,
        MAIL_USER: "contact@sava.club",
        MAIL_CLIENT_SECRET: "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",
        MAIL_CLIENT_ID:
          "171185480177-ef8hn7vp8r4kmi29s7qhv0ejr1r2qqha.apps.googleusercontent.com",
        MAIL_REFRESH_TOKEN:
          "1//04on8i_h9NqVpCgYIARAAGAQSNwF-L9IrXGGAwWvw7XeeCHo2GzTqTFH8Nirog5jFB4jMDfjt4lR8-k5qG2z7Cig_TOmgxHu8VMs",
        STRIPE_API_KEY:
          "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",
        WEBSITE_URL: "https://sava.club",
      },
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
