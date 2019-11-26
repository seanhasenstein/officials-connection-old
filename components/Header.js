import { withRouter } from 'next/router';
import Nav from './Nav';
import Announcement from './Announcment';
import Brand from './Brand';

const Header = ({ router }) => (
  <>
    {router.pathname !== '/register' ? <Announcement /> : null}
    <header>
      <Brand />
      <Nav />
    </header>
  </>
);

export default withRouter(Header);
