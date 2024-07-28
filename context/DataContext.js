import { createContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <DataContext.Provider value={{ fetchedData, setFetchedData, selectedItems, setSelectedItems }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;