import { useState } from 'react';
import Data from "../components/data";
import Navbar from "../components/navbar";
import { DataProvider } from "../context/DataContext";

export default function Layout({ children }) {
  const [isDataVisible, setIsDataVisible] = useState(false);

  const toggleDataVisibility = () => {
    setIsDataVisible(!isDataVisible);
  };

  return (
    <DataProvider>
      <div className='md:h-full md:w-auto'>
        <Navbar />
        <div className="grid grid-cols-5">
          <div className="col-span-4 md:col-span-1">
            <button 
              className="md:hidden p-2 bg-gray-700 text-white rounded"
              onClick={toggleDataVisibility}
            >
              {isDataVisible ? 'Hide List' : '>'}
            </button>
            <div className={`mt-2 ${isDataVisible ? 'block' : 'hidden'} md:block`}>
              <Data />
            </div>
          </div>
          <div className="col-span-4 md:col-span-4">
            {children}
          </div>
        </div>
      </div>
    </DataProvider>
  );
}