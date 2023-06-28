const RECIPE_GRAPHQL_FIELDS = `
picture {
  height
  url
  width
}
title
`;

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

function extractSingleDataEntry(fetchResponse, collectionKey) {
  return fetchResponse?.data?.[collectionKey]?.items[0];
}

function extractMultipleDataEntries(fetchResponse) {
  return fetchResponse?.data?.projectCollection.items;
}

export async function getHeroData(preview) {
  const entries = await fetchGraphQL(
    `query {
      heroCollection(preview: ${preview ? "true" : "false"}) {
        items {
          text
          documentTextTitle
          portfolioAsset {
            url
          }
        }
      }
    }`,
    preview
  );

  return extractSingleDataEntry(entries, "heroCollection");
}

export async function getTagLineData(preview) {
  const entries = await fetchGraphQL(
    `query {
      tagLineCollection(preview: ${preview ? "true" : "false"}) {
        items {
          text
        }
      }
    }`,
    preview
  );

  return extractSingleDataEntry(entries, "tagLineCollection");
}

export async function getContactLinkData(preview) {
  const entries = await fetchGraphQL(
    `query {
      contactLinkCollection(preview: ${preview ? "true" : "false"}) {
        items {
          buttonText
          contactAddress
        }
      }
    }`,
    preview
  );

  return extractSingleDataEntry(entries, "contactLinkCollection");
}

export async function getProjectData(preview) {
  const entries = await fetchGraphQL(
    `query {
      projectCollection(order: projectOrder_ASC, preview: ${
        preview ? "true" : "false"
      }) {
        items {
          title
          description
          mediaCollection {
            items {
              url
            }
          }
          layout
          centered
          augmentLayout
        }
      }
    }`,
    preview
  );

  return extractMultipleDataEntries(entries);
}
