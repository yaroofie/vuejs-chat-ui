import { defineStore } from 'pinia';
import axios from "axios";
import { useStore } from "@stores";
import { useAlert } from "@stores/alert";
import { useRequest } from "@stores/request";
export const useAuth = defineStore( {
  id: 'authentication',
  state: () => ( {
    _cookies: [],
  } ),
  getters: {
    xsrf ()
    {
      return this._cookies.includes( 'XSRF-TOKEN' );
    },
    authenticated ()
    {
      return this._cookies.includes( 'AUTHENTICATED' );
    }
  },
  actions: {
    refresh ()
    {
      this._cookies = [];
      let xsrf = this.get( 'XSRF-TOKEN' );
      if ( xsrf ) this._cookies.push( 'XSRF-TOKEN' );
      let auth = this.get( 'AUTHENTICATED' );
      if ( auth ) this._cookies.push( 'AUTHENTICATED' );
    },
    get ( name )
    {
      let res = "";
      document.cookie.split( ';' ).forEach( function ( c )
      {
        if ( c && res === "" )
        {
          let cookie = c.split( '=' )[ 0 ].trim();
          let content = c.split( '=' )[ 1 ].trim();
          if ( name == cookie ) res = content;
        }
      } );
      return res;
    },
    set ( cname, cvalue, exdays )
    {
      const d = new Date();
      d.setTime( d.getTime() + ( exdays * 60 * 60 * 1000 ) );
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    del ()
    {
      document.cookie.split( ';' ).forEach( function ( c )
      {
        if ( c )
        {
          let cookie = c.split( '=' )[ 0 ].trim();
          document.cookie = cookie + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
        }
      } );
    },
    async csrf ()
    {
      axios.defaults.withCredentials = true;
      let store = useStore();
      let req = useRequest();
      req.send( "Csrf" );
      await axios.get( store.web + "sanctum/csrf-cookie" ).then( r =>
      {
        req.sent( "Csrf" );
        this._cookies.push( 'XSRF-TOKEN' );
      } ).catch( e =>
      {
        req.sent( "Csrf" );
        let a = useAlert();
        a.add( {
          title: "Server Error",
          message: "Could not get CSRF token",
          type: "warning",
          timer: 10000,
        } );
      } );
      return this;
    },
  }
} );