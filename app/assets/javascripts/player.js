
function wrap(text, cls){
	return "<div class='"+cls+"'> " + text + "</div>";
}

function formatTrnaslation(translation){
	obj = $.parseJSON(translation.replace(new RegExp('=>', 'g'), ':'));
	str = "";
	for (var prop in obj){
		line = "";
		line = wrap(prop, "word-type") +": "+ obj[prop] + "<br>";
		str+=line;
	}
	return str;	
}

var subPlayer = function(width){

		parameters = {
			startLanguage: 'en'
		}
		// if (width != undefined){
		// 	parameters.defaultVideoWidth = width;
		// 	videoWidth: 1,
		// };
	$('video,audio').mediaelementplayer(parameters);


    $(".subtle").lettering('words');



	$
	translated_words = {};
	var lastTime = new Date().getTime();
	hovered = false;

	function set_translation(object, data){
		pos = $(object).offset();
		$(".single-translation").show();
		$(".single-translation .word-original").text(data.word);
		$(".single-translation .word-general").text(data.recomended_translation);
		$(".single-translation .others").html(formatTrnaslation(data.translation));
		h = $(".single-translation").height();
		w = $(".single-translation").width();
		$(".single-translation").css({top: pos.top-h - $(object).height()*2.5, left: pos.left});


	}
	function hide_translation(){
		$(".single-translation").hide();
	}
	var mut = new MutationObserver(function(mutations, mut){
		// console.log('next sub!');
		$(".mejs-captions-text").lettering('words');
		$(".mejs-captions-text > *").hover(function(){
			$('video')[0].player.pause();
			hover = true;
			var object = this;
			text = this.innerText.toLowerCase();
			text = text.match("[A-Za-z0-9\-]*");
			if (typeof(translated_words[text]) !== 'undefined')
				{
					set_translation(object, translated_words[text]);
				}
			else{
				$.get({
					url: '/t/'+text, 
					dataType: 'json',

					success: function(data){

						translated_words[text] = data;
						set_translation(object, data);
					}
				});
				
				
			}
			
		}).mouseleave(function(){


			hide_translation();
		});
		var tl = 500;
		/*$(".mejs-captions-text > *").delegate('mouseover', function(){
		//	lastTime = new Date().getTime();
		})*/4
		$("video").hover(function(){
			

			
		})
		$(".mejs-captions-text > *").on("click", function(){
			//save the current word
			$('video')[0].player.pause();
			hover = true;
			var object = this;
			text = this.innerText.toLowerCase();
			text = text.match("[A-Za-z0-9\-]*");
			if (text == "")
				return;
			$.get({
				url: '/r/'+ text,
				dataType: 'json',
				success: function(data){
					if (data["success"] == "true")
						$.notify(data["msg"], "success");
					else	
						$.notify(data["msg"]);

					console.log(data);
				}
			});
	});
	  // if attribute changed === 'class' && 'open' has been added, add css to 'otherDiv'
	});
	
	mut.observe(document.querySelector(".mejs-captions-text"),{
	  'attributes': true
	});
	
	
	
};

