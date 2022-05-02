import { UserModel } from '@m/User';

export default function ( to, from, next )
{
   const model = UserModel();
   if ( model.user && model.user.username ) next();
   else next( '/username' );
}