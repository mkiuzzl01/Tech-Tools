import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        transitionTime={10}
        showStatus={false}
      >
        <div className="bg-[url(https://i.postimg.cc/Sx3C9XFd/photo-1423666639041-f56000c27a9a-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg)] w-full  bg-no-repeat bg-cover bg-center">
          <div className="pt-32 pb-12 px-4 md:pt-52 md:pb-24 bg-blue-500 bg-opacity-50 h-[500px] md:h-[600px] space-y-8">
            <h4 className="text-2xl md:text-3xl font-semibold text-violet-100">
              Discover the Latest Tech Innovations
            </h4>
            <p className="md:text-2xl text-yellow-100">
              {" "}
              Explore groundbreaking products and tools <br /> that are
              transforming industries. Stay ahead with fresh updates every day.
            </p>
            <div className="py-5">
              <Link to="/Registration">
                <button className=" btn btn-outline text-white shadow-md rounded-none">
                  Register Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-[url(https://i.postimg.cc/9Mj9xvfq/premium-photo-1661578570451-236f2ddc55c0-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg)] w-full  bg-no-repeat bg-cover bg-center">
          <div className="pt-32 pb-12 md:pt-52 md:pb-24 bg-blue-500 bg-opacity-70 h-[500px] md:h-[600px] space-y-8">
            <h4 className="text-2xl md:text-3xl font-semibold text-violet-100">
              Share Your Innovative Creations
            </h4>

            <p className="text-2xl text-yellow-100">
              Launch your product and gain visibility <br /> in front of a community of
              tech enthusiasts eager to support new ideas.
            </p>
            <div className="py-5">
            <div className="py-5">
              <Link to="/Registration">
                <button className=" btn btn-outline text-white shadow-md rounded-none">
                  Register Now
                </button>
              </Link>
            </div>
            </div>
          </div>
        </div>

        <div className="bg-[url(https://i.postimg.cc/wx2NV4Y7/photo-1592478411213-6153e4ebc07d-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg)] w-full  bg-no-repeat bg-cover bg-center">
          <div className="pt-32 pb-12 md:pt-52 md:pb-24 bg-blue-500 bg-opacity-70 h-[500px] md:h-[600px] space-y-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-violet-100">
              Connect with Top Creators and Investors
            </h1>

            <p className="text-2xl text-yellow-100">
              Network with innovators and investors <br /> who share a passion for
              technology, and grow your project to the next level.
            </p>
            <div>
            <div className="py-5">
              <Link to="/Registration">
                <button className=" btn btn-outline text-white shadow-md rounded-none">
                  Register Now
                </button>
              </Link>
            </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
