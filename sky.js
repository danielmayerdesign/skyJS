var Sky = function Sky(layers, density) {
	layers = typeof layers !== 'undefined' ? layers : 3;
	density = typeof density !== 'undefined' ? density : 5;
	density = density > 10 ? 10 : density;
	density = density <= 0 ? 1 : density;
	var that = this;

	var centerX = window.innerWidth / 2;
	var centerY = window.innerHeight / 2;
	var style = document.createElement("STYLE");
	var layerNodes;

	var sky = document.createElement("DIV");
	sky.id = "sky";
	sky.dataset.allowbreathe = true;
	sky.style.height = window.innerHeight + "px";
	sky.style.perspectiveOrigin = centerX + "px " + centerY + "px";
	style.innerHTML = "#sky { overflow:hidden; position: relative; perspective: 100px !important; perspective-origin: 500px 500px; background: #111; background: radial-gradient(#030303, #0e1015); } #sky .layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; transform: translateZ(0px); } #sky .star { position: absolute; width: 2px; height: 2px; background: #fff; border-radius: 1px; } </style>";

	document.body.appendChild(sky);
	document.head.appendChild(style);

	for (var i = 0; i < layers; i++ ) {
		var newLayer = document.createElement("DIV");
		var starsCount = density * (200*(0.5/(i+1)));
		var fracComplete = (i+1) / layers;
		var op = fracComplete + 0.1;

		newLayer.className = "layer layer" + i;
		newLayer.style.zIndex = i;
		newLayer.style.opacity = op;
		newLayer.dataset.stars = starsCount;
		newLayer.dataset.zoom = 1 + 2 * Math.pow(1.5, i);
		document.getElementById("sky").appendChild(newLayer);
	}

	layerNodes = document.getElementsByClassName("layer");

	function initStars( layer ) {
		var starsCount = layer.dataset.stars;
		var winWidth = window.innerWidth;
		var winHeight = window.innerHeight;

		for ( var i = 0; i < starsCount; i++ ) {
			var star = document.createElement("DIV");
			var xVal = Math.random() * winWidth;
			var yVal = Math.random() * winHeight;
			var blue = "rgb(255," + (255 - Math.ceil(10 * Math.random())) + "," + (255 - Math.ceil(20 * Math.random())) + ")";
			var red = "rgb(" + (255 - Math.ceil(20 * Math.random())) + ",255,255)";

			console.log(red);

			star.className = "star";
			star.style.left = xVal + "px";
			star.style.top = yVal + "px";

			if ( i%2 == 0 ) {
				star.style.backgroundColor = blue;
			} else {
				star.style.backgroundColor = red;
			}

			if ( i%60 == 0 && layer.className.indexOf("0") > -1 ) {
				var whichGal = Math.ceil(6 * Math.random());
				var rotate = Math.floor(180 * Math.random());
				star.innerHTML = "<img src='images/galaxy" + whichGal + ".png' alt='glaxy' width='20' />";
				star.style.WebkitTransform = "rotate(" + rotate + "deg)";
				star.style.MozTransform = "rotate(" + rotate + "deg)";
				star.style.MsTransform = "rotate(" + rotate + "deg)";
				star.style.OTransform = "rotate(" + rotate + "deg)";
				star.style.transform = "rotate(" + rotate + "deg)";
			}

			layer.appendChild( star );
		}
	};

	this.breathe = function breathe( speed ) {
		window.onload = (function() {
			speed = typeof speed === 'undefined' ? 10000 : speed * 1000;

			for ( var i = 0; i < layerNodes.length; i++ ) {
				var layer = layerNodes[i];
				var zoom = layer.dataset.zoom;

				layer.style.WebkitTransition = "-webkit-transform "+speed+"ms ease-in-out";
				layer.style.MozTransition = "-moz-transform "+speed+"ms ease-in-out";
				layer.style.MsTransition = "-ms-transform "+speed+"ms ease-in-out";
				layer.style.OTransition = "-o-transform "+speed+"ms ease-in-out";
				layer.style.transition = "transform "+speed+"ms ease-in-out";

				layer.style.WebkitTransform = "translateZ(0.1px)";
				layer.style.MozTransform = "translateZ(0.1px)";
				layer.style.MsTransform = "translateZ(0.1px)";
				layer.style.OTransform = "translateZ(0.1px)";
				layer.style.transform = "translateZ(0.1px)"; // Rendering bug fix -- apparently an initial nonzero value is needed to jumpstart the rendering engine

				breatheIn( layer );
			}

			function breatheIn( layer ) {
				if ( sky.dataset.allowbreathe === 'false' ) { return; }
				
				layer.style.transform = "translateZ(" + layer.dataset.zoom + "px)";
				setTimeout(function() {
					breatheOut( layer );
				}, speed);
			}
			function breatheOut( layer ) {
				if ( sky.dataset.allowbreathe === 'false' ) { return; }
				
				layer.style.transform = "translateZ(0px)";
				setTimeout(function() {
					breatheIn( layer );
				}, speed);
			}
		});
	};

	this.breathe.stop = function () {
		sky.dataset.allowbreathe = false;
	};

	this.zoomIn = function zoomIn( speed, zoom ) {
		window.onload = (function() {
			speed = typeof speed === 'undefined' ? 2500 : speed * 1000;

			for ( var i = 0; i < layerNodes.length; i++ ) {
				var layer = layerNodes[i];
				zoom = typeof zoom === 'undefined' ? layer.dataset.zoom * 2 : layer.dataset.zoom * (zoom/3);

				layer.style.WebkitTransition = "-webkit-transform "+speed+"ms ease-in-out";
				layer.style.MozTransition = "-moz-transform "+speed+"ms ease-in-out";
				layer.style.MsTransition = "-ms-transform "+speed+"ms ease-in-out";
				layer.style.OTransition = "-o-transform "+speed+"ms ease-in-out";
				layer.style.transition = "transform "+speed+"ms ease-in-out";

				layer.style.WebkitTransform = "translateZ(0.1px)";
				layer.style.MozTransform = "translateZ(0.1px)";
				layer.style.MsTransform = "translateZ(0.1px)";
				layer.style.OTransform = "translateZ(0.1px)";
				layer.style.transform = "translateZ(0.1px)"; // Rendering bug fix -- apparently an initial nonzero value is needed to jumpstart the rendering engine

				layer.style.transform = "translateZ(" + zoom + "px)";
			}
		});
	};

	for ( var i = 0; i < layerNodes.length; i++ ) {
		initStars( layerNodes[i] );
	}
};