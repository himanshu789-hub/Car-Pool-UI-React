import * as React from "react";
import UserService, { User } from "../../Service/UserService";
import "./css/form.css";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import Redirection from "./Redirection";
import { arrayBufferToBase64 } from "../../utilities/util";
import profileImg from "../../../public/assests/profile.png";
import {
  NamePattern,
  PasswordPattern,
  EmailPattern
} from "../../RegularExpression/regexp";
interface IFormProps {
  history: any;
  match: any;
  IsLogIn: boolean;
  location: any;
}
interface IFormState {
  IsLogIn?: boolean;
  User?: User;
  showPassword: boolean;
  ImageSelected: string;
  ImageUploaded: any;
  ImageName: string;
  msg: string;
  isOnUpdate: boolean;
  src: any;
  confirmPassword: string;
  emailMsg: string;
  nameMsg: string;
  passwordMsg: string;
  isImageUploaded: boolean;
  imageMsg: string;
}
class Form extends React.Component<IFormProps, IFormState> {
  //    user: User;
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.state = {
      User: {
        emailId: "",
        active: true,
        name: "",
        password: "",
        imageUploadedPath: ""
      },
      showPassword: false,
      ImageSelected: "",
      IsLogIn: this.props.IsLogIn,
      ImageUploaded: null,
      ImageName: "",
      src: profileImg,
      msg: "",
      isOnUpdate: id == undefined ? false : true,
      confirmPassword: "",
      emailMsg: "",
      nameMsg: "",
      passwordMsg: "",
      isImageUploaded: false,
      imageMsg: ""
    };

