import './header.css';
import image from '../../image/logo.png'


function Header() {
  return (
      <header >
       <img src={image} alt='logo'/>
      </header>

  );
}

export default Header;
