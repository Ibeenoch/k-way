import axios from "axios";

const API = "http://localhost:5050/cart";

export const fetchAllUsersCart = async () => {
  try {
    const response = await JSON.parse(localStorage.getItem("cart") as any);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (data: any, toast: any) => {
  try {
    const checkItem = await JSON.parse(localStorage.getItem("cart") as any);
    if (
      checkItem === undefined ||
      checkItem === null ||
      !checkItem.length ||
      !Object.keys(checkItem).length
    ) {
      let checkItem = [];
      checkItem.push(data);
      localStorage.setItem("cart", JSON.stringify(checkItem));
      toast.success("product successfully added to cart",
      {
       position: "top-center",
       autoClose: 3000, //6 seconds
       hideProgressBar: true,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: false,
     });
    } else {
      const index = checkItem.find((item: any) => item.id === data.id);
      if (!index) {
        checkItem.push(data);
        localStorage.setItem("cart", JSON.stringify(checkItem));
        toast.success("product successfully added to cart",
        {
         position: "top-center",
         autoClose: 3000, //6 seconds
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: false,
       });
       
      } else {
        toast.error("The product already exist in the cart",
        {
         position: "top-center",
         autoClose: 3000, //6 seconds
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: false,
       });
        return;
      }
    }
    const response = await JSON.parse(localStorage.getItem("cart") as any);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateCartQty = async (id: any, data: any) => {
  try {
    const checkItem = JSON.parse(localStorage.getItem("cart") as any);
    const getIndex = checkItem.find((item: any) => item.id === id);
    checkItem[getIndex].quantity = data;
    const response = JSON.parse(localStorage.getItem("cart") as any);
    return response;
  } catch (error) {
    console.log(error);
  }
};
