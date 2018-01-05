// 组合所有组件  root component

import React, { PropTypes } from "react";
import { Toast } from "antd-mobile";
import * as LoginAction from "../../actions/LoginAction";
import CommonNavBar from "../CommonNavBar/";
import * as styles from "../../assets/stylesheets/common.css";
import * as Lstyles from "./styles.css";
import CommonStyles from "../../assets/stylesheets/common.css";
const leftIcon = require("../../assets/images/login-back.png");
const RightIcon = require("../../assets/images/login-kefu.png");
const LoginLogo = require("../../assets/images/login-logo.png");
const LoginLogoText = require("../../assets/images/login-logo-text.png");
const See = require("../../assets/images/login-see.png");
const NoSee = require("../../assets/images/login-no-see.png");
import { push, goBack } from "react-router-redux";
import { dispatch } from "../../store";
import Cookies from "js-cookie";
import Loading from "../../core/decorators/Loading";
import setupWebViewJavascriptBridge from "../../core/setupWebViewJavascriptBridge";

@Loading(props => props.isFetching)
class Login extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
      name: Cookies.get("name"),
      pwd: Cookies.get("pwd"),
      errMsg: "",
      radioValue: Cookies.get("radioValue")
    };
  }
  componentWillMount() {
    LoginAction.checkAppVersion();
    window.addEventListener("resize", function() {
      if (document.activeElement.tagName == "INPUT") {
        window.setTimeout(function() {
          document.activeElement.scrollIntoViewIfNeeded();
        }, 300);
      }
    });
    // setupWebViewJavascriptBridge(function(bridge) {
    //   bridge.callHandler("openurl", { url: encodeURIComponent("http://www.baidu.com?test=a&hahah=c") }, function(
    //     response
    //   ) {
    //     console.log("JS got response", response);
    //   });
    // });
  }
  submitAction() {
    const name = this.state.name;
    const pwd = this.state.pwd;
    if (!name || !pwd) {
      this.setState({ errMsg: "账号和密码不能为空" });
      return false;
    }
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    if (this.state.name && !reg.test(this.state.name)) {
      this.setState({ errMsg: "账号只能使用字母和数字，长度在6-12个字符之间" });
      return false;
    }
    this.setState({ errMsg: "" });
    const params = {
      name: this.state.name,
      pwd: this.state.pwd
    };
    LoginAction.login(params);
  }
  render() {
    const { name, pwd, errMsg } = this.state;
    const usernames = Cookies.get("username");
    // const kflink=usernames?coustomServiceURL+'&info=userId%3D1%26name%3D'+usernames+'&s=1&enterurl='+${window.location.origin}+'/?#/index.me':coustomServiceURL+'&info=userId%3D1%26name%3D游客&s=1&enterurl='+${window.location.origin}+'/?#/login';
    const kflink = usernames
      ? `${coustomServiceURL}&info=userId%3D1%26name%3D${usernames}&s=1&enterurl=${
          window.location.origin
        }/mobile.html?login`
      : `${coustomServiceURL}&info=userId%3D1%26name%3D游客&s=1&enterurl=${
          window.location.origin
        }/mobile.html?login`;

    const showErrorMsg = () => {
      const views = [];
      const errMsgs = errMsg || this.props.errMsg;
      if (errMsgs) {
        return <div className={Lstyles.loginErr}>{errMsgs}</div>;
      }
      return <div />;
    };
    return (
      <div style={{ height: "100vh" }}>
        <CommonNavBar
          headerTitle={"用户登录"}
          rightIcon={RightIcon}
          rightAction={() => {
            Cookies.set("cc", "");
            window.location.href = kflink;
          }}
        />
        <div className={styles.bodyContent}>
          <div className={Lstyles.loginLogo}>
            <div>
              <img src={LoginLogo} className={Lstyles.logo} />
            </div>
            <div>
              <img src={LoginLogoText} className={Lstyles.text} />
            </div>
          </div>
          {/*   form content   */}
          {showErrorMsg()}
          <div className={Lstyles.loginForm}>
            <div className={styles.loginName}>
              <div className={Lstyles.loginLeftLabel}>账号</div>
              <div>
                <input
                  type="text"
                  className={styles.inputText}
                  value={name}
                  onChange={e => {
                    const value = e.target.value;
                    this.setState({ name: value });
                  }}
                  onBlur={e => {
                    const value = e.target.value;
                    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
                    if (!reg.test(value)) {
                      this.setState({
                        errMsg: "账号只能使用字母和数字，长度在6-12个字符之间"
                      });
                    } else {
                      this.setState({ errMsg: "" });
                    }
                  }}
                />
                <label className={styles.borderStyle} />
              </div>
            </div>
            <div className={styles.loginName}>
              <div className={Lstyles.loginLeftLabel}>密码</div>
              <div>
                <input
                  type={this.state.type ? "password" : "text"}
                  className={styles.inputText}
                  value={pwd}
                  onChange={e => {
                    const value = e.target.value;
                    this.setState({ pwd: value });
                  }}
                />
                <label className={styles.borderStyle} />
              </div>
              <div>
                <img
                  src={this.state.type ? NoSee : See}
                  onClick={() => {
                    const type = this.state.type;
                    this.setState({ type: !type });
                  }}
                  className={styles.passwordSee}
                />
              </div>
            </div>
          </div>
          {/*   form bottom   */}
          <div className={Lstyles.loginFormBottom}>
            <div className={Lstyles.loginFormRadio}>
              <input
                type="radio"
                checked={Boolean(this.state.radioValue)}
                //  className={styles.radioStyle}
                onClick={() => {
                  const radioValue = this.state.radioValue;
                  this.setState({ radioValue: !radioValue });
                }}
              />
              <div>&nbsp;记住密码</div>
            </div>
            <div
              onClick={() => {
                dispatch(push("verify-password"));
              }}
            >
              忘记密码？
            </div>
          </div>

          {/*   form button   */}
          <div>
            <div
              className={
                name && pwd
                  ? styles.clickLoginFormButtom
                  : styles.loginFormButtom
              }
              onClick={() => {
                if (name && pwd) {
                  this.submitAction();
                  if (this.state.radioValue) {
                    Cookies.set("pwd", this.state.pwd);
                    Cookies.set("name", this.state.name);
                    Cookies.set("radioValue", this.state.radioValue);
                  } else {
                    Cookies.set("pwd", "");
                    Cookies.set("name", "");
                    Cookies.set("radioValue", "");
                  }
                }
              }}
            >
              立 即 登 录
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
