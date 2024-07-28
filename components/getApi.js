import { useQuery } from '@tanstack/react-query';

const GetApi = () => {
  const auth = `AIzaSyAOfgFId8GD3rtm4Y2PDf1G8pgwo_-El_w`;
  const id = `dreamsbloomer`;
  const url = `https://www.googleapis.com/youtube/v3/channels?forHandle=${id}&key=${auth}&part=snippet,contentDetails,statistics,brandingSettings`;

  const { data, error, isLoading } = useQuery({queryKey:['getData'], queryFn: async() => {
      const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: auth,
        },
      });
      if (dataFetch.ok) {
        return dataFetch.json();
      } else {
        throw new Error('Failed to fetch data');
      }
  }})
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

}

export default GetApi