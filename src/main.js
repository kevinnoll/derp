(function(){
  "use strict";

  var rito = {
  	width : null,
  	height : null,
  	x : null,
  	y : null,
  	xAxis : null,
  	yAxis : null,
  	svg : null,
  	field : null,
  	data : null,

  	init : function(){
  		this.setup();
  		this.create();
  	},

  	setup : function(){
  		var that = this;
  		this.width = 400;
  		this.height = 400;
  		this.x = d3.scale.linear()
  			.domain([0,15000])
  			.range([0, this.width]);
  		this.y = d3.scale.linear()
			.domain([0,15000])
  			.range([this.height, 0]);
  		this.xAxis = d3.svg.axis()
  			.scale(this.x);
  		this.yAxis = d3.svg.axis()
  			.scale(this.y);
  		this.svg = d3.select("body").append("svg")
    		.attr("width", this.width)
    		.attr("height", this.height);
    	this.field = this.svg.append("g")
  			.classed(".field", true);
  		var aFrames = _DATA_.timeline.frames;
  		var aPlayers = _DATA_.participants;
  		var oPlayersInitial = aFrames[0].participantFrames;
  		var aPlayersInitial = $.map(oPlayersInitial, function(value, index) {
    		return [value];
		});

  		var oPlayers = this.field.selectAll("circle")
  			.data(aPlayersInitial)
  			.enter()
  			.append("g")
  			.attr("class", function(d){
  				return "player_"+d.participantId;
  			})
  			.attr("transform", function(d){
  				return "translate(" + that.x(d.position.x) + "," + that.y(d.position.y) + ")";
  			});

  		oPlayers.append("circle")
            .attr("x", 7)
            .attr("y", 7)
            .attr("r", 3)
            .style("fill", function(d){
            	for(var i = 0; i < aPlayers.length; i++){
            		if(aPlayers[i].participantId === d.participantId){
            			if(aPlayers[i].teamId === 100){
            				return "red";
            			} else {
            				return "blue";
            			}
            		}
            	}
            })
            .style("stroke-width", 1)
            .style("stroke","black");

  	},

  	create : function(){

  	}
  }

  rito.init()

})();