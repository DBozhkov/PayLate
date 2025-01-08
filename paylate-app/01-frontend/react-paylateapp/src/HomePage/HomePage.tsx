import { Carousel } from "./components/Carousel"
import { Heros } from "./components/Heros"
import { LearnMore } from "./components/LearnMore"
import { LibraryServices } from "./components/LibraryServices"

export const HomePage = () => {
    return (
        <>
        <LearnMore/>
        {/* <Carousel/> */}
        <Heros/>
        <LibraryServices/>
        </>
    )
}