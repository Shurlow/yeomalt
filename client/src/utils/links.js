function titleToLink(title) {
  return "/projects/" + title.toLowerCase().replace(/%20| /g, "-")
}

module.exports = {
  titleToLink,
}
