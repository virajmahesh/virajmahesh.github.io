/**
 * @author: Viraj Mahesh
 */

// The minimum screen size for the regular layout.
var MOBILE_WIDTH = 880;

/**
 * Returns true if a mobile or a device with a small screen is being used
 * to view the website.
 */
function isMobile() {
    return WURFL.is_mobile || $(window).width() < MOBILE_WIDTH;
}

/**
 * Vertically center the profile container within the profile div.
 */
function centerProfileContainer(profile, profileContainer) {
    profileContainer.css('top', (profile.height() - profileContainer.height())/2);
}

/**
 * Center's the profile on the page.
 */
function centerProfile(profile) {
    profile.css('top', ($(window).height() - profile.height())/2);
}

/**
 * Set the profile height based on the type of device.
 */
function setProfileHeight(profile) {
    if (isMobile()) {
        profile.css('height', '100%');
    }
    else {
        profile.css('height', '340px');
    }
}

/**
 * Sets the margins of the profile div based on the type of device.
 */
function setProfileMargins(profileImage, profileInformation) {
    if (isMobile()) {
        profileImage.css('margin-bottom', '40px');
        profileInformation.css('margin-right', '40px');
        profileInformation.css('margin-left', '40px');
        profileInformation.css('text-align', 'center');
    }
    else {
        profileImage.css('margin-bottom', '0px');
        profileInformation.css('margin-right', '0px');
        profileInformation.css('margin-left', '70px');
        profileInformation.css('text-align', 'left');
    }
}

/**
 * On mobile, this function expands the div with the profile image to be 100%
 * of the screen width, forcing the profile text onto a new line.
 * On larger devices, the div is the same size as the profile image, ensuring that
 * the image and text are side by side.
 */
function setProfileImageContainerWidth(profileImageContainer) {
    if (isMobile()) {
        profileImageContainer.css('width', '100%');
    }
    else {
        profileImageContainer.css('width', 'auto');
    }
}

/**
 * Initialize the size of responsive elements on the page.
 * This function should be called when the page is loaded, and every time
 * the page is resized.
 */
function setupPage() {
    var profile = $("#profile");
    var profileImage = $("#profile-image");
    var profileInformation = $("#profile-information");
    var profileContainer = $("#profile-container");
    var profileImageContainer = $("#profile-image-container");

    console.log(WURFL);

    setProfileHeight(profile);
    setProfileMargins(profileImage, profileInformation);
    setProfileImageContainerWidth(profileImageContainer);
    centerProfile(profile);
    centerProfileContainer(profile, profileContainer);
}

// Use the setup function as a callback for these events.
$(document).ready(setupPage);
$(window).resize(setupPage);