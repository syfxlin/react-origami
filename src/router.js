import App from './App';

const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
    props: { appProps: 'appProps' },
    alias: '/app'
  }
];

export default routes;
