import {useRouter} from 'next/router'

const Reservation = () => {
    const router = useRouter()

    return <p>Reservation: {router.query.id}</p>
}

export default Reservation