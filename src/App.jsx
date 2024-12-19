import { useEffect, useState } from 'react';
import { supabase } from './client';
import './App.css';

// Functional requirements:

//     Autoplay next, the next video in the queue starts playing once the current one is finished
//     Users can search for videos and add them to the playlist
//     There's a different url for each playlist that users can share
//     Remove a video from the playlist
//     Persist playlist to api and poll changes from others

// Ideas for bonus points:

//     Karaoke, one user playing, others controlling
//     Watch together, all watch, pause, skip at the same time
//     Queue functionality, sync playback between users

// Other

//     --Users can reorder the playlist
//     Use a realtime data store like Supabase
//     Import YouTube playlist
//     Add your own features
// User, Session

// Each playlist has a user
// Can be private

// Client id Ov23liFcy66IUfze6tVj

// Callback URL https://cdjzuzmndmrccqykrtfu.supabase.co/auth/v1/callback

function App() {
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState(null);
  useEffect(() => {
    checkUser();

    window.addEventListener('hashchange', () => checkUser());
  }, []);

  async function checkUser() {
    /* if a user is signed in, update local state */
    const user = await supabase.auth.getUser();
    setUser(user.data.user);
  }
  async function signInWithGithub() {
    /* authenticate with GitHub */
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    if (error) {
      setUserError(error);
    } else {
      setUserError(null);
    }
  }
  async function signOut() {
    /* sign the user out */
    await supabase.auth.signOut();
    setUser(null);
  }
  // if (user) {
  //   return (
  //     <div className='App'>
  //       <h1>Hello, {user.email}</h1>
  //       <button onClick={signOut}>Sign out</button>
  //     </div>
  //   );
  // }

  if (user === null) {
    return (
      <>
        <h1>Hello, please sign in!</h1>
        <button onClick={signInWithGithub}>Sign In</button>
      </>
    );
  }

  return (
    <>
      <button onClick={signOut}>Sign Out</button>
      <button onClick={() => console.log(user)}>Check User</button>
    </>
  );
}

export default App;
