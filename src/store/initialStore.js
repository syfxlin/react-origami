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
  footerText: `<span class="my-face">(●'◡'●)ﾉ</span> © 2019 Otstar Cloud<br />站点已经运行了<span id="timeDate">878天</span><span id="times">21小时32分26秒</span>`,
  postPage: 1,
  postPageCount: 6,
  postList: null,
  navMenu: null,
  postTags: null,
  postCategories: null,
  postArchive: {
    1: {
      id: 1,
      name: '2019年一月',
      link: 'http://origami.test/2019/01',
      count: 1
    },
    2: {
      id: 2,
      name: '2019年一月',
      link: 'http://origami.test/2019/01',
      count: 2
    },
    3: {
      id: 3,
      name: '2019年一月',
      link: 'http://origami.test/2019/01',
      count: 3
    }
  },
  loaded: {
    first: false
  },
  fetchError: {},
  fetchPending: {}
};

export const initialActions = {
  fetchNavMenu() {
    return new Promise((resolve, reject) => {
      fetch.get('/api/nav_menu').then(
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
        .get('/api/categories', {
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
        .get('/api/tags', {
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
  fetchPostList(page = null) {
    let fetchPage = page === null ? this.state.postPage : page;
    return new Promise((resolve, reject) => {
      fetch
        .get('/api/posts', {
          params: {
            per_page: config.fetchPostListCount,
            page: fetchPage
          }
        })
        .then(
          res => {
            this.setState({
              ...this.state,
              postList: res.data
            });
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
  fetchSearch(search) {
    return new Promise((resolve, reject) => {
      fetch
        .get('/api/posts', { params: { search: search } })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  setPostPage(page) {
    this.setState({ ...this.state, postPage: page });
  }
};
