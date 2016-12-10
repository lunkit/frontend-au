import {RouterConfiguration, Router} from 'aurelia-router';

export class App {
  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Lunk';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Create a Lunk!'},
      {route: 'meh', name: 'meh', moduleId: 'meh', title: 'Meh'}
    ]);

    config.mapUnknownRoutes('view');
    this.router = router;
  }
}
