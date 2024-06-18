import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CreateCampaign from "./components/campaign/CreateCampaign";
import NavBar from "./components/nav/NavBar";
import Campaign from "./components/campaign/Campaign";
import Header from "./components/header/Header";
import AllCampaigns from "./components/campaign/AllCampaigns";
import OverView from "./components/overview/OverView";
import Settings from "./components/setting/Settings";
import Market from "./components/market/Market";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllCampaigns/>,
  },
  {
    path: "/campaign/:id",
    element: <Campaign/>,
  },
  {
    path: "/create/campaign",
    element: <CreateCampaign />,
  },
  {
    path: "/edit/campaign/:id",
    element: <CreateCampaign />,
  },
  {
    path: "/market",
    element: <Market />,
  },
  {
    path: "/setting",
    element: <Settings />,
  },
  {
    path: "/overview",
    element: <OverView />,
  },
 
 
]);

function App() {
  return (
    
      <div className="App max-h-[790px]">
         <div className='grid grid-cols-1 sm:grid-cols-9 md:grid-cols-9'>
        <div className='hidden sm:block sm:col-start-1 sm:col-end-3 md:col-start-1 md:col-end-3'>
          <NavBar />
        </div>

      <div className='sm:col-start-3 sm:col-end-9 md:col-start-3 md:col-end-10'>
        <Header />
        <RouterProvider router={router} />
      </div>
     
    </div>
        
       
      </div>
  );
}

export default App;
