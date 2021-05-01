import React, { FunctionComponent } from "react"
import PropTypes from "prop-types"
import Footer from './Footer/index';

import Header from "./Header/index"
import config from '../../config';

const Layout: FunctionComponent = ({ children }) => {


  return (
    <div className="flex flex-col h-screen justify-between">
      <Header companyName={config.siteMetadata.companyName} />
      <main className="flex-grow">{children}</main>
      <Footer></Footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
