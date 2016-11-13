export class App {
  configureRouter(config, router) {
    config.title = 'Contacts';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Create a Lunk!'},
      // {route: 'create', name: 'create', moudleId: 'lunkCreate', nav: true, title: 'Create A Lunk'},
      {route: 'v/:id', name: 'view', moduleId: 'view-lunk', title: 'Viewing a Lunk'}
    ]);

    this.router = router;
  }
}
