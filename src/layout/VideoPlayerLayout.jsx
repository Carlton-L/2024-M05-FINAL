import { useParams } from 'react-router';
import YouTube from 'react-youtube';
import Details from '../components/Details';
import Spinner from '../components/Spinner';

const VideoPlayerLayout = () => {
  const params = useParams();

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div>
      <div>
        <YouTube videoId={params.videoId} opts={opts} />
      </div>
      <div>
        <Details />
      </div>
    </div>
  );
};

export default VideoPlayerLayout;
