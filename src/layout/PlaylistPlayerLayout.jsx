import { useParams } from 'react-router';
import axios from 'axios';
import YouTube from 'react-youtube';
import Details from '../components/Details';
import Spinner from '../components/Spinner';
import useSWR from 'swr';
import { useState } from 'react';
import PlaylistQueue from '../components/PlaylistQueue';

async function fetcher(url) {
  const response = await axios.get(url);
  // console.log(url);
  console.log(response.data);
  return response.data;
}

const PlaylistPlayerLayout = () => {
  const params = useParams();

  const { data, error, isLoading } = useSWR(
    `https://harbour.dev.is/api/playlists/${params.playlistId}`,
    fetcher,
    { refreshInterval: 1000 }
  );

  const deleteFromPlaylist = async (e) => {
    console.log(e.target.id);
    const index = e.target.id;
    const title = data.videos[index].title;
    console.log(data);
    const url = `https://harbour.dev.is/api/playlists/${params.playlistId}`;
    console.log(url);
    const response = await axios.put(url, {
      ...data,
      videos: data.videos.toSpliced(index, 1),
    });
    alert(`Removed video: ${title} \rfrom ${data.name}`);
    return response.data;
  };

  const [currentVideo, setCurrentVideo] = useState(null);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div>
      <div>
        {isLoading && <Spinner />}
        {!isLoading && (
          <YouTube
            videoId={
              currentVideo === null ? data?.videos[0].videoId : currentVideo
            }
            onEnd={(e) => {
              // BUG: this code causes an error when it reaches the last video in the playlist but it behaves as expected despite the error so low priority
              setCurrentVideo(
                data.videos[
                  data.videos.findIndex(
                    (e) =>
                      e.videoId ===
                      (currentVideo === null
                        ? data?.videos[0].videoId
                        : currentVideo)
                  ) + 1
                ].videoId
              );
            }}
            opts={opts}
          />
        )}
      </div>
      {!isLoading && (
        <PlaylistQueue
          playlist={data.videos}
          current={data.videos.findIndex(
            (e) =>
              e.videoId ===
              (currentVideo === null ? data?.videos[0].videoId : currentVideo)
          )}
          setCurrent={setCurrentVideo}
          user={data.userId}
          remove={deleteFromPlaylist}
        />
      )}
      <div></div>
    </div>
  );
};

export default PlaylistPlayerLayout;
