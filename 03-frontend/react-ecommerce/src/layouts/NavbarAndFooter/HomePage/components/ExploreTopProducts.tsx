import { Link } from "react-router-dom";

export const ExploreTopProducts = () => {
    return (
        <div className="p-5 mb-4 bg-dark header">
            <div className="container-fluid py-5 text-white 
            d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="dsiplay-5 fw-bold">Find Your Next adventure</h1>
                    <p className="col-md-8 fs-5">Where would you like to go next?</p>
                    <Link type='button' className="btn main-color btn-lg text-white" to='/search'>
                        Explore top Products
                    </Link>
                </div>
            </div>
        </div>
    );
}