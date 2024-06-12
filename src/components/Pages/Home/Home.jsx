import About from "../../Section/About/About";
import Banner from "../../Section/Banner/Banner";
import Contact from "../../Section/Contact/Contact";
import Featured_Products from "../../Section/Featured_Products/Featured_Products";
import Trending_Products from "../../Section/Trending_Products/Trending_Products";

const Home = () => {
  return (
    <div>
      <div>
        {/* TODO:Banner Section */}
        <Banner></Banner>
      </div>

      {/* this Featured Products section */}
      <div>
        <Featured_Products></Featured_Products>
      </div>
      {/* this is about section  */}
      <div>
        <About></About>
      </div>
      {/* This is Trending Products Section */}
      <div>
        <Trending_Products></Trending_Products>
      </div>
      {/* this is contact section */}
      <div>
      <Contact></Contact>
      </div>
    </div>
  );
};

export default Home;
