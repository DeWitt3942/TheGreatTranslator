function wrap(t,e){return"<div class='"+e+"'> "+t+"</div>"}function formatTrnaslation(t){obj=$.parseJSON(t.replace(new RegExp("=>","g"),":")),str="";for(var e in obj)line="",line=wrap(e,"word-type")+": "+obj[e]+"<br>",str+=line;return str}var subPlayer=function(){function t(t,e){pos=$(t).offset(),$(".single-translation").show(),$(".single-translation .word-original").text(e.word),$(".single-translation .word-general").text(e.recomended_translation),$(".single-translation .others").html(formatTrnaslation(e.translation)),h=$(".single-translation").height(),w=$(".single-translation").width(),$(".single-translation").css({top:pos.top-h-2.5*$(t).height(),left:pos.left})}function e(){$(".single-translation").hide()}parameters={startLanguage:"en"},$("video,audio").mediaelementplayer(parameters),$(".subtle").lettering("words"),$,translated_words={};(new Date).getTime();hovered=!1,new MutationObserver(function(){$(".mejs-captions-text").lettering("words"),$(".mejs-captions-text > *").hover(function(){$("video")[0].player.pause(),hover=!0;var e=this;text=this.innerText.toLowerCase(),text=text.match("[A-Za-z0-9-]*"),"undefined"!=typeof translated_words[text]?t(e,translated_words[text]):$.get({url:"/t/"+text,dataType:"json",success:function(n){translated_words[text]=n,t(e,n)}})}).mouseleave(function(){e()});$("video").hover(function(){}),$(".mejs-captions-text > *").on("click",function(){$("video")[0].player.pause(),hover=!0;text=this.innerText.toLowerCase(),text=text.match("[A-Za-z0-9-]*"),""!=text&&$.get({url:"/r/"+text,dataType:"json",success:function(t){"true"==t.success?$.notify(t.msg,"success"):$.notify(t.msg),console.log(t)}})})}).observe(document.querySelector(".mejs-captions-text"),{attributes:!0})};