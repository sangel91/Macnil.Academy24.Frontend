import React, {  useEffect, useState } from "react";

import   {Home} from "./Home";
import "./News.css";
import VisibilityIcon from "@mui/icons-material/Visibility";


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
      // prod con api da BE Marcello
      const response = await fetch("http://localhost:8090/api/v1/news");

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
    <>
     

    <Home >
      <div>
        {newsList && newsList.length > 0 ? (
          <div className="container">
            {newsList.map((news) => (
              <div className="row justify-content-center mt-5" key={news.id}>
                <div className=" col-10  card  mx-2">
                  <div className="card-body">
                    <h5 className="card-title text-capitalize fw-semibold">
                      {news.titolo}
                    </h5>
                    <p className="card-text ">{news.body}</p>
                  </div>
                  <button className="btn  buttoncard text-primary my-1">
                    <VisibilityIcon className=" buttoncard my-1" /> Watch
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Nessuna news disponibile.</p>
        )}
      </div>
      </Home>
      </>
   
  );
};

export default News;
