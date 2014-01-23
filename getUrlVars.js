var RAMP_URLVars = {};

(function(){
    RAMP_URLVars = function( urlFields, path ){
        if( !(this instanceof RAMP_URLVars))
            return new RAMP_URLVars( urlFields, path );

        this.scriptLocation = '';
        // Check to see if you have passed an array of terms to filter for in the URL
        this.urlFields = (typeof(urlFields) != 'undefined')? urlFields : [];
        // Check if you passed a reference of the locations object, if not it it will use the locations object of the page that loaded the script.
        this.winLoc = (typeof(path) == 'undefined')? window.location : path;
        
        // Get our (this script) location in order to include it in the DFP iFrames
        var scriptsArr = document.getElementsByTagName("script");
        for(var j = 0; j < scriptsArr.length; j++){
            if(scriptsArr[j]['src'].search('getURLvars.js') > 0){
                this.scriptLocation = scriptsArr[j].src;
            }
        }

        if(typeof(this.winLoc.href) != 'undefined'){
            if(this.winLoc.href.length > 0){
                /* Replace # characters with endodeURIComponent */
                if(this.winLoc.href.indexOf('#') > -1){
                    this.winLoc.href = this.winLoc.href.replace(/#/g, encodeURIComponent('#'));
                }

                /* If an array of fields has been passed it will be use to location the URL variables and setting the key:value of that entry in the return object. */
                if(this.urlFields.length > 0){
                    var termLocations = [];
                    
                    for(var h = 0; h < this.urlFields.length; h++){
                        if(this.winLoc.href.indexOf( this.urlFields[h] + '=' ) > -1){
                            termLocations.push( this.urlFields[h] + '=' );
                            
                            var startingPoint = this.winLoc.href.indexOf( this.urlFields[h] + '=' );
                            var stoppingPoint = this.winLoc.href.indexOf(this.urlFields[h+1]);
                            var fixedValue = '';
                            
                            if(h == (this.urlFields.length-1)){
                                stoppingPoint = this.winLoc.href.length + 1;
                            }
                            
                            /* Console statement used to debug what you are getting in return from the filters you applied on the URL */
                            /*console.log('var: ' + this.urlFields[h] + ' | length: ' + this.urlFields.length + ' | index: ' + h + ' | startingPoint: ' + startingPoint + ' | stoppingPoint: ' + stoppingPoint + ' | ' + 'true/false: ' +  (h == (this.urlFields.length)) );
                            
                            console.log(this.winLoc.href.substr( startingPoint, (stoppingPoint - (startingPoint+1) ) ));*/

                            // Set the key:value pairs for the filtered URL variables
                            this[this.urlFields[h]] = this.winLoc.href.substr( startingPoint, (stoppingPoint - (startingPoint+1) ) ).replace(this.urlFields[h] + '=', '');
                        }
                    }
                }
                else{
                    // This is the default script, it does not take into account URLs that include variables with URLs in them. To avoid issue with this, passing into this object an array of URL variable you want to filter for.
                    var windLocSearch = this.winLoc.href;
                    var f1QLoc = windLocSearch.indexOf("?");
                    var queryParams = windLocSearch.substr(f1QLoc + 1);
                    var urlVarStringArr = queryParams.split("&");

                    for(var i = 0; i < urlVarStringArr.length; i++){
                        var currVarArr = urlVarStringArr[i].split("=");
                        if(currVarArr[0].length > 0 && currVarArr[1]){
                            this[currVarArr[0]] = currVarArr[1];
                        }
                    }
                }
            }
        }
    };

    // Use this function to get the filepath(full) of the Javascript and CSS files loaded into the page
    RAMP_URLVars.prototype = {
        getFilePath: function( filename, extension ){
            var thisRef = this;
            var sourceAttribute = '';
            var tagArray = [];

            switch(extension){
                case 'js':
                    tagArray = document.getElementsByTagName("script");
                    sourceAttribute = 'src';
                break;
                case 'css':
                    tagArray = document.getElementsByTagName("link");
                    sourceAttribute = 'href';
                break;

                default:
                break; 
            }

            for(var j = 0; j < tagArray.length; j++){
                if(tagArray[j][sourceAttribute].search( filename + '.' + extension ) > 0){
                    return tagArray[j][sourceAttribute].replace(filename + '.' + extension, '');
                }
                
            }
        }
    };
})();