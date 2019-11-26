import Nav from './Nav';
import Announcement from './Announcment';
import Brand from './Brand';

const Header = () => (
  <>
    <Announcement />
    <header>
      <Brand />
      <Nav />
    </header>
  </>
);

export default Header;
