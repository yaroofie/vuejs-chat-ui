import { defineStore } from 'pinia';
import axios from "axios";
import { useStore } from "@stores";
import { useRequest } from "@stores/request";
import { useAlert } from "@stores/alert";
export const useStandards = defineStore( {
  id: 'standards',
  state: () => ( {
    _routes: [
      'standards-details'
    ],
    open: false,
    _data: [],
    _object: {},
    store: useStore(),
    req: useRequest(),
    alerts: useAlert(),
  } ),
  getters: {
    data ()
    {
      return this._data;
    },
    standard ()
    {
      return this._object;
    }
  },
  actions: {
    get ()
    {
      return new Promise( ( resolve, reject ) =>
      {
        let description = "Getting your standards";
        if ( this.req.sending( description ) ) resolve();
        this.req.send( description );
        axios.defaults.withCredentials = true;
        axios.get( this.store.api + "histome/standards" ).then( r =>
        {
          this.req.sent( description );
          this._data = r.data;
          resolve( r.data );
        } ).catch( e =>
        {
          this.req.sent( description );
          this.alerts.show_error( e );
          reject( e );
        } );
      } );
    },
    show (id)
    {
      return new Promise( ( resolve, reject ) =>
      {
        let description = "Getting this standard ...";
        if ( this.req.sending( description ) ) resolve();
        this.req.send( description );
        axios.defaults.withCredentials = true;
        axios.get( this.store.api + "histome/standards/" + id ).then( r =>
        {
          this.req.sent( description );
          this._object = r.data;
          resolve( r.data );
        } ).catch( e =>
        {
          this.req.sent( description );
          this.alerts.show_error( e );
          reject( e );
        } );
      } );
    },
    create ( data )
    {
      return new Promise( ( resolve, reject ) =>
      {
        let description = "Creating new standard ...";
        if ( this.req.sending( description ) ) return;
        this.req.send( description );
        axios.defaults.withCredentials = true;
        axios.post( this.store.api + "histome/standards", data ).then( r =>
        {
          this._data.push( r.data.data );
          this.req.sent( description );
          this.alerts.add( {
            type: "success",
            title: "Created Successfully",
            message: "Standard created successfully",
            timer: 10000,
          } );
          resolve( r.data );
        } ).catch( e =>
        {
          this.req.sent( description );
          this.alerts.show_error( e );
          reject( e );
        } );
      } );
    },
    update ( data )
    {
      return new Promise( ( resolve, reject ) =>
      {
        let description = "Updating this standard ...";
        if ( this.req.sending( description ) ) return;
        this.req.send( description );
        axios.defaults.withCredentials = true;
        axios.put( this.store.api + "histome/standards/" + data.id, data ).then( r =>
        {
          this._data.splice(
            this._data.indexOf( this._data.find( x => x.id == data.id ) ),
            1,
            r.data.data
          );
          if ( this._object && this._object.id === data.id )
          {
            this.show(data.id)
          }
          this.req.sent( description );
          this.alerts.add( {
            type: "success",
            title: "Updated Successfully",
            message: "Standard updated successfully",
            timer: 10000,
          } );
          resolve( r.data );
        } ).catch( e =>
        {
          this.req.sent( description );
          this.alerts.show_error( e );
          reject( e );
        } );
      } );
    },
    remove ( standard )
    {
      return new Promise( ( resolve, reject ) =>
      {
        let description = `Removing "${ standard.name }" ...`;
        if ( this.req.sending( description ) ) resolve();
        this.req.send( description );
        axios.defaults.withCredentials = true;
        axios.delete( this.store.api + "histome/standards/" + standard.id ).then( r =>
        {
          this._data = this._data.filter( s => s.id != standard.id );
          this.req.sent( description );
          resolve( r.data );
        } ).catch( e =>
        {
          this.req.sent( description );
          this.alerts.show_error( e );
          reject( e );
        } );
      } );
    }
  }
} );
