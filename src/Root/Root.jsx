import { Outlet } from "react-router-dom";
import Navbar from "../components/Layouts/Navbar/Navbar";
import Footer from "../components/Layouts/Footer/Footer";

const Root = () => {
  return (
    <div>
      <div>
        <header>
          <Navbar></Navbar>
        </header>
        <main className="min-h-[calc(100vh-345px)] max-w-7xl mx-auto">
          <Outlet></Outlet>
        </main>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Root;
