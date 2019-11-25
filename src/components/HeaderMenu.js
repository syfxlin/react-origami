import React from 'react';

export default function HeaderMenu(props) {
  const { menu } = props;
  return (
    <ul
      id={menu.isRoot ? 'ori-h-menu' : ''}
      className={!menu.isRoot ? 'sub-menu' : ''}
    >
      {menu.sub.map(item => (
        <li
          className={
            'menu-item ' +
            (item.sub && item.sub.length > 0 && 'menu-item-has-children')
          }
          key={item.id}
        >
          <a href={item.url} aria-current="page">
            {item.title}
            <div></div>
            <span className="sub-drop-icon icon icon-arrow-down"></span>
          </a>
          {item.sub && item.sub.length > 0 && <HeaderMenu menu={item} />}
        </li>
      ))}
    </ul>
  );
}
