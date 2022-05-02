import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter( {
  history: createWebHistory( import.meta.env.BASE_URL ),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@v/pages/Home.vue' ),
      meta: {
        middlewares: [
          'auth',
        ]
      }
    },
    {
      path: '/username',
      name: 'username',
      component: () => import(/* webpackChunkName: "home" */ '@v/pages/Username.vue' ),
      meta: {
        middlewares: [
          'guest',
        ]
      }
    },
  ]
} );
router.beforeEach( ( to, from, next ) =>
{
  if ( to.meta.middlewares )
  {
    to.meta.middlewares.forEach( m =>
    {
      const imp = () => import( `./middlewares/${ m }.js` );
      imp().then( mw => mw.default( to, from, next ) );
    } );
  }
  else next();
} );
export default router;
