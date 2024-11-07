
import React, { useEffect, useState } from 'react';
import { Dashboard } from './Home';
// import { Dashboard } from './Dashboard';

// Rinomina l'interfaccia per evitare conflitti
export interface INews {
  id: number;
  titolo: string;
  body: string;
}

const News: React.FC = () => {
  const [newsList, setNewsList] = useState<INews[] | null>(null);

  useEffect(() => {
    // Funzione per recuperare le news dal backend
    const fetchNews = async () => {
      // prod
      const response = await fetch('http://localhost:8090/api/v1/news');

     // test
      //const response = await fetch('./posts.json');
      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      const data: INews[] = await response.json();
      setNewsList(data);
    };
    fetchNews();
  }, []);

  return (
    <Dashboard>
    <div>
      <h1>Elenco delle News</h1>
      {newsList && newsList.length > 0 ? (
        <ul>
          {newsList.map((news) => (
            <li key={news.id}>
              <h2>{news.titolo}</h2>
              <p>{news.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nessuna news disponibile.</p>
      )}
    </div>
    </Dashboard>
    
  );
};

export default News; // Default export del componente
