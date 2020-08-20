const createSitePages = require(`./create/createSitePages`)

exports.createPages = async ({ actions, graphql }) => {
  await createSitePages({ actions, graphql })
}
