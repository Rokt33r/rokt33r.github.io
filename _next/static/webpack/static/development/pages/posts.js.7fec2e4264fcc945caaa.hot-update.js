webpackHotUpdate("static/development/pages/posts.js",{

/***/ "./molecules/PostMeta.tsx":
/*!********************************!*\
  !*** ./molecules/PostMeta.tsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _atoms_Flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../atoms/Flex */ "./atoms/Flex.tsx");
/* harmony import */ var _atoms_Text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../atoms/Text */ "./atoms/Text.tsx");
/* harmony import */ var _atoms_Link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../atoms/Link */ "./atoms/Link.tsx");
/* harmony import */ var _mdi_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mdi/react */ "./node_modules/@mdi/react/Icon.js");
/* harmony import */ var _mdi_react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mdi_react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mdi_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mdi/js */ "./node_modules/@mdi/js/mdi.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_9__);


var _jsxFileName = "/Users/junyoung/Code/blog/molecules/PostMeta.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;








var MetaLink = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].a.withConfig({
  displayName: "PostMeta__MetaLink",
  componentId: "sc-1orgltw-0"
})(["color:inherit;&:hover{color:", ";}"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.blue;
});
/* harmony default export */ __webpack_exports__["default"] = (function (_ref2) {
  var post = _ref2.post,
      fontSize = _ref2.fontSize,
      editLink = _ref2.editLink,
      spaceProps = Object(_babel_runtime_corejs2_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref2, ["post", "fontSize", "editLink"]);

  return __jsx(_atoms_Flex__WEBPACK_IMPORTED_MODULE_4__["default"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    alignItems: "center"
  }, spaceProps, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }), __jsx(_atoms_Flex__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, __jsx(_mdi_react__WEBPACK_IMPORTED_MODULE_7___default.a, {
    path: _mdi_js__WEBPACK_IMPORTED_MODULE_8__["mdiFileTree"],
    size: "12px",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }), __jsx(_atoms_Text__WEBPACK_IMPORTED_MODULE_5__["default"], {
    ml: 1,
    mr: 2,
    fontSize: fontSize,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_9___default.a, {
    href: "/categories/[categoryName]?categoryName=".concat(post.category),
    as: "/categories/".concat(post.category),
    passHref: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, __jsx(MetaLink, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }, post.category)))), __jsx(_atoms_Flex__WEBPACK_IMPORTED_MODULE_4__["default"], {
    mr: 2,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }, post.tags.map(function (tag) {
    return __jsx(_atoms_Text__WEBPACK_IMPORTED_MODULE_5__["default"], {
      py: 0,
      mx: 1,
      fontSize: fontSize,
      key: tag,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      },
      __self: this
    }, "#", tag);
  })), editLink != null && __jsx(_atoms_Link__WEBPACK_IMPORTED_MODULE_6__["default"], {
    href: editLink,
    target: "_blank",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, "Suggest Edit"));
});

/***/ })

})
//# sourceMappingURL=posts.js.7fec2e4264fcc945caaa.hot-update.js.map