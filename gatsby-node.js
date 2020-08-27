const createSitePages = require(`./create/createSitePages`)

exports.createPages = async ({ actions, graphql }) => {
  await createSitePages({ actions, graphql })
}

exports.onCreatePage = ({ page, actions }) => {
  if (page.path.match(/^\/dashboard/)) {
    page.matchPath = "/dashboard/*"
    actions.createPage(page)
  }
}
