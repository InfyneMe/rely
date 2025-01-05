import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialCarousel = () => {
  return (
    <div className="mt-12">
      <h2 className="text-4xl font-bold text-center text-purple-800 mb-8">
        What Our Users Say
      </h2>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
        }}
        className="testimonial-carousel"
      >
        <SwiperSlide>
          <div className="flex flex-col bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl shadow-xl p-8 h-full">
            <h3 className="text-2xl text-white font-semibold mb-4">
              Relx has completely transformed how I manage my vehicle maintenance.
            </h3>
            <p className="text-lg text-white mb-6">
              I never forget an oil change or tire check anymore!
            </p>
            <p className="text-sm text-white italic">- John D., Happy Customer</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl shadow-xl p-8 h-full">
            <h3 className="text-2xl text-white font-semibold mb-4">
              Relx made managing my car’s maintenance a breeze!
            </h3>
            <p className="text-lg text-white mb-6">
              It’s so simple and convenient to use.
            </p>
            <p className="text-sm text-white italic">- Sarah M., Satisfied User</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl shadow-xl p-8 h-full">
            <h3 className="text-2xl text-white font-semibold mb-4">
              A must-have app for vehicle owners!
            </h3>
            <p className="text-lg text-white mb-6">
              The reminders ensure I never miss any important dates.
            </p>
            <p className="text-sm text-white italic">- Alex P., Loyal User</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default TestimonialCarousel;
