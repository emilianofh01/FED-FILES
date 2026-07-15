var path = "";
var serverpath = "";


function appendCompiler(iduser) {
	if (iduser == "none") {
		alert("Por favor selecciona un usuario");
	}
	else {
		var path = "";
		var serverpath = "";
		if (iduser == "jonathan") { path = "http://127.0.0.1/compilers/aristyles/jonathan/styles.css"; serverpath = "aristyles/jonathan/"; }
		if (iduser == "manuel") { path = "http://127.0.0.1/compilers/aristyles/manuel/styles.css"; serverpath = "aristyles/manuel/"; }
		if (iduser == "david") { path = "http://127.0.0.1/compilers/aristyles/david/styles.css"; serverpath = "aristyles/david/"; }
		if (iduser == "nava") { path = "http://127.0.0.1/compilers/aristyles/nava/styles.css"; serverpath = "aristyles/nava/"; }
		if (iduser == "jesus") { path = "http://127.0.0.1/compilers/aristyles/jesus/styles.css"; serverpath = "aristyles/jesus/"; }
		if (iduser == "victor") { path = "http://127.0.0.1/compilers/aristyles/victor/styles.css"; serverpath = "aristyles/victor/"; }
		if (iduser == "emiliano") { path = "http://127.0.0.1/compilers/aristyles/emiliano/styles.css"; serverpath = "aristyles/emiliano/"; }

		var stringcode = '<div id="floating-compiler"> <div class="button-wrapper"> <button id="compiler">Compilar</button> <div id="message-holder"> Listo! </div> </div>  </div> <style> #floating-compiler{ position: fixed; z-index: 99; right: 15px; bottom: 20px; background: rgba(0,0,0,0.5); align-items: center; border-radius: 5px; box-shadow:3px 3px 5px 3px rgba(0,0,0,0.3) } #floating-compiler .button-wrapper{ display: flex; flex-direction: column; align-items: center; justify-content: center; width: 240px; height: 110px; } #compiler{ border: none; width: 180px; height: 30px; border-radius: 5px; background: #1FC7F1; color: white; font-family: Consolas; letter-spacing: 0.05em; height: 40px; width: 150px; border-radius: 0; } #message-holder{ width: 100%; padding: 5px; text-align: center; color: white; font-family: consolas; letter-spacing: 0.05em; 		 } </style>';
		var scripts = '<script> jQuery(document).ready(function(){ var path = "' + path + '"; var serverpath = "' + serverpath + '"; jQuery("head").append(\'<link href="\'+path+\'?v=1" rel="stylesheet">\'); function refreshCSS(csspath){ var version = Math.floor(Math.random() * 100) + 1; jQuery("link[href*=\'"+csspath+"\']").attr("href",jQuery("link[href*=\'"+csspath+"\']").attr("href").split(\'?\')[0]+"?v="+version); } jQuery("#compiler").click(function(){ jQuery.ajax({                         type: "POST",                  url: "http://127.0.0.1/compilers/scsshandler.php",                      data: {path: serverpath},  success: function(data)              { refreshCSS("http://127.0.0.1/compilers/"); jQuery("#message-holder").text(data);     setTimeout(function(){  jQuery("#message-holder").text(""); },2000); }, error: function() { jQuery("#message-holder").text("Errorrrr!");     setTimeout(function(){  jQuery("#message-holder").text(""); },2000); } }); }) }); </script> ';
		jQuery("body").append(stringcode);
		jQuery("head").append('<link href="' + path + '?v=1" rel="stylesheet">');
		/*jQuery("head").append(scripts);*/



		document.onkeydown = keydown;

		jQuery("#compiler").click(function () {
			jQuery.ajax({
				type: "POST",
				url: "http://127.0.0.1/compilers/scsshandler.php",
				data: {
					path: serverpath
				},
				success: function (data) {
					refreshCSS("http://127.0.0.1/compilers/");
					jQuery("#message-holder").text(data);
					setTimeout(function () {
						jQuery("#message-holder").text("");
					}, 2000);
				},
				error: function () {
					jQuery("#message-holder").text("Errorrrr!");
					setTimeout(function () {
						jQuery("#message-holder").text("");
					}, 2000);
				}
			});
		})
	}
}


function keydown(e) {
	if(e.altKey  && e.keyCode == 82){
    jQuery("#compiler").click();
  } 
}  

function refreshCSS(csspath) {
	var version = Math.floor(Math.random() * 100) + 1;
	jQuery("link[href*='" + csspath + "']").attr("href", jQuery("link[href*='" + csspath + "']").attr("href").split('?')[0] + "?v=" + version);
}



