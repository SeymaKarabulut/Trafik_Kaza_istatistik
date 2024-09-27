import React, { useEffect, useState } from "react";
import styles from "../style";

const Stats = ({ statistics }) => (
  <section className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
    {statistics && (
      <>
        <div className={`flex-1 flex justify-start items-center flex-row m-3`}>
          <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white">
            {statistics.totalAccidents}
          </h4>
          <p className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-gradient uppercase ml-3">
            SON 3 GÜN İÇİNDE KAYDEDİLEN KAZALAR
          </p>
        </div>

        <div className={`flex-1 flex justify-start items-center flex-row m-3`}>
          <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white">
            {statistics.totalDeathCount}
          </h4>
          <p className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-gradient uppercase ml-3">
          SON 3 GÜN İÇİNDE KAYDEDİLEN KAZALARDAKİ ÖLÜ SAYISI
          </p>
        </div>

        <div className={`flex-1 flex justify-start items-center flex-row m-3`}>
          <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white">
            {statistics.totalInjuryCount}
          </h4>
          <p className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-gradient uppercase ml-3">
          SON 3 GÜN İÇİNDE KAYDEDİLEN KAZALARDAKİ YARALI SAYISI
          </p>
        </div>
      </>
    )}
  </section>
);

const StatsContainer = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // Backend'den verileri almak için bir API çağrısı yapın
        const response = await fetch("http://localhost:5001/api/accidents/getAccidentsStatisticsLastThreeDays");
        const data = await response.json();

        // Gelen verileri state'e set edin
        setStatistics(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    // fetchStatistics fonksiyonunu çağırın
    fetchStatistics();
  }, []); // Bu etkileşim sadece bir kere gerçekleşir

  return <Stats statistics={statistics} />;
};

export default StatsContainer;
