var affplayer = {
	that:this,

	playStatu:"none",

	scripts:new Object(),

	script:Array(),

	scriptId:[],

	loaded:0,

	getAffiscript : function(){
		
		this.scripts = document.getElementsByTagName('script');
		
		for(i=0; i<this.scripts.length; i++){
			if(this.scripts[i].id.match(/setAffplayer/)){
				this.script.push(this.scripts[i]);
				this.scriptId.push(this.scripts[i].id);
			}
		}
		return this.script;
	},

	getValuse : function(i){
		var result = new Object();

			if(this.script[i].id.match(this.scriptId[i])){
				var query = this.script[i].src.substring( this.script[i].src.indexOf( '?' ) + 1 );
						
				var parameters = query.split( '&' );
				
			    for( var i = 0; i < parameters.length; i++ )
			    {
			        var element = parameters[i].split( '=' );
			        var paramName = decodeURIComponent( element[ 0 ] );
			        var paramValue = decodeURIComponent( element[ 1 ] );
			        result[ paramName ] = decodeURIComponent( paramValue );
			    }
			}
	    return result;
	},

	configOs : function(){
		var ua = navigator.userAgent.toLowerCase();
		return (ua.indexOf( 'chrome' ) != -1 ) ? 1: 0;
		//return (ua.match(/iPhone|iPad|Android|Arrows|Xperia|Galaxy|Aquos|Xperia|DIGNO|iOS7|Mobile|DoCoMo|J-PHONE|MOT|Vodafone|SoftBank|DDIPOCKET|WILLCOM|BlackBerry|Opera Mini|FOMA|Android|HTC|Motorola|PSP|DS|Nitro/))?"mobile":'pc';
	},

	setUpPlayer : function(os,o){
			var scriptid = 'setAffplayer'+o.id;
			var script = document.getElementById(scriptid);
			var div = document.createElement('div');
			div.id = "div"+o.id;
			var coverHeight = o.h - 30;
			var code = '<span style="display:block; position:relative;">'
			code += '<a style="display:block; position:absolute; z-index:100;"';
			code += ' href="http://click.dtiserv2.com/Direct/8881888-'+o.siteid+'-'+o.affid+'/moviepages/'+o.id+'/index.html" target="_blank">';
			code += '<img style="margin: 1em;background-color: rgba(0, 0, 0, 0.3);padding: 0 5px;border-radius: 10px;" src="//'+o.url+'/images/embed-logo.png"></a>';
			code += '<video';
			if(os == 1){
			code += ' onclick="affplayer.checkf(this);"';		
			}
			code += ' id="affvideo'+o.id+'" src="'+o.video+'" poster="'+o.img+'" width="'+o.w+'" height="'+o.h+'" type="video/mp4" controls></video>';
			code += '</span>';
			div.innerHTML = code;
			script.parentNode.insertBefore(div, script.nextSibling);		
	},
	
	setEventListener : function(id,o){
		var v = document.getElementById(id);
		v.addEventListener('play',function(e){
			affplayer.playStatu = "playing"
		},false)
	},

	checkf : function(o){	
		setTimeout(function(){
			if(affplayer.playStatu != "playing"){
				affplayer.playStatu = "playing"
				o.play();
				return false;
			}else{
				affplayer.playStatu = "none"
				o.pause();
				return false;
			}
		},800);
		
	}

};



var affplayersrc = affplayer.getAffiscript();

if(document.addEventListener){
	
      document.addEventListener("DOMContentLoaded", function(event) {
      	affplayer.loaded ++;
      	if(affplayer.loaded == affplayersrc.length){
			for(i=0; i<affplayersrc.length; i++){
				var affplayerObjValue = affplayer.getValuse(i);
				affplayer.setUpPlayer(affplayer.configOs(),affplayerObjValue);
			}
		}
  });
}
else if( document.attachEvent ){
    // DOMContentLoadedがサポートされない環境 (IE8以前) 向け
    var CheckReadyState = function(){
        if( document.readyState == 'complete' ){
            document.detachEvent( 'onreadystatechange', CheckReadyState );
            affplayer.loaded ++;
      		if(affplayer.loaded == affplayersrc.length){
	            for(i=0; i<affplayersrc.length; i++){
					var affplayerObjValue = affplayer.getValuse(i);
					affplayer.setUpPlayer(affplayer.configOs(),affplayerObjValue);
				}
			}
        }
    }
    document.attachEvent( 'onreadystatechange', CheckReadyState );
}