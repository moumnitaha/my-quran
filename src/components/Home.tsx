import { useEffect, useState } from "react";
import { qData } from "./Page";
import { useNavigate } from "react-router";
import axios from "axios";

interface surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface surahs {
  code: number;
  status: string;
  data: surah[];
}

export default function Home() {
  const [sowar, setSowar] = useState<surah[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getSowar = async () => {
      axios
        .get("http://api.alquran.cloud/v1/surah", { signal })
        .then((resp: { data: surahs }) => {
          const { data } = resp;
          setSowar(data.data);
        })
        .catch((Error: Error) => {
          console.log("Error: ", Error);
        });
    };
    getSowar();
    return () => controller.abort();
  }, [navigate]);

  const goToSurah = async (index: number) => {
    axios
      .get(`https://api.alquran.cloud/v1/surah/${index}?offset=0&limit=1`)
      .then((resp: { data: qData }) => {
        const { data } = resp;
        navigate(`/${data.data.ayahs[0].page}`);
      })
      .catch((Error: Error) => {
        console.log("Error: ", Error);
      });
  };

  return (
    <main style={{ display: "flex", flexWrap: "wrap" }} dir="rtl">
      {sowar?.map((item: surah, index: number) => {
        return (
          <span
            key={index}
            onClick={() => goToSurah(item.number)}
            className="name"
          >
            {item.name}
          </span>
        );
      })}
    </main>
  );
}
