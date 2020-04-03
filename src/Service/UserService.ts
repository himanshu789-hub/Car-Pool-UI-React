import { SampleUsers } from "../ServiceData/data";
import value from "*.png";

export class User {
  emailId: string;
  name: string;
  password: string;
  id?: string;
  active: boolean;
  imageUploadedPath?: string;
}
var UserService = {
  Users: new Array<User>(),
  Initialize: function() {
    UserService.Users = [...SampleUsers];
  },
  Create: function(user: User): User {
    user.id = UserService.Users.length + 1 + "";
    UserService.Users.push(user);
    return {
      ...UserService.Users.filter(e => e.id == user.id)[0]
    };
  },
  Update: function(user: User): User {
    const tempUser = (UserService.Users[
      UserService.Users.findIndex(e => e.id == user.id)
    ] = user);
    return tempUser;
  },
  Delete: function(UserId: string): boolean {
    UserService.Users[
      UserService.Users.findIndex(e => e.id == UserId)
    ].active = false;
    return true;
  },
  GetAll: function(): Array<User> {
    return [...UserService.Users];
  },
  GetById: function(id: string): User {
    return {
      ...UserService.Users.filter(e => e.id.toString() == id)[0]
    };
  },
  IsUserExists(emailId: string, password: string): User {
    return UserService.Users.find(
      e => e.active && e.emailId == emailId && e.password == password
    );
  }
};
UserService.Initialize();
console.log(UserService.Users);

export default UserService;
