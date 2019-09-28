import React from "react"
import Slider from "react-slick"
import BlockContent from "@sanity/block-content-to-react"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function CustomBlockContent({ body }) {
  return (
    <BlockContent
      blocks={body}
      serializers={serializers}
      // imageOptions={{ w: 320, h: 240, fit: 'max' }}
      // projectId="myprojectid"
      // dataset="projects"
    />
  )
}

const serializers = {
  types: {
    figure: ({ node: { asset, alt, caption } }) => (
      <figure className="kg-card kg-image-card">
        <img className="kg-image" src={asset.url} alt={alt || ""} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
    slideshow: ({ node: { title, slides } }) => {
      return <Carousel images={slides} />
    },
  },
}

const Carousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div>
      <Slider {...settings}>
        {images.map((img, i) => (
          <img
            key={i}
            className="kg-image"
            src={img.asset.url}
            alt={`carousel-${i}`}
          />
        ))}
      </Slider>
    </div>
  )
}
