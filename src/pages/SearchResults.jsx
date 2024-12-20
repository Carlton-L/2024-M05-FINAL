import useSWR from 'swr';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, NavLink } from 'react-router';
import Spinner from '../components/Spinner';

const ResultItem = styled.div`
  background-color: #f5f5fd;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 0 0 10px #fff;
  max-width: 588px;
  width: 100%;
  margin: 20px;
`;

async function fetcher(url) {
  const response = await axios.get(url);
  console.log(url);
  console.log(response.data);
  return response.data;
}

const SearchResults = () => {
  let params = useParams();
  const { data, error, isLoading } = useSWR(
    `https://harbour.dev.is/api/search?q=${params.query}`,
    fetcher
  );

  return (
    <div>
      <h2>Search Results</h2>
      {isLoading && <Spinner />}
      {data?.map((item, index) => (
        <ResultItem key={index}>
          <h3>{item.title}</h3>
          <NavLink to={`/video/${item.id.videoId}`}>
            <img src={item.snippet.thumbnails.url} alt='thumbnail' />
          </NavLink>
        </ResultItem>
      ))}
      {error && <h1>Error Loading Search Results</h1>}
    </div>
  );
};

export default SearchResults;
