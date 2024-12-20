# React Web Final

    DONE---Autoplay next, the next video in the queue starts playing once the current one is finished
    DONE---Users can search for videos and add them to the playlist
    DONE---There's a different url for each playlist that users can share
    DONE---Remove a video from the playlist
       NOTE---Can only remove video from playlist if you are creator of the playlist
    DONE---Persist playlist to api and poll changes from others
       NOTE---Can only test this with Postman or a second window

Ideas for bonus points:

    DONE---Create new playlist from a video
    DONE---Login with Github for user authentication/authorization
       NOTE---The protected routes for React Router aren't really implemented, I realized when I was almost done that people who are not the user will still need to view a playlist without being logged in

## Future updates:

- Add to multiple playlists at once (checkbox)
- Fix protected routes
- Add styling
- Code refactor
  - State management (currently using Context, useState, prop drilling, params, etc. randomly)
  - Data fetching (currently using useSWR and axios and the youtube API and the fetching functionality is sometimes in a component it doesn't belong')
- NEW Re-order playlist with dragging
- NEW Shuffle and Loop function for playlist player (doesn't shuffle playlist on server)
- NEW Playlist sharing
- NEW User page with user's playlists
