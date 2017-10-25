"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fetch) {
  return function (url, opts) {
    return fetch(url, opts).then(function (resp) {
      if (resp.status >= 400) {
        return Promise.reject({ status: resp.status, statusText: resp.statusText });
      } else {
        return toJSON(resp).then(function (data) {
          if (resp.status >= 200 && resp.status < 300) {
            return data;
          } else {
            return Promise.reject(data);
          }
        });
      }
    });
  };
};

function processData(data) {
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
}

function toJSON(resp) {
  if (resp.text) {
    return resp.text().then(processData);
  } else if (resp instanceof Promise) {
    return resp.then(processData);
  } else {
    return Promise.resolve(resp).then(processData);
  }
}

module.exports = exports["default"];
//# sourceMappingURL=fetch.js.map