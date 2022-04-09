import { defineStore } from 'pinia';
export const useRequest = defineStore( {
  id: 'request',
  state: () => ( {
    _sending: [],
  } ),
  getters: {
    is_sending ()
    {
      return this._sending.length > 0;
    },
  },
  actions: {
    sending ( name )
    {
      return this._sending.includes( name );
    },
    send ( name )
    {
      if ( this._sending.includes( name ) ) return;
      this._sending.push( name );
    },
    sent ( name )
    {
      if ( !this._sending.includes( name ) ) return;
      this._sending.splice( this._sending.indexOf( name ), 1 );
    },
  }
} );