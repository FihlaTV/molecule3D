/*!
MolView v2.2 (http://molview.org)
Copyright (c) 2014, Herman Bergwerf
ALL RIGHTS RESERVED
*/

var Messages = {
	cir_down: "The Chemical Identifier Resolver is offline, some functions might be unavailable.",
	cir_func_down: "This function is unavailable because the Chemical Identifier Resolver is offline.",

	switch_engine: "",
	compound: "Loading compound&hellip;",
	macromolecule: "Loading macromolecule&hellip;",
	crystal: "Loading crystal&hellip;",
	crystal_structure: "Loading crystal structure&hellip;",

	search: "Searching&hellip;",
	clean: "Cleaning&hellip;",
	resolve: "Updating&hellip;",

	no_glmol_crystals: "You cannot view crystals using GLmol",

	init_jmol: "Initializing Jmol&hellip;",
	jmol_calculation: "",

	no_webgl_support: Detector.getWebGLErrorMessage(),
	no_canvas_support: "Your browser doesn't support this web application, try <a class='link' href='//google.com/chrome' title='A modern browser'>Google Chrome</a> instead.",

	sketcher_no_macromolecules: "Macromolecules cannot be displayed in the sketcher",
	mobile_old_no_macromolecules: "Macromolecules cannot be viewed on your device",
	smiles_load_error: "Failed to load structure from sketcher",
	smiles_load_error_force: "Failed to load structure from sketcher",

	load_fail: "Failed to load structure",
	search_fail: "Structure cannot be found",
	resolve_fail: "Structure cannot be resolved",
	clean_fail: "Structure cannot be cleaned",
	crystal_2d_fail: "Failed to load a structural formula for this crystal structure",

	init: function()
	{
		$("#sketcher-messages .message-btn").on("click", function(){ Progress.complete(); Messages.hide(); });
		$("#model-messages .message-btn").on("click", function(){ Progress.complete(); Messages.hide(); });
		$("#content-messages .message-btn").on("click", function(){ Progress.complete(); Messages.hide(); });
	},

	process: function(cb, what)
	{
		/*
		Valid strings for {what}
		- switch_engine
		- compound
		- macromolecule
		- crystal
		- crystal_cell

		- search
		- clean
		- resolve

		- init_jmol
		- jmol_calculation
		- misc
		*/

		$("body").addClass("progress-cursor");
		$("#content").removeClass("sketcher-messages model-messages content-messages");

		$(".message-btn").hide();
		$(".process-img, .alert-img").hide();
		$(".process-img").show();

		if(what == "clean")
		{
			$("#sketcher-messages .message-text").html(Messages[what]);
			$("#content").addClass("sketcher-messages");
		}
		else if(what == "switch_engine" || what == "macromolecule" || what == "resolve"
			 || what == "init_jmol" || what == "jmol_calculation" || what == "crystal_structure")
		{
			$("#model-messages .message-text").html(Messages[what]);
			$("#content").addClass("model-messages");
		}
		else if(what == "compound" || what == "crystal" || what == "search")
		{
			$("#content-messages .message-text").html(Messages[what]);
			$("#content").addClass("content-messages");
		}
		else if(what == "misc")
		{
			$("#content-messages .message-text").html("");
			$("#content").addClass("content-messages");
		}

		window.setTimeout(cb, 300);
	},

	alert: function(cause, error)
	{
		/*
		Valid strings for {cause}
		- cir_down
		- cir_func_down

		- no_canvas_support
		- no_webgl_support
		- no_glmol_crystals

		- sketcher_no_macromolecules

		- smiles_load_error
		- smiles_load_error_force

		- load_fail
		- search_fail
		- resolve_fail
		- clean_fail
		- crystal_2d_fail
		*/

		$("#-close").hide();
		$("body").removeClass("progress-cursor");
		$("#content").removeClass("content-messages "
			/* do not hide sketcher-messages or model-messages if smiles cannot be loaded
			so the error message is automatically displayed in the right messages layer */
			+ ((cause == "smiles_load_error" || cause == "clean_fail" || cause == "resolve_fail") ? "" : "sketcher-messages model-messages"));

		$(".message-btn").show();
		$(".process-img, .alert-img").hide();
		$(".alert-img").show();

		if(cause == "sketcher_no_macromolecules" || cause == "crystal_2d_fail")
		{
			$("#sketcher-messages .message-text").html(Messages[cause]);
			$("#content").addClass("sketcher-messages");
		}
		else if(cause == "no_webgl_support" || cause == "no_glmol_crystals")
		{
			$("#model-messages .message-text").html(Messages[cause]);
			$("#content").addClass("model-messages");
		}
		else if(cause == "cir_down" || cause == "cir_func_down" || cause == "no_canvas_support" || cause == "search_fail" || cause == "load_fail"  || cause == "mobile_old_no_macromolecules")
		{
			$("#content-messages .message-text").html(Messages[cause]);
			$("#content").addClass("content-messages");

			if(cause == "no_canvas_support") $(".message-btn").hide();
		}
		else if(cause == "smiles_load_error" || cause == "clean_fail" || cause == "resolve_fail")
		{
			if(error) $("#sketcher-messages .message-text, #model-messages .message-text, #content-messages .message-text").html(Messages[cause] + " <small>" + (error.message || error.detailMessage || error) + "</small>");
			else $("#sketcher-messages .message-text, #model-messages .message-text, #content-messages .message-text").html(Messages[cause]);
		}
		else if(cause == "smiles_load_error_force")
		{
			if(error) $("#content-messages .message-text").html(Messages[cause] + " <small>" + (error.message || error.detailMessage || error) + "</small>");
			$("#content").addClass("content-messages");
		}

		Progress.alert();
	},

	hide: function()
	{
		$("body").removeClass("progress-cursor");
		$("#content").removeClass("sketcher-messages model-messages content-messages");
	},
};
