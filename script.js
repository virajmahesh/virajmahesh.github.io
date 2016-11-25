/**
 * @author: Viraj Mahesh
 */


/**
 * Vertically center the profile container within the profile div.
 */
function centerProfileContainer() {
    var container = $("#profile-container");
    var profile = $("#profile");

    container.css('top', (profile.height() - container.height())/2);
}

$(document).ready(function() {
   centerProfileContainer();
});