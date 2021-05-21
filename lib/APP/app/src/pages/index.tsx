import React from "react"
import SEO from "../components/seo"

import { graphqlSDK } from "src/graphql/client";
import { Listing } from "src/graphql/generated/graphql";
import { GetServerSideProps, NextPage } from "next";
import ErrorPage from 'next/error';
import SmallListing from "src/components/Listing/small";
import Link from "next/link";

const IndexPage: NextPage<{listings: Listing[]}> = (props) => {
  {console.log("PROPS", props.listings)}
  if (!props.listings) {
    return <ErrorPage statusCode={404} />;
  }

  return (

    <>
    {console.log(props.listings)}
    {console.log(typeof props.listings)}
      <SEO title="Shareable Kitchen - Find a Kitchen to rent today!" 
            lang='en'
      />
      <div className="container mx-auto">
        {/* <SearchBar></SearchBar> */}
        <HomeGallery listings={props.listings}></HomeGallery>
      </div>
    </>
  )
}

export default IndexPage

const HomeGallery: React.FC<{listings: Listing[]}> = (props) => {

  return (
    <div className="bg-green-200">
      <div className="text-2xl">Kitchens near you!</div>
      <div className="flex flex-row">
        {
        props.listings.map(item => {
          return (
          <div className="p-2">
            
              <Link href={`/listings/${encodeURIComponent(item.id)}`}>
                <a>
                  <SmallListing listing={item}></SmallListing>
                </a>
              </Link>
            
          </div>)
        })
      }
      </div>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
    res
  }) => {
    try {
      let listings =  await graphqlSDK().getHomeGalleryListings()
      console.log("LISTINGS", listings)
    return {
      props: {
        listings: listings.homeGalleryListings
      }
    }
    } catch (error) {
      console.log("ERROR", error)
      res.statusCode = 404;
      return {
        props: {}
      }
    }
  

}