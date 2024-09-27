import { feedback } from "../constants";
import styles from "../style";
import ContactForm from "./ContactForm/ContactForm";
import Footer from "./Footer";
import Team from "./Team";
import FeedbackCard from "./Team";

const Contact = () => (
  <section id="contact" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}>
    <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

    <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
      <h2 className={styles.heading2}>
        Ekibimizi Tanıyın
      </h2>
      <div className="w-full md:mt-0 mt-6">
        <p className={`${styles.paragraph} text-left max-w-[450px]`}>
         Trafikle ilgili istatisleri ve chatcpt'nin bu istatisiklerle ilgili analizlerini görebilir.Aşağıdaki iletişim formundan bize merak ettiklerinizi sorabilirsiniz.
        </p>
      </div>
    </div>

    <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
      {feedback.map((card) => <Team key={card.id} {...card} />)}
    </div>
    <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
      <h2 className={styles.heading2}>
      İletişim Formu
      </h2>
    
      <div className="w-full md:mt-0 mt-6">
        <p className={`${styles.paragraph} text-left max-w-[450px]`}>
          İletişim formumuzdan bize öneride bulunabilir, merak ettiklerinizi sorabilirsiniz.
        </p>
      </div>
      
     
    </div>
    <div  className="w-full md:mt-0 mt-6">
      <ContactForm />
     </div>
     
   
   
   
    
  </section>
);

export default Contact;
