import { defineStore } from 'pinia';
export const useAlert = defineStore( {
  id: 'alerts',
  state: () => ( {
    _alerts: [],
  } ),
  getters: {
    has_alerts ()
    {
      return this._alerts.length > 0;
    },
    alerts ()
    {
      return this._alerts;
    }
  },
  actions: {
    get ()
    {
      return this.has_alerts ? this._alerts[0] : null;
    },
    add ( alert )
    {
      this._alerts.push( alert );
    },
    remove ( alert )
    {
      this._alerts.splice( this._alerts.indexOf( alert ), 1 );
    },
    show_response ( response )
    {
      let status_code = response.status;
      this.add( {
        title: status_code + " Successfully Done",
        message:
          "This request was successful.",
        type: "success",
        timer: 10000,
      } );
    },
    show_error ( error )
    {
      let status_code = error.response.status;
      let message = error.response.data.message;
      this.add( {
        title: status_code + " Server Error",
        message:message ? message : "Something happened on our side and we couldn't process your request. Please try again later.",
        type: "warning",
        timer: 10000,
      } );
    }
  }
} );