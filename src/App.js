import "./App.css";
import { useEffect, useState } from "react";
const requestOptions = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

function App() {
  const [bookStructuredData, setBookStructuredData] = useState(null);
  useEffect(() => {
    if (!bookStructuredData) {
      fetch("https://truyenconect.com/api/story/get/101", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setBookStructuredData(data);
        });
    }
  });

  return (
    <div className="App">
      <script type="application/ld+json">
        {JSON.stringify(bookStructuredData)}
      </script>
      <header className="App-header">
        {bookStructuredData && bookStructuredData.image ? (
          <img src={bookStructuredData.image} className="App-logo" alt="logo" />
        ) : null}

        <p>
          <div
            dangerouslySetInnerHTML={{ __html: bookStructuredData.short_desc }}
          />
        </p>
      </header>
    </div>
  );
}

export default App;
