var GetUrlVars = {};
(function(){
  GetUrlVars = function(){
        if( !(this instanceof GetUrlVars))
            return new GetUrlVars();

		this.winLoc = window.location;

		if(this.winLoc.search.length > 0){
			var urlVarString = this.winLoc.search.replace("?", "");
			var urlVarStringArr = urlVarString.split("&");
			for(var i = 0; i < urlVarStringArr.length; i++){
				var currVarArr = urlVarStringArr[i].split("=");
				if(currVarArr[0].length > 0 && currVarArr[1]){
					this[currVarArr[0]] = currVarArr[1];
				}
			}
		}
	};
})();
