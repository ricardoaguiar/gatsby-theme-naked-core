import React from "react"
import Layout from "../components/structure/layout"
import ContactForm from "../components/contact-form"
import SEO from "../components/core/seo"
import { useSiteMetadata } from "../hooks/use-site-metadata"

import NakedBreadcrumb from "../components/core/breadcrumb"

const Contact = ({ pageContext, location }) => {
  const { logo, title } = useSiteMetadata()
  const {
    breadcrumb: { crumbs },
  } = pageContext

  const customCrumbLabel = location.pathname.toLowerCase().replace("-", " ")

  return (
    <Layout>
      <SEO
        title={`${title} Contact Page`}
        canonical={"contact"}
        description={`The Contact Page for ${title}`}
        date={""}
        dateModified={""}
        image={logo}
        slug={"contact"}
        crumbs={crumbs}
      />

      <NakedBreadcrumb crumbs={crumbs} crumbLabel={customCrumbLabel} />

      <article>
        <header>
          <h1>Contact Us</h1>
        </header>
        <ContactForm />
      </article>
    </Layout>
  )
}

export default Contact
