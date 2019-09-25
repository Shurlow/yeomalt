require("dotenv").config()
const {
  api: { projectId, dataset },
} = requireConfig("../studio/sanity.json")

const siteConfig = {
  name: "Yeomalt Design",
  shortName: "Yeomalt",
  description: "The Yeomalt Design homepage",
  url: "http://yeomaltdesign.com",
  prefix: "/",
  author: "Scott Hurlow",
  color: "#F5CB08",
  keywords: ["metal", "yeomalt"],
}

module.exports = {
  siteMetadata: {
    title: siteConfig.name,
    shortName: siteConfig.shortName,
    author: siteConfig.author,
    description: siteConfig.description,
    siteUrl: siteConfig.url,
    keywords: siteConfig.keywords,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId,
        dataset,
        token: process.env.SANITY_TOKEN,
        watchMode: true,
        // overlayDrafts: true
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require("postcss-easy-import")(),
          require("postcss-custom-properties")({ preserve: false }),
          require("postcss-color-function")(),
          require("autoprefixer")(),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.TRACKING_ID,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteConfig.name,
        short_name: siteConfig.shortName,
        start_url: "/",
        background_color: `#ffffff`,
        theme_color: siteConfig.color,
        display: `minimal-ui`,
        icon: `static/yeomalt-icon.png`,
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: "yeomalt",
      },
    },
  ],
}

function requireConfig(path) {
  try {
    return require(path)
  } catch (e) {
    console.error(
      "Failed to require sanity.json. Fill in projectId and dataset name manually in gatsby-config.js"
    )
    return {
      projectId: process.env.SANITY_PROJECT_ID || "",
      dataset: process.env.SANITY_DATASET || "",
    }
  }
}
