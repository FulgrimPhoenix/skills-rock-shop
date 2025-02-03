import { useAppSelector } from "./app/store";

function App() {
  const product_list = useAppSelector((state) => state.product_list);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {product_list.map((el) => (
          <p>{JSON.stringify(el)}</p>
        ))}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
