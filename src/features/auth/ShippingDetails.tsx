import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCheckout } from "../checkout/checkoutSlice";

const ShippingDetails = () => {
  const { aUserTransactions } = useAppSelector(selectCheckout);
  if(aUserTransactions){
    console.log("aUserTransactions  " , aUserTransactions)
  }

  return (
    <>
      {aUserTransactions && !aUserTransactions.length ? (
        <div className="text-sm px-4 text-semibold whitespace-normal break-words font-poppins">No transaction record available</div>
      ) : (
        <div>
          <div className="orders" style={{ borderBottom: "2px gray solid" }}>
            {/* <h3>Shipping Details</h3> */}
            <h3 className="flex text-sm py-2 text-semibold justify-center">
              {" "}
              <strong>Product Shipping Details</strong>{" "}
            </h3>
            <div className="flex items-center my-1">
              <div className="text-sm px-4 text-semibold whitespace-normal break-words font-poppins">
                <strong>Shipping Address:</strong> 
                {aUserTransactions &&
                  aUserTransactions[0].order.shippingDetails.address},
                {aUserTransactions &&
                  aUserTransactions[0].order.shippingDetails.city},
                {aUserTransactions &&
                  aUserTransactions[0].order.shippingDetails.state},
                {aUserTransactions &&
                  aUserTransactions[0].order.shippingDetails.country}
              </div>
            </div>
            <div className="flex items-center my-1">
              <div className="text-sm px-4 text-semibold whitespace-normal break-words font-poppins">

                <strong>Delivery Status:</strong>{" "}
                {aUserTransactions && aUserTransactions[0].order.status}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShippingDetails;
