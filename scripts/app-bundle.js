define('app',['exports', 'aurelia-router'], function (exports, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Lunk';
      config.options.pushState = true;
      config.options.root = '/';
      config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Create a Lunk!' }, { route: 'meh', name: 'meh', moduleId: 'meh', title: 'Meh' }]);

      config.mapUnknownRoutes('view');
      this.router = router;
    };

    return App;
  }();
});
define('environment',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true,
    api: 'http://lunk.jared.tm',
    baseUrl: 'http://flunk.jared.tm'
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('meh',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var welcome = exports.welcome = function welcome() {
    _classCallCheck(this, welcome);
  };
});
define('view',['exports', 'aurelia-fetch-client', 'environment', 'openpgp'], function (exports, _aureliaFetchClient, _environment, _openpgp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.View = undefined;

  var env = _interopRequireWildcard(_environment);

  var openpgp = _interopRequireWildcard(_openpgp);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var httpClient = new _aureliaFetchClient.HttpClient();

  var View = exports.View = function () {
    function View() {
      _classCallCheck(this, View);

      this.lunk = null;
      this.password = null;
      this.decodedLunk = '';
    }

    View.prototype.activate = function activate(params, routeConfig) {
      this.getLunk(params.path.replace('/', ''));
    };

    View.prototype.create = function create() {
      this.created = true;
      this.sendLunk(this.message);
    };

    View.prototype.getLunk = function getLunk(lunk) {
      var _this = this;

      httpClient.fetch(env.default.api + '/lunk/' + lunk).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _this.lunk = data.lunk;
          if (window.location.hash) {
            _this.password = window.location.hash.replace('#', '');
            _this.decode();
          }
        } else {
          _this.lunk = data.message;
        }
      });
    };

    View.prototype.decode = function decode() {
      var _this2 = this;

      var options = {
        message: openpgp.message.readArmored(this.lunk),
        password: this.password };
      openpgp.decrypt(options).then(function (plaintext) {
        console.log(plaintext.data);
        _this2.decodedLunk = plaintext.data;
      });
    };

    return View;
  }();
});
define('welcome',['exports', 'openpgp'], function (exports, _openpgp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.welcome = undefined;

  var _openpgp2 = _interopRequireDefault(_openpgp);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var welcome = exports.welcome = function () {
    function welcome() {
      _classCallCheck(this, welcome);
    }

    welcome.prototype.decrypt = function decrypt(encrypted) {
      var options = {
        message: _openpgp2.default.message.read(encrypted),
        password: 'secret stuff',
        format: 'binary' };

      _openpgp2.default.decrypt(options).then(function (plaintext) {
        console.log(plaintext.data);
        console.log('^^^^^-^^^^^^^');
        return plaintext.data;
      });
    };

    return welcome;
  }();
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('resources/elements/create-lunk',['exports', 'aurelia-fetch-client', 'environment', 'openpgp'], function (exports, _aureliaFetchClient, _environment, _openpgp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CreateLunk = undefined;

  var env = _interopRequireWildcard(_environment);

  var _openpgp2 = _interopRequireDefault(_openpgp);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var httpClient = new _aureliaFetchClient.HttpClient();

  var CreateLunk = exports.CreateLunk = function () {
    function CreateLunk() {
      _classCallCheck(this, CreateLunk);

      this.message = '';
      this.created = false;
      this.lunkId = null;
      this.baseUrl = env.default.baseUrl;
      this.password = '';
      console.log(env.default.api);
    }

    CreateLunk.prototype.create = function create() {
      var _this = this;

      this.created = true;
      console.log(this.message);
      this.password = this.randomString(64);
      this.encryptMessage(this.message, this.password).then(function (encrypted) {
        _this.sendLunk(encrypted);
      });
    };

    CreateLunk.prototype.encryptMessage = function encryptMessage(message, password) {
      var options = {
        data: message,
        passwords: password };

      return _openpgp2.default.encrypt(options).then(function (ciphertext) {
        var encrypted = ciphertext.data;
        return encrypted;
      });
    };

    CreateLunk.prototype.sendLunk = function sendLunk(lunk) {
      var _this2 = this;

      var lunkIt = {
        lunk: lunk,
        expire: 10080,
        views: 1
      };
      httpClient.fetch(env.default.api + '/lunk', {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(lunkIt)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 'success') {
          _this2.lunkId = data.lunkId;
        }
        console.log(data);
      });
    };

    CreateLunk.prototype.randomString = function randomString(length) {
      var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var i = void 0;
      var result = '';
      if (window.crypto && window.crypto.getRandomValues) {
        var values = new Uint32Array(length);
        window.crypto.getRandomValues(values);
        for (i = 0; i < length; i++) {
          result += charset[values[i] % charset.length];
        }
        return result;
      }
    };

    return CreateLunk;
  }();
});
define('resources/elements/loading-indicator',[], function () {});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <!-- <require from=\"./styles.css\"></require> -->\n\n  <nav class=\"navbar navbar-default\" role=\"navigation\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"#\">\n        <i class=\"fa fa-user\"></i>\n        <span>Lunk.it</span>\n      </a>\n    </div>\n  </nav>\n\n  <div class=\"container\">\n    <router-view></router-view>\n  </div>\n</template>\n"; });
define('text!meh.html', ['module'], function(module) { module.exports = "<template>\n  <h1>Meh</h1>\n</template>\n"; });
define('text!view.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./resources/elements/create-lunk\"></require>\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <h5>Encrypted message:</h5>\n      <div class=\"well\">\n        ${lunk}\n      </div>\n    </div>\n    <div class=\"col-md-6\">\n      <div class=\"input-group\">\n        <input type=\"text\" value.bind='password' class=\"form-control\" placeholder=\"Password\">\n        <span class=\"input-group-btn\">\n          <button class=\"btn btn-default\" click.delegate='decode()' type=\"button\">Decrypt!</button>\n        </span>\n      </div><!-- /input-group -->\n      <h5>Decyrpted message:</h5>\n      <div class=\"well\">\n        ${decodedLunk}\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <h1>Create A Self Destructing Message</h1>\n      <create-lunk> </create-lunk>\n    </div>\n  </div>\n</template>\n"; });
define('text!welcome.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./resources/elements/create-lunk\"></require>\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <h1>Create A Self Destructing Message</h1>\n      <create-lunk> </create-lunk>\n    </div>\n  </div>\n</template>\n"; });
define('text!resources/elements/create-lunk.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"col-md-12\" if.bind='!lunkId'>\n    <div class=\"form-group\">\n      <label for=\"create-lunk\">Make me a Lunk &trade; <sup>*</sup>:</label>\n      <textarea class=\"form-control\" rows=\"5\" id=\"create-lunk\" value.bind=\"message\" placeholder=\"Type in your message to turn into a lunk\"> </textarea>\n    </div>\n    <div class=\"pull-right\">\n      <small><sup>*</sup>Lunks will last for 7 days from the time of creation and are only viewable once</small><br/>\n    </div>\n    <button class=\"btn btn-success\" click.delegate=\"create()\">Create</button>\n  </div>\n  <div class=\"col-md-12\" if.bind='lunkId'>\n\n    Share the following link:\n    <div class=\"well\">\n      <a href=\"${baseUrl}/${lunkId}\">${baseUrl}/${lunkId}</a><br/>\n      password: ${password}<br/>\n      Combined: <a href=\"${baseUrl}/${lunkId}#${password}\">${baseUrl}/${lunkId}#${password}</a>\n    </div>\n  </div>\n\n\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map