import React, { useState, useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import Release from "@/components/release";
import DataContext from '@/context/DataContext';
import { BarChart, CartesianGrid, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";


const Analyze = () => {
  const { selectedItems } = useContext(DataContext);
  const [ getFetchedData, setGetFetchedData ] = useState([]);
  const [ listData, setListData ] = useState([]);
  
  const parseItems = selectedItems.map(item => ({
    channelId: item.id.channelId,
  }));

  console.log('parseItems: ', parseItems);
  
  const handleGet = async () => {
    try {
    const auth = process.env.NEXT_PUBLIC_YOUTUBE_KEY;
    const results = []
    for (const item of parseItems) {
      const getUrl = `https://www.googleapis.com/youtube/v3/channels?id=${item.channelId}&key=${auth}&part=snippet,contentDetails,statistics,brandingSettings`;
        const dataFetch = await fetch(getUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: auth,
          },
        });

        if (!dataFetch.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await dataFetch.json();
        if (jsonData && jsonData.items) {
          const data = jsonData.items;
          results.push(data)
        }
      }

      const dataResult = results.flat(Infinity).map((item) => ({
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnails: item.snippet.thumbnails.default.url,
          subscriberCount: item.statistics.subscriberCount,
          videoCount: item.statistics.videoCount,
          viewCount: item.statistics.viewCount,
          publishedAt: item.snippet.publishedAt,
        }))

      const ListResult = results.flat(Infinity).map((item) => ({
        title: item.snippet.title,
        subscriberTotalCount: item.statistics.subscriberCount,
        videoTotalCount: item.statistics.videoCount,
        viewTotalCount: item.statistics.viewCount,
      }))
      setGetFetchedData(dataResult);
      setListData(ListResult);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  console.log('listData: ', listData);
  const { error, isLoading, refetch } = useQuery({ queryKey: ['getData'], queryFn: handleGet, enabled: true })

  console.log('error', error);

  const handleRemoveItem = (index) => {
    setGetFetchedData(getFetchedData.filter((_, i) => i !== index));
  }

  const maxValue = Math.max(...listData.flatMap(d => [ d.videoTotalCount, d.subscriberTotalCount]));

  return (
    <div className="text-white mt-28 col-span-4 grid grid-rows-10">
      {isLoading && <div>Loading...</div>}
      <div className="row-span-8">
        <div className="flex justify-center items-center">
          <BarChart width={730} height={850} data={listData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis interval="preserveStartEnd" domain={[0, maxValue]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="videoTotalCount" fill="#8884d8" />
            <Bar dataKey="subscriberTotalCount" fill="#E98B2A" />
            <Bar dataKey="viewTotalCount" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
      <Release items={getFetchedData} onRemoveItem={handleRemoveItem} />
    </div>
  );
}

export default Analyze