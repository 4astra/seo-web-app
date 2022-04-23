import "./App.css";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
const requestOptions = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

function App() {
  const [bookStructuredData, setBooKStructuredData] = useState({});
  const [bookSEO, setBookSEO] = useState({});

  useEffect(() => {
    fetch("https://truyenconect.com/api/story/get/101", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setBooKStructuredData(data);
        if (data) {
          setBookSEO({
            "@context": "https://schema.org/",
            "@type": "Book",
            bookFormat: "http://schema.org/EBook",
            name: data.title,
            image: data.image,
            author: {
              "@type": "Thing",
              name: data.author.name,
            },
            datePublished: data.updated,
            description: data.short_desc,
          });
        }
      });
  });

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{bookStructuredData.title}</title>
        <meta name="keyword" content={bookStructuredData.meta_keyword} />
        <meta name="description" content={bookStructuredData.meta_desc} />
      </Helmet>
      {bookSEO ? (
        <script type="application/ld+json">{JSON.stringify(bookSEO)}</script>
      ) : null}
      <header className="App-header">
        {bookStructuredData && bookStructuredData.image ? (
          <img src={bookStructuredData.image} className="App-logo" alt="logo" />
        ) : null}

        <div
          dangerouslySetInnerHTML={{ __html: bookStructuredData.short_desc }}
        />
      </header>
    </div>
  );
}

export default App;
