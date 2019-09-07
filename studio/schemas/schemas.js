import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import blockContent from './blockContent'
import blockText from './blockText'
import companyInfo from './companyInfo'
import figure from './figure'
import project from './project'
import siteSettings from './siteSettings'
import slideshow from './slideshow'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    blockContent,
    blockText,
    companyInfo,
    figure,
    project,
    siteSettings,
    slideshow
  ])
})
