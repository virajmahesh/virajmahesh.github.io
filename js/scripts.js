// Executed when page loads
$(document).ready(function() {
	var menu = new Menu(); // Creating a new menu
	var content = new Content(); // Create a new content
	var footer = new Footer(); // Create a new footer
	var projects = new Projects(); // Create a new list of projects
	var modal = new Modal(); // Create a new Modal

	var icons = $(".fork-icon");

	for (var i = 0; i < icons.length; i++) {
		var image = new Image();
		console.log(icons[i].src)
		image.src = icons[i].src
	}
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
	Tooltip.hideAll();
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
			Tooltip.hideAll();
		}
		else if (!Menu.hidden) {
			Menu.collapse();
			Menu.hidden = true;
			Content.light();
			MenuItem.invertActive(Menu.items);
		}
	});

	$("#contact-me").click(function() {
		Modal.fadeIn();
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
	this.tooltip = new Tooltip(this.object.children().children(".tooltip"));

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
		if (Menu.hidden) {
			that.tooltip.show();
		}
	});

	this.object.mouseleave(function() {
		that.lightenBackground();
		that.tooltip.hide();
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
	});
	Footer.icons.mouseleave(function() {
		$(this).css("opacity", 0.75);
	});
};

Projects = function() {
	$(".fork").mouseenter(function() {
		$(this).css("border", "rgb(61, 61, 102) solid 1px");
		$(this).css("background", "rgb(61, 61, 102)");
		$(this).css("color", "white");
		$(this).children(".fork-icon").attr("src", "img/icons/github-small-white.png");
	});

	$(".fork").mouseleave(function() {
		$(this).css("border", "gray 1px solid");
		$(this).css("background", "none");
		$(this).css("color", "black");
		$(this).children(".fork-icon").attr("src", "img/icons/github-small.png");
	});
};

Modal = function() {
	Modal.modal = $(".modal");
	Modal.hide();

	$("#submit").mouseenter(function() {
		$(this).css("border", "solid 4px rgb(51, 51, 102)");
		$(this).css("background", "#47B56C");
		$(this).css("cursor", "pointer");
	});

	$("#submit").mouseleave(function() {
		$(this).css("border", "solid 4px white");
		$(this).css("background", "#2B9B50");
		$(this).css("cursor", "default");
	});

	$("#cancel").mouseenter(function() {
		$(this).css("border", "solid 4px rgb(51, 51, 102)");
		$(this).css("background", "#FF4D4D");
		$(this).css("cursor", "pointer");
	});

	$("#cancel").mouseleave(function() {
		$(this).css("border", "solid 4px white");
		$(this).css("background", "#FF3030");
		$(this).css("cursor", "default");
	});

	$(".exit-button").mouseenter(function() {
		$(this).css("color", "rgb(51, 51, 102)");
		$(this).css("font-weight", "bold");
	});

	$(".exit-button").mouseleave(function() {
		$(this).css("color", "gray");
		$(this).css("font-weight", "100");
	})

	$(".exit-button").click(function() {
		Modal.fadeOut();
	});

	$("#submit").click(function() {
		$.get("http://virajmahesh.herokuapp.com/?",
		{
			name: $("#name-field").val(),
			email: $("#email-field").val(),
			message: $("#message-field").val()
		});
		Modal.fadeOut();
	});

	$(".text-box, .message").focusout(function() {
		if($(this).val() == "") {
			$(this).css("background", "rgba(256, 0, 0, 0.25)");
		}
		else {
			$(this).css("background", "rgba(0, 256, 0, 0.25)");
		}
	});

	$("#cancel").click(function() {
		Modal.fadeOut();
	});
}

Modal.fadeOut = function() {
	Modal.modal.fadeOut();
	Content.light();
}

Modal.fadeIn = function() {
	Content.dim();
	Modal.modal.fadeIn();
}

Modal.hide = function() {
	Modal.modal.hide();
}

Tooltip = function(object) {
	this.object = object;
}

Tooltip.prototype.show = function() {
	$(this.object).show();
}

Tooltip.prototype.hide = function() {
	$(this.object).hide();
}

Tooltip.hideAll = function() {
	$(".tooltip").hide();
}