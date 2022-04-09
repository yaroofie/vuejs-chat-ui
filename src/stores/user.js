import { defineStore } from 'pinia';
import { useStore } from "@stores";
import { useAlert } from "@stores/alert";
import { useAvatar } from "@stores/avatar";
import { useAuth } from "@stores/auth";
import { useRequest } from "@stores/request";
import axios from "axios";
import router from "../router";
export const useUser = defineStore( {
  id: 'user',
  state: () => ( {
    id: null,
    username: "",
    email: "",
    timezone: "Asia/Tehran",
    locals: "fa-IR",
    lang: "en",
    dir: "ltr",
    store: useStore(),
    req: useRequest(),
    alerts: useAlert(),
    avatar: useAvatar(),
  } ),
  actions: {
    get ()
    {
      return new Promise( ( resolve, reject ) =>
      {
        let description = "Getting user information";
        if ( this.req.sending( description ) ) resolve();
        this.req.send( description );
        axios.defaults.withCredentials = true;
        axios.get( this.store.api + 'user' ).then( r =>
        {
          this.req.sent( description );
          this.update( r.data );
          resolve( r.data );
        } ).catch( error =>
        {
          this.req.sent( description );
          this.alerts.show_error( error );
          if ( error.response.status === 401 )
          {
            let auth = useAuth();
            auth.del();
            router.push( { name: "login" } );
          }
          reject( error );
        } );
      } );
    },
    update ( user )
    {
      this.id = user.id;
      this.username = user.name;
      this.email = user.email;
      this.avatar._address = user.avatar;
    },
    login ( payload )
    {
      return new Promise( ( resolve, reject ) =>
      {
        let description = "Logging in";
        this.req.send( description );
        let auth = useAuth();
        axios.defaults.withCredentials = true;
        axios
          .post( this.store.web + "login", payload, { responseType: 'json' } )
          .then( ( r ) =>
          {
            this.update( r.data.user );
            this.req.sent( description );
            auth.set( "AUTHENTICATED", "true", 2 );
            router.push( { name: "dashboard" } );
            resolve( r.data );
          } )
          .catch( ( e ) =>
          {
            this.req.sent( description );
            if ( e.response.status === 401 )
            {
              auth.set( 'AUTHENTICATED', "true", 2 );
              router.push( { name: "dashboard" } );
              resolve(e.response.data)
            }
            else
            {
              this.alerts.show_error( e );
              reject( e );
            }
          } );
      } );
    },
    register ( payload )
    {
      return new Promise( ( resolve, reject ) =>
      {
        let description = "Registering";
        this.req.send( description );
        axios.defaults.withCredentials = true;
        axios
          .post( this.store.web + "register", payload )
          .then( ( r ) =>
          {
            this.update( r.data.user );
            let auth = useAuth();
            this.req.sent( description );
            auth.set( "AUTHENTICATED", "true", 2 );
            router.push( { name: "dashboard" } );
            resolve( r.data );
          } )
          .catch( ( e ) =>
          {
            this.alerts.show_error( e );
            this.req.sent( description );
            reject( e );
          } );
      } );
    },
    logout ()
    {
      return new Promise( ( resolve, reject ) =>
      {
        let description = "Logging out";
        this.req.send( description );
        axios.defaults.withCredentials = true;
        axios.post( this.store.web + 'logout' ).then( r =>
        {
          this.req.sent( description );
          let auth = useAuth();
          auth.del();
          router.push( { name: "login" } );
          resolve( r.data );
        } ).catch( error =>
        {
          this.req.sent( description );
          this.alerts.show_error( error );
          reject( error );
        } );
      } );
    },
    password ( payload )
    {
      return new Promise( ( resolve, reject ) =>
      {
        let description = "Updating your password";
        if ( this.req.sending( description ) ) resolve();
        this.req.send( description );
        axios.defaults.withCredentials = true;
        axios.put( this.store.web + 'user/password', payload ).then( r =>
        {
          this.req.sent( description );
          this.alerts.show_response( r );
          resolve( r.data );
        } ).catch( error =>
        {
          this.req.sent( description );
          this.alerts.show_error( error );
          if ( error.response.status === 401 )
          {
            let auth = useAuth();
            auth.del();
            router.push( { name: "login" } );
          }
          reject( error );
        } );
      } );
    },
    forgot ()
    {
      this.alerts.add( {
        type: "info",
        title: "Reset password",
        message: "Reset link sent to your email",
        timer: 10000,
      } );
      router.push( "/" );
    },
  }
} );