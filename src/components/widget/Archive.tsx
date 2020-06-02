import React, { useContext } from "react";
import { StoreContext } from "../../store/StoreProvider";

export default function Archive() {
  const { postArchive } = useContext(StoreContext).state;
  return (
    <aside className="sidebar-widget widget_archive">
      <h3>文章归档</h3>
      <ul>
        {Object.values(postArchive).map(item => (
          <li key={item.id}>
            <a href={item.link}>{item.name}</a> ({item.count})
          </li>
        ))}
      </ul>
    </aside>
  );
}
