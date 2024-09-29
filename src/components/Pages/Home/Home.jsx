import { Helmet } from "react-helmet-async";
import Banner from "../../Section/Banner/Banner";
import Featured_Products from "../../Section/Featured_Products/Featured_Products";
import Trending_Products from "../../Section/Trending_Products/Trending_Products";

const Home = ({bannerRef }) => {
  return (
    <div>
      <Helmet>
        <title>Tech-Tools | Home</title>
      </Helmet>
      <div>
        {/* TODO:Banner Section */}
        <Banner></Banner>
      </div>

      {/* this Featured Products section */}
      <div>
        <Featured_Products></Featured_Products>
      </div>
      {/* This is Trending Products Section */}
      <div>
        <Trending_Products></Trending_Products>
      </div>
    </div>
  );
};

export default Home;
