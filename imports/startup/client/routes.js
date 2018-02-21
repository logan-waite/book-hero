import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
// Layouts
import '../../ui/layouts/BaseLayout/BaseLayout.js';
import '../../ui/layouts/AccountLayout/AccountLayout.js';

// Templates
import '../../ui/pages/not-found/not-found.js';
import '../../ui/components/profile/profile.js';
import '../../ui/components/book-list/book-list.js';
import '../../ui/pages/accounts/accounts.js';

FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  pwd
]);

AccountsTemplates.configure({
  defaultLayout: 'AccountLayout',
  defaultLayoutRegions: {},
  defaultContentRegion: 'main'
})

AccountsTemplates.configureRoute('signIn');

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'Feed',
  action() {
    BlazeLayout.render('BaseLayout', {left:'profile', main: 'feed', right:'bookList' });
  },
});

FlowRouter.route('/logout', {
  name: "Logout",
  action() {
    AccountsTemplates.logout()
  }
})

// FlowRouter.route('/login', {
//   name: 'Login',
//   action() {
//     BlazeLayout.render('login');
//   }
// })
