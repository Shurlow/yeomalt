import React from "react"

export default ({ img, count, caption }) => {
  return (
    <article
      className={`post post-card ${count % 3 === 0 && `post-card-large`}`}
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="post-card-content">
        <h2 className="post-card-title">{caption || ""}</h2>
      </div>
    </article>
  )
}
