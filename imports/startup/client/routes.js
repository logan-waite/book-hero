import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
// Layouts
import '../../ui/layouts/BaseLayout/BaseLayout.js';

// Templates
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'Feed',
  action() {
    BlazeLayout.render('BaseLayout', { main: 'feed' });
  },
});
