import React from 'react';

import { Callout } from '../HireUs/index';
import Link from 'next/link'

// Careers is also here, right now there is no need to seperate it.
const Careers = () => (
    <div className='divide-y pb-20'>

        <div className="py-5 ">
            <p className="text-5xl max-w-md">Careers</p>
            <div className="flex flex-col lg:flex-row">
                <Callout title="" subTitle="We are always looking to work with people who are as excited about designing beautiful experiences as we are. Think that might be you?" />
            </div>
        </div>

        <div className="py-5">
            <Link href="https://forms.gle/X9Vuhn2svqNjNjSd7" >
                <a className="text-2xl py-5 underline hover:text-green-800">
                    Work with us
                </a>
            </Link>
        </div>

    </div>
)

export default Careers;