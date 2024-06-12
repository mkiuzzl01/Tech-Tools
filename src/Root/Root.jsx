import { Outlet } from "react-router-dom";
import Navbar from "../components/Layouts/Navbar/Navbar";
import Footer from "../components/Layouts/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
  return (
    <div>
      <div className="max-w-screen-xl m-auto">
        <header className="sticky top-0 z-10">
          <Navbar></Navbar>
        </header>
        <main className="min-h-[calc(100vh-288px)] px-2">
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
