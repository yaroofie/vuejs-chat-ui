import { UserModel, User } from "../Models/User";
export default class {
  model = UserModel();
  
  login(user: typeof User) {
    return new Promise((resolve, reject) => {
      this.model.user = user;
      resolve(this.model);
    });
  }

  logout ()
  {
    return new Promise((resolve, reject) => {
      this.model.user = null;
      resolve( this.model );
    });
  }
}
