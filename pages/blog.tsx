import type {
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import { NextSeo } from 'next-seo'

import { Layout } from '@components/common'
import { PostCard, PostView } from '@components/post'

import { getAllPosts, getPost } from '@wordpress/post'

export const getStaticProps = async ({
  preview = false
}: GetStaticPropsContext) => {
  const allPosts = await getAllPosts(preview)
  const post = await getPost('1')

  return {
    props: {
      allPosts,
      post
    }
  }
}

const Blog = ({
  allPosts: { edges },
  post
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const posts = edges

  return (
    <>
      <NextSeo
        title="Blog"
        description="Laoreet sagittis viverra pulvinar duis. Pharetra in venenatis sem arcu pretium pharetra at."
      />
      {posts.length > 0 && <PostCard posts={posts} />}
    </>
  )
}

export default Blog

Blog.Layout = Layout