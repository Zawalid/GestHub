export  function Heading({ children }) {
  return <h1 className="text-2xl font-bold text-text-primary">
    <span className="text-primary">#</span>
    {children}</h1>;
}
