import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
// Layouts
import '../../ui/layouts/BaseLayout/BaseLayout.js';

// Templates
import '../../ui/pages/not-found/not-found.js';
import '../../ui/components/profile/profile.js';
import '../../ui/components/book-list/book-list.js';
import '../../ui/pages/login/login.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'Feed',
  action() {
    BlazeLayout.render('BaseLayout', {left:'profile', main: 'feed', right:'book-list' });
  },
});

FlowRouter.route('/login', {
  name: 'Login',
  action() {
    BlazeLayout.render('login');
  }
})
