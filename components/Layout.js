import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
  <>
    <Header />
    <div>{children}</div>
    <Footer />
  </>
);

export default Layout;
