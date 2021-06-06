import React from "react"
import SEO from "../components/seo"

import { graphqlSDK } from "src/graphql/client";
import { Listing } from "src/graphql/generated/graphql";
import { GetServerSideProps, NextPage } from "next";
import ErrorPage from 'next/error';
import SmallListing from "src/components/Listing/small";
import Link from "next/link";
import Slider, { Settings } from "react-slick";

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 3
};

const IndexPage: NextPage<{listings: Listing[]}> = (props) => {

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
    <div className="bg-green-200 p-5">
      <div className="text-3xl">Available kitchens near you</div>
      <div className=" pt-4">
        <Slider {...settings}>
          {
            props.listings.map(item => {
              return (
              <div key={item.id} className="max-w-2xl">
                  <Link href={`/listings/${encodeURIComponent(item.id)}`}>
                    <a>
                      <SmallListing listing={item}></SmallListing>
                    </a>
                  </Link>
              </div>
              )})
          }
        </Slider>
      </div>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
    res
  }) => {
    try {
      let listings =  await graphqlSDK().getHomeGalleryListings()
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