import * as React from "react"

import Header from "./header"

const Layout = ({ children }) => (
  <div className="site-shell antialiased">
    <Header />
    <main className="page-content">{children}</main>
    <footer className="site-footer">
      <div>
        As a board coordinated by DVRPC, the Sustainable Energy Partnership of
        Southeast PA fully complies with Title VI of the Civil Rights Act of
        1964 and related nondiscrimination mandates in all activities and abides
        by DVRPC's Title VI Compliance Program. For more information about
        DVRPC’s Title VI Program or to obtain a Title VI Complaint Form, visit{" "}
        <a
          href="https://www.dvrpc.org/titlevi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline"
        >
          www.dvrpc.org/titlevi
        </a>
        , or contact DVRPC’s ADA and Title VI Compliance Officer Shoshana Akins
        by calling 215-592-1800 or via email at{" "}
        <a
          href="mailto:public_affairs@dvrpc.org"
          className="text-white underline"
        >
          public_affairs@dvrpc.org
        </a>
        .
      </div>
    </footer>
  </div>
)

export default Layout
