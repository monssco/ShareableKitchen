import React from 'react';


interface CaseStudyInterface {
    title: string;
    subTitle: string;
}

const LiveworksCaseStudy = (props: CaseStudyInterface) => {


    // function BackgroundSection({className, children}) {

    //     return (
    //         // <BackgroundImage
    //         //     Tag="section"
    //         //     className={className}
    //         //     fluid={imageData}
    //         // >
    //         //     {children}
    //         // </BackgroundImage>
    //     )
    // }

    return (
        <div className="bg-opacity-20 opacity-20 ">
            <div className="mb-0 md:p-20 md:w-1/2 text-black h-screen-90 md:h-screen/2 relative">
                <div className="absolute bottom-10 p-5">
                    {/* <Img fluid={data.fileName.childImageSharp.fluid} imgStyle={{ objectFit: 'contain' }} /> */}
                    <p className="font-sans text-2xl py-5">{props.title}</p>
                    <p className="font-light text-xl">{props.subTitle}</p>
                </div>
            </div>
        </div>
    )
}

export default LiveworksCaseStudy;
