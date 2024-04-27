import React from "react";
import { useAppSelector } from "../../../app/hooks";
import {
  getAproduct,
  getaProductReviews,
  selectProduct,
  similarproduct,
} from "../ProductSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Loading";

interface Similar {
  loadPage: boolean;
  setLoadPage: React.Dispatch<boolean>;
}

const SimlilarProduct: React.FC<Similar> = ({ loadPage, setLoadPage }) => {
  const { similarProduct } = useAppSelector(selectProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProductDetails = (id: any) => {
    setLoadPage(true);
    window.scrollTo(0, 0);
    dispatch(getAproduct(id) as any).then((res: any) => {
      if (res && res.payload && res.payload.category) {
        const data = {
          category:
            res &&
            res.payload &&
            res.payload.category &&
            res.payload.category.name,
          brand:
            res && res.payload && res.payload.brand && res.payload.brand.name,
        };
        dispatch(similarproduct(data) as any).then((res: any) => {
          window.scrollTo(0, 0);
          if (res && res.payload && res.payload !== undefined) {
            console.log("similar product: ", res.pay);
            const getNextProductPage = () => {
              dispatch(getaProductReviews(id) as any).then((res: any) => {
                console.log("review res ", res.payload);
                setLoadPage(false);
                navigate(`/product/details/${id}`);
                window.scrollTo(0, 0);
              });
            };

            getNextProductPage();
          }
        });
      }
    });
  };
  const hexcode = "#DEB887";

  return (
    <div className="" style={{ background: hexcode }}>
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-4 gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
          {similarProduct &&
            similarProduct.map((product: any) => (
              <div key={product.id} className="group relative">
                <div
                  onClick={() => handleProductDetails(product.id)}
                  className="aspect-h-1 aspect-w-1 w-full cursor-pointer overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80"
                >
                  <img
                    src={product && product.thumbnail && product.thumbnail.url}
                    alt=""
                    onClick={() => handleProductDetails(product.id)}
                    className="h-full w-full object-cover cursor-pointer object-center lg:h-full lg:w-full"
                  />
                </div>
                <div
                  onClick={() => handleProductDetails(product.id)}
                  className="flex justify-between"
                >
                  <div>
                    <h3 className="text-sm text-gray-900">
                      <div className="flex flex-col overflow-hidden">
                        <p className="text-xs" style={{ fontSize: "10px" }}>
                          {product && product.title}
                        </p>
                        <p
                          style={{ fontSize: "12px" }}
                          className="text-sm font-medium text-gray-900"
                        >
                          <strong>${product && product.price}</strong>
                        </p>
                      </div>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SimlilarProduct;
