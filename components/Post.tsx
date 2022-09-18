import Router from "next/router"
import React from "react"
import ReactMarkdown from "react-markdown"

export type PostProps = {
  id: string
  title: string
  author: {
    name: string
    email: string
  } | null
  content: string
  published: boolean
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const { id, title, author, content, published } = post

  const authorName = author ? author.name : "Unknown author"
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${id}`)}>
      <h2>{title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={content.length > 100 ? content.slice(0, 100) + "..." : content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  )
}

export default Post