    this.OnSumitClick = this.OnSumitClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.onSubmitValidate = this.onSubmitValidate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.ImageUpload = this.ImageUpload.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleDelete(event) {
    event.preventDefault();
    const { id } = this.state.User;
    UserService.Delete(id);
    this.props.history.push("/");
  }
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    debugger;
    if (id != undefined) {
      const user = UserService.GetById(id);
      axios
        .get(
          "http://localhost:5000/getProfileImage" +
            user.imageUploadedPath.toString().substr(0),
          { responseType: "arraybuffer" }
        )
        .then(response => {
          const image = arrayBufferToBase64(response.data);
          this.setState({
            src: "data:;base64," + image,
            isOnUpdate: true,
            User: { ...user },
            isImageUploaded: true,
            ImageSelected: response.data.filePath,
            ImageName: response.data.fileName,
            ImageUploaded: null
          });
        });
    } else {
      const user: User = {
        emailId: "",
        active: true,
        password: "",
        name: "",
        imageUploadedPath: ""
      };
      this.setState({
        isOnUpdate: false,
        User: { ...user },
        src: profileImg
      });
    }
  }
  togglePassword() {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }

  async ImageUpload() {
    let data = new FormData();
    data.append("file", this.state.ImageUploaded);
    debugger;
    const res = await axios.post("http://localhost:5000/upload", data, {});
      
    if (res.status != 200) {
        
    } else {
      debugger;
      this.setState(
        {
          ImageSelected: res.data.filePath,
          ImageName: res.data.fileName,
          isImageUploaded: true
        },
        () => {
            
        }
      );
        
    }
  }

  shouldComponentUpdate() {
    return true;
  }
  onFileUpload = event => {
    event.preventDefault();
    const { files } = event.target;
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = event => {
        const { result } = event.target;
        this.setState({
          src: result,
          ImageName: file.name,
          ImageUploaded: file,
          isImageUploaded: true
        });
      };
    }
  };
  handleChange(event) {
    const { name, value } = event.target;

    if (name == "name" || name == "emailId" || name == "password") {
      // this.user[name] = value;
      this.setState(state => {
        return { User: { ...state.User, [name]: value } };
      });
      //   this.setState({ User: this.user }, () => {   
    } else {
      const newKey = {};
      newKey[name] = value;
      this.setState(newKey, () =>   
    }
  }
  handleCancel() {
    let { history } = this.props;
    const { id } = this.props.match.params;
    history.push("/home/" + id + "/content");
  }
  onSubmitValidate() {
    let validateResult: boolean = true;
    const { isImageUploaded, confirmPassword, IsLogIn } = this.state;
    const { password, name, emailId } = this.state.User;

    if (password != confirmPassword) {
      this.setState({
        msg: "Your Password Do Not Match With Confirm Password"
      });
      validateResult = false;
    } else this.setState({ msg: "" });
    if (name.length == 0 || !NamePattern.test(name)) {
      this.setState({ nameMsg: "Please Enter Valid Name" });
      validateResult = false;
    } else this.setState({ nameMsg: "" });

    if (emailId.length == 0 || !EmailPattern.test(emailId)) {
      this.setState({ emailMsg: "Please Enter Valid EmailId" });
      validateResult = false;
    } else this.setState({ emailMsg: "" });
    if (password.length == 0 || !PasswordPattern.test(password)) {
      validateResult = false;
      this.setState({ passwordMsg: "Please Enter Valid Password" });
    } else this.setState({ passwordMsg: "" });

    if (!isImageUploaded) {
      this.setState({ imageMsg: "Please, Upload an image" });
      validateResult = false;
    } else this.setState({ imageMsg: "" });

    return validateResult;
  }

  async OnSumitClick(event) {
    event.preventDefault();

    if (this.props.IsLogIn) {
      const { emailId, password } = this.state.User;
      let tempUser = UserService.IsUserExists(emailId, password);
      if (tempUser != undefined) {
        this.props.history.push("/home/" + tempUser.id + "/content");
      } else {
        this.setState({ msg: "Please, Enter valid Credentials " });
      }
    } else {
      if (!this.onSubmitValidate()) return;
      const { isOnUpdate } = this.state;
      const { history } = this.props;
      debugger;
      const { User, ImageSelected, ImageUploaded } = this.state;

      let tempUser: User = {
        emailId: "",
        name: "",
        active: true,
        imageUploadedPath: "",
        password: ""
      };
      tempUser = { ...User };
      debugger;
      if (isOnUpdate) {
        debugger;
        if (ImageUploaded) {
          await this.ImageUpload();
          const { ImageSelected } = this.state;
          tempUser.imageUploadedPath = ImageSelected;
        }
        tempUser = UserService.Update(tempUser);
      } else {
        await this.ImageUpload();
        tempUser = UserService.Create(tempUser);
      }
      history.push("/home/" + tempUser.id + "/content");
    }
  }

  render() {
    const { src } = this.state;
    return (
      <div id="container">
        <div id="image"></div>
        <div id="formBar" className={this.state.IsLogIn ? "signUp" : "logIn"}>
          <form id="form" onSubmit={this.OnSumitClick}>
            <label>
              {this.state.isOnUpdate
                ? "Update Profile"
                : this.state.IsLogIn
                ? "Log In"
                : "Sign Up"}
            </label>
            <label className={"msg-display"}>{this.state.msg}</label>
            {this.state.IsLogIn ? (
              ""
            ) : (
              <div>
                <label className="form-msg">{this.state.nameMsg}</label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  className="inputText"
                  required
                  value={this.state.User.name || ""}
                  onChange={this.handleChange}
                />
                <span className="floating-label">Enter Your Name</span>
              </div>
            )}
            <div>
              <label className="form-msg">{this.state.emailMsg}</label>
              <input
                type="text"
                name="emailId"
                className="inputText"
                autoComplete={"off"}
                required
                value={this.state.User.emailId || ""}
                onChange={this.handleChange}
              />
              <span className="floating-label">Enter Your Mail-Id</span>
            </div>

            <div className="password">
              <label className="form-msg">{this.state.passwordMsg}</label>
              <input
                type={this.state.showPassword ? "text" : "password"}
                name="password"
                autoComplete="off"
                className="inputText"
                required
                value={this.state.User.password || ""}
                onChange={this.handleChange}
              />
              <span className="floating-label">Your Password</span>
            </div>
            <label id="passEye" onClick={this.togglePassword}>
              {!this.state.showPassword ? (
                <i className="fas fa-eye"></i>
              ) : (
                <i className="fas fa-eye-slash"></i>
              )}
            </label>
            {this.state.IsLogIn ? (
              " "
            ) : (
              <>
                {" "}
                <div className="password">
                  <label className="form-msg"></label>
                  <input
                    type="password"
                    name="confirmPassword"
                    autoComplete="off"
                    value={this.state.confirmPassword || ""}
                    className="inputText"
                    required
                    onChange={this.handleChange}
                  />
                  <span className="floating-label">Confirm Password</span>
                </div>
                <div className="upload">
                  <input
                    type="file"
                    onChange={this.onFileUpload}
                    id="fileChoose"
                  />

                  <label htmlFor="fileChoose" className="uploadButton">
                    Upload
                  </label>
                  <img src={src} className="image" alt="Image" />
                </div>
                <label className="form-msg form-upload-msg">
                  {this.state.imageMsg}
                </label>
              </>
            )}
            {this.state.isOnUpdate ? (
              <aside className="update-section">
                {" "}
                <button className="delete-button" onClick={this.handleDelete}>
                  Delete
                </button>
                <label className="cancel-label" onClick={this.handleCancel}>
                  <i className="fas fa-ban"></i>
                </label>
              </aside>
            ) : (
              <></>
            )}
            <input
              type="submit"
              className={this.state.IsLogIn ? "logIn" : "signUp"}
              value="Submit"
              onClick={this.OnSumitClick}
            />
          </form>
          <Redirection IsLogIn={this.state.IsLogIn} />
        </div>
      </div>
    );
  }
}

export default withRouter(Form);
