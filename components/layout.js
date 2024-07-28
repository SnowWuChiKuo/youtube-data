import Data from "../components/data";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { DataProvider } from "../context/DataContext";

export default function Layout({ children }) {
  return (
    <DataProvider>
      <div>
        <Navbar />
        <div className="grid grid-cols-5 gap-5">
          <div className="">
            <Data />
          </div>
          {children}
        </div>
        <Footer />
      </div>
    </DataProvider>
);
}
