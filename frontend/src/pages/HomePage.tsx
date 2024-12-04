
import landingImage from "../assets/landing.png"
import appDownloadImage from "../assets/appDownload.png"
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const navigate = useNavigate();

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
      navigate({
        pathname: `/search/${searchFormValues.searchQuery}`,
      });
    };
    const handleAppDownloadClick = () => {
        window.location.href = "https://play.google.com/store/apps/details?id=com.glovo&pli=1";
    };

    return(
        <div className="flex flex-col gap-12">
            <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-white-500">
                Indulge in a delicious takeaway today
                </h1>
                <span className="text-xl">Explore a world of flavors just a click away!</span>
                <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
            </div>
            <div
                className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} className="transition duration-300 ease-in-out hover:scale-105"/>
            {/*componenta cu rol pur estetic, nefunctionala*/}
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <span className="font-bold text-3xl tracking-tighter">
                    Didn't reached us on mobile yet? Find out what you're missing!
                </span>
                <span>
                    Download our application for faster ordering and much more discounts!
                </span>
                <a href="https://play.google.com/store/apps/details?id=com.glovo&pli=1" target="_blank" rel="noopener noreferrer">
                        <img
                            src={appDownloadImage}
                            className="w-80 h-auto transition duration-300 ease-in-out hover:scale-105"
                            onClick={handleAppDownloadClick}
                            alt="Download App"
                        />
                    </a>

            </div>
            </div>
        </div>
    )
}

export default HomePage;