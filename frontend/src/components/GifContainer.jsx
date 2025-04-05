import { getTrendingGifs } from "../adapters/giphyAdapters";
import { useEffect, useState } from "react";

function GifContainer() {
  const [gifs, setGifs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const doFetch = async () => {
      const [data, error] = await getTrendingGifs();
      if (error) {
        return setError(error);
      }
      setGifs(data);
    };
    doFetch();
  }, []);

  if (!gifs) {
    return (
      <div>
        <h3>Sorry, we couldn't fetch the gifs at this time.</h3>
      </div>
    );
  }

  return (
    <ul>
      {gifs.map((gif) => {
        return (
          <li key={gif.id}>
            <img src={gif.url} alt={gif.title} />
          </li>
        );
      })}
    </ul>
  );
}

export default GifContainer;
