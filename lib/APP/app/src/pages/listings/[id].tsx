import { GetServerSideProps, NextPage } from 'next'
import { graphqlSDK } from 'src/graphql/client'
import { Listing} from "src/graphql/generated/graphql";
import ErrorPage from 'next/error';
import Slider, {Settings} from 'react-slick';
import Image from 'next/image'
import Calendar from 'src/components/Calendar';
import Map from 'src/components/Map';

/**
 * Shows the detailed listing.
 * @param param0 A listing
 * @returns 
 */
const ListingPage: NextPage<{listing: Listing}> = ({listing}) => {

  if (!listing) {
    return <ErrorPage statusCode={404} />;
  }

  const customPaging = (index: Number) => {
    return (
      <div>
        {index}
      </div>
    )
  }

  var settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging
  };

  return (
    <div className="max-w-6xl mx-auto p-5">

      <div>
        <Calendar {...listing}/>
      </div>
      
      {/* Title */}
      <p className="text-3xl py-2">{listing.title}</p>

      {/* Images */}
      {/* TODO: move into seperate component later on. */}
        <Slider {...settings} >
        <div className="h-screen/3 w-96 relative">
          <Image 
            src="https://shareablekitchen.com/wp-content/uploads/2021/02/tempImaget43UeU-scaled.jpg"
            alt="Picture of the author"
            layout="fill" // required
            objectFit="cover" // change to suit your needs
            className="" // just an example
          />
        </div>
        <div className="h-screen/3 w-96 relative">
          <Image 
            src="https://shareablekitchen.com/wp-content/uploads/2021/02/tempImaget43UeU-scaled.jpg"
            alt="Picture of the author"
            layout="fill" // required
            objectFit="cover" // change to suit your needs
            className="" // just an example
          />
        </div>
      </Slider>

      <div className="pt-5">
        <p className="text-2xl">Description</p>
        <p>{listing.description}</p>
      </div>
      
      <div className="py-3">
        <p className="text-2xl">Price</p>
        <p className="text">$ {listing.unitPrice} {listing.availability.type}</p>
        <p></p>
      </div>

      <div className="py-3">
        <p className="text-2xl">Area</p>
        <p className="text">{listing.sqFtArea} sqFt</p>
      </div>

      <p className="pt-3 text-2xl">Amenities</p>
      <div>{listing.features?.map(item => 
        <li key={item}>{item.valueOf()}</li>
      )}</div>

      <div className="py-3">
        <p className="text-2xl">Hosted by</p>
        <p>{listing.author.first_name}</p>
      </div>

      <div>
        <Map center={{lat:59.955413, lng: 30.337844}} zoom={11}/>
      </div>
    </div>
  )
}

export default ListingPage


export const getServerSideProps: GetServerSideProps = async ({
    params,
    res
  }) => {
    try {
      let id = params?.id as string
      let listing =  await graphqlSDK().retrieveListing({id})
      return {
        props: {
          listing: listing.retrieveListing
        }
      }
    } catch (error) {
      res.statusCode = 404;
      return {
        props: {}
      }
    }
}