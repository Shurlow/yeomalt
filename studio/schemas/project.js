export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'date',
      title: 'Date',
      description: 'The date the project was completed.',
      type: 'datetime'
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      image: 'image'
    },
    prepare ({ title, date, image }) {
      return {
        title,
        subtitle: date
          ? new Date(date).toLocaleDateString()
          : '',
        media: image
      }
    }
  }
}
