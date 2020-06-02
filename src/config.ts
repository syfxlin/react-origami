const dev = {
  baseURL: "http://127.0.0.1:3001"
};

const prod = {
  baseURL: "https://blog.ixk.me",
  fetchCategoriesCount: 100,
  fetchTagsCount: 100,
  fetchPostsCount: 10
};

export default process.env.NODE_ENV === "development"
  ? { ...prod, ...dev }
  : prod;
