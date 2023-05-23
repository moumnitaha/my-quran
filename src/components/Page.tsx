import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiHomeAlt2 } from "react-icons/bi";

interface ayah {
  audio: string;
  audioSecondary: string[];
  hizbQuarter: number;
  juz: number;
  manzil: 7;
  number: number;
  numberInSurah: number;
  page: number;
  ruku: number;
  sajda: boolean;
  text: string;
  surah: {
    englishName: string;
    englishNameTranslation: string;
    name: string;
    numberOfAyahs: number;
    revelationType: string;
    number: number;
  };
}

export interface qData {
  code: number;
  data: {
    ayahs: ayah[];
    number: number;
  };
  status: string;
}

export default function Page() {
  const [quran, setQuran] = useState<qData>();
  const { page } = useParams();

  useEffect(() => {
    const getQuran = async (signal: AbortSignal) => {
      if (page == "false") return;
      axios
        .get("https://api.alquran.cloud/v1/page/" + page + "/quran-uthmani", {
          signal: signal,
        })
        .then((resp: { data: qData }) => {
          const { data } = resp;
          setQuran(data);
        })
        .catch((Error: Error) => {
          console.log("Error: ", Error);
        });
    };
    const controller = new AbortController();
    const signal = controller.signal;
    getQuran(signal);
    return () => controller.abort();
  }, [page]);

  return (
    <div>
      <div className="name">{quran?.data.ayahs[0].surah.name}</div>
      <div dir="rtl">
        {quran?.data.ayahs.map((item: ayah, index: number) => {
          return (
            <span key={index}>
              {index > 0 &&
                item.surah.name !== quran.data.ayahs[index - 1].surah.name && (
                  <div className="name">{item.surah.name}</div>
                )}
              {item.text}
              <span className="num">{item.numberInSurah}</span>
            </span>
          );
        })}
      </div>
      {quran && (
        <footer>
          <div className="prv-next">
            <NavLink to={`/${page && +page + 1}`}>
              <button disabled={page && +page == 604 ? true : false}>
                <FaChevronLeft />
              </button>
            </NavLink>
            <NavLink to={`/${page && +page - 1}`}>
              <button disabled={page && +page == 1 ? true : false}>
                <FaChevronRight />
              </button>
            </NavLink>
          </div>
          <NavLink to={"/"}>
            <button>
              <BiHomeAlt2 />
            </button>
          </NavLink>
        </footer>
      )}
    </div>
  );
}
