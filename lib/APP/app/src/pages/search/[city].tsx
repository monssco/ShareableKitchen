import {useRouter} from 'next/router'

const Search = () => {
    const router = useRouter()

    return <p>City: {router.query.city}</p>
}

export default Search