/** @jsx jsx */
import { jsx, Flex, Button } from "theme-ui"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import UserNav from "./UserNav"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <Flex
      sx={{
        margin: `0 auto`,
        maxWidth: 1200,
        padding: `1.45rem 1.0875rem`,
        justifyContent: "space-between",
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <UserNav />
    </Flex>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
