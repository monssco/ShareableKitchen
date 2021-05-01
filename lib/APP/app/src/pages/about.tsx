import React, { FunctionComponent } from 'react'
import SEO from '../components/seo';
import Difference from '../components/Difference/index';

const AboutPage: FunctionComponent = () => {
    return (
        <>
        <SEO title="About" />
        <div className="">

                <section className=" container mx-auto p-5 flex flex-row md:pt-10">
                    <div className="flex-1">
                        <p className="font-extralight">WHY MONSS</p>
                        <p className="font-sans font-light text-3xl md:text-6xl max-w-2xl pb-10 leading-tight">
                            Reshaping software development with Simplicity, Transparency and Trust.
                        </p>
                        
                    </div>
                    
                    {/* <div className="flex-1 bg-red-100">

                    </div> */}
            </section>

                <section className="container mx-auto p-5 flex flex-col lg:flex-row justify-between my-10 gap-8">
                    <Difference number={1} title="The Quality Difference" subTitle="Our passion is to create beautiful and high-quality software. We deliver products that solve our client's needs using the highest industry standards." ></Difference>
                    <Difference number={2} title="The Service Difference" subTitle="Available at any time, day or night. Our development process is transparent, we meet every week with our clients to keep them updated on our progress." ></Difference>
                    <Difference number={3} title="The Experience Difference" subTitle="We don't start development until you are satisfied with how your product looks and feels. Heavy emphasis is given to interactive prototypes and user stories." ></Difference>
            </section>

            <WhyWeStarted />
            <WhyCalledMonss />
        </div>
        </>
    )
}

export default AboutPage;



const WhyWeStarted = () => {


    // if (!data?.placeholderImage?.childImageSharp?.fluid) {
    //     return <div>Picture not found</div>
    // }

    // return <Img className={`${props.className}`} fluid={data.placeholderImage.childImageSharp.fluid} />


    return (
        <section className="bg-monss text-white pt-24 lg:pt-28">
            <div className="container mx-auto p-5 flex flex-col-reverse lg:flex-row">
                <div className="flex-1 pr-3">
                    <p className="text-6xl">Our story</p>


                    <p className="max-w-md py-10 text-xl tracking-wide
                    leading-loose">Two Calgarians started this ambitious enterprise, and, for better or for worse, it hasn’t stopped ever since. We started by designing and developing iPhone apps. Then we moved onto creating backend solutions for our clients. Suddenly we realized that there was a demand for complete end-to-end solutions, be it apps or websites, with or without backends.
                    
                    <br/>
                    <br/>
                    Our clients started coming with their business needs and we designed complete solutions for them - instead of just mobile apps. Then we started doing more things: websites, web apps, research, API design, E-commerce integration, serious stuff! — and suddenly we found ourselves running an inventive product design company which also happens to be good with production.</p>
                </div>

                <div className="flex-1 flex flex-row gap-8">
                    
                </div>


            </div>
        </section>
    )
}

const WhyCalledMonss = () => {
    return (
        <section className="container mx-auto p-5 my-20">
            <div className="flex flex-col lg:flex-row mb-12 lg:p-32 content-around">
                <div className="flex-1 pr-3 self-start lg:self-center">
                    <p className="font-extralight text-6xl max-w-sm ml-auto mt-auto">What does monss stand for?</p>
                </div>
                <div className="flex-1 ">
                    <p className=" py-5 max-w-md text-2xl "><span className="font-william">mons</span> is a latin word that means mountains.</p>
                    <p className="max-w-md text-xl">
                        When choosing the name, we wanted something unique, and close to home. We considered different names and gravitated towards things to do with nature, the Rocky Mountains, and Calgary's position on the foothills of the Rockies. After contemplating on lots of different names, we arrived at the Latin word mons, but it wasn't quite quirky enough. <br/> <br/>To add a litte more pizzaz we deicded to add another <span className="font-william italic">s</span>. Thus, the name monss was born.
                    </p>
                </div>
            </div>
        </section>
    )
}