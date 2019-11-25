const dev = {
  baseURL: 'http://origami.test'
};

const prod = {
  baseURL: 'https://blog.ixk.me',
  fetchCategoriesCount: 100,
  fetchTagsCount: 100,
  fetchPostListCount: 10
};

export default process.env.NODE_ENV === 'development'
  ? { ...prod, ...dev }
  : prod;
