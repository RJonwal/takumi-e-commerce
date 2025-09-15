import styles from "../styles/Marquee.module.css";
import Products from "../app/Products";
import { memo } from "react";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from "embla-carousel-autoplay";

const Marquee = ({ products }) => {
  const autoplay = Autoplay({ delay: 1500, stopOnInteraction: false });
  const [emblaRef] = useEmblaCarousel(
    { loop: true, containScroll: "trimSnaps" },
    [autoplay]
  );


  console.log("marquee");
  return (
    <div className=" mt-20">
      <h1 className=" text-center text-secondary text-xl font-extrabold">
        You may also like
      </h1>

      <section className=" mt-10 relative h-52 sm:h-96  w-full  overflow-hidden">
        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className={`flex gap-3`}>
            {products.map((product) => (
              <div
                key={product._id}
                className="w-full"
              >
                <Products products={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Marquee);
