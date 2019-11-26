import React from 'react';
import AboutCardWidget from './widget/AboutCard';
import SearchWidget from './widget/Search';
import CategoriesWidget from './widget/Categories';
import TagsWidget from './widget/Tags';
import ArchiveWidget from './widget/Archive';

export default function Sidebar(props) {
  return (
    <aside className="column ori-sidebar col-4 col-md-12">
      <AboutCardWidget />
      <SearchWidget />
      <CategoriesWidget />
      <TagsWidget />
      <ArchiveWidget />
    </aside>
  );
}
