import S from '@sanity/desk-tool/structure-builder'
import { MdBusiness, MdSettings, MdBrush } from 'react-icons/md'
// import { FaFile } from 'react-icons/fa'

const makeEditor = (name) => S.editor().id(name).schemaType(name).documentId(name)

const siteSettings = S.listItem()
  .title('Site Settings')
  .child(makeEditor('siteSettings'))
  .icon(MdSettings)

const companyInfo = S.listItem()
  .title('Company Info')
  .child(makeEditor('companyInfo'))
  .icon(MdBusiness)

const projects = S.listItem()
  .title('Projects')
  .schemaType('project')
  .child(S.documentTypeList('project').title('Projects'))
  .icon(MdBrush)

export default () => S.list().title('Content').items([
  siteSettings,
  companyInfo,
  projects, 
])