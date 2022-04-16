import { useUser } from '@stores/user.js';
export default function ( to, from, next )
{
   const userStore = useUser();
   if ( userStore.username ) next();
   else next( '/username' );
}