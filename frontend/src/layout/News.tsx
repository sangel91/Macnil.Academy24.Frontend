import React, { useEffect, useState } from 'react';
import { Dashboard } from './Dashboard';

// Definiamo il tipo dei dati che ci aspettiamo (un post ha un id, un nome e un testo)
interface Post {
  id: number;
  name: string;
  text: string;
}

export function News() {
  // Stato per i post
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Carica il file JSON dalla cartella public
    fetch('/posts.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Impossibile caricare i post');
        }
        return response.json();
      })
      .then((data: Post[]) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Caricamento in corso...</p>;
  }

  if (error) {
    return <p>Errore: {error}</p>;
  }

  return (
    <>
    <Dashboard>

    <div>
        
      <h1>Neeews</h1>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.name}</h3>
            <p>{post.text}</p>
          </div>
        ))}
      </div>
    </div>
    
    </Dashboard>
    </>
  );
}
