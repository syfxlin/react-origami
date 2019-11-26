import React, { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';

export default function Tags(props) {
  const { postTags } = useContext(StoreContext).state;
  return (
    <aside className="sidebar-widget widget_tag_cloud">
      <h3>标签</h3>
      <div className="tagcloud">
        {Object.values(postTags).map(item => (
          <a
            href={item.link}
            className="tag-cloud-link"
            aria-label={item.name + ' (' + item.count + '个项目)'}
            key={item.id}
          >
            {item.name}
            <span className="tag-link-count"> ({item.count})</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
