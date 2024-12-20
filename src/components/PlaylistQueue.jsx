import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const PlaylistQueue = ({ playlist, current, setCurrent, user, remove }) => {
  const { user: currentUser } = useContext(UserContext);

  return (
    <div
      style={{ display: 'flex', background: '#000', border: '2px solid #000' }}
    >
      {playlist.map((e, i) => (
        <div
          key={i}
          style={{
            padding: '16px',
            backgroundColor: i === current ? '#fff' : '#000',
            width: '200px',
            cursor: 'pointer',
          }}
          onClick={() => setCurrent(playlist[i].videoId)}
        >
          <img src={playlist[i].thumbnailUrl} alt='thumbnail' />
          {currentUser && user === currentUser.id && (
            <button id={i} onClick={remove}>
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlaylistQueue;
