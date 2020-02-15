import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/structure/layout"
import AffiliateDisclaimer from "../components/optional/affiliate-disclaimer"
import ResponsiveImage from "../components/responsive-image"
import SocialShare from "../components/optional/social-share"
import MailChimpSignUp from "../components/optional/mailchimp-sign-up"
import Tags from "../components/core/tags"
import Categories from "../components/core/categories"
import TalkYardComments from "../components/optional/talkyard-comments"
import SEO from "../components/core/seo"
import { Link } from "gatsby"
import {
  IoMdCalendar,
  IoIosPerson,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"

import { useSiteMetadata } from "../hooks/use-site-metadata"

const BlogPost = ({ data, pageContext, location }) => {
  const { siteUrl } = useSiteMetadata()

  const post = data.mdx

  const shareUrl = `${siteUrl}/${post.frontmatter.slug}`
  const {
    next,
    previous,
    breadcrumb: { crumbs },
  } = pageContext

  const customCrumbLabel = location.pathname.toLowerCase().replace("-", " ")

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        canonical={post.frontmatter.canonical}
        slug={post.frontmatter.slug}
        description={post.frontmatter.description}
        date={post.frontmatter.date}
        dateModified={post.frontmatter.dateModified}
        tags={post.frontmatter.tags}
        categories={post.frontmatter.categories}
        image={post.frontmatter.image.publicURL}
        headline={post.frontmatter.title}
        articleBody={post.rawBody}
      />

      <div>
        {" "}
        You are here:
        <Breadcrumb
          crumbs={crumbs}
          crumbSeparator=""
          crumbLabel={customCrumbLabel}
        />
      </div>
      <h1>{post.frontmatter.title}</h1>

      <ResponsiveImage
        fluid={post.frontmatter.image.childImageSharp.fluid}
        title={post.frontmatter.imageTitle}
        alt={post.frontmatter.imageAlt}
      />

      <p>
        <IoMdCalendar /> {post.frontmatter.date}, written by <IoIosPerson />
        {post.frontmatter.author}
      </p>
      <AffiliateDisclaimer />
      <MDXRenderer>{post.body}</MDXRenderer>
      <SocialShare shareUrl={shareUrl} title={post.frontmatter.description} />
      <MailChimpSignUp />
      <Categories categories={data.mdx.frontmatter.categories} />
      <Tags tags={data.mdx.frontmatter.tags} />

      <div>
        {previous && (
          <Link to={previous.frontmatter.slug} style={{ maxWidth: "25%" }}>
            <strong>
              <IoIosArrowBack />
              Previous Article
            </strong>{" "}
            <br />
            {previous.frontmatter.title}
          </Link>
        )}
        {next && (
          <Link to={next.frontmatter.slug} style={{ maxWidth: "25%" }}>
            <strong>
              Next Article <IoIosArrowForward />
            </strong>{" "}
            <br />
            {next.frontmatter.title}
          </Link>
        )}
      </div>
      <TalkYardComments />
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      body
      rawBody
      frontmatter {
        author
        date
        dateModified
        description
        image {
          childImageSharp {
            fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
        slug
        title
        categories
        tags
        imageAlt
        imageTitle
        canonical
      }
      id
    }
  }
`