import React, { useContext } from "react";
import PostList from "./PostList";
import PostContainer from "./PostContainer";
import Hero3 from "./Hero3";
import Sidebar from "./Sidebar";
import { StoreContext } from "../store/StoreProvider";

export default function Main() {
  const { heroType, loaded, pageType } = useContext(StoreContext).state;
  return (
    <div id="main-content">
      {pageType === "home" && heroType === 3 && <Hero3 />}
      <main className="ori-container columns grid-md">
        {loaded.first ? (
          <>
            {pageType === "home" && <PostList />}
            {pageType === "post" && <PostContainer />}
          </>
        ) : (
          <div className="loading"></div>
        )}
        {loaded.first ? <Sidebar /> : <div className="loading"></div>}
      </main>
    </div>
  );
}
