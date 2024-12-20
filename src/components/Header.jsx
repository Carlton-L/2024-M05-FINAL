import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import Search from '../components/Search';

const StyledHeader = styled.header`
  width: 100%;
  height: 100px;
  padding: 0 32px;
  background-color: #3498db;
  text-align: center;
  position: relative;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => {
  useEffect(() => {
    checkUser();
  });
  const { user, signIn, signOut, checkUser } = useContext(UserContext);

  return (
    <StyledHeader>
      {/* If there is a user, show sign out button and search bar */}
      {user !== null && (
        <>
          <button onClick={signOut}>Sign Out</button>
          <Search />
        </>
      )}
      {/* If there is NOT a user, show sign in button */}
      {user === null && (
        <>
          <button onClick={signIn}>Sign In</button>
        </>
      )}
    </StyledHeader>
  );
};

export default Header;
