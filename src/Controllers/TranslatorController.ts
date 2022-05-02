import { DictionaryModel } from "../Models/Dictionary";
import { UserModel } from "../Models/User";

export default class
{
  $t(key) {
    let dictionary = DictionaryModel().all;
    let res = key;
    if (dictionary && dictionary.length > 0) {
      let user = UserModel().user;
      if (user && user.lang != "en") {
        let translate = dictionary.find(
          (d) => d.lang == user.lang && d.key.toLowerCase() == key.toLowerCase()
        );
        if (translate) {
          res = translate.value;
        }
      }
    }
    return res;
  }
}
