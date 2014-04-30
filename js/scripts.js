// Executed when page loads
$(document).ready(function() {
	var menu = new Menu(); // Creating a new menu
});

Menu = function() {
	// Get a handle to elements
	this.menu = $("#menu");
	this.content = $("#content-container");
	this.toggle = $("#menu-toggle");
	this.menuItems = $(".menu-text");

	// Setting the menu properties
	this.collapsedWidth = "60px";
	this.expandedWidth = "225px";
	this.hidden = true;

	// The menu is initially collapsed
	this.menu.width(this.collapsedWidth);
	this.content.css('left', this.collapsedWidth);
	this.setCallback();
	this.menuItems.hide();
}

Menu.prototype.collapse = function() {
	this.menu.animate({width: this.collapsedWidth});
	this.menuItems.hide();
}

Menu.prototype.expand = function() {
	this.menu.animate({width: this.expandedWidth});
	this.menuItems.show();
}

Menu.prototype.setCallback = function() {
	var that = this;
	this.toggle.click(function() {
		if (that.hidden) {
			that.expand();
			that.hidden = false;
		}
		else if (!that.hidden) {
			that.collapse();
			that.hidden = true;
		}
	});
}

