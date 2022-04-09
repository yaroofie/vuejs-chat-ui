import { defineStore } from 'pinia';
import axios from "axios";
import { useStore } from "@stores";
import { useRequest } from "@stores/request";
import { useAlert } from "@stores/alert";
export const useStatistics = defineStore( {
  id: 'statistics',
  state: () => ( {
    _data: [],
    store : useStore(),
    req: useRequest(),
    alerts: useAlert(),
  } ),
  getters: {
    data ()
    {
      return this._data;
    },
  },
  actions: {
    get ()
    {
      return new Promise( ( resolve, reject ) =>
      { 
        let description = "Getting statistics ...";
        if ( this.req.sending( description ) ) resolve();
        this.req.send( description );
        axios.defaults.withCredentials = true;
        axios.get( this.store.api + "histome/history" ).then( r =>
        {
          this.req.sent( description );
          this._data = r.data.data;
          resolve( r.data.data );
        } ).catch( e =>
        {
          this.req.sent( description );
          this.alerts.show_error( e );
          reject( e );
        });
      } );
    },
    update ( newProductivity, oldProductivity )
    {
      let history = this._data.find( h => h.id === oldProductivity.history_id );
      if ( history )
      {
        this.data.find( h => h.id === oldProductivity.history_id ).total_score -= oldProductivity.score;
        this.data.find( h => h.id === oldProductivity.history_id ).total_score += newProductivity.score;
      }
      else
      {
        console.log( "History not found" );
      }
    }
  }
} );
