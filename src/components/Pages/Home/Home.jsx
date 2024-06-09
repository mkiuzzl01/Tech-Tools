import useAuth from "../../../hooks/useAuth";
import Featured_Products from "../../Section/Featured_Products/Featured_Products";
import Trending_Products from "../../Section/Trending_Products/Trending_Products";

const Home = () => {
  return (
    <div>
      <h1>This is Home Page</h1>
      <div>
        {/* TODO:Banner Section */}
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
