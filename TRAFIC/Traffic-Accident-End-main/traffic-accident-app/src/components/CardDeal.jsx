import React from "react";
import styles, { layout } from "../style";
import DetailButton from "./DetailButton";
import AccidentDistrictMap from "./AccidentsDistrictMap/AccidentDistrictMap";
import { Link  } from "react-router-dom";

const CardDeal = () => {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <section className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Elazığ'daki Trafik <br className="sm:block hidden" />Kazaları İstatistikleri
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Elazığ'da meydana gelen trafik kazalarının istatistiklerini inceleyin. Kazaların nedenleri, etkileri ve alınabilecek önlemler hakkında bilgi edinin.
        </p>

        <Link to="/pie" target="_blank">
          <DetailButton styles={`mt-10`} onClick={() => openInNewTab("/pie")} />
        </Link>
      </div>

      <div className="w-[50%] h-[50%]">
        <AccidentDistrictMap />
      </div>
    </section>
  );
};

export default CardDeal;
