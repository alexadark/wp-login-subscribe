const config = require("./config")
const slashes = require("remove-trailing-slash")
const wpUrl = slashes(config.wordPressUrl)

module.exports = {
  /* Your site config here */
  plugins: [
    "gatsby-plugin-theme-ui",
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url: `${wpUrl}/graphql`,
        verbose: true,
        excludeFields: [`blocksJSON`, `saveContent`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
