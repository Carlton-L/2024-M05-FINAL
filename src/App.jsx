import { BrowserRouter, Routes, Route } from 'react-router';
import { UserContextProvider } from './context/UserContextProvider';
import MainLayout from './layout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import VideoPlayerLayout from './layout/VideoPlayerLayout';
import PlaylistPlayerLayout from './layout/PlaylistPlayerLayout';
import './App.css';

// Functional requirements:

//     DONE---Autoplay next, the next video in the queue starts playing once the current one is finished
//     DONE---Users can search for videos and add them to the playlist
//     DONE---There's a different url for each playlist that users can share
//     DONE---Remove a video from the playlist
//        NOTE---Can only remove video from playlist if you are creator of the playlist
//     DONE---Persist playlist to api and poll changes from others
//        NOTE---Can only test this with Postman

// Ideas for bonus points:

//     Karaoke, one user playing, others controlling
//     Watch together, all watch, pause, skip at the same time
//     Queue functionality, sync playback between users

// Other

//     Users can reorder the playlist
//     Use a realtime data store like Supabase
//     Import YouTube playlist
//     Add your own features
//
//     DONE---Create new playlist from video
//     DONE---Login with Github for user authentication/authorization
//        NOTE---The protected routes for React Router aren't really implemented, I realized when I was almost done that people who are not the user will still need to view a playlist without being logged in
//
//     Shuffle Playlist
//     Loop Playlist
// User, Session

// Callback URL https://cdjzuzmndmrccqykrtfu.supabase.co/auth/v1/callback

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route
              path='/video/:videoId'
              element={
                <ProtectedRoute>
                  <VideoPlayerLayout />
                </ProtectedRoute>
              }
            />
            <Route
              path='/playlist/:playlistId'
              element={<PlaylistPlayerLayout />}
            />
            <Route
              path='/search/:query'
              element={
                <ProtectedRoute>
                  <SearchResults />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
