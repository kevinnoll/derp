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
  	mChampionNames : null,
  	mChampionImageUrls : null,

  	init : function(){
  		this.loadImages();
  		this.setup();
  		this.create();
  	},

  	loadImages : function(){
  		var that = this;
  		this.mChampionNames = {};
  		this.mChampionImageUrls = {};
  		$.each(_DATA_.participants,function(index,value){
			$.get("https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/" + value.championId + "?champData=info&api_key=08d1d2cc-79c5-4dc2-9aa1-50b000cfcd20", function( data ) {
			  that.mChampionNames[value.participantId] = data.key;
			  var championImageUrl = "http://ddragon.leagueoflegends.com/cdn/5.6.1/img/champion/" + data.key + ".png";
			  that.mChampionImageUrls[value.participantId] = championImageUrl;
			  d3.select(".player_" + value.participantId)
			  	.append("svg:image")
	   			.attr('x',-10)
	   			.attr('y',-10)
	   			.attr('width', 20)
	   			.attr('height', 20)
	   			.attr("xlink:href",championImageUrl);
			});
  		})
 
  	},

  	setup : function(){
  		this.width = 800;
  		this.height = 800;
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
  	},

  	create : function(){
  		this.createSVG();
  		this.createBackgroundImage();
  		this.createField();
  		this.createPlayers();
  	},

  	createPlayers : function(){
  		var that = this;
  		var aFrames = _DATA_.timeline.frames;
  		var aPlayers = _DATA_.participants;
  		var oPlayersInitial = aFrames[0].participantFrames;
  		var aPlayersInitial = $.map(oPlayersInitial, function(value, index) {
    		return [value];
		});

  		var oPlayers = this.field.selectAll(".player")
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
            .attr("r", 5)
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

  	createBackgroundImage : function(){
  		this.svg.append("svg:image")
   			.attr('x',-15)
   			.attr('y',5)
   			.attr('width', 800)
   			.attr('height', 800)
   			.attr("xlink:href","img/map.jpg")
  	},

  	createSVG : function(){
  		this.svg = d3.select("body").append("svg")
    		.attr("width", this.width)
    		.attr("height", this.height);
  	},

  	createField : function(){
		this.field = this.svg.append("g")
  			.classed(".field", true);

  	}
  }

  rito.init()

})();