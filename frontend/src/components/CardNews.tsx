import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
interface News {
  id: number;
  titolo: string;
  body: string;
  tenantId : number;
}


export function CardNews() {
  const [ultimaNews, setUltimaNews] = useState<News | null>(null);


    const fetchNews = async () => {
      
        const response = await fetch('http://127.0.0.1:8090/api/v1/news/tenants/1');
        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.status}`);
        }
        const data: News[] = await response.json();
        if (data.length > 0) {
          setUltimaNews(data[data.length -1]); // Seleziona ultima  news (data[.lenght -1])
        }
  
    };
 useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
    <div className="container">
    <div className="row justify-content-center mt-5">
      {/* <h1 className="card-title text-capitalize fw-semibold">Ultima News</h1> */}
      {ultimaNews ? (
         <div className=" col-10  card  mx-2">
          <h2 className="card-title text-capitalize fw-semibold">{ultimaNews.titolo}</h2>
          <p className="card-text ">{ultimaNews.body}</p>
          <button className="btn  buttoncard text-primary d-flex justify-content-start my-1">
              
                    <VisibilityIcon className=" buttoncard my-1" /> Watch
                  </button>
                  </div>
     
      ) : (
        <p>Nessuna news disponibile.</p>
      )}
    </div>
         </div>
    </>
  );
}
