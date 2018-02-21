import './profile.html';

Template.profile.helpers({
  user() {
    var user = Meteor.user();
    var userInfo = {
      username : user.username,
      level : user.profile.level,
      xp : user.profile.xp,
      attributes : user.profile.attributes
    }
    return userInfo;
  }
})