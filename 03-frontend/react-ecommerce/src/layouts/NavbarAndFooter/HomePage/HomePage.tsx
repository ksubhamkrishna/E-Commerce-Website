import { Carousel } from "./components/Carousel";
import { Carousel1 } from "./components/Carousel1";
import { ExploreTopBooks } from "./components/ExploreTopBooks";
import { Heros } from "./components/Heros";
import { LibraryServices } from "./components/LibraryServices";

export const HomePage = () => {
    return (
        <>
            <ExploreTopBooks />
            <Carousel />
            <Carousel1 />
            <Heros />
            <LibraryServices />
        </>

    );
}