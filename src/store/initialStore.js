import fetch from '../utils/fetch';
import config from '../config';

export const initialState = {
  heroType: 3,
  heroBackground: [
    'https://blog.ixk.me/bing-api.php?size=1024x768&day=1',
    'https://blog.ixk.me/bing-api.php?size=1024x768&day=2',
    'https://blog.ixk.me/bing-api.php?size=1024x768&day=3',
    'https://blog.ixk.me/bing-api.php?size=1024x768&day=4'
  ],
  themeIndex: 0,
  themeBackground: [
    {
      name: 'Background1',
      background: [
        'https://i.loli.net/2019/04/23/5cbf1354a41b6.jpg',
        'https://i.loli.net/2019/04/23/5cbf136bdc2d3.jpg',
        'https://i.loli.net/2019/04/23/5cbf136fe0333.jpg',
        'https://i.loli.net/2019/04/23/5cbf137481842.jpg',
        'https://i.loli.net/2019/04/23/5cbf1379952b2.jpg',
        'https://i.loli.net/2019/04/23/5cbf13983c5ef.jpg',
        'https://i.loli.net/2019/04/23/5cbf139c68120.jpg',
        'https://i.loli.net/2019/04/23/5cbf13a0a95a2.jpg',
        'https://i.loli.net/2019/04/25/5cc08b39e2f20.jpg'
      ]
    }
  ],
  postPage: 1,
  postList: null,
  navMenu: null,
  postTags: null,
  postCategories: null,
  loaded: {
    first: false
  },
  fetchError: {},
  fetchPending: {},
  count: 1
};

export const initialActions = {
  fetchNavMenu() {
    return new Promise((resolve, reject) => {
      fetch.get('/wp-json/origami/v1/nav_menu').then(
        res => {
          this.setState({
            ...this.state,
            navMenu: {
              isRoot: true,
              sub: res.data
            }
          });
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  },
  fetchPostCategories() {
    return new Promise((resolve, reject) => {
      fetch
        .get('/wp-json/wp/v2/categories', {
          params: { per_page: config.fetchCategoriesCount }
        })
        .then(
          res => {
            let cats = {};
            for (const cat of res.data) {
              cats[cat.id] = cat;
            }
            this.setState({ ...this.state, postCategories: cats });
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  },
  fetchPostTags() {
    return new Promise((resolve, reject) => {
      fetch
        .get('/wp-json/wp/v2/tags', {
          params: { per_page: config.fetchTagsCount }
        })
        .then(
          res => {
            let tags = {};
            for (const tag of res.data) {
              tags[tag.id] = tag;
            }
            this.setState({ ...this.state, postTags: tags });
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  },
  fetchPostList() {
    return new Promise((resolve, reject) => {
      fetch
        .get('/wp-json/wp/v2/posts', {
          params: {
            per_page: config.fetchPostListCount,
            page: this.state.postPage
          }
        })
        .then(
          res => {
            this.setState({ ...this.state, postList: res.data });
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  },
  setLoaded(loadedName) {
    this.setState({
      ...this.state,
      loaded: { ...this.state.loaded, [loadedName]: true }
    });
  },
  addCount({ state, setState }) {
    setState({ ...state, count: state.count + 1 });
  }
};
