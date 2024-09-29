import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div className="relative -z-10">
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        transitionTime={10}
        animationHandler="fade"
        showStatus={false}
      >
        <div className="bg-[url(https://i.postimg.cc/Sx3C9XFd/photo-1423666639041-f56000c27a9a-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg)] w-full min-h-[600px] bg-no-repeat bg-cover bg-center">
          <div className="p-10 lg:p-20 bg-blue-500 bg-opacity-50 min-h-[600px] space-y-8">
            <h1 className="animate__animated animate__fadeInDown">
              <span className="text-5xl font-bold text-white">
                Welcome to
                <span className="text-pink-800">Tech-Tools__</span>
              </span>{" "}
              <br />{" "}
              <span className="text-3xl font-semibold text-violet-100">
                Maximize Efficiency with Advanced Tech Tools
              </span>
            </h1>

            <p className="text-2xl text-yellow-100 animate__animated animate__pulse">
              {" "}
              Discover the latest tools designed to streamline your workflow and
              enhance your productivity. From powerful project management
              software to innovative collaboration platforms, our tech solutions
              are tailored to meet the demands of modern professionals. Stay
              ahead of the curve and achieve more with less effort.
            </p>
            <div>
              <Link to="/Login">
                <button className="btn">Login Now</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[url(https://i.postimg.cc/9Mj9xvfq/premium-photo-1661578570451-236f2ddc55c0-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg)] w-full min-h-[600px] bg-no-repeat bg-cover bg-center">
          <div className="p-10 lg:p-20 bg-blue-500 bg-opacity-50 min-h-[600px] space-y-8">
            <h1 className="animate__animated animate__fadeInDown">
              <span className="text-5xl font-bold text-white">
                Welcome to <span className="text-pink-800">Tech-Tools__</span>
              </span>{" "}
              <br />{" "}
              <span className="text-3xl font-semibold text-violet-100">
                Top-Notch Cybersecurity Solutions
              </span>
            </h1>

            <p className="text-2xl text-yellow-100 animate__animated animate__pulse">
              {" "}
              Protect your digital assets with our state-of-the-art
              cybersecurity tools. Our solutions provide comprehensive
              protection against malware, phishing attacks, and data breaches,
              ensuring your online safety. Trust in our technology to safeguard
              your sensitive information and maintain your peace of mind.
            </p>
            <div>
              <Link to="/Login">
                <button className="btn">Login Now</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[url(https://i.postimg.cc/wx2NV4Y7/photo-1592478411213-6153e4ebc07d-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg)] w-full min-h-[600px] bg-no-repeat bg-cover bg-center">
          <div className="p-10 lg:p-20 bg-blue-500 bg-opacity-50 min-h-[600px] space-y-8">
            <h1 className="animate__animated animate__fadeInDown">
              <span className="text-5xl font-bold text-white">
                Welcome to <span className="text-pink-800">Tech-Tools__</span>
              </span>{" "}
              <br />{" "}
              <span className="text-3xl font-semibold text-violet-100">
                Harness the Power of Artificial Intelligence
              </span>
            </h1>

            <p className="text-2xl text-yellow-100 animate__animated animate__pulse">
              {" "}
              Leverage the potential of AI to transform your business processes.
              Our AI-driven tools offer intelligent automation, data analysis,
              and personalized customer experiences. Embrace innovation and gain
              a competitive edge by integrating artificial intelligence into
              your daily operations.
            </p>
            <div>
              <Link to="/Login">
                <button className="btn">Login Now</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[url(https://i.postimg.cc/x881gRLz/photo-1593376893114-1aed528d80cf-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg)] w-full min-h-[600px] bg-no-repeat bg-cover bg-center">
          <div className="p-10 lg:p-20 bg-blue-500 bg-opacity-50 min-h-[600px] space-y-8">
            <h1 className="animate__animated animate__fadeInDown">
              <span className="text-5xl font-bold text-white">
                Welcome to <span className="text-pink-800">Tech-Tools__</span>
              </span>{" "}
              <br />{" "}
              <span className="text-3xl font-semibold text-violet-100">
                Unified Communication Platforms
              </span>
            </h1>

            <p className="text-2xl text-yellow-100 animate__animated animate__pulse">
              {" "}
              Enhance teamwork and communication with our unified collaboration
              tools. Whether you're working remotely or in the office, our
              platforms ensure seamless connectivity and real-time
              collaboration. Experience the future of work with tools that bring
              your team together, no matter where they are.
            </p>
            <div>
              <Link to="/Login">
                <button className="btn">Login Now</button>
              </Link>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
