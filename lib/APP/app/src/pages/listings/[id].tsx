import {useRouter} from 'next/router'

const Listing = () => {
  const router = useRouter()

  return <p>Listing: {router.query.id}</p>
}

export default Listing