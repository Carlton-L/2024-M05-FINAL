import useSWR from 'swr';
import axios from 'axios';
import { supabase } from '../client';
import { useState } from 'react';
import { UserContext } from './UserContext';

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  async function getPlaylists() {
    /* get playlists for the user */
    const response = await axios.get(
      `https://harbour.dev.is/api/playlists?userId=${user}`
    );
    console.log(user);
    console.log(response.data);
    return response.data;
  }
  async function checkUser() {
    /* if a user is signed in, update local state */
    const user = await supabase.auth.getUser();

    setUser(user.data?.user);
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
    console.log(data);
  }
  async function signOut() {
    /* sign the user out */
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <UserContext.Provider
      value={{
        user: user,
        error: userError,
        signIn: signInWithGithub,
        signOut: signOut,
        checkUser: checkUser,
        getPlaylists: getPlaylists,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
