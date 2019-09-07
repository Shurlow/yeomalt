export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5d69935ba55879137880101f',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-portfolio-studio-63ydsa1p',
                  apiId: '24332d31-1d8e-4c3d-9ee9-2a5b425d7d1b'
                },
                {
                  buildHookId: '5d69935bdbdf1f7dc204f94f',
                  title: 'Portfolio Website',
                  name: 'sanity-gatsby-portfolio-web-1sk21gi6',
                  apiId: '39409ec2-05a4-4623-8649-f408e81694ec'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/Shurlow/sanity-gatsby-portfolio',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://sanity-gatsby-portfolio-web-1sk21gi6.netlify.com',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['project']},
      layout: {width: 'medium'}
    }
  ]
}
