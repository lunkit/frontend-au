define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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
      config.title = 'Contacts';
      config.options.pushState = true;
      config.options.root = '/';
      config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Create a Lunk!' }, { route: 'v/:id', name: 'view', moduleId: 'view-lunk', title: 'Viewing a Lunk' }]);

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
    baseUrl: 'http://localhost:9000'
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
define('view-lunk',['exports', 'aurelia-fetch-client', 'environment'], function (exports, _aureliaFetchClient, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ViewLunk = undefined;

  var env = _interopRequireWildcard(_environment);

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

  var ViewLunk = exports.ViewLunk = function () {
    function ViewLunk() {
      _classCallCheck(this, ViewLunk);

      this.lunk = null;
    }

    ViewLunk.prototype.activate = function activate(params, routeConfig) {
      console.log(params);
      this.getLunk(params.id);
    };

    ViewLunk.prototype.create = function create() {
      this.created = true;
      console.log(this.message);
      this.sendLunk(this.message);
    };

    ViewLunk.prototype.getLunk = function getLunk(lunk) {
      var _this = this;

      httpClient.fetch(env.default.api + '/lunk/' + lunk).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        if (data.status === 'success') {
          _this.lunk = data.lunk;
        } else {
          _this.lunk = data.message;
        }
        console.log(data);
      });
    };

    return ViewLunk;
  }();
});
define('welcome',["exports"], function (exports) {
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
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('resources/elements/create-lunk',['exports', 'aurelia-fetch-client', 'environment'], function (exports, _aureliaFetchClient, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CreateLunk = undefined;

  var env = _interopRequireWildcard(_environment);

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
      console.log(env.default.api);
    }

    CreateLunk.prototype.create = function create() {
      this.created = true;
      console.log(this.message);
      this.sendLunk(this.message);
    };

    CreateLunk.prototype.encryptMessage = function encryptMessage(message) {
      httpClient.fetch('package.json').then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        console.log(data.description);
      });
    };

    CreateLunk.prototype.sendLunk = function sendLunk(lunk) {
      var _this = this;

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
          _this.lunkId = data.lunkId;
        }
        console.log(data);
      });
    };

    return CreateLunk;
  }();
});
define('resources/elements/loading-indicator',[], function () {});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <!-- <require from=\"./styles.css\"></require> -->\n\n  <nav class=\"navbar navbar-default\" role=\"navigation\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"#\">\n        <i class=\"fa fa-user\"></i>\n        <span>Lunk.it</span>\n      </a>\n    </div>\n  </nav>\n\n  <div class=\"container\">\n    <router-view></router-view>\n  </div>\n</template>\n"; });
define('text!view-lunk.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./resources/elements/create-lunk\"></require>\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <h5>Your message:</h5>\n      <div class=\"well\">\n        ${lunk}\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <h1>Create A Self Destructing Message</h1>\n      <create-lunk> </create-lunk>\n    </div>\n  </div>\n</template>\n"; });
define('text!welcome.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./resources/elements/create-lunk\"></require>\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <h1>Create A Self Destructing Message</h1>\n      <create-lunk> </create-lunk>\n    </div>\n  </div>\n</template>\n"; });
define('text!resources/elements/create-lunk.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"col-md-12\" if.bind='!lunkId'>\n    <div class=\"form-group\">\n      <label for=\"create-lunk\">Make me a Lunk &trade; <sup>*</sup>:</label>\n      <textarea class=\"form-control\" rows=\"5\" id=\"create-lunk\" value.bind=\"message\" placeholder=\"Type in your message to turn into a lunk\"> </textarea>\n    </div>\n    <div class=\"pull-right\">\n      <small><sup>*</sup>Lunks will last for 7 days from the time of creation and are only viewable once</small><br/>\n    </div>\n    <button class=\"btn btn-success\" click.delegate=\"create()\">Create</button>\n  </div>\n  <div class=\"col-md-12\" if.bind='lunkId'>\n\n    Share the following link:\n    <div class=\"well\">\n      ${baseUrl}/v/${lunkId}\n    </div>\n  </div>\n\n\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map