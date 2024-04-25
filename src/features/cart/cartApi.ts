
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
       duration: 1500,
     });
    } else {
      const index = checkItem.find((item: any) => item.id === data.id);
      if (!index) {
        checkItem.push(data);
        localStorage.setItem("cart", JSON.stringify(checkItem));
        toast.success("product successfully added to cart",
        {
         position: "top-center",
         duration: 1500, 
       });
       
      } else {
        toast.error("The product already exist in the cart",
        {
         position: "top-center",
         duration: 1500,
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
