import React, { JSX } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMailOpenOutline } from "react-icons/io5";
import Image from "next/image";
import AssetMission1 from "@/assets/about-assets/asset-mission1.webp";
import AssetMission2 from "@/assets/about-assets/asset-mission2.webp";
import AssetMission3 from "@/assets/about-assets/asset-mission3.webp";
import AssetMission4 from "@/assets/about-assets/asset-mission4.webp";
import AssetMember1 from "@/assets/about-assets/asset-member1.webp";
import AssetMember2 from "@/assets/about-assets/asset-member2.webp";
import AssetMember3 from "@/assets/about-assets/asset-member3.webp";
import AssetMember4 from "@/assets/about-assets/asset-member4.webp";
import AssetMember5 from "@/assets/about-assets/asset-member5.webp";

//Swiper
import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";

register();

export default function AboutUs(): JSX.Element {
  return (
    <>
      <main>
        <header className="pb-14 lg:pb-24 pt-32">
          <div className="container">
            <div className="bg-[url('/asset-hero.webp')] bg-center bg-cover md:h-max rounded-2xl">
              <div className="text-white text-center py-20 md:py-52 space-y-8">
                <h1 className="text-3xl md:text-5xl font-bold">Who We Are</h1>
                <p className="md:w-3/5 mx-auto px-4 md:px-0">
                  At SPAs, we're more than just a network - we're a community of
                  passionate professionals shaping the future of Beauty, Spa,
                  and Wellness in Singapore.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Our Visions */}
        <section className="pb-14 lg:pb-24">
          <div className="container">
            <h2 className="text-black text-2xl md:text-4xl font-bold text-center mb-16">
              Our Visions
            </h2>

            <div className="flex flex-col md:flex-row gap-x-20 gap-y-10">
              <div className="space-y-4">
                <div>
                  <FaRegCircleCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold">Uniting World-class Spa Operators</h3>
                <p className="text-sm md:text-base">
                  We believe in the power of collaboration. By bringing together
                  spa and wellness professionals, stakeholders, and consumers,
                  we create an environment where ideas flow freely, partnerships
                  flourish, and the collective wisdom of the community becomes a
                  driving force for progress.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <IoMailOpenOutline className="w-6 h-6" />
                </div>
                <h3 className="font-bold">
                  Delivering World-class Spa Professionals
                </h3>
                <p className="text-sm md:text-base">
                  Your growth is our priority. Whether you're a seasoned owner
                  or a budding therapist, SPAS is designed to be the catalyst
                  for your professional journey. We empower Spa Therapists to be
                  World-class Spa Professionals through delivering world-class
                  Spa Experiences
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Missions */}
        <section className="pb-14 lg:pb-24">
          <div className="container">
            <h2 className="text-black text-4xl font-bold text-center mb-16">
              Our Missions
            </h2>

            <div className="flex flex-col md:flex-row justify-between gap-x-10 gap-y-10">
              <div className="relative">
                <Image
                  src={AssetMission1}
                  alt="Mission 1"
                  className="object-cover rounded-md"
                />
                <div className="bg-white/80 absolute bottom-5 left-3 w-11/12 space-y-4 p-2 rounded-md">
                  <span className="text-black font-bold">
                    Fostering Collaboration
                  </span>
                  <p className="text-black text-xs">
                    Download torrents from verified or trusted uploaders. If
                    you're a BitTorrent user looking
                  </p>
                </div>
              </div>

              <div className="relative">
                <Image
                  src={AssetMission2}
                  alt="Mission 1"
                  className="object-cover rounded-md"
                />
                <div className="bg-white/80 absolute bottom-5 left-3 w-11/12 space-y-4 p-2 rounded-md">
                  <span className="text-black font-bold">
                    Empowering Growth
                  </span>
                  <p className="text-black text-xs">
                    Download torrents from verified or trusted uploaders. If
                    you're a BitTorrent user looking
                  </p>
                </div>
              </div>

              <div className="relative">
                <Image
                  src={AssetMission3}
                  alt="Mission 1"
                  className="object-cover rounded-md"
                />
                <div className="bg-white/80 absolute bottom-5 left-3 w-11/12 space-y-4 p-2 rounded-md">
                  <span className="text-black font-bold">
                    Enabling Innovation
                  </span>
                  <p className="text-black text-xs">
                    Download torrents from verified or trusted uploaders. If
                    you're a BitTorrent user looking
                  </p>
                </div>
              </div>

              <div className="relative">
                <Image
                  src={AssetMission4}
                  alt="Mission 1"
                  className="object-cover rounded-md"
                />
                <div className="bg-white/80 absolute bottom-5 left-3 w-11/12 space-y-4 p-2 rounded-md">
                  <span className="text-black font-bold">Give Recognition</span>
                  <p className="text-black text-xs">
                    Download torrents from verified or trusted uploaders. If
                    you're a BitTorrent user looking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="pb-14 lg:pb-24">
          <div className="bg-[url('/asset-about-bg.webp')] bg-cover">
            <div className="container py-20 ">
              <div className="mb-20">
                <div className="text-center space-y-4">
                  <h2 className="text-white text-2xl md:text-4xl font-bold">
                    Our Values
                  </h2>
                  <p className="text-white md:w-1/3 mx-auto">
                    Take advantage of SWAS' marketing and promotional
                    initiatives for increased visibility.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-white p-4 md:p-10 rounded-md">
                  <div className="text-secondary">
                    <p className="mb-8 text-sm md:text-base">
                      Upholding unparalleled excellence, we are dedicated to
                      maintaining superior standards in every aspect of our
                      work, ensuring a commitment to quality that exceeds
                      expectations.
                    </p>
                    <span className="font-bold md:text-lg">
                      Superior Standards
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 md:p-10 rounded-md">
                  <div className="text-secondary">
                    <p className="mb-8 text-sm md:text-base">
                      Embodying a culture of utmost professionalism, we
                      consistently adhere to ethical conduct, reliability, and a
                      results-driven approach, fostering trust and confidence in
                      all our interactions.
                    </p>
                    <span className="font-bold md:text-lg">
                      Practice Professionalism
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 md:p-10 rounded-md">
                  <div className="text-secondary">
                    <p className="mb-8 text-sm md:text-base">
                      With a relentless pursuit of excellence, we strive to ace
                      every endeavor, turning challenges into triumphs through
                      innovation, determination, and a passion for continuous
                      improvement
                    </p>
                    <span className="font-bold md:text-lg">
                      Ace All Achievements
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 md:p-10 rounded-md">
                  <div className="text-secondary">
                    <p className="mb-8 text-sm md:text-base">
                      Infusing warmth into every interaction, we deliver service
                      with genuine smiles, creating positive experiences and
                      lasting connections that go beyond meeting expectations.
                    </p>
                    <span className="font-bold md:text-lg">
                      Service with Smiles
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Member */}
        <section className="pb-14 lg:pb-40">
          <div className="container">
            <h2 className="text-black text-2xl md:text-4xl font-bold text-center mb-16">
              Our Member
            </h2>

            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              slidesPerView={1}
              modules={[Pagination]}
              className="mySwiper"
              breakpoints={{
                640: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 2000 }}
            >
              <SwiperSlide className="ml-20 md:ml-0 md:mr-16 mr-4">
                <Image
                  src={AssetMember1}
                  alt="Pablo Blau"
                  className="object-cover w-1/2"
                />
              </SwiperSlide>

              <SwiperSlide className="pt-10 md:mr-16">
                <Image
                  src={AssetMember2}
                  alt="The Thai Spa"
                  className="object-cover w-1/2"
                />
              </SwiperSlide>

              <SwiperSlide className="pt-10 mr-4 md:mr-16">
                <Image
                  src={AssetMember3}
                  alt="Ikeda Spa"
                  className="object-cover w-1/2"
                />
              </SwiperSlide>

              <SwiperSlide className="pt-10">
                <Image src={AssetMember4} alt="Spa" className="object-cover" />
              </SwiperSlide>

              <SwiperSlide className="pt-10 -ml-14">
                <Image
                  src={AssetMember5}
                  alt="Chi Spa"
                  className="object-cover w-3/4"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
      </main>
    </>
  );
}
