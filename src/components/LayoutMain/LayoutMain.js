const LayoutMain = ({ children }) => {
    return (
      <div>
        <header>Layout One Header</header>
        <main>{children}</main>
        <footer>Layout One Footer</footer>
      </div>
    );
  };
  
  export default LayoutMain;