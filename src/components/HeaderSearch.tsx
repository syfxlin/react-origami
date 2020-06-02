import React, { useRef, useContext, useState } from "react";
import "./HeaderSearch.scss";
import { CSSTransition } from "react-transition-group";
import { StoreContext } from "../store/StoreProvider";
import PostListItem from "./PostListItem";

interface Props {
  show: boolean;
  setHide: () => void;
}

export default function HeaderSearch(props: Props) {
  const { show, setHide } = props;
  const { fetchSearch } = useContext(StoreContext).actions;
  const sInput = useRef<HTMLInputElement>(null);
  const [searchList, setSearchList] = useState<Array<JSX.Element>>([]);
  const [timer, setTimer] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const realTimeSearch = () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        setSearchList([]);
        if (!sInput.current || sInput.current.value === "") {
          return;
        }
        setLoading(true);
        fetchSearch(sInput.current.value).then(data => {
          setLoading(false);
          setSearchList(
            Object.values(data).map(item => (
              <PostListItem item={item} key={item.id} />
            ))
          );
        });
      }, 300)
    );
  };
  return (
    <CSSTransition
      timeout={500}
      classNames="fade"
      in={show}
      onEnter={() => {
        sInput.current?.focus();
      }}>
      <section className="ori-search">
        <div className="ori-container navbar">
          <section className="navbar-section">
            <div>
              <i className="fa fa-search"></i>
            </div>
          </section>
          <section className="navbar-center">
            <div className="has-icon-right">
              <input
                id="ori-search-input"
                className="form-input"
                type="text"
                placeholder="快来寻找你要的文章ヾ(≧▽≦*)o..."
                ref={sInput}
                onChange={() => realTimeSearch()}
              />
              {loading && <i className="form-icon loading"></i>}
            </div>
          </section>
          <section className="navbar-section">
            <div id="ori-search-close" onClick={() => setHide()}>
              <i className="fa fa-close"></i>
            </div>
          </section>
        </div>
        <div className="ori-search-mask grid-md">
          <section className="col-8 col-md-12 post-list" id="search-list">
            {searchList}
          </section>
        </div>
      </section>
    </CSSTransition>
  );
}
