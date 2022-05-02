import { defineStore } from 'pinia';

// server route
var url = '';
if ( process.env.NODE_ENV === 'production' ) url = 'https://api.yaroofie.ir/';
else url = 'http://localhost/';
// end

export const useStore = defineStore( {
  id: 'store',
  state: () => ( {
  } ),
  getters: {
    web ()
    {
      return url;
    },
    api ()
    {
      return url + "api/";
    },
    name ()
    {
      return "HistoMe";
    },
    languages ()
    {
      return [
        {
          id: 'fa',
          name: 'فارسی',
          dir: 'rtl'
        },
        {
          id: 'en',
          name: 'English',
          dir: 'ltr'
        }
      ];
    },
  }
} );