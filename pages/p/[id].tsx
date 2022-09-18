import { GetServerSideProps } from "next"
import React from "react"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"
import prismas from "../../lib/prisma"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params
  const post = await prismas.post.findUnique({
    where: { id: id as string },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  return {
    props: post,
  }
}

const Post: React.FC<PostProps> = (props) => {
  let { title, author, content, published } = props

  if (!published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {author?.name || "Unknown author"}</p>
        <ReactMarkdown children={content} />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post
