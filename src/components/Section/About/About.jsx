
const About = () => {
    return (
        <section className="bg-white dark:bg-gray-900 ">
        <div className=" flex">
          <div className="min-h-screen lg:w-1/3"></div>
          <div className="hidden w-3/4 min-h-screen bg-gray-100 dark:bg-gray-800 lg:block"></div>
  
          <div className="container flex flex-col justify-center w-full min-h-screen px-6 py-10 mx-auto lg:absolute lg:inset-x-0">
            <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
              About <span className="text-orange-400">Us__</span>
            </h1>
  
            <div className="mt-10 lg:mt-20 lg:flex lg:items-center">
              <img
                className="object-cover object-center w-full lg:w-[32rem] rounded-lg h-96"
                src="https://i.postimg.cc/1tfzrBGN/premium-photo-1682814732010-d7f4917fad03-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg"
                alt="About Image coming soon"
              />
  
              <div className="mt-8 lg:ps-10 lg:mt-0">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:">
                Empowering Innovation with <br /> Cutting-Edge Tech Tools
                </h1>
  
                <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-400">
                Welcome to Tech-Tools, your premier destination for the latest and most innovative tech tools. Founded with a vision to empower professionals and enthusiasts alike, we are dedicated to providing top-notch products that enhance productivity, streamline workflows, and drive technological advancement. Our mission is to bridge the gap between complex technology and user-friendly solutions, making high-performance tools accessible to everyone.
                </p>
   
                <h3 className="text-gray-600 pt-3 text-2xl dark:text-gray-300">So Explore Our Products</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default About;