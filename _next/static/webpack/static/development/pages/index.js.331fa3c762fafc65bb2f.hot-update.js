webpackHotUpdate("static/development/pages/index.js",{

/***/ "./organisms/Navigator.tsx":
/*!*********************************!*\
  !*** ./organisms/Navigator.tsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _atoms_Box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../atoms/Box */ "./atoms/Box.tsx");
/* harmony import */ var _atoms_Text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../atoms/Text */ "./atoms/Text.tsx");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _generated_posts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../generated/posts */ "./generated/posts.ts");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mdi_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mdi/react */ "./node_modules/@mdi/react/Icon.js");
/* harmony import */ var _mdi_react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mdi_react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _mdi_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mdi/js */ "./node_modules/@mdi/js/mdi.js");
/* harmony import */ var _atoms_Flex__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../atoms/Flex */ "./atoms/Flex.tsx");



var _jsxFileName = "/Users/junyoung/Code/blog/organisms/Navigator.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;










var NavContainer = Object(styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_atoms_Box__WEBPACK_IMPORTED_MODULE_4__["default"]).withConfig({
  displayName: "Navigator__NavContainer",
  componentId: "g39amz-0"
})({
  height: '100vh',
  top: 0,
  position: 'sticky'
});
var NavLinkList = Object(styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_atoms_Box__WEBPACK_IMPORTED_MODULE_4__["default"]).attrs({
  as: 'ul'
}).withConfig({
  displayName: "Navigator__NavLinkList",
  componentId: "g39amz-1"
})(["list-style:none;padding:0;margin:0;"]);
var Avartar = Object(styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_atoms_Box__WEBPACK_IMPORTED_MODULE_4__["default"]).attrs({
  as: 'img',
  src: 'https://avatars3.githubusercontent.com/u/5865853?s=40&v=4',
  width: 20,
  height: 20,
  mr: 2
}).withConfig({
  displayName: "Navigator__Avartar",
  componentId: "g39amz-2"
})([""]);

var _StyledText = Object(styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_atoms_Text__WEBPACK_IMPORTED_MODULE_5__["default"]).withConfig({
  displayName: "Navigator___StyledText",
  componentId: "g39amz-3"
})(["display:flex;align-items:center;transition:background-color ease-in-out 200ms;&:hover{background-color:rgba(0,0,0,0.1);text-decoration:none;}"]);

var NavLinkListItem = function NavLinkListItem(_ref) {
  var href = _ref.href,
      asPath = _ref.as,
      children = _ref.children,
      newTab = _ref.newTab,
      props = Object(_babel_runtime_corejs2_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["href", "as", "children", "newTab"]);

  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_6__["useRouter"])();
  var active = asPath === router.asPath;
  return __jsx(_atoms_Box__WEBPACK_IMPORTED_MODULE_4__["default"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    as: "li"
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }), __jsx(next_link__WEBPACK_IMPORTED_MODULE_8___default.a, {
    href: href,
    as: asPath,
    passHref: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, __jsx(_StyledText, {
    as: "a",
    children: children,
    color: active ? 'inherit' : '#777',
    textDecoration: "none",
    textStyle: "monospace",
    pl: 3,
    py: 1,
    backgroundColor: active ? 'rgba(0, 0, 0, 0.1)' : undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return __jsx(NavContainer, {
    width: [1, 256],
    position: ['absolute', 'sticky'],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    },
    __self: this
  }, __jsx(NavLinkList, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    },
    __self: this
  }, __jsx(NavLinkListItem, {
    href: "/",
    fontSize: "3",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    },
    __self: this
  }, __jsx(Avartar, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
    },
    __self: this
  }), "Rokt33r's Lab"), __jsx(NavLinkListItem, {
    href: "/about",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    },
    __self: this
  }, "\uD83D\uDC68\u200D\uD83D\uDE80 /about"), __jsx(NavLinkListItem, {
    href: "/posts",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88
    },
    __self: this
  }, "\uD83D\uDCDD /posts"), _generated_posts__WEBPACK_IMPORTED_MODULE_7__["default"].categories.map(function (category) {
    return __jsx(NavLinkListItem, {
      href: "/categories/[category]?category=".concat(category),
      as: "/categories/".concat(category),
      key: category,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90
      },
      __self: this
    }, __jsx(_atoms_Flex__WEBPACK_IMPORTED_MODULE_11__["default"], {
      ml: 2,
      flexDirection: "row",
      alignItems: "center",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 95
      },
      __self: this
    }, __jsx(_mdi_react__WEBPACK_IMPORTED_MODULE_9___default.a, {
      path: _mdi_js__WEBPACK_IMPORTED_MODULE_10__["mdiFileTree"],
      size: "12px",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 96
      },
      __self: this
    }), __jsx(_atoms_Text__WEBPACK_IMPORTED_MODULE_5__["default"], {
      ml: 2,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 97
      },
      __self: this
    }, category)));
  })));
});

/***/ })

})
//# sourceMappingURL=index.js.331fa3c762fafc65bb2f.hot-update.js.map