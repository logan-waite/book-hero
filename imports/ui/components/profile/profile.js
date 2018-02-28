import './profile.html';

Template.profile.helpers({
  user() {
    var user = Meteor.user();
    // console.log(user);
    if (user !== undefined) {
      var userInfo = {
        username : user.username,
        level : user.profile.level,
        xp : user.profile.xp,
        attributes : user.profile.attributes
      }
      return userInfo;
    }

  }
})