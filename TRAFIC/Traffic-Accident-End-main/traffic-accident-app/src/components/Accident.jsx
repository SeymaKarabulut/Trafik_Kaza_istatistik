import styles, { layout } from "../style";
import Chatcpt from "./Chatcpt/Chatcpt";
import DetailButton from "./DetailButton";
import { Link } from "react-router-dom";

const Accident = () => {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <section id="accidents" className={layout.sectionReverse}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>Yapay Zeka Yorumları</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          {/* Buraya metin veya içerik ekleyebilirsiniz */}
        </p>
        <Link to="https://chat.openai.com/" target="_blank">
          <DetailButton styles={`mt-10`} onClick={() => openInNewTab("https://chat.openai.com/")} />
        </Link>
        
      </div>
    </section>
  );
};

export default Accident;
