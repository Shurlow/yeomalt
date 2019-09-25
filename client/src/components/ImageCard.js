import React from "react"
// ${ count % 3 === 0 && `post-card-large` }
const ImageCard = ({ img, count, caption }) => (
  <article
    className={`post-card  with-image`}
    style={{ backgroundImage: `url(${img})` }}
  >
    <div className="post-card-link" href="_blank">
      <div className="post-card-content">
        <h2 className="post-card-title">{caption || ""}</h2>
      </div>
    </div>
  </article>
)

export default ImageCard
