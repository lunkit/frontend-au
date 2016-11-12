export class App {
  configureRouter(config, router) {
    config.title = 'Contacts';
    config.map([
      {route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'welcome'},
      // {route: 'create', name: 'create', moudleId: 'lunkCreate', nav: true, title: 'Create A Lunk'},
      // {route: 'v/', name: 'view', moduleId: 'lunkView', title: 'Viewing a Lunk'},
      // {route: 'v/:id', name: 'view', moduleId: 'lunkView', title: 'Viewing a Lunk'}
    ]);

    this.router = router;
  }
}
