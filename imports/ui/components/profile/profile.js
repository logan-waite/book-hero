import './profile.html';

Template.profile.helpers({
  user() {
    var user = Meteor.user();
    // console.log(user);
    if (user !== undefined) {
      var progress_bar = (user.profile.xp / 2500) * 100;
      console.log(progress_bar)
      var userInfo = {
        username : user.username,
        level : user.profile.level,
        xp : user.profile.xp,
        progress_bar : progress_bar,
        attributes : user.profile.attributes
      }
      return userInfo;
    }

  }
})