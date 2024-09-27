import styles from "./style";
import { About, Accident, CardDeal, Clients, CTA, Navbar, Stats, Home, Contact,Footer, Chatcpt, Youtube, ReasonPieChart, AccidentBarChart, AccidentLineChart, AccidentDistrictList} from "./components";
import { Routes, Route  } from "react-router-dom";
import AccidentDistrictMap from "./components/AccidentsDistrictMap/AccidentDistrictMap";


const App = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    

    <Routes>
      {/* Navbar'daki anasayfa bölümüne tıklandığında gösterilecek anasayfa */}
      <Route path="/" element={
        <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Home />
          </div>
        </div>
      } />
      <Route path="/home" element={
        <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Home /> 
            
          </div>
        </div>
      } />
    </Routes>

    <Routes>
    <Route path="/" element={
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Stats />
            <Accident /> 
            <CardDeal />
            <Contact />
            <Footer />
          
          </div>
        </div>
      } />
      <Route path="/home" element={
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Stats />
            <Accident /> 
            <CardDeal />
            <Contact />
            <Footer />
          </div>
        </div>
      } />
      <Route path="/about" element={
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Youtube/>
            <About />
          </div>
        </div>
      } />
      <Route path="/accidents" element={
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Accident /> 
            <CardDeal />
          </div>
        </div>
      } />

      <Route path="/contact" element={
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Contact />
            <Footer />
          </div>
        </div>
      } />
      <Route path="/clients" element={
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Clients />
          </div>
        </div>
      } />
      <Route path="/cta" element={
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <CTA />
          </div>
        </div>
      } />
      
    </Routes>

    <Routes>
      <Route path="/chatcpt" element={
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Chatcpt />
            
          </div>
        </div>
      } />
    </Routes>
    
    <Routes>
      <Route path="/pie" element={
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
           <AccidentDistrictMap />
           <AccidentDistrictList/>
           <ReasonPieChart />
           <AccidentBarChart/>
           <AccidentLineChart/>
           
          </div>
        </div>
      } />
    </Routes>


  </div>
);

export default App;
