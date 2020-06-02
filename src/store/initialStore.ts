import fetch from "../utils/fetch";
import config from "../config";
import { AxiosResponse } from "axios";

export interface Category {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

export interface Tag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface Archive {
  count: number;
  id: number;
  link: string;
  name: string;
}

export interface NavMenu {
  id: number;
  url: string;
  title: string;
  parent: string;
  sub?: Array<NavMenu>;
}

export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: string;
  content: string;
  excerpt: string;
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: Array<any>;
  categories: Array<number>;
  tags: Array<number>;
  prev_id: number | boolean;
  next_id: number | boolean;
  comment_count?: number;
}

export interface State {
  pageType: string;
  heroType: number;
  heroBackground: Array<string>;
  themeIndex: number;
  themeBackground: Array<{
    name: string;
    background: Array<string>;
  }>;
  footerText: string;
  postPage: number;
  postPageCount: number;
  pageList: {
    [index: number]: Array<number>;
  };
  postStore: {
    [index: number]: Post;
  };
  navMenu: {
    isRoot?: boolean;
    sub?: Array<NavMenu>;
  };
  postTags: {
    [index: number]: Tag;
  };
  postCategories: {
    [index: number]: Category;
  };
  postArchive: {
    [index: number]: Archive;
  };
  loaded: {
    [index: string]: boolean;
  };
  fetchError: object;
  fetchPending: object;
}

export const initialState: State = {
  pageType: "home",
  heroType: 3,
  heroBackground: [
    "https://blog.ixk.me/bing-api.php?size=1024x768&day=1",
    "https://blog.ixk.me/bing-api.php?size=1024x768&day=2",
    "https://blog.ixk.me/bing-api.php?size=1024x768&day=3",
    "https://blog.ixk.me/bing-api.php?size=1024x768&day=4"
  ],
  themeIndex: 0,
  themeBackground: [
    {
      name: "琉璃の空",
      background: [
        "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223.jpg",
        "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223-1.jpg",
        "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223-2.jpg",
        "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223-3.jpg",
        "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223-4.jpg",
        "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223-5.jpg",
        "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223-6.jpg",
        "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223-7.jpg",
        "https://cdn.jsdelivr.net/gh/syfxlin/pic/2020/01/20200117213223-8.jpg"
      ]
    }
  ],
  footerText: `<span class="my-face">(●'◡'●)ﾉ</span> © 2019 Otstar Cloud<br />站点已经运行了<span id="timeDate">878天</span><span id="times">21小时32分26秒</span>`,
  postPage: 1,
  postPageCount: 1,
  pageList: {},
  postStore: {},
  navMenu: {},
  postTags: {},
  postCategories: {},
  postArchive: {
    1: {
      id: 1,
      name: "2019年一月",
      link: "http://origami.ixk.me/2019/01",
      count: 1
    },
    2: {
      id: 2,
      name: "2019年一月",
      link: "http://origami.ixk.me/2019/01",
      count: 2
    },
    3: {
      id: 3,
      name: "2019年一月",
      link: "http://origami.ixk.me/2019/01",
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
  fetchNavMenu(this: any): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      fetch.get("/api/nav_menu").then(
        res => {
          this.setState({
            ...this.state,
            navMenu: {
              isRoot: true,
              sub: res.data.data
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
  fetchPostCategories(this: any) {
    return new Promise((resolve, reject) => {
      fetch
        .get("/api/categories", {
          params: { per_page: config.fetchCategoriesCount }
        })
        .then(
          res => {
            let cats: {
              [index: number]: Category;
            } = {};
            for (const cat of res.data.data) {
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
  fetchPostTags(this: any) {
    return new Promise((resolve, reject) => {
      fetch
        .get("/api/tags", {
          params: { per_page: config.fetchTagsCount }
        })
        .then(
          res => {
            let tags: {
              [index: number]: Tag;
            } = {};
            for (const tag of res.data.data) {
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
  fetchPosts(this: any, page: number | string | null = null) {
    let fetchPage = page === null ? this.state.postPage : page;
    return new Promise((resolve, reject) => {
      fetch
        .get("/api/posts", {
          params: {
            per_page: config.fetchPostsCount,
            page: fetchPage
          }
        })
        .then(
          res => {
            let posts: {
              [index: number]: Post;
            } = {};
            let postIds = [];
            for (const post of res.data.data) {
              posts[post.id] = post;
              postIds.push(post.id);
            }
            this.setState({
              ...this.state,
              pageList: { ...this.state.pageList, [fetchPage]: postIds },
              postPageCount: res.data.pages,
              postStore: { ...this.state.postStore, ...posts }
            });
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  },
  setLoaded(this: any, loadedName: string) {
    this.setState({
      ...this.state,
      loaded: { ...this.state.loaded, [loadedName]: true }
    });
  },
  setPageType(this: any, type: string) {
    this.setState({
      ...this.state,
      pageType: type
    });
  },
  fetchSearch(this: any, search: string): Promise<{ [index: number]: Post }> {
    return new Promise((resolve, reject) => {
      fetch
        .get("/api/posts", { params: { search: search } })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  setPostPage(this: any, page: number) {
    this.setState({ ...this.state, postPage: page });
  },
  getPost(this: any, postId: number | string): Promise<Post> {
    return new Promise((resolve, reject) => {
      let post = this.state.postStore[postId];
      if (!post) {
        fetch
          .get("/api/posts/" + postId)
          .then(res => {
            this.setState({
              ...this.state,
              postStore: { ...this.state.postStore, [postId]: res.data }
            });
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        resolve(post);
      }
    });
  }
};
