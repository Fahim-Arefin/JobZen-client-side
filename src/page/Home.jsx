import { Helmet } from "react-helmet";
import Banner from "../components/Banner";

function Home() {
  return (
    <div className=" grow">
      <Helmet>
        <title>JobZen | Home</title>
      </Helmet>
      <Banner />
    </div>
  );
}

export default Home;
