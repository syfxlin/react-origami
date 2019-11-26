import React, { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';

export default function Categories(props) {
  const { postCategories } = useContext(StoreContext).state;
  return (
    <aside className="sidebar-widget widget_categories">
      <h3>分类目录</h3>
      <ul>
        {Object.values(postCategories).map(item => (
          <li className="cat-item" key={item.id}>
            <a href={item.link}>{item.name}</a> ({item.count})
          </li>
        ))}
      </ul>
    </aside>
  );
}
