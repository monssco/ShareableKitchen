import React from 'react';
import SwiperCore, { Navigation, Pagination } from "swiper";

/*
IMPORTANT! MAKE SURE YOU ALSO IMPORT SWIPER'S CSS CLASSES AS WELL.
https://swiperjs.com/get-started#download-assets
*/


SwiperCore.use([Navigation, Pagination]);

const Carousel = () => {

    return (
        
        <section className="my-20">

            <div className="md:container md:mx-auto p-5 select-none">
                {/* <p className="font-sans pb-4 text-3xl">Paths we have travelled</p> */}

            </div>
        </section>
    );
};

export default Carousel;
