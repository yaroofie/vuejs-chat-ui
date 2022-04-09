import { defineStore } from 'pinia';
import axios from "axios";
import { useStatistics } from "@stores/statistics";
import { useHistory } from "@stores/history";
import { useStore } from "@stores";
import { useRequest } from "@stores/request";
import { useAlert } from "@stores/alert";
export const useProductivity = defineStore( {
  id: 'productivity',
  state: () => ( {
    _routes: [
      'dashboard'
    ],
    open: false,
    store: useStore(),
    req: useRequest(),
    alerts: useAlert(),
    _data: [],
    obj: {
      id: null,
      history_id: null,
      standard_id: null,
      standard: null,
      score: 0,
      value: "0",
      description: null,
      created_at: "",
      updated_at: "",
    },
    updating: null,
  } ),
  getters: {
    data ()
    {
      return this._data;
    },
  },
  actions: {
    get ( date )
    {
      return new Promise( ( resolve, reject ) =>
      {
        let description = "Getting your productivity ...";
        if ( this.req.sending( description ) ) resolve();
        this.req.send( description );
        axios.defaults.withCredentials = true;
        axios.get( this.store.api + 'histome/productivity?date=' + date ).then( r =>
        {
          this.req.sent( description );
          let d = r.data.data;
          this.obj = {
            id: d.id ? d.id : null,
            user_id: d.user_id ? d.user_id : null,
            wake_time: d.wake_time ? d.wake_time : null,
            sleep_time: d.sleep_time ? d.sleep_time : null,
            description: d.description ? d.description : "",
            total_score: d.total_score ? d.total_score : 0,
            created_at: d.created_at ? d.created_at : "",
            updated_at: d.updated_at ? d.updated_at : "",
            random_quote: d.random_quote ? d.random_quote : "",
            productivities: d.productivities ? d.productivities : [],
          };
          resolve( r.data.data );
        } ).catch( e =>
        {
          this.req.sent( description );
          this.alerts.show_error( e );
          reject( e );
        } );
      } );
    },
    create ( productivity )
    {
      return new Promise( ( resolve, reject ) =>
      {
        let description = "Creating your productivity ...";
        if ( this.req.sending( description ) ) resolve();
        this.req.send( description );
        axios.defaults.withCredentials = true;
        axios.post( this.store.api + 'histome/productivity', productivity ).then( r =>
        {
          this.req.sent( description );
          let p = r.data.productivity;
          let s = r.data.score;
          this._data.push( p );
          let stats = useStatistics();
          let st = stats.data.find( x => x.id === p.history_id );
          if ( st )
          {
            stats.data.find( x => x.id === p.history_id ).total_score += s;
          }
          resolve( r.data );
        } ).catch( e =>
        {
          this.req.sent( description );
          this.alerts.show_error( e );
          reject( e );
        } );
      } );
    },
    update ( productivity )
    {
      return new Promise( ( resolve, reject ) =>
      {
        let description = "Updating your productivity ...";
        if ( this.req.sending( description ) ) resolve();
        this.req.send( description );
        axios.defaults.withCredentials = true;
        axios.put( this.store.api + 'histome/productivity/' + productivity.id, productivity ).then( r =>
        {
          this.req.sent( description );
          let newProductivity = r.data.productivity;
          let oldProductivity = this._data.find( x => x.id === productivity.id );
          this.hide_modal();
          this._data.splice( this._data.indexOf( oldProductivity ), 1, newProductivity );
          useHistory().obj.total_score -= oldProductivity.score;
          useHistory().obj.total_score += newProductivity.score;
          useStatistics().update( newProductivity,oldProductivity );
          resolve( r.data );
        } ).catch( e =>
        {
          this.req.sent( description );
          console.log( e );
          this.alerts.show_error( e );
          reject( e );
        } );
      } );
    },
    remove ( productivity )
    {
      return new Promise( ( resolve, reject ) =>
      {
        let description = "Removing your productivity ...";
        if ( this.req.sending( description ) ) resolve();
        this.req.send( description );
        axios.defaults.withCredentials = true;
        axios.delete( this.store.api + 'histome/productivity/' + productivity.id ).then( r =>
        {
          this.req.sent( description );
          useHistory().obj.total_score -= productivity.score;
          let stats = useStatistics();
          let st = stats.data.find( x => x.id === productivity.history_id );
          if ( st )
          {
            stats._data.find( x => x.id === productivity.history_id ).total_score -= productivity.score;
          }
          let index = this._data.findIndex( x => x.id === productivity.id );
          if( index > -1 ) this._data.splice( index, 1 );
          resolve( r.data );
        } ).catch( e =>
        {
          this.req.sent( description );
          this.alerts.show_error( e );
          reject( e );
        } );
      } );
    },
    show_modal ( productivity )
    {
      let link = document.getElementById( "ProductivityModal" );
      if ( link ) link.setAttribute( "class", "modal modal-open" );
      this.updating = productivity
    },
    hide_modal ()
    {
      let link = document.getElementById( "ProductivityModal" );
      if ( link ) link.setAttribute( "class", "modal" );
      this.updating = null;
    }
  }
} );
