export default {
  widgets: [
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId: "5d77450c6428b2a68c6a33f4",
                  title: "Yeomalt Studio",
                  name: "yeomalt-studio",
                  apiId: "4f8ff7ba-cc9e-4d99-9cdf-f007fdb15104"
                },
                {
                  buildHookId: "5d91346a25af733058380e92",
                  title: "Yeomalt Client",
                  name: "yeomalt-client",
                  apiId: "d0aeeca3-0738-4f29-bea1-ef8d4bc2d4e3"
                }
              ]
            }
          }
        ],
        data: [
          {
            title: "GitHub repo",
            value: "https://github.com/Shurlow/yeomalt",
            category: "Code"
          },
          {
            title: "Frontend",
            value: "https://yeomalt-client.netlify.com/",
            category: "apps"
          }
        ]
      }
    },
    { name: "project-users", layout: { height: "auto" } }
  ]
};
