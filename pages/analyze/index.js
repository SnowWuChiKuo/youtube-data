import React, { useState, useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import Release from "@/components/release";
import DataContext from '@/context/DataContext';
import PieChart from "@/components/PieChart";


const Analyze = () => {
  const { selectedItems } = useContext(DataContext);
  const [ getFetchedData, setGetFetchedData ] = useState([]);
  const [ listData, setListData ] = useState([]);
  const [visibleBars, setVisibleBars] = useState({
    videoTotalCount: true,
    subscriberTotalCount: true,
    viewTotalCount: true,
  });
  
  const parseItems = selectedItems.map(item => ({
    channelId: item.channelId,
  }));
  
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
  const { error, isLoading, refetch } = useQuery({ queryKey: ['getData'], queryFn: handleGet, enabled: true })

  console.log('error', error);

  const handleRemoveItem = (index) => {
    setGetFetchedData(getFetchedData.filter((_, i) => i !== index));
    setListData(listData.filter((_, i) => i !== index));
  }

  const handleBarVisibilityChange = (bar) => {
    setVisibleBars({
      ...visibleBars,
      [bar]: !visibleBars[bar],
    })
  }

  const subscriberData = {
    labels: listData.map(item => item.title),
    label: '訂閱總數',
    datasets: [{
      label: 'My First Dataset',
      data: listData.map(item => item.subscriberTotalCount),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
      ],
      hoverOffset: 4
    }]
  };

  const videoCountData = {
    labels: listData.map(item => item.title),
    label: '影片總量',
    datasets: [{
      label: 'My First Dataset',
      data: listData.map(item => item.videoTotalCount),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
      ],
      hoverOffset: 4
    }]
  };

  const viewCountData = {
    labels: listData.map(item => item.title),
    label: '觀看總數',
    datasets: [{
      label: 'My First Dataset',
      data: listData.map(item => item.viewTotalCount),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
      ],
      hoverOffset: 4
    }]
  };

  return (
    <div className="text-white mt-28 col-span-4 grid grid-rows-10">
      {isLoading && <div>Loading...</div>}
      <div className="row-span-8">
        <div className="flex justify-center items-center">
          <PieChart data={subscriberData} />
          <PieChart data={videoCountData} />
          <PieChart data={viewCountData} />
        </div>
      </div>
      <Release items={getFetchedData} onRemoveItem={handleRemoveItem} />
    </div>
  );
}

export default Analyze