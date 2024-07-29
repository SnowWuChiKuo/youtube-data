import React, { useState, useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import DataContext from '@/context/DataContext';

import Release from "../components/release";
import Search from "../components/search";
import SearchApi from "../components/searchApi";


export default function Home() {
  const [inputString, setInputString] = useState('');
  const { fetchedData, setFetchedData, selectedItems, setSelectedItems } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(5);
  const itemsPerPage = 5;

  const handleClick = () => {
    refetch();
  }

  const handleInput = (e) => {
    const { value } = e.currentTarget;
    setInputString(value);
  }
  
  const handleSearch = async ({ queryKey }) => {
    const [, inputWord] = queryKey;
    const auth = process.env.NEXT_PUBLIC_YOUTUBE_KEY;
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?&q=${inputWord}&key=${auth}&part=snippet&type=channel&order=relevance&maxResults=50`;
    const dataFetch = await fetch(searchUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: auth,
        },
      });
      if (dataFetch.ok) {
        if (dataFetch) {
          const jsonData = await dataFetch.json();
          const data = jsonData.items;
          const result = data.map((item) => ({
            id: item.id.channelId,
            channelId: item.snippet.channelId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnails: item.snippet.thumbnails.default.url,
            publishedAt: item.snippet.publishedAt,
          }))
          setFetchedData(result);
          return result;
        }
      } else {
        throw new Error('Failed to fetch data');
      }
  }

  const { error, isLoading, refetch } = useQuery({ queryKey:['getData', inputString], queryFn: handleSearch, enabled: false })

  console.log('fD: ', fetchedData);

  const handleAddItem = (item) => {
    if (!selectedItems.some(selectedItem => selectedItem.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemoveItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } 
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(fetchedData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  console.log('currentPage: ', currentPage);

  // 單頁最後一個數量
  const indexLastItem = currentPage * itemsPerPage;
  // 單頁第一個數量
  const indexFirstItem = indexLastItem - itemsPerPage;
  // 當前頁面的數量
  const currentItems = fetchedData?.slice(indexFirstItem, indexLastItem);

  return (
      <div className="col-span-4 grid grid-rows-10">
        <main className="row-span-8">
          <>
            <Search handleClick={handleClick} handleInput={handleInput} />
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
          </>
          <div className="text-white">
            <ul className="grid grid-cols-3">
              <li className="flex justify-center items-center p-5 text-xl">
                頻道圖像
              </li>
              <li className="flex justify-center items-center text-xl p-5">
                頻道名稱
              </li>
              <li className="flex justify-center items-center text-xl p-5">
                加入比對
              </li>
            </ul>
          </div>
          <SearchApi data={currentItems} onAddItem={handleAddItem} />
          {fetchedData && <div className="flex justify-center text-center ">
            <button 
              className="bg-amber-400 text-black rounded-full p-3 mr-5 hover:bg-blue-500"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              上一頁
            </button>
            <p className="bg-amber-400 text-black rounded-full p-3 mr-5">{currentPage}</p>
            <button 
              className="bg-amber-400 text-black rounded-full p-3 mr-5 hover:bg-blue-500"
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(fetchedData.length / itemsPerPage)}
              >
                下一頁
            </button>
          </div>}
        </main>
        <Release items={selectedItems} onRemoveItem={handleRemoveItem} />
      </div>
  );
}
