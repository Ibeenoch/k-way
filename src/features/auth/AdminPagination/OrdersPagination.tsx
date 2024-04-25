import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useAppSelector } from "../../../app/hooks";
import { useDispatch } from "react-redux";
import { getOrderPagination } from "../../order/orderSlice";
import { selectUser } from "../authSlice";
import toast, { Toaster } from "react-hot-toast"

interface ChildComponentProp {
  totalCount: number;
}
const OrdersPagination: React.FC<ChildComponentProp> = ({ totalCount }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user') as any)
  const token = user && user.token;
  const iTemLimitPerPage = 1;
  const [page, setPage] = useState<any>(1);

  const totalItem = totalCount;

  const handlePages = (num: number) => {
    setPage(num);
    const limit = iTemLimitPerPage;
    const currentPage = num;
    const data = { limit, currentPage };
    const item = {
      token,
      data,
    };
    dispatch(getOrderPagination(item) as any).then((res: any) => {
      if(res && res.payload === undefined){
        toast.error("Poor Network Connection please try again later",
        {
         position: "top-center",
         duration: 1500,
       });
      }
    });
  };

  const handlePrevious = (num: number) => {
    console.log('num ', num)
    setPage(num);
    const limit = iTemLimitPerPage;
    const currentPage = num;
    const data = { limit, currentPage };
    const item = {
      token,
      data,
    };
    dispatch(getOrderPagination(item) as any).then((res: any) => {
      if(res && res.payload === undefined){
        toast.error("Poor Network Connection please try again later",
        {
         position: "top-center",
         duration: 1500, 
       });
      }
    });
  };
console.log('current page ', page, totalItem)

  const handleNext = (num: number) => {
    console.log('num ', num)
    setPage(num);
    const limit = iTemLimitPerPage;
    const currentPage = num;
    const data = { limit, currentPage };
    const item = {
      token,
      data,
    };
    dispatch(getOrderPagination(item) as any).then((res: any) => {
      if(res && res.payload === undefined){
        toast.error("Poor Network Connection please try again later",
        {
         position: "top-center",
         duration: 1500,
       });
      }
    });
  };
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={() => handlePrevious(page <= 1 ? 1 : page - 1)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
          {/* <ToastContainer /> */}
        </div>
        <div
          onClick={() =>
            handleNext(page >= totalItem - 1 ? totalItem : page + 1)
          }
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
          {/* <ToastContainer /> */}
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * iTemLimitPerPage + 1}
            </span>{" "}
            to <span className="font-medium">{page * iTemLimitPerPage}</span> of{" "}
            <span className="font-medium">{totalItem}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={() => handlePrevious(page <= 1 ? 1 : page - 1)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span> 
              {/* <ToastContainer /> */}
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>

            {Array.from({
              length: Math.ceil(totalItem / iTemLimitPerPage),
            }).map((el: any, index: number) => (
              <div
                onClick={(e) => handlePages(index + 1)}
                aria-current="page"
                className={
                  index + 1 === page
                    ? "z-10 bg-red-800 cursor-pointer px-2 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    : "text-gray-900 cursor-pointer px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                }
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={() =>
                handleNext(page >= totalItem - 1 ? totalItem - 1 : page + 1)
              }
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              {/* <ToastContainer /> */}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default OrdersPagination;
