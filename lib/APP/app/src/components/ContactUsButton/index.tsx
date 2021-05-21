import React from 'react'
import Link  from 'next/link';
import Button from '../Button';

const ContactUsButton = () => {
    return (
        <Link href="/contact" >
            <Button text="Contact Us"/>
        </Link>
    )
}

export default ContactUsButton;
