import React from "react"
import PropTypes from "prop-types"
import { IoIosPricetags } from "react-icons/io"
import SEO from "../components/core/seo"
import Layout from "../components/structure/layout"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components

import { useSiteMetadata } from "../hooks/use-site-metadata"
import { useAllMdx } from "../hooks/use-all-mdx"

import { Link } from "gatsby"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"

const TagsPage = ({ pageContext, location }) => {
  const { logo } = useSiteMetadata()
  const { tags } = useAllMdx()

  const {
    breadcrumb: { crumbs },
  } = pageContext

  const customCrumbLabel = location.pathname.toLowerCase().replace("-", " ")
  return (
    <Layout>
      <SEO
        title={"1001 Tea Facts Tags"}
        canonical={"tags"}
        description={"The Tags Page for 1001 Tea Facts"}
        date={""}
        dateModified={""}
        image={logo}
        slug={"tags"}
      />
      <div>
        <div>
          {" "}
          You are here:
          <Breadcrumb
            crumbs={crumbs}
            crumbSeparator=""
            crumbLabel={customCrumbLabel}
          />
        </div>
        <h1>
          <IoIosPricetags />
          Tags
        </h1>
        <ul>
          {tags.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}
TagsPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage
