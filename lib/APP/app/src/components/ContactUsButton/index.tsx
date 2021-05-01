import React from 'react'
import Link  from 'next/link';
import Button from '../Button';

interface Props {
    
}

const ContactUsButton = (props: Props) => {
    return (
        <Link href="/contact" >
            <Button text="Contact Us"/>
        </Link>
    )
}

export default ContactUsButton;
