import { defineStore } from 'pinia';
import axios from "axios";
import { useStatistics } from "@stores/statistics";
import { useStore } from "@stores";
import { useRequest } from "@stores/request";
import { useAlert } from "@stores/alert";
import { useProductivity } from "@stores/productivity";
export const useHistory = defineStore( {
  id: 'history',
  state: () => ( {
    store: useStore(),
    req: useRequest(),
    alerts: useAlert(),
    productivities: useProductivity(),
    obj: {
      id: null,
      user_id: null,
      wake_time: null,
      sleep_time: null,
      description: "",
      total_score: 0,
      created_at: "",
      updated_at: "",
      random_quote: "",
    }
  } ),
  getters: {
    totalScore ()
    {
      return parseFloat( this.obj.total_score );
    },
    date ()
    {
      let d = this.obj.created_at ? this.obj.created_at : new Date();
      return new Date( d ).toLocaleDateString( 'fa-IR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      } );
    },
    random_quote ()
    {
      return this.obj.random_quote;
    }
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
          let d = r.data.data
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
          };
          this.productivities._data = d.productivities ? d.productivities : [],
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
          this.productivities._data.push( p );
          let total_score = parseFloat( this.obj.total_score ) + parseFloat( s );
          this.obj.total_score = total_score;
          let stats = useStatistics();
          let st = stats.data.find( x => x.id === this.obj.id )
          if ( st )
          {
            stats.data.find( x => x.id === this.obj.id ).total_score = total_score
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
    init (  )
    {
      return new Promise( ( resolve, reject ) =>
      {
        let description = "Starting your day ...";
        if ( this.req.sending( description ) ) resolve();
        this.req.send( description );
        axios.defaults.withCredentials = true;
        axios.post( this.store.api + 'histome/history' ).then( r =>
        {
          this.req.sent( description );
          let d = r.data.data;
          this.obj.id = d.id;
          this.obj.user_id = d.user_id;
          this.obj.wake_time = d.wake_time;
          this.obj.sleep_time = d.sleep_time;
          this.obj.description = d.description;
          this.obj.total_score = d.total_score;
          this.obj.created_at = d.created_at;
          this.obj.updated_at = d.updated_at;
          this.obj.random_quote = this.obj.random_quote;
          this.obj.productivities = [];
          useStatistics().data.push(this.obj);
          resolve( r.data );
        } ).catch( e =>
        {
          this.req.sent( description );
          this.alerts.show_error( e );
          reject( e );
        } );
      } );
    },
    finish ( payload )
    {
      return new Promise( ( resolve, reject ) =>
      {
        let description = "Finishing your day ...";
        if ( this.req.sending( description ) ) resolve();
        this.req.send( description );
        axios.defaults.withCredentials = true;
        axios.put( this.store.api + 'histome/history/' + this.obj.id, payload ).then( r =>
        {
          this.req.sent( description );
          let d = r.data;
          this.obj.id = d.id;
          this.obj.user_id = d.user_id;
          this.obj.wake_time = d.wake_time;
          this.obj.sleep_time = d.sleep_time;
          this.obj.description = d.description;
          this.obj.total_score = d.total_score;
          this.obj.created_at = d.created_at;
          this.obj.updated_at = d.updated_at;
          resolve( r.data );
        } ).catch( e =>
        {
          this.req.sent( description );
          this.alerts.show_error( e );
          reject( e );
        } );
      } );
    },
  }
} );
