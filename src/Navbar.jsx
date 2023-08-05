import logo from "/logo.png";

export default function Navbar() {
  return (
    <>
      <nav className='nav'>
        <img src={logo} className='nav--logo' />
        <h3 className='nav--name'>Meme Generator</h3>
      </nav>
    </>
  );
}
