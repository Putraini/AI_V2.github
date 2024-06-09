import './App.css';
import { useState, useRef } from 'react';
import { requestToGroqAI } from "./utils/groq";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

function App() {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const contentRef = useRef();

  const handleSubmit = async () => {
    const content = contentRef.current.value.trim();
    if (!content) {
      setError("Input tidak boleh kosong");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const aiResponse = await requestToGroqAI(content);
      setData(aiResponse);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-[80vh] justify-center items-center"> 
      <h1 className="text-6xl text-indigo-500">AI|Putzz</h1>
      <h4 className=" text-indigo-500">By_Putzz</h4>
      <form className="flex flex-col gap-4 py-4" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="content" className="sr-only">Input</label>
        <input
          placeholder="ketik permintaan disini..."
          className="py-2 px-4 text-md rounded-md"
          id="content"
          type="text"
          ref={contentRef}
        />
        <button
          onClick={handleSubmit}
          type="button"
          className="bg-indigo-500 py-2 px-4 font-bold text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Loading..." : "Kirim"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <div className="max-w-xl w-full mx-auto mt-4">
        {data ? (
          <SyntaxHighlighter language="swift" style={darcula} wrapLongLines={true}>
            {data}
          </SyntaxHighlighter>
        ) : null}
      </div>
    </main>
  );
}

export default App;
