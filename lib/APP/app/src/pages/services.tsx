import React from 'react'
import FAQ from '../components/FAQ';
import SEO from '../components/seo';
import Link from 'next/link';

const ServicesPage = () => {
    return (
        <>
            <SEO title="Services" description="Monss uses design and data science to provide elegant software solutions, we combine your ideas with our experience. Find out how we can transform your business" />
        <div className="">
            
            <section className="container mx-auto p-5 flex flex-row pt-10">
                <div className="flex-1">
                    <p className="font-extralight">OUR SERVICES</p>
                        <p className="font-sans font-light text-3xl md:text-6xl max-w-2xl pb-10 leading-tight">
                        What we offer.
                    </p>
                        <h1 className="max-w-prose text-lg lg:text-2xl leading-10 text-black text-opacity-75">From strategy to development and everything in between. <br/><br/> We work with our clients to customize the scope of each software project. Our goal is to achieve the maximum business impact. Whether that means full project ownership or collaboration with an existing team.</h1>
                </div>
            </section>

            
            <MockUpImage></MockUpImage>
            <div className="p-10"></div>
            <Skills></Skills>

            <section className="container mx-auto p-5">
                <div className="py-10 mx-0">
                    <div className="center">
                        <div className="h-8 w-20 bg-black"></div>
                            <p className="text-lg">
                                Have a Project for us?
                    </p>
                        <Link href="/contact">
                            <p className="py-3 underline font-bold text-lg">Let's chat</p>
                        </Link>
                    </div>
                </div>
            </section>

            <div className="pb-32">
                <FAQ></FAQ>
            </div>
        </div>
        </>
    )
}

export default ServicesPage;


import Skills from '../components/Skills';



const MockUpImage = () => {


    return (
        <div className="flex md:flex-row justify-center space-x-4 md:space-x-8 gap-4 md:gap-8 py-10 md:py-20">
            
        </div>
    )

}