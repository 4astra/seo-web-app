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
          const date = new Date(data.updated).toISOString();

          setBookSEO({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: data.title,
            image: data.image,
            author: {
              "@type": "Person",
              name: data.author.name,
              url: data.author.url
            },
            datePublished: date,
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
        <script type="application/ld+json">{JSON.stringify(bookSEO)}</script>
      </Helmet>

      <h1>{bookStructuredData.title}</h1>
      {bookStructuredData.author ? (
        <div>
          <h3>
            by{" "}
            <a href={bookStructuredData.author.url}>
              {bookStructuredData.author.name}
            </a>{" "}
            on {bookStructuredData.datePublished}
          </h3>
        </div>
      ) : null}

      {bookStructuredData && bookStructuredData.image ? (
        <img
          src={bookStructuredData.image}
          alt={bookStructuredData.short_title}
        />
      ) : null}

      {bookStructuredData.short_desc ? (
        <div
          dangerouslySetInnerHTML={{ __html: bookStructuredData.short_desc }}
        />
      ) : null}
    </div>
  );
}

export default App;
