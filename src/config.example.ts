const dev = {
  baseURL: ''
};

const prod = {
  baseURL: '',
  fetchCategoriesCount: 100,
  fetchTagsCount: 100,
  fetchPostsCount: 10
};

export default process.env.NODE_ENV === 'development'
  ? { ...prod, ...dev }
  : prod;
