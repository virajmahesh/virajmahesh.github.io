// Executed when page loads
$(document).ready(function() {
	var menu = new Menu(); // Creating a new menu
	var content = new Content(); // Create a new content
	var footer = new Footer(); // Create a new footer
	var projects = new Projects(); // Create a new list of projects
});

Menu = function() {
	// Get a handle to elements
	Menu.menu = $("#menu");

	// Setting the menu properties
	Menu.collapsedWidth = "60px";
	Menu.expandedWidth = "225px";
	Menu.hidden = true;

	// The menu is initially collapsed
	Menu.menu.width(Menu.collapsedWidth);
	Menu.populateMenuItems();
	Menu.setCallback();

	MenuItem.hide(Menu.items);
};

Menu.collapse = function() {
	Menu.menu.animate({width: Menu.collapsedWidth});
	MenuItem.hide(Menu.items);
};

Menu.expand = function() {
	Menu.menu.animate({width: Menu.expandedWidth});
	MenuItem.show(Menu.items);
};

Menu.setCallback = function() {
	$(document).mousemove(function(event) {
		if (!Menu.hidden && event.pageX >= 225) {
			Menu.collapse();
			Menu.hidden = true;
			Content.light();
			MenuItem.invertActive(Menu.items);
		}
	});
	$("#menu-toggle").click(function(event) {
		if (Menu.hidden) {
			Menu.expand();
			Menu.hidden = false;
			Content.dim();
			MenuItem.revertActive(Menu.items);
		}
		else if (!Menu.hidden) {
			Menu.collapse();
			Menu.hidden = true;
			Content.light();
			MenuItem.invertActive(Menu.items);
		}
	});
};

Menu.populateMenuItems = function() {
	var allItems = $(".item-container");
	Menu.items = new Array();
	allItems.toArray().forEach(function(elem, index, array) {
		Menu.items.push(new MenuItem(elem)); // Create a new MenuItem out of the element
	});
};

// Represents the page content
Content = function() {
	Content.contentContainer = $("#content-container");
	Content.contentOverlay = $("#content-overlay");
};

Content.dim = function() {
	Content.contentOverlay.fadeTo("fast", opacity=0.6);
};

Content.light = function() {
	Content.contentOverlay.fadeTo("fast", opacity=0.0);
};

// Represents a menu item
MenuItem = function(object) {
	this.object = $(object);
	this.allChildren = this.object.children().children();
	this.image = this.object.children().children(".menu-image");
	this.text = this.object.children().children(".menu-text");

	this.setCallback();

	this.inverted = false;
	this.active = false;

	if(this.object.hasClass("active")) { // Invert an active object
		this.active = true;
		this.invert();
	}
};

MenuItem.prototype.darkenBackground = function() {
	this.object.css("background-color", "rgb(29, 29, 50)");
};

MenuItem.prototype.lightenBackground = function() {
	this.object.css("background-color", "rgb(51, 51, 102)");
};

MenuItem.prototype.setCallback = function() {
	var that = this;

	this.object.mouseenter(function() {
		that.revert();
		that.darkenBackground();
	});

	this.object.mouseleave(function() {
		that.lightenBackground();
		if (Menu.hidden && that.active) {
			that.invert();
		}
	});
};

// Hide an entire list of MenuItems
MenuItem.hide = function(itemList) {
	itemList.forEach(function(elem, index, array) {
		elem.hide();
	});
};

// Hide this object
MenuItem.prototype.hide = function() {
	this.text.hide();
}

// Show an entire list of MenuItems
MenuItem.show = function(itemList) {
	itemList.forEach(function(elem, index, array) {
		elem.show();
	});
};

// Show this object
MenuItem.prototype.show = function() {
	this.text.show();
};

MenuItem.prototype.invert = function() {
	if (!this.inverted)	{
		this.object.css("background-color", "rgb(256, 256, 256)");
		var newSrc = this.image.attr("src").replace(".png", "-invert.png");
		this.image.attr("src", newSrc);
		this.inverted = true;
	}
};

MenuItem.prototype.revert = function() {
	if (this.inverted) {
		this.object.css("background-color", "rgb(51, 51, 102)");
		var newSrc = this.image.attr("src").replace("-invert.png", ".png");
		this.image.attr("src", newSrc);
		this.inverted = false;
	}
};

MenuItem.invertActive = function(itemList) {
	itemList.forEach(function(elem, index, array) {
		if (elem.active) {
			elem.invert();
		}
	});
};

MenuItem.revertActive = function(itemList) {
	itemList.forEach(function(elem, index, array) {
		if (elem.active) {
			elem.revert();
		}
	});
};

Footer = function() {
	Footer.icons = $(".social-icon");
	Footer.animateIcons();
};

Footer.animateIcons = function() {
	Footer.icons.mouseenter(function() {
		// Grow the image but shorten margins
		$(this).css("opacity", 1.0);
		//$(this).animate({width: 55, height: 55, marginTop: "-=2.5", marginBottom: "-=2.5", marginLeft: "-=2.5", marginRight: "-=2.5"}, 200);
	});
	Footer.icons.mouseleave(function() {
		$(this).css("opacity", 0.75);
		//$(this).animate({width: 50, height: 50, marginTop: "+=2.5", marginBottom: "+=2.5", marginLeft: "+=2.5", marginRight: "+=2.5"}, 200);
	});
};

Project = function(project) {
	Project.oldBackground = "#43436C";
	Project.newBackground = "#6868AB";
	this.project = $(project);
	this.overlay = $("#" + $(project).attr("id") + "-overlay");
	this.overlay.hide();

	this.setCallback();
};

Project.prototype.setCallback = function() {
	var that = this;
	this.project.mouseover(function() {
		that.project.addClass("blur", 200);
		that.project.css("color", "rgba(0, 0, 0, 0)", 200);
		that.overlay.fadeIn(200);
	});
	this.overlay.mouseleave(function() {
		that.overlay.fadeOut(200);
		that.project.removeClass("blur", 200);
		that.project.css("color", "white", 200);
	});
};

Projects = function() {
	Projects.allProjects = $(".project").toArray();
	Projects.projectList = new Array();

	// Populating projects list
	Projects.allProjects.forEach(function(elem, index, array) {
		Projects.projectList.push(new Project(elem));
	});

	$(".no-underline").mouseenter(function() {
		$(".view-on-github").css("color", "#43436c");
		$(".view-on-github").css("background", "white");
	});
	$(".no-underline").mouseleave(function() {
		$(".view-on-github").css("color", "white");
		$(".view-on-github").css("background", "none");
	});
};