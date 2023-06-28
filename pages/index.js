import { useCallback, useEffect, useRef } from "react";
import Head from "next/head";
import ContentfulImage from "../components/contentful-image";
import {
  getContactLinkData,
  getHeroData,
  getMetadata,
  getProjectData,
  getTagLineData,
} from "../lib/api";
import classNames from "classnames";
import Flickity from "react-flickity-component";

import style from "../styles/index.module.scss";

const flickityOptions = {
  imagesLoaded: true,
  lazyLoad: 2,
  pageDots: false,
  setGallerySize: false,
  wrapAround: true,
};

export default function Index({
  contactLinkData,
  heroData,
  pageMetadata,
  projectData,
  tagLineData,
}) {
  const projectTitleRefs = useRef(null);

  const getProjectTitleMap = () => {
    if (!projectTitleRefs.current) {
      // Initialize the Map on first usage.
      projectTitleRefs.current = new Map();
    }
    return projectTitleRefs.current;
  };

  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, []);

  useEffect(() => {
    projectTitleRefs.current.forEach((titleRef) => {
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.75,
      });

      observer.observe(titleRef);

      return () => {
        observer.disconnect();
      };
    });
  }, [handleIntersection]);

  return (
    <>
      <Head>
        <title>{pageMetadata.pageTitle || "Tiffany Hong Design"}</title>
        <meta name="author" content="Tiffany Hong" />
        <meta name="creator" content="Tiffany Hong" />
        <link
          rel="shortcut icon"
          href={pageMetadata.favicon.url || "/assets/favicon-32x32.png"}
        />
        <meta
          name="description"
          content={
            pageMetadata.pageDescription ||
            "Experienced digital and graphic designer with a proven history of successful projects of all shapes and sizes. A demonstrated leader, displaying positive, effective, and empathetic direction and management."
          }
        />
        <meta
          name="keywords"
          content={
            pageMetadata.keywords ||
            "digital design, graphic design, designer, web design, typography, art direction, identity and branding, ux/ui design, editorial design, product design, adobe creative suite, figma, sketch, invision, keynote"
          }
        />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <link
          as="style"
          href="//unpkg.com/flickity@2.2.1/dist/flickity.min.css"
          onLoad="this.onload=null;this.rel='stylesheet'"
          rel="preload"
        />
      </Head>
      <main>
        <section className={style.hero}>
          <div className={style.hero__standardizedWrapper}>
            <div className={style.hero__topRow}>
              <h2 className={style.hero__tagline}>{tagLineData.text}</h2>
              <a
                className={style.linkButton}
                href={contactLinkData.contactAddress}
              >
                {contactLinkData.buttonText}
              </a>
            </div>
            <h1 className={style.hero__header}>
              <p>Tiffany is a London</p>
              <p>based art director and</p>
              <p>digital designer.</p>
            </h1>
            <div className={style.hero__links}>
              <a
                className={style.hero__work}
                href={heroData.portfolioAsset.url}
                target="_blank"
              >
                {heroData.documentTextTitle}
              </a>
            </div>
          </div>
        </section>
        <section className={style.work}>
          {projectData.map((project) => {
            return (
              <div
                className={style.work__standardizedWrapper}
                key={project.title}
              >
                <div
                  className={classNames(style.project, {
                    [style.projectCenter]: project.centered === true,
                    [style.projectIndent]: project.augmentLayout === "indent",
                    [style.projectFullRight]:
                      project.augmentLayout === "full_right",
                  })}
                >
                  <h3
                    className={style.work__project__title}
                    ref={(node) => {
                      const map = getProjectTitleMap();

                      if (node) {
                        map.set(project.title, node);
                      } else {
                        map.delete(project.title);
                      }
                    }}
                  >
                    {project.title}
                  </h3>
                  <div
                    className={`carousel-wrapper carousel-wrapper_${project.layout}`}
                  >
                    <Flickity className="carousel" options={flickityOptions}>
                      {project.mediaCollection.items.map((media, index) => {
                        if (media.url.includes("mp4")) {
                          return (
                            <video
                              autoPlay
                              key={media.url}
                              loop
                              muted
                              src={media.url}
                            ></video>
                          );
                        } else {
                          return (
                            <ContentfulImage
                              alt={`${project.title} image ${index + 1}`}
                              fill
                              key={media.url}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              src={media.url}
                            />
                          );
                        }
                      })}
                    </Flickity>
                    <p className={style.carouselInfo}>
                      1 of {project.mediaCollection.items.length}
                    </p>
                  </div>
                  <p className={style.work__project__description}>
                    {project.description}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
        <section className={style.footer}>
          <a
            className={style.linkButton}
            href="./assets/tiffany-hong-portfolio.pdf"
            target="_blank"
          >
            {heroData.documentTextTitle}
          </a>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const contactLinkData = (await getContactLinkData(preview)) || [];
  const heroData = (await getHeroData(preview)) || [];
  const pageMetadata = (await getMetadata(preview)) || [];
  const projectData = (await getProjectData(preview)) || [];
  const tagLineData = (await getTagLineData(preview)) || [];

  return {
    props: {
      contactLinkData,
      heroData,
      pageMetadata,
      projectData,
      tagLineData,
    },
  };
}
