// import { Carousel } from "./components/Carousel"
import { HomeMain } from "./components/HomeMain"
import { LearnMore } from "./components/LearnMore"
import { LibraryServices } from "./components/LibraryServices"

export const HomePage = () => {
    return (
        <>
        <LearnMore/>
        {/* <Carousel/> */}
        <HomeMain/>
        <LibraryServices/>
        </>
    )
}