"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postChangePassword = exports.getChangePassword = exports.postEditProfile = exports.getEditProfile = exports.userDetail = exports.getMe = exports.postFacebookLogin = exports.facebookLoginCallback = exports.facebookLogin = exports.logout = exports.postGithubLogin = exports.githubLoginCallback = exports.getGithubLogin = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("../routes"));

var _User = _interopRequireDefault(require("../models/User"));

var getJoin = function getJoin(req, res) {
  res.render("Join", {
    pageTitle: "Join"
  });
};

exports.getJoin = getJoin;

var postJoin =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, name, email, password, password2, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;

            if (!(password !== password2)) {
              _context.next = 6;
              break;
            }

            res.status(400);
            res.render("join", {
              pageTitle: "Join"
            });
            _context.next = 20;
            break;

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return (0, _User["default"])({
              name: name,
              email: email
            });

          case 9:
            user = _context.sent;
            _context.next = 12;
            return _User["default"].register(user, password);

          case 12:
            next();
            _context.next = 20;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](6);
            console.log(_context.t0);
            res.redirect(reoutes.home);
            res.render("Join", {
              pageTitle: "Join"
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 15]]);
  }));

  return function postJoin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  res.render("Login", {
    pageTitle: "Login"
  });
};

exports.getLogin = getLogin;

var postLogin = _passport["default"].authenticate("local", {
  failureRedirect: _routes["default"].login,
  successRedirect: _routes["default"].home
});

exports.postLogin = postLogin;

var getGithubLogin = _passport["default"].authenticate("github");

exports.getGithubLogin = getGithubLogin;

var githubLoginCallback =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(_, __, profile, cb) {
    var _profile$_json, id, avatarUrl, email, name, user, newUser;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _profile$_json = profile._json, id = _profile$_json.id, avatarUrl = _profile$_json.avatar_url, email = _profile$_json.email, name = _profile$_json.name;
            _context2.prev = 1;
            _context2.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            user = _context2.sent;

            if (!user) {
              _context2.next = 9;
              break;
            }

            user.githubId = id;
            user.save();
            return _context2.abrupt("return", cb(null, user));

          case 9:
            _context2.next = 11;
            return _User["default"].create({
              email: email,
              name: name,
              githubId: id,
              avatarUrl: avatarUrl
            });

          case 11:
            newUser = _context2.sent;
            return _context2.abrupt("return", cb(null, newUser));

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", cb(_context2.t0));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 15]]);
  }));

  return function githubLoginCallback(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.githubLoginCallback = githubLoginCallback;

var postGithubLogin = function postGithubLogin(req, res) {
  res.redirect(_routes["default"].home);
};

exports.postGithubLogin = postGithubLogin;

var logout = function logout(req, res) {
  // logout
  req.logout();
  res.redirect(_routes["default"].home);
};

exports.logout = logout;

var facebookLogin = _passport["default"].authenticate("facebook");

exports.facebookLogin = facebookLogin;

var facebookLoginCallback = function facebookLoginCallback(_, __, profile, cb) {
  var _profile$_json2 = profile._json,
      id = _profile$_json2.id,
      name = _profile$_json2.name,
      mail = _profile$_json2.mail;
  console.log("TCL: facebookLoginCallback -> id, name, mail", id, name, mail);
};

exports.facebookLoginCallback = facebookLoginCallback;

var postFacebookLogin = function postFacebookLogin(req, res) {
  res.redirect(_routes["default"].home);
};

exports.postFacebookLogin = postFacebookLogin;

var getMe = function getMe(req, res) {
  console.log(req.user);
  res.render("userDetail", {
    pageTtile: "User Detail",
    user: req.user
  });
};

exports.getMe = getMe;

var userDetail =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var id, user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _User["default"].findById({
              _id: id
            }).populate("videos");

          case 4:
            user = _context3.sent;
            res.render("userDetail", {
              pageTitle: "userDetail",
              user: user
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            res.redirect(_routes["default"].home);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function userDetail(_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.userDetail = userDetail;

var getEditProfile = function getEditProfile(req, res) {
  return res.render("editProfile", {
    pageTitle: "editProfile"
  });
};

exports.getEditProfile = getEditProfile;

var postEditProfile =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, email, name, file;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, name = _req$body2.name, file = req.file;
            _context4.prev = 1;
            _context4.next = 4;
            return _User["default"].findByIdAndUpdate(req.user.id, {
              name: name,
              email: email,
              avatarUrl: file ? file.location : req.user.avatarUrl
            });

          case 4:
            res.redirect(_routes["default"].users + _routes["default"].me);
            _context4.next = 11;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            res.redirect(_routes["default"].editProfile);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 7]]);
  }));

  return function postEditProfile(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postEditProfile = postEditProfile;

var getChangePassword = function getChangePassword(req, res) {
  res.render("changePassword", {
    pageTitle: "changePassword"
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res) {
    var _req$body3, oldPassword, newPassword, newPassword2;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body3 = req.body, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword, newPassword2 = _req$body3.newPassword2;
            _context5.prev = 1;

            if (!(newPassword !== newPassword2)) {
              _context5.next = 6;
              break;
            }

            res.status(400);
            res.redirect(_routes["default"].users + _routes["default"].changePassword);
            return _context5.abrupt("return");

          case 6:
            _context5.next = 8;
            return req.user.changePassword(oldPassword, newPassword);

          case 8:
            res.redirect(_routes["default"].users + _routes["default"].me);
            _context5.next = 15;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](1);
            res.status(400);
            res.redirect(_routes["default"].users + _routes["default"].changePassword);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 11]]);
  }));

  return function postChangePassword(_x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;