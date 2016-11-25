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
 * Set the profile image width based on the type of device.
 */
function setProfileImageWidth(profileImage) {
    if (isMobile()) {
        profileImage.css('width', '35%');
        profileImage.css('height', 'auto');
    }
    else {
        profileImage.css('width', '231px');
        profileImage.css('height', 'auto');
    }
}

/**
 * Set the font size and image size of profile elements based on the
 * type of device and screen size.
 */
function setProfileFontSize(name, school, work, resume, icon) {
    if (isMobile()) {
        name.css('font-size', '10vw');
        name.css('height', '10vw');

        school.css('font-size','7.77vw');
        school.css('height','7.77vw');

        work.css('font-size', '3.75vw');
        work.css('height', '3.75vw');

        resume.css('font-size', '4.5vw');
        resume.css('height', '4.5vw');

        icon.css('width', '4.5vw');
        icon.css('height', 'auto');
    }
    else {
        name.css('font-size', '45px');
        name.css('height', '45px');

        school.css('font-size','35px');
        school.css('height','35px');

        work.css('font-size', '24px');
        work.css('height', '24px');

        resume.css('font-size', '30px');
        resume.css('height', '30px');

        icon.css('width', '30px');
        icon.css('height', 'auto');
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

    var name = $("#name");
    var school = $("#school");
    var work = $(".work");
    var resume = $("#resume");
    var icon = $(".icon");

    setProfileHeight(profile);
    setProfileImageWidth(profileImage);
    setProfileMargins(profileImage, profileInformation);
    setProfileFontSize(name, school, work, resume, icon);
    setProfileImageContainerWidth(profileImageContainer);
    centerProfile(profile);
    centerProfileContainer(profile, profileContainer);
}

// Use the setup function as a callback for these events.
$(document).ready(setupPage);
$(window).resize(setupPage);