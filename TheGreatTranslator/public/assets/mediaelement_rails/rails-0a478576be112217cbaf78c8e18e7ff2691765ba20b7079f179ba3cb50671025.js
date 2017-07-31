var mejs=mejs||{};mejs.version="2.18.0",mejs.meIndex=0,mejs.plugins={silverlight:[{version:[3,0],types:["video/mp4","video/m4v","video/mov","video/wmv","audio/wma","audio/m4a","audio/mp3","audio/wav","audio/mpeg"]}],flash:[{version:[9,0,124],types:["video/mp4","video/m4v","video/mov","video/flv","video/rtmp","video/x-flv","audio/flv","audio/x-flv","audio/mp3","audio/m4a","audio/mpeg","video/youtube","video/x-youtube","video/dailymotion","video/x-dailymotion","application/x-mpegURL"]}],youtube:[{version:null,types:["video/youtube","video/x-youtube","audio/youtube","audio/x-youtube"]}],vimeo:[{version:null,types:["video/vimeo","video/x-vimeo"]}]},mejs.Utility={encodeUrl:function(e){return encodeURIComponent(e)},escapeHTML:function(e){return e.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")},absolutizeUrl:function(e){var t=document.createElement("div");return t.innerHTML='<a href="'+this.escapeHTML(e)+'">x</a>',t.firstChild.href},getScriptPath:function(e){for(var t,i,n,a,l,s=0,u="",r="",o=document.getElementsByTagName("script"),d=o.length,m=e.length;s<d;s++){for(n=o[s].src,i=n.lastIndexOf("/"),i>-1?(l=n.substring(i+1),a=n.substring(0,i+1)):(l=n,a=""),t=0;t<m;t++)if(r=e[t],l.indexOf(r)>-1){u=a;break}if(""!==u)break}return u},calculateTimeFormat:function(e,t,i){e<0&&(e=0),void 0===i&&(i=25);var n=t.timeFormat,a=n[0],l=n[1]==n[0],s=l?2:1,u=":",r=Math.floor(e/3600)%24,o=Math.floor(e/60)%60,d=Math.floor(e%60),m=Math.floor((e%1*i).toFixed(3)),c=[[m,"f"],[d,"s"],[o,"m"],[r,"h"]];n.length<s&&(u=n[s]);for(var p=!1,h=0,g=c.length;h<g;h++)if(-1!==n.indexOf(c[h][1]))p=!0;else if(p){for(var f=!1,v=h;v<g;v++)if(c[v][0]>0){f=!0;break}if(!f)break;l||(n=a+n),n=c[h][1]+u+n,l&&(n=c[h][1]+n),a=c[h][1]}t.currentTimeFormat=n},twoDigitsString:function(e){return e<10?"0"+e:String(e)},secondsToTimeCode:function(e,t){e<0&&(e=0);var n=t.framesPerSecond;void 0===n&&(n=25);var a=t.currentTimeFormat,l=Math.floor(e/3600)%24,s=Math.floor(e/60)%60,u=Math.floor(e%60),r=Math.floor((e%1*n).toFixed(3));lis=[[r,"f"],[u,"s"],[s,"m"],[l,"h"]];var o=a;for(i=0,len=lis.length;i<len;i++)o=o.replace(lis[i][1]+lis[i][1],this.twoDigitsString(lis[i][0])),o=o.replace(lis[i][1],lis[i][0]);return o},timeCodeToSeconds:function(e,t,i,n){void 0===i?i=!1:void 0===n&&(n=25);var a=e.split(":"),l=parseInt(a[0],10),s=parseInt(a[1],10),u=parseInt(a[2],10),r=0;return i&&(r=parseInt(a[3])/n),3600*l+60*s+u+r},convertSMPTEtoSeconds:function(e){if("string"!=typeof e)return!1;e=e.replace(",",".");var t=0,i=-1!=e.indexOf(".")?e.split(".")[1].length:0,n=1;e=e.split(":").reverse();for(var a=0;a<e.length;a++)n=1,a>0&&(n=Math.pow(60,a)),t+=Number(e[a])*n;return Number(t.toFixed(i))},removeSwf:function(e){var t=document.getElementById(e);t&&/object|embed/i.test(t.nodeName)&&(mejs.MediaFeatures.isIE?(t.style.display="none",function(){4==t.readyState?mejs.Utility.removeObjectInIE(e):setTimeout(arguments.callee,10)}()):t.parentNode.removeChild(t))},removeObjectInIE:function(e){var t=document.getElementById(e);if(t){for(var i in t)"function"==typeof t[i]&&(t[i]=null);t.parentNode.removeChild(t)}}},mejs.PluginDetector={hasPluginVersion:function(e,t){var i=this.plugins[e];return t[1]=t[1]||0,t[2]=t[2]||0,i[0]>t[0]||i[0]==t[0]&&i[1]>t[1]||i[0]==t[0]&&i[1]==t[1]&&i[2]>=t[2]},nav:window.navigator,ua:window.navigator.userAgent.toLowerCase(),plugins:[],addPlugin:function(e,t,i,n,a){this.plugins[e]=this.detectPlugin(t,i,n,a)},detectPlugin:function(e,t,i,n){var a,l,s,u=[0,0,0];if("undefined"!=typeof this.nav.plugins&&"object"==typeof this.nav.plugins[e]){if((a=this.nav.plugins[e].description)&&("undefined"==typeof this.nav.mimeTypes||!this.nav.mimeTypes[t]||this.nav.mimeTypes[t].enabledPlugin))for(u=a.replace(e,"").replace(/^\s+/,"").replace(/\sr/gi,".").split("."),l=0;l<u.length;l++)u[l]=parseInt(u[l].match(/\d+/),10)}else if("undefined"!=typeof window.ActiveXObject)try{s=new ActiveXObject(i),s&&(u=n(s))}catch(e){}return u}},mejs.PluginDetector.addPlugin("flash","Shockwave Flash","application/x-shockwave-flash","ShockwaveFlash.ShockwaveFlash",function(e){var t=[],i=e.GetVariable("$version");return i&&(i=i.split(" ")[1].split(","),t=[parseInt(i[0],10),parseInt(i[1],10),parseInt(i[2],10)]),t}),mejs.PluginDetector.addPlugin("silverlight","Silverlight Plug-In","application/x-silverlight-2","AgControl.AgControl",function(e){var t=[0,0,0,0],i=function(e,t,i,n){for(;e.isVersionSupported(t[0]+"."+t[1]+"."+t[2]+"."+t[3]);)t[i]+=n;t[i]-=n};return i(e,t,0,1),i(e,t,1,1),i(e,t,2,1e4),i(e,t,2,1e3),i(e,t,2,100),i(e,t,2,10),i(e,t,2,1),i(e,t,3,1),t}),mejs.MediaFeatures={init:function(){var e,t,i=this,n=document,a=mejs.PluginDetector.nav,l=mejs.PluginDetector.ua.toLowerCase(),s=["source","track","audio","video"];i.isiPad=null!==l.match(/ipad/i),i.isiPhone=null!==l.match(/iphone/i),i.isiOS=i.isiPhone||i.isiPad,i.isAndroid=null!==l.match(/android/i),i.isBustedAndroid=null!==l.match(/android 2\.[12]/),i.isBustedNativeHTTPS="https:"===location.protocol&&(null!==l.match(/android [12]\./)||null!==l.match(/macintosh.* version.* safari/)),i.isIE=-1!=a.appName.toLowerCase().indexOf("microsoft")||null!==a.appName.toLowerCase().match(/trident/gi),i.isChrome=null!==l.match(/chrome/gi),i.isChromium=null!==l.match(/chromium/gi),i.isFirefox=null!==l.match(/firefox/gi),i.isWebkit=null!==l.match(/webkit/gi),i.isGecko=null!==l.match(/gecko/gi)&&!i.isWebkit&&!i.isIE,i.isOpera=null!==l.match(/opera/gi),i.hasTouch="ontouchstart"in window,i.svg=!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect;for(e=0;e<s.length;e++)t=document.createElement(s[e]);i.supportsMediaTag="undefined"!=typeof t.canPlayType||i.isBustedAndroid;try{t.canPlayType("video/mp4")}catch(e){i.supportsMediaTag=!1}i.hasSemiNativeFullScreen="undefined"!=typeof t.webkitEnterFullscreen,i.hasNativeFullscreen="undefined"!=typeof t.requestFullscreen,i.hasWebkitNativeFullScreen="undefined"!=typeof t.webkitRequestFullScreen,i.hasMozNativeFullScreen="undefined"!=typeof t.mozRequestFullScreen,i.hasMsNativeFullScreen="undefined"!=typeof t.msRequestFullscreen,i.hasTrueNativeFullScreen=i.hasWebkitNativeFullScreen||i.hasMozNativeFullScreen||i.hasMsNativeFullScreen,i.nativeFullScreenEnabled=i.hasTrueNativeFullScreen,i.hasMozNativeFullScreen?i.nativeFullScreenEnabled=document.mozFullScreenEnabled:i.hasMsNativeFullScreen&&(i.nativeFullScreenEnabled=document.msFullscreenEnabled),i.isChrome&&(i.hasSemiNativeFullScreen=!1),i.hasTrueNativeFullScreen&&(i.fullScreenEventName="",i.hasWebkitNativeFullScreen?i.fullScreenEventName="webkitfullscreenchange":i.hasMozNativeFullScreen?i.fullScreenEventName="mozfullscreenchange":i.hasMsNativeFullScreen&&(i.fullScreenEventName="MSFullscreenChange"),i.isFullScreen=function(){return i.hasMozNativeFullScreen?n.mozFullScreen:i.hasWebkitNativeFullScreen?n.webkitIsFullScreen:i.hasMsNativeFullScreen?null!==n.msFullscreenElement:void 0},i.requestFullScreen=function(e){i.hasWebkitNativeFullScreen?e.webkitRequestFullScreen():i.hasMozNativeFullScreen?e.mozRequestFullScreen():i.hasMsNativeFullScreen&&e.msRequestFullscreen()},i.cancelFullScreen=function(){i.hasWebkitNativeFullScreen?document.webkitCancelFullScreen():i.hasMozNativeFullScreen?document.mozCancelFullScreen():i.hasMsNativeFullScreen&&document.msExitFullscreen()}),i.hasSemiNativeFullScreen&&l.match(/mac os x 10_5/i)&&(i.hasNativeFullScreen=!1,i.hasSemiNativeFullScreen=!1)}},mejs.MediaFeatures.init(),mejs.HtmlMediaElement={pluginType:"native",isFullScreen:!1,setCurrentTime:function(e){this.currentTime=e},setMuted:function(e){this.muted=e},setVolume:function(e){this.volume=e},stop:function(){this.pause()},setSrc:function(e){for(var t=this.getElementsByTagName("source");t.length>0;)this.removeChild(t[0]);if("string"==typeof e)this.src=e;else{var i,n;for(i=0;i<e.length;i++)if(n=e[i],this.canPlayType(n.type)){this.src=n.src;break}}},setVideoSize:function(e,t){this.width=e,this.height=t}},mejs.PluginMediaElement=function(e,t,i){this.id=e,this.pluginType=t,this.src=i,this.events={},this.attributes={}},mejs.PluginMediaElement.prototype={pluginElement:null,pluginType:"",isFullScreen:!1,playbackRate:-1,defaultPlaybackRate:-1,seekable:[],played:[],paused:!0,ended:!1,seeking:!1,duration:0,error:null,tagName:"",muted:!1,volume:1,currentTime:0,play:function(){null!=this.pluginApi&&("youtube"==this.pluginType||"vimeo"==this.pluginType?this.pluginApi.playVideo():this.pluginApi.playMedia(),this.paused=!1)},load:function(){null!=this.pluginApi&&("youtube"==this.pluginType||"vimeo"==this.pluginType||this.pluginApi.loadMedia(),this.paused=!1)},pause:function(){null!=this.pluginApi&&("youtube"==this.pluginType||"vimeo"==this.pluginType?this.pluginApi.pauseVideo():this.pluginApi.pauseMedia(),this.paused=!0)},stop:function(){null!=this.pluginApi&&("youtube"==this.pluginType||"vimeo"==this.pluginType?this.pluginApi.stopVideo():this.pluginApi.stopMedia(),this.paused=!0)},canPlayType:function(e){var t,i,n,a=mejs.plugins[this.pluginType];for(t=0;t<a.length;t++)if(n=a[t],mejs.PluginDetector.hasPluginVersion(this.pluginType,n.version))for(i=0;i<n.types.length;i++)if(e==n.types[i])return"probably";return""},positionFullscreenButton:function(e,t,i){null!=this.pluginApi&&this.pluginApi.positionFullscreenButton&&this.pluginApi.positionFullscreenButton(Math.floor(e),Math.floor(t),i)},hideFullscreenButton:function(){null!=this.pluginApi&&this.pluginApi.hideFullscreenButton&&this.pluginApi.hideFullscreenButton()},setSrc:function(e){if("string"==typeof e)this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(e)),this.src=mejs.Utility.absolutizeUrl(e);else{var t,i;for(t=0;t<e.length;t++)if(i=e[t],this.canPlayType(i.type)){this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(i.src)),this.src=mejs.Utility.absolutizeUrl(i.src);break}}},setCurrentTime:function(e){null!=this.pluginApi&&("youtube"==this.pluginType||"vimeo"==this.pluginType?this.pluginApi.seekTo(e):this.pluginApi.setCurrentTime(e),this.currentTime=e)},setVolume:function(e){null!=this.pluginApi&&("youtube"==this.pluginType?this.pluginApi.setVolume(100*e):this.pluginApi.setVolume(e),this.volume=e)},setMuted:function(e){null!=this.pluginApi&&("youtube"==this.pluginType?(e?this.pluginApi.mute():this.pluginApi.unMute(),this.muted=e,this.dispatchEvent({type:"volumechange"})):this.pluginApi.setMuted(e),this.muted=e)},setVideoSize:function(e,t){this.pluginElement&&this.pluginElement.style&&(this.pluginElement.style.width=e+"px",this.pluginElement.style.height=t+"px"),null!=this.pluginApi&&this.pluginApi.setVideoSize&&this.pluginApi.setVideoSize(e,t)},setFullscreen:function(e){null!=this.pluginApi&&this.pluginApi.setFullscreen&&this.pluginApi.setFullscreen(e)},enterFullScreen:function(){null!=this.pluginApi&&this.pluginApi.setFullscreen&&this.setFullscreen(!0)},exitFullScreen:function(){null!=this.pluginApi&&this.pluginApi.setFullscreen&&this.setFullscreen(!1)},addEventListener:function(e,t){this.events[e]=this.events[e]||[],this.events[e].push(t)},removeEventListener:function(e,t){if(!e)return this.events={},!0;var i=this.events[e];if(!i)return!0;if(!t)return this.events[e]=[],!0;for(var n=0;n<i.length;n++)if(i[n]===t)return this.events[e].splice(n,1),!0;return!1},dispatchEvent:function(e){var t,i=this.events[e.type];if(i)for(t=0;t<i.length;t++)i[t].apply(this,e)},hasAttribute:function(e){return e in this.attributes},removeAttribute:function(e){delete this.attributes[e]},getAttribute:function(e){return this.hasAttribute(e)?this.attributes[e]:""},setAttribute:function(e,t){this.attributes[e]=t},remove:function(){mejs.Utility.removeSwf(this.pluginElement.id),mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id)}},mejs.MediaPluginBridge={pluginMediaElements:{},htmlMediaElements:{},registerPluginElement:function(e,t,i){this.pluginMediaElements[e]=t,this.htmlMediaElements[e]=i},unregisterPluginElement:function(e){delete this.pluginMediaElements[e],delete this.htmlMediaElements[e]},initPlugin:function(e){var t=this.pluginMediaElements[e],i=this.htmlMediaElements[e];if(t){switch(t.pluginType){case"flash":t.pluginElement=t.pluginApi=document.getElementById(e);break;case"silverlight":t.pluginElement=document.getElementById(t.id),t.pluginApi=t.pluginElement.Content.MediaElementJS}null!=t.pluginApi&&t.success&&t.success(t,i)}},fireEvent:function(e,t,i){var n,a,l,s=this.pluginMediaElements[e];if(s){n={type:t,target:s};for(a in i)s[a]=i[a],n[a]=i[a];l=i.bufferedTime||0,n.target.buffered=n.buffered={start:function(){return 0},end:function(){return l},length:1},s.dispatchEvent(n)}}},mejs.MediaElementDefaults={mode:"auto",plugins:["flash","silverlight","youtube","vimeo"],enablePluginDebug:!1,httpsBasicAuthSite:!1,type:"",pluginPath:mejs.Utility.getScriptPath(["mediaelement.js","mediaelement.min.js","mediaelement-and-player.js","mediaelement-and-player.min.js"]),flashName:"flashmediaelement.swf",flashStreamer:"",flashScriptAccess:"sameDomain",enablePluginSmoothing:!1,enablePseudoStreaming:!1,pseudoStreamingStartQueryParam:"start",silverlightName:"silverlightmediaelement.xap",defaultVideoWidth:480,defaultVideoHeight:270,pluginWidth:-1,pluginHeight:-1,pluginVars:[],timerRate:250,startVolume:.8,success:function(){},error:function(){}},mejs.MediaElement=function(e,t){return mejs.HtmlMediaElementShim.create(e,t)},mejs.HtmlMediaElementShim={create:function(e,t){var i,n,a=mejs.MediaElementDefaults,l="string"==typeof e?document.getElementById(e):e,s=l.tagName.toLowerCase(),u="audio"===s||"video"===s,r=u?l.getAttribute("src"):l.getAttribute("href"),o=l.getAttribute("poster"),d=l.getAttribute("autoplay"),m=l.getAttribute("preload"),c=l.getAttribute("controls");for(n in t)a[n]=t[n];return r=void 0===r||null===r||""==r?null:r,o=void 0===o||null===o?"":o,m=void 0===m||null===m||"false"===m?"none":m,d=!(void 0===d||null===d||"false"===d),c=!(void 0===c||null===c||"false"===c),i=this.determinePlayback(l,a,mejs.MediaFeatures.supportsMediaTag,u,r),i.url=null!==i.url?mejs.Utility.absolutizeUrl(i.url):"","native"==i.method?(mejs.MediaFeatures.isBustedAndroid&&(l.src=i.url,l.addEventListener("click",function(){l.play()},!1)),this.updateNative(i,a,d,m)):""!==i.method?this.createPlugin(i,a,o,d,m,c):(this.createErrorMessage(i,a,o),this)},determinePlayback:function(e,t,i,n,a){var l,s,u,r,o,d,m,c,p,h,g,f=[],v={method:"",url:"",htmlMediaElement:e,isVideo:"audio"!=e.tagName.toLowerCase()};if("undefined"!=typeof t.type&&""!==t.type)if("string"==typeof t.type)f.push({type:t.type,url:a});else for(l=0;l<t.type.length;l++)f.push({type:t.type[l],url:a});else if(null!==a)d=this.formatType(a,e.getAttribute("type")),f.push({type:d,url:a});else for(l=0;l<e.childNodes.length;l++)o=e.childNodes[l],1==o.nodeType&&"source"==o.tagName.toLowerCase()&&(a=o.getAttribute("src"),d=this.formatType(a,o.getAttribute("type")),(!(g=o.getAttribute("media"))||!window.matchMedia||window.matchMedia&&window.matchMedia(g).matches)&&f.push({type:d,url:a}));if(!n&&f.length>0&&null!==f[0].url&&this.getTypeFromFile(f[0].url).indexOf("audio")>-1&&(v.isVideo=!1),mejs.MediaFeatures.isBustedAndroid&&(e.canPlayType=function(e){return null!==e.match(/video\/(mp4|m4v)/gi)?"maybe":""}),mejs.MediaFeatures.isChromium&&(e.canPlayType=function(e){return null!==e.match(/video\/(webm|ogv|ogg)/gi)?"maybe":""}),i&&("auto"===t.mode||"auto_plugin"===t.mode||"native"===t.mode)&&(!mejs.MediaFeatures.isBustedNativeHTTPS||!0!==t.httpsBasicAuthSite)){for(n||(h=document.createElement(v.isVideo?"video":"audio"),e.parentNode.insertBefore(h,e),e.style.display="none",v.htmlMediaElement=e=h),l=0;l<f.length;l++)if("video/m3u8"==f[l].type||""!==e.canPlayType(f[l].type).replace(/no/,"")||""!==e.canPlayType(f[l].type.replace(/mp3/,"mpeg")).replace(/no/,"")||""!==e.canPlayType(f[l].type.replace(/m4a/,"mp4")).replace(/no/,"")){v.method="native",v.url=f[l].url;break}if("native"===v.method&&(null!==v.url&&(e.src=v.url),"auto_plugin"!==t.mode))return v}if("auto"===t.mode||"auto_plugin"===t.mode||"shim"===t.mode)for(l=0;l<f.length;l++)for(d=f[l].type,s=0;s<t.plugins.length;s++)for(m=t.plugins[s],c=mejs.plugins[m],u=0;u<c.length;u++)if(p=c[u],null==p.version||mejs.PluginDetector.hasPluginVersion(m,p.version))for(r=0;r<p.types.length;r++)if(d.toLowerCase()==p.types[r].toLowerCase())return v.method=m,v.url=f[l].url,v;return"auto_plugin"===t.mode&&"native"===v.method?v:(""===v.method&&f.length>0&&(v.url=f[0].url),v)},formatType:function(e,t){return e&&!t?this.getTypeFromFile(e):t&&~t.indexOf(";")?t.substr(0,t.indexOf(";")):t},getTypeFromFile:function(e){e=e.split("?")[0];var t=e.substring(e.lastIndexOf(".")+1).toLowerCase(),i=/(mp4|m4v|ogg|ogv|m3u8|webm|webmv|flv|wmv|mpeg|mov)/gi.test(t)?"video/":"audio/";return this.getTypeFromExtension(t,i)},getTypeFromExtension:function(e,t){switch(t=t||"",e){case"mp4":case"m4v":case"m4a":case"f4v":case"f4a":return t+"mp4";case"flv":return t+"x-flv";case"webm":case"webma":case"webmv":return t+"webm";case"ogg":case"oga":case"ogv":return t+"ogg";case"m3u8":return"application/x-mpegurl";case"ts":return t+"mp2t";default:return t+e}},createErrorMessage:function(e,t,i){var n=e.htmlMediaElement,a=document.createElement("div"),l=t.customError;a.className="me-cannotplay";try{a.style.width=n.width+"px",a.style.height=n.height+"px"}catch(e){}l||(l='<a href="'+e.url+'">',""!==i&&(l+='<img src="'+i+'" width="100%" height="100%" alt="" />'),l+="<span>"+mejs.i18n.t("Download File")+"</span></a>"),a.innerHTML=l,n.parentNode.insertBefore(a,n),n.style.display="none",t.error(n)},createPlugin:function(e,t,i,n,a,l){var s,u,r,o=e.htmlMediaElement,d=1,m=1,c="me_"+e.method+"_"+mejs.meIndex++,p=new mejs.PluginMediaElement(c,e.method,e.url),h=document.createElement("div");p.tagName=o.tagName;for(var g=0;g<o.attributes.length;g++){var f=o.attributes[g];f.specified&&p.setAttribute(f.name,f.value)}for(u=o.parentNode;null!==u&&null!=u.tagName&&"body"!==u.tagName.toLowerCase()&&null!=u.parentNode&&null!=u.parentNode.tagName&&null!=u.parentNode.constructor&&"ShadowRoot"===u.parentNode.constructor.name;){if("p"===u.parentNode.tagName.toLowerCase()){u.parentNode.parentNode.insertBefore(u,u.parentNode);break}u=u.parentNode}switch(e.isVideo?(d=t.pluginWidth>0?t.pluginWidth:t.videoWidth>0?t.videoWidth:null!==o.getAttribute("width")?o.getAttribute("width"):t.defaultVideoWidth,m=t.pluginHeight>0?t.pluginHeight:t.videoHeight>0?t.videoHeight:null!==o.getAttribute("height")?o.getAttribute("height"):t.defaultVideoHeight,d=mejs.Utility.encodeUrl(d),m=mejs.Utility.encodeUrl(m)):t.enablePluginDebug&&(d=320,m=240),p.success=t.success,mejs.MediaPluginBridge.registerPluginElement(c,p,o),h.className="me-plugin",h.id=c+"_container",e.isVideo?o.parentNode.insertBefore(h,o):document.body.insertBefore(h,document.body.childNodes[0]),r=["id="+c,"jsinitfunction=mejs.MediaPluginBridge.initPlugin","jscallbackfunction=mejs.MediaPluginBridge.fireEvent","isvideo="+(e.isVideo?"true":"false"),"autoplay="+(n?"true":"false"),"preload="+a,"width="+d,"startvolume="+t.startVolume,"timerrate="+t.timerRate,"flashstreamer="+t.flashStreamer,"height="+m,"pseudostreamstart="+t.pseudoStreamingStartQueryParam],null!==e.url&&("flash"==e.method?r.push("file="+mejs.Utility.encodeUrl(e.url)):r.push("file="+e.url)),t.enablePluginDebug&&r.push("debug=true"),t.enablePluginSmoothing&&r.push("smoothing=true"),t.enablePseudoStreaming&&r.push("pseudostreaming=true"),l&&r.push("controls=true"),t.pluginVars&&(r=r.concat(t.pluginVars)),e.method){case"silverlight":h.innerHTML='<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="'+c+'" name="'+c+'" width="'+d+'" height="'+m+'" class="mejs-shim"><param name="initParams" value="'+r.join(",")+'" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="'+t.pluginPath+t.silverlightName+'" /></object>';break;case"flash":mejs.MediaFeatures.isIE?(s=document.createElement("div"),h.appendChild(s),s.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="'+c+'" width="'+d+'" height="'+m+'" class="mejs-shim"><param name="movie" value="'+t.pluginPath+t.flashName+"?x="+new Date+'" /><param name="flashvars" value="'+r.join("&amp;")+'" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="'+t.flashScriptAccess+'" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>'):h.innerHTML='<embed id="'+c+'" name="'+c+'" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="'+t.flashScriptAccess+'" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="'+t.pluginPath+t.flashName+'" flashvars="'+r.join("&")+'" width="'+d+'" height="'+m+'" scale="default"class="mejs-shim"></embed>';break;case"youtube":var v;-1!=e.url.lastIndexOf("youtu.be")?(v=e.url.substr(e.url.lastIndexOf("/")+1),-1!=v.indexOf("?")&&(v=v.substr(0,v.indexOf("?")))):v=e.url.substr(e.url.lastIndexOf("=")+1),youtubeSettings={container:h,containerId:h.id,pluginMediaElement:p,pluginId:c,videoId:v,height:m,width:d},mejs.PluginDetector.hasPluginVersion("flash",[10,0,0])?mejs.YouTubeApi.createFlash(youtubeSettings,t):mejs.YouTubeApi.enqueueIframe(youtubeSettings);break;case"vimeo":var y=c+"_player";if(p.vimeoid=e.url.substr(e.url.lastIndexOf("/")+1),h.innerHTML='<iframe src="//player.vimeo.com/video/'+p.vimeoid+"?api=1&portrait=0&byline=0&title=0&player_id="+y+'" width="'+d+'" height="'+m+'" frameborder="0" class="mejs-shim" id="'+y+'" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',"function"==typeof $f){var b=$f(h.childNodes[0]);b.addEvent("ready",function(){function e(e,t,i,n){var a={type:i,target:t};"timeupdate"==i&&(t.currentTime=a.currentTime=n.seconds,t.duration=a.duration=n.duration),t.dispatchEvent(a)}b.playVideo=function(){b.api("play")},b.stopVideo=function(){b.api("unload")},b.pauseVideo=function(){b.api("pause")},b.seekTo=function(e){b.api("seekTo",e)},b.setVolume=function(e){b.api("setVolume",e)},b.setMuted=function(e){e?(b.lastVolume=b.api("getVolume"),b.api("setVolume",0)):(b.api("setVolume",b.lastVolume),delete b.lastVolume)},b.addEvent("play",function(){e(b,p,"play"),e(b,p,"playing")}),b.addEvent("pause",function(){e(b,p,"pause")}),b.addEvent("finish",function(){e(b,p,"ended")}),b.addEvent("playProgress",function(t){e(b,p,"timeupdate",t)}),p.pluginElement=h,p.pluginApi=b,mejs.MediaPluginBridge.initPlugin(c)})}else console.warn("You need to include froogaloop for vimeo to work")}return o.style.display="none",o.removeAttribute("autoplay"),p},updateNative:function(e,t){var i,n=e.htmlMediaElement;for(i in mejs.HtmlMediaElement)n[i]=mejs.HtmlMediaElement[i];return t.success(n,n),n}},mejs.YouTubeApi={isIframeStarted:!1,isIframeLoaded:!1,loadIframeApi:function(){if(!this.isIframeStarted){var e=document.createElement("script");e.src="//www.youtube.com/player_api";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t),this.isIframeStarted=!0}},iframeQueue:[],enqueueIframe:function(e){this.isLoaded?this.createIframe(e):(this.loadIframeApi(),this.iframeQueue.push(e))},createIframe:function(e){var t=e.pluginMediaElement,i=new YT.Player(e.containerId,{height:e.height,width:e.width,videoId:e.videoId,playerVars:{controls:0},events:{onReady:function(){e.pluginMediaElement.pluginApi=i,mejs.MediaPluginBridge.initPlugin(e.pluginId),setInterval(function(){mejs.YouTubeApi.createEvent(i,t,"timeupdate")},250)},onStateChange:function(e){mejs.YouTubeApi.handleStateChange(e.data,i,t)}}})},createEvent:function(e,t,i){var n={type:i,target:t};if(e&&e.getDuration){t.currentTime=n.currentTime=e.getCurrentTime(),t.duration=n.duration=e.getDuration(),n.paused=t.paused,n.ended=t.ended,n.muted=e.isMuted(),n.volume=e.getVolume()/100,n.bytesTotal=e.getVideoBytesTotal(),n.bufferedBytes=e.getVideoBytesLoaded();var a=n.bufferedBytes/n.bytesTotal*n.duration;n.target.buffered=n.buffered={start:function(){return 0},end:function(){return a},length:1}}t.dispatchEvent(n)},iFrameReady:function(){for(this.isLoaded=!0,this.isIframeLoaded=!0;this.iframeQueue.length>0;){var e=this.iframeQueue.pop();this.createIframe(e)}},flashPlayers:{},createFlash:function(e){this.flashPlayers[e.pluginId]=e;var t,i="//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid="+e.pluginId+"&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";mejs.MediaFeatures.isIE?(t=document.createElement("div"),e.container.appendChild(t),t.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="'+e.pluginId+'" width="'+e.width+'" height="'+e.height+'" class="mejs-shim"><param name="movie" value="'+i+'" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="'+options.flashScriptAccess+'" /><param name="allowFullScreen" value="true" /></object>'):e.container.innerHTML='<object type="application/x-shockwave-flash" id="'+e.pluginId+'" data="'+i+'" width="'+e.width+'" height="'+e.height+'" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="'+options.flashScriptAccess+'"><param name="wmode" value="transparent"></object>'},flashReady:function(e){var t=this.flashPlayers[e],i=document.getElementById(e),n=t.pluginMediaElement;n.pluginApi=n.pluginElement=i,mejs.MediaPluginBridge.initPlugin(e),i.cueVideoById(t.videoId);var a=t.containerId+"_callback";window[a]=function(e){mejs.YouTubeApi.handleStateChange(e,i,n)},i.addEventListener("onStateChange",a),setInterval(function(){mejs.YouTubeApi.createEvent(i,n,"timeupdate")},250),mejs.YouTubeApi.createEvent(i,n,"canplay")},handleStateChange:function(e,t,i){switch(e){case-1:i.paused=!0,i.ended=!0,mejs.YouTubeApi.createEvent(t,i,"loadedmetadata");break;case 0:i.paused=!1,i.ended=!0,mejs.YouTubeApi.createEvent(t,i,"ended");break;case 1:i.paused=!1,i.ended=!1,mejs.YouTubeApi.createEvent(t,i,"play"),mejs.YouTubeApi.createEvent(t,i,"playing");break;case 2:i.paused=!0,i.ended=!1,mejs.YouTubeApi.createEvent(t,i,"pause");break;case 3:mejs.YouTubeApi.createEvent(t,i,"progress")}}},window.onYouTubePlayerAPIReady=function(){mejs.YouTubeApi.iFrameReady()},window.onYouTubePlayerReady=function(e){mejs.YouTubeApi.flashReady(e)},window.mejs=mejs,window.MediaElement=mejs.MediaElement,function(e,t){"use strict";var i={locale:{language:t.i18n&&t.i18n.locale.language||"",strings:t.i18n&&t.i18n.locale.strings||{}},ietf_lang_regex:/^(x\-)?[a-z]{2,}(\-\w{2,})?(\-\w{2,})?$/,methods:{}};i.getLanguage=function(){var e=i.locale.language||window.navigator.userLanguage||window.navigator.language;return i.ietf_lang_regex.exec(e)?e:null},"undefined"!=typeof mejsL10n&&(i.locale.language=mejsL10n.language),i.methods.checkPlain=function(e){var t,i,n={"&":"&amp;",'"':"&quot;","<":"&lt;",">":"&gt;"};e=String(e);for(t in n)n.hasOwnProperty(t)&&(i=new RegExp(t,"g"),e=e.replace(i,n[t]));return e},i.methods.t=function(e,t){return i.locale.strings&&i.locale.strings[t.context]&&i.locale.strings[t.context][e]&&(e=i.locale.strings[t.context][e]),i.methods.checkPlain(e)},i.t=function(e,t){if("string"==typeof e&&e.length>0){var n=i.getLanguage();return t=t||{context:n},i.methods.t(e,t)}throw{name:"InvalidArgumentException",message:"First argument is either not a string or empty."}},t.i18n=i}(document,mejs),function(e){"use strict";"undefined"!=typeof mejsL10n&&(e[mejsL10n.language]=mejsL10n.strings)}(mejs.i18n.locale.strings),mejs.MediaElementDefaults.pluginPath="",mejs.MediaElementDefaults.flashName="/assets/mediaelement_rails/flashmediaelement-eec1f40c14bef5fc569130e1bdd097186ddbfb730778aed98768e1991ed36817.swf",mejs.MediaElementDefaults.silverlightName="/assets/mediaelement_rails/silverlightmediaelement-ae3f73a6a29bc3400f559adf69091cb5b9eb3215471dfb2016f153a8612427bd.xap";