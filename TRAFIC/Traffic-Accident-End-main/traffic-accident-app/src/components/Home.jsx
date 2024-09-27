import styles from "../style";
import { discount, robot } from "../assets";
import GetStarted from "./GetStarted";
import Stats from "./Stats";
import Contact from "./Contact";

const Home = () => {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-red-700 ss:leading-[100.8px] leading-[75px]">
            Trafik Kazası <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Bilgilendirme</span>{" "}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-red-700 ss:leading-[100.8px] leading-[75px] w-full">
          Merkezi
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Merkezi, şehirdeki trafik durumu, güvenlik haberleri ve trafik
          kazaları hakkında güncel bilgiler sunan bir kaynaktır. Amacımız,
          sürücülerin ve toplumun trafikle ilgili konularda bilinçlenmesine
          yardımcı olmak ve güvenli bir trafik ortamı oluşturmaktır.
        </p>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={"https://source.unsplash.com/featured/?traffic,accident"}
            alt="traffic"
            className="w-full h-full object-cover object-center relative z-[5]"
          />

          {/* gradient start */}
          <div className="absolute z-0 w-40 h-35 top-0 pink__gradient" />
          <div className="absolute z-1 w-80 h-80 rounded-full white__gradient bottom-40" />
          <div className="absolute z-0 w-50 h-50 right-20 bottom-20 blue__gradient" />
          {/* gradient end */}
        </div>
      </div>
      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Home;
