import { MdBusiness } from "react-icons/md";

export default {
  name: "aboutContent",
  title: "About Content",
  type: "document",
  liveEdit: false,
  __experimental_actions: ["update", "publish"],
  icon: MdBusiness,
  fields: [
    {
      name: "Copy",
      title: "Yeomalt Copy",
      type: "string"
    },
    {
      name: "homepageCopy1",
      title: "Homepage Copy 1",
      type: "text",
      rows: 3
    },
    {
      name: "homepageCopy2",
      title: "Homepage Copy 2",
      type: "text",
      rows: 3
    },
    {
      name: "aboutPageImage",
      title: "About Image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "aboutPageTagline",
      title: "About Page Tagline",
      type: "text",
      rows: 3
    },
    {
      name: "aboutPageCopy",
      title: "About Page Copy",
      type: "blockContent"
    }
  ]
};
