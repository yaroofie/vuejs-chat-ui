import { defineStore } from 'pinia';
import axios from "axios";
import { useStore } from "@stores";
import { useAlert } from "@stores/alert";
import { useRequest } from "@stores/request";
export const useAvatar = defineStore( {
  id: 'avatar',
  state: () => ( {
    id: null,
    _address: "",
    store : useStore(),
    req: useRequest(),
    alerts: useAlert(),
  } ),
  getters: {
    address ()
    {
      return this._address ? this.store.api + "user/" + this._address : "https://api.lorem.space/image/face?hash=88560";
     },
    api ()
    {
      return this.store.api + "user/avatars"
    },
    has_avatar ()
    {
      return this._address !== "" && this._address !== null;
    }
  },
  actions: {
    async update ( file )
    {
      let formData = new FormData();
      formData.append( 'avatar', file );
      let config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      this.req.send( "Uploading your avatar ..." );
      axios.defaults.withCredentials = true;
      await axios.post( this.api, formData, config ).then( r =>
      {
        this._address = r.data.address;
        this.req.sent( "Uploading your avatar ..." );
        this.alerts.add( {
          title: "Avatar Updated",
          message: "Your avatar has been updated",
          type: "success",
          timer: 10000,
        } );
      } ).catch( e =>
      {
        this.req.sent( "Uploading your avatar ..." );
        this.alerts.show_error( e );
      } );
      return this;
    },
    async del ()
    {
      this.req.send( "Deleting your avatar ..." );
      axios.defaults.withCredentials = true;
      await axios.delete( this.api ).then( r =>
      {
        this._address = null;
        this.req.sent( "Deleting your avatar ..." );
        this.alerts.add( {
          title: "Avatar Deleted",
          message: "Your avatar has been deleted successfully",
          type: "success",
          timer: 10000,
        } );
      } ).catch( e =>
      {
        this.req.sent( "Deleting your avatar ..." );
        this.alerts.show_error( e );
      } );
      return this;
    }
  }
} );