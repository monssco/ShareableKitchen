// import { GetServerSideProps } from 'next'
import {useRouter} from 'next/router'
// import { graphqlSDK } from 'src/graphql/client'

const Listing = () => {
  const router = useRouter()

  return (
    <div className="container mx-auto">
      <p>Listing: {router.query.id}</p>
    </div>
  )
}

export default Listing


// export const getServerSideProps: GetServerSideProps = async ({
//     params,
//     res
//   }) => {
//     // ...
//     try {
//       let id = params?.id as string
//       let listing =  await graphqlSDK().retrieveListing({id})
//     return {
//       props: {
//         data: listing
//       }
//     }
//     } catch (error) {
//       res.statusCode = 404;
//       return {
//         props: {}
//       }
//     }
  

// }