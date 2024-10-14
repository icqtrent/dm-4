import {Carousel} from "../components/ui/carousel"
import Firstsection from "./firstsection/page"
import Navbar from "./navbar/page"
import FifthSection from "./fifthsection/page"
import Footer from "./footer/page"
import FourthSection from "./fourthsection/page"
import ThirdSection from "./thirdsection/page"
import SecondSection from "./secondsection/page"
import SecondSectionB from "./secondsectionB/page"
import Pricing from "./pricing/page"


const Home = () => {
  return (
    <>
   
      <Navbar/>
      <Firstsection id="firstsection"/>
      <Carousel   />
      <SecondSection id="secondsection"/>
      <SecondSectionB id="secondsectionB"/>
      <ThirdSection id="thirdsection"/>
      <FourthSection id="fourthsection"/>
      <FifthSection id="fifthsection"/>
      <Pricing/>
      <Footer/>
     
    </>
  )
}

export default Home
