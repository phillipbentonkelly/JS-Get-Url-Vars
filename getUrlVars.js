var MapUrlVars = {};
(function(){
	MapUrlVars = function(){
        if( !(this instanceof MapUrlVars))
            return new MapUrlVars();

        this.response = { found: false, queryParams: {}, match: {} };
		this.queryScope = window.location;

		if(this.queryScope.search.length > 0){
			var urlVarString = this.queryScope.search.replace("?", "");
			var urlVarStringArr = urlVarString.split("&");
			for(var i = 0; i < urlVarStringArr.length; i++){
				var currVarArr = urlVarStringArr[i].split("=");
				if(currVarArr[0].length > 0 && currVarArr[1]){
					this[currVarArr[0]] = currVarArr[1];

					this.response.queryParams[currVarArr[0]] = currVarArr[1];
				}
			}
		}
	};

	MapUrlVars.prototype = {
		isAvailable: function( queryParam, type ){
			if(typeof(this.response.queryParams[queryParam]) === type && this.response.queryParams[queryParam].length > 0){
				this.response.found = true;
				this.response.match = this.response.queryParams[queryParam];
			}

			return this.response;
		}
	};
	//MapUrlVars().isAvailable('q', 'string');
})();
