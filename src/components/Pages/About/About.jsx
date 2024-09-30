import React from "react";

const About = () => {
  return (
    <div className="pt-24 px-10 pb-10 md:px-0 md:pb-10 flex flex-col lg:flex-row justify-between items-center">
      <div className="md:w-1/2">
        <img
          src="https://i.postimg.cc/9Mj9xvfq/premium-photo-1661578570451-236f2ddc55c0-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg"
          alt="Robot"
          
        />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-2xl">Welcome to <span className="font-bold">Tech-Tools</span>, <br /> your one-stop platform for discovering
        the latest and most innovative tech tools.</h1>

         <p>
         Our mission is to empower
        developers, IT professionals, and tech enthusiasts by providing insights
        into cutting-edge technologies, software solutions, and tools that
        streamline work processes and enhance productivity. At <span className="font-bold">Tech-Tools</span>, we believe in the power of technology to solve real-world
        problems. We bring together tools across various domains, including
        cybersecurity, artificial intelligence, unified communication platforms,
        and more, to help you stay ahead in the ever-evolving tech landscape.
        Whether you're building robust applications, securing your network, or
        optimizing workflows, we've curated the best tools to meet your needs.
        Our goal is to equip you with the right resources to innovate, grow, and
        succeed in your tech journey. Join us on this exciting ride to explore
        and leverage the tools that will shape the future of technology.
         </p>
      </div>
    </div>
  );
};

export default About;
