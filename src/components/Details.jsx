import axios from 'axios';
import styled from 'styled-components';
import useSWR from 'swr';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import Spinner from '../components/Spinner';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

async function fetcher(url) {
  const response = await axios.get(url);
  // console.log(url);
  // console.log(response.data);
  return response.data;
}
// Delete playlist (optional)
// DELETE https://harbour.dev.is/api/playlists/{playlistId}

const Details = () => {
  const { user } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);
  let params = useParams();
  const {
    data: videoData,
    error: videoError,
    isLoading: videoIsLoading,
  } = useSWR(`https://harbour.dev.is/api/videos/${params.videoId}`, fetcher);
  const {
    data: playlistsData,
    error: playlistsError,
    isLoading: playlistsIsLoading,
  } = useSWR(
    `https://harbour.dev.is/api/playlists?userId=${user.id}`,
    fetcher,
    { refreshInterval: 1000 }
  );
  const { register, handleSubmit } = useForm();

  const onCreatePlaylist = async ({ newPlaylistName: name }) => {
    setShowForm(false);
    // name, userId
    const postUrl = `https://harbour.dev.is/api/playlists`;
    await axios
      .post(postUrl, {
        name: name,
        userId: user.id,
      })
      .then((response) => {
        axios.put(`https://harbour.dev.is/api/playlists/${response.data.id}`, {
          ...response.data,
          videos: [
            {
              videoId: videoData.url.replace(
                'https://www.youtube.com/watch?v=',
                ''
              ),
              title: videoData.title,
              thumbnailUrl: videoData.thumbnailUrl,
            },
          ],
        });
      })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => console.log(error));
  };

  const onSubmit = async ({ playlist: index }) => {
    console.log(index);
    // PUT request to https://harbour.dev.is/api/playlists/{playlist_id}
    // Value will be the index of the playlist
    if (index === '') {
      alert(
        'You must select an existing playlist to add this video to, or create a new one'
      );
      return;
    } else if (index === 'new') {
      console.log(user.id);
      setShowForm(true);
      return;
    } else {
      console.log(playlistsData);
      const url = `https://harbour.dev.is/api/playlists/${playlistsData.playlists[index].id}`;
      console.log(url);
      console.log(videoData);
      const response = await axios.put(url, {
        ...playlistsData.playlists[index],
        videos: [
          ...playlistsData.playlists[index].videos,
          {
            videoId: videoData.url.replace(
              'https://www.youtube.com/watch?v=',
              ''
            ),
            title: videoData.title,
            thumbnailUrl: videoData.thumbnailUrl,
          },
        ],
      });
      alert(
        `Added video: ${videoData.title} \rto ${playlistsData.playlists[index].name}`
      );
      console.log(response.data);
      return response.data;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Add this video to a playlist:</label>
        <select
          disabled={showForm}
          {...register('playlist')}
          style={{ margin: '0 16px' }}
        >
          <option value=''>Select a Playlist</option>
          {!playlistsIsLoading &&
            playlistsData.playlists.map((e, i) => (
              <option key={i} value={i}>
                {e.name}
              </option>
            ))}
          <option value='new'>Create new Playlist</option>
        </select>
        <button disabled={showForm} type='submit'>
          Submit
        </button>
      </form>
      {showForm && (
        <form onSubmit={handleSubmit(onCreatePlaylist)}>
          <label>Playlist Name</label>
          <input {...register('newPlaylistName')} />
          <button type='submit'>Create</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}
      {videoIsLoading && <Spinner />}
      {videoData && (
        <>
          <h2>{videoData.title}</h2>
          <div>Description: {videoData.description}</div>
          <div>Duration: {videoData.duration}</div>
          <div>Genre: {videoData.genre}</div>
          <div>Author: {videoData.owner}</div>
          <div>Views {videoData.views}</div>
        </>
      )}
      {videoError && <div>Error</div>}
    </div>
  );
};

export default Details;
