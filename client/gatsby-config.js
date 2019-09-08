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
  color: "yellow",
  keywords: ["metal", "yeomalt"],
}

module.exports = {
  siteMetadata: {
    title: siteConfig.name,
    author: siteConfig.author,
    description: siteConfig.description,
    siteUrl: siteConfig.url,
    keywords: siteConfig.keywords,
  },
  plugins: [
    // {
    //   resolve: 'gatsby-source-sanity',
    //   options: {
    //     projectId,
    //     dataset,
    //     token: process.env.SANITY_TOKEN,
    //     watchMode: true,
    //     overlayDrafts: true
    //   }
    // }
    // {
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
        //trackingId: `ADD YOUR TRACKING ID HERE`,
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
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: "yeomalt",
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
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
