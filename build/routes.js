"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//global
var HOME = "/";
var JOIN = "/join";
var LOGIN = "/login";
var LOGOUT = "/logout";
var SEARCH = "/search"; //user

var USERS = "/users";
var USER_DETAIL = "/:id";
var EDIT_PROFILE = "/edit-profile";
var CHANGE_PASSWORD = "/change-password";
var ME = "/me"; //video

var VIDOES = "/videos";
var UPLOAD = "/upload";
var VIDEO_DETAIL = "/:id";
var EDIT_VIDEO = "/:id/edit";
var DELETE_VIDEO = "/:id/delete"; // Social login

var GITHUB = "/auth/github";
var GITHUB_CALLBACK = "/auth/github/callback";
var FB = "/auth/facebook";
var FB_CALLBACK = "/auth/facebook/callback"; // API

var API = "/api";
var REGISTER_VIEW = "/:id/view";
var ADD_COMMENT = "/:id/comment";
var routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: function userDetail(id) {
    return id ? "/users/".concat(id) : USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDOES,
  upload: UPLOAD,
  videoDetail: function videoDetail(id) {
    return id ? "/videos/".concat(id) : VIDEO_DETAIL;
  },
  editVideo: function editVideo(id) {
    return id ? "/videos/".concat(id, "/edit") : EDIT_VIDEO;
  },
  deleteVideo: function deleteVideo(id) {
    return id ? "/videos/".concat(id, "/delete") : DELETE_VIDEO;
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  me: ME,
  facebook: FB,
  facebookCallback: FB_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  addCommnet: ADD_COMMENT
};
var _default = routes;
exports["default"] = _default;