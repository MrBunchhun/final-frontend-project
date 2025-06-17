import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import SlideBanner from "./SlideBanner";

const SwiperBanner = ({ images }) => (
  <div className="w-full" style={{ height: "60vh", position: "relative" }}>
    <Swiper
      spaceBetween={30}
      centeredSlides
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      navigation
      modules={[Autoplay, Navigation]}
      className="absolute top-0 left-0 w-full h-full"
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <SlideBanner image={img} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default SwiperBanner;
