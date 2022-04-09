import { useStore } from "../stores/index.js";
import { useUser } from "../stores/user.js";
export function useValidation ( self, array )
{
  let res = true;
  array.forEach(element => {
    if ( self.$refs[ element ] )
    {
      self.$refs[ element ].v$.$validate();
      res = !self.$refs[ element ].v$.$invalid;
    }
  });
  return res;
}

export function useValidationReset ( self, array )
{
  array.forEach( element =>
  {
    if ( self.$refs[ element ] )
    {
      self.$refs[ element ].v$.$reset();
    }
  } );
}

export function $t(key)
{
  let dictionary = useStore().dictionary;
  let res = key;
  if ( dictionary && dictionary.length > 0 )
  {
    let lang = useUser().lang;
    if ( lang != "en" )
    {
      let translate = dictionary.find( d => d.lang == lang && d.key.toLowerCase() == key.toLowerCase() );
      if ( translate )
      {
        res = translate.value;
      }
    } 
  }
  return res;
}