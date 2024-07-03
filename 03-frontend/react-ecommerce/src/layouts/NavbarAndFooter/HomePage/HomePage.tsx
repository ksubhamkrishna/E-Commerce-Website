import { Carousel } from "./components/Carousel";
import { Carousel1 } from "./components/Carousel1";
import { ExploreTopProducts } from "./components/ExploreTopProducts";
import { Heros } from "./components/Heros";
import { LibraryServices } from "./components/LibraryServices";

export const HomePage = () => {
    return (
        <>
            <ExploreTopProducts />
            <Carousel />
            <Carousel1 />
            <Heros />
            <LibraryServices />
        </>

    );
}