import React, { useState } from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import { FaInstagram, FaAt } from "react-icons/fa"
import { MdMailOutline } from "react-icons/md"

const Header = ({ name, toggleNav, setToggleNav }) => (
  <header className="site-head">
    <div className="site-head-container">
      <button
        className={`nav-burger clear-button ${toggleNav ? "white" : ""}`}
        href="#"
        onClick={() => setToggleNav(!toggleNav)}
      >
        <div
          className="hamburger hamburger--collapse"
          aria-label="Menu"
          role="button"
          aria-controls="navigation"
        >
          <div className="hamburger-box">
            <div className="hamburger-inner" />
          </div>
        </div>
      </button>
      <nav id="swup" className="site-head-left">
        <ul className="nav" role="menu">
          <li
            className={`${typeof window !== "undefined" &&
              window.location.pathname === "/" &&
              "nav-current"}`}
            role="menuitem"
          >
            <Link to={`/`}>Home</Link>
          </li>
          <li
            className={`${typeof window !== "undefined" &&
              window.location.pathname === "/about" &&
              "nav-current"}`}
            role="menuitem"
          >
            <Link to={`/about`}>About</Link>
          </li>
          <li
            className={`${typeof window !== "undefined" &&
              window.location.pathname === "/projects" &&
              "nav-current"}`}
            role="menuitem"
          >
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
      </nav>
      <div className="site-head-center">
        <Link className="site-head-logo" to="/">
          {name}
        </Link>
      </div>
      <div className="site-head-right">
        <div className="social-links">
          <a
            href="https://www.instagram.com/yeomalt/"
            title="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size="1.6em" style={{ strokeWidth: "8px" }} />
          </a>
          <a
            href="mailto:studio@yeomaltdesign.com"
            title="Email"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdMailOutline size="1.8em" />
          </a>
        </div>
      </div>
    </div>
  </header>
)

const Footer = ({ title }) => (
  <footer className="site-foot">
    &copy; {new Date().getFullYear()} <Link to="/">{title}</Link> &mdash; Made
    with 💛In Bellingham, Wa
    <br />
    <Link to={`/about#contact`}>Contact Us</Link>
  </footer>
)

const Layout = ({ data, children }) => {
  const { title, shortName } = data.site.siteMetadata
  const [toggleNav, setToggleNav] = useState(false)

  return (
    <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
      <Header
        title={title}
        name={shortName}
        toggleNav={toggleNav}
        setToggleNav={setToggleNav}
      />
      <main id="site-main" className="site-main">
        <div id="swup" className="transition-fade">
          {children}
        </div>
      </main>
      <Footer title={title} />
    </div>
  )
}

const layoutQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        shortName
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={layoutQuery}
    render={data => (
      <Layout location={props.location} props data={data} {...props} />
    )}
  />
)

// export default Layout
