import { GetServerSideProps, NextPage } from 'next'
import { graphqlSDK } from 'src/graphql/client'
import { Listing} from "src/graphql/generated/graphql";
import ErrorPage from 'next/error';
import Slider, {Settings} from 'react-slick';
import Image from 'next/image'
import Calendar from 'src/components/Calendar';
import Map from 'src/components/Map';


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
    <div className="container mx-auto p-10">
      
      {/* Title */}
      <p className="text-3xl py-2">{listing.title}</p>

      {/* Images */}
      <div className="bg-red-300">
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
      </Slider>
      </div>

      <div className="py-2">
        <p className="text-2xl">Description</p>
        <p>{listing.description}</p>
      </div>
      
      <div className="py-2">
        <p className="text-2xl">Price</p>
        <p className="text">$ {listing.unitPrice} {listing.availability.type}</p>
        <p></p>
      </div>

      <div>
        <p className="text-2xl">Area</p>
        <p className="py-2 text">{listing.sqFtArea} sqFt</p>
      </div>

      <p className="pt-3 text-2xl">Amenities</p>
      <div>{listing.features?.map(item => 
        <li>{item}</li>
      )}</div>
      <div>
        <Calendar {...listing}/>
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