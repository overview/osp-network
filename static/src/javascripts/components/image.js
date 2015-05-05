

var _ = require('lodash');
var Backbone = require('backbone');
var React = require('react');
var Fluxxor = require('fluxxor');
var L = require('leaflet');
var router = require('../router');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render the image container.
   */
  render: function() {
    return <div id="image"></div>;
  },


  /**
   * Spin up the image viewer.
   */
  componentDidMount: function() {
    this._initLeaflet();
    //this._initEvents();
    //this._initStores();
  },


  /**
   * Initialize OpenLayers.
   */
  _initLeaflet: function() {

    var d = 220000; // TODO: Env-ify.

    this.map = L.map('image').setView(new L.LatLng(0,0), 0);

    L.tileLayer.zoomify('/static/tiles/', {
      width: d,
      height: d,
      tolerance: 0.8,
      detectRetina: true,
      //tileSize: 128
    }).addTo(this.map);

  },


  /**
   * Publish move and click events.
   */
  _initEvents: function() {

    // When the map is moved.
    this.map.on('moveend', _.bind(this.onMove, this));

    // When the map is clicked.
    this.map.on('click', _.bind(this.onClick, this));

  },


  /**
   * Listen for store changes.
   */
  _initStores: function() {
    this.focusStore = this.getFlux().store('focus');
    this.focusStore.on('change', _.bind(this.focus, this));
  },


  /**
   * When the map is moved.
   *
   * @param {Object} e - The moveend event.
   */
  onMove: function(e) {

    var c = this.view.getCenter();
    var z = this.view.getZoom();

    var x = c[0].toFixed(4);
    var y = c[1].toFixed(4);

    Backbone.history.navigate([x, y, z].join('/'), {
      replace: true
    });

  },


  /**
   * When the map is clicked.
   *
   * @param {Object} e - The click event.
   */
  onClick: function(e) {
    console.log(e);
  },


  /**
   * Apply a new focus position.
   */
  focus: function() {
    var focus = this.focusStore.getState().focus;
    this.view.setCenter([focus.x, focus.y]);
    this.view.setZoom(focus.z);
  }


});





/*
 * L.TileLayer.Zoomify display Zoomify tiles with Leaflet
 */

L.TileLayer.Zoomify = L.TileLayer.extend({
	options: {
		continuousWorld: true,
		tolerance: 0.8
	},

	initialize: function (url, options) {
		options = L.setOptions(this, options);
		this._url = url;

    	var imageSize = L.point(options.width, options.height),
	    	tileSize = options.tileSize;

    	this._imageSize = [imageSize];
    	this._gridSize = [this._getGridSize(imageSize)];

        while (parseInt(imageSize.x) > tileSize || parseInt(imageSize.y) > tileSize) {
        	imageSize = imageSize.divideBy(2).floor();
        	this._imageSize.push(imageSize);
        	this._gridSize.push(this._getGridSize(imageSize));
        }

		this._imageSize.reverse();
		this._gridSize.reverse();

        this.options.maxZoom = this._gridSize.length - 1;
	},

	onAdd: function (map) {
		L.TileLayer.prototype.onAdd.call(this, map);

		var mapSize = map.getSize(),
			zoom = this._getBestFitZoom(mapSize),
			imageSize = this._imageSize[zoom],
			center = map.options.crs.pointToLatLng(L.point(imageSize.x / 2, imageSize.y / 2), zoom);

		map.setView(center, zoom, true);
	},

	_getGridSize: function (imageSize) {
		var tileSize = this.options.tileSize;
		return L.point(Math.ceil(imageSize.x / tileSize), Math.ceil(imageSize.y / tileSize));
	},

	_getBestFitZoom: function (mapSize) {
		var tolerance = this.options.tolerance,
			zoom = this._imageSize.length - 1,
			imageSize, zoom;

		while (zoom) {
			imageSize = this._imageSize[zoom];
			if (imageSize.x * tolerance < mapSize.x && imageSize.y * tolerance < mapSize.y) {
				return zoom;
			}
			zoom--;
		}

		return zoom;
	},

	_tileShouldBeLoaded: function (tilePoint) {
		var gridSize = this._gridSize[this._map.getZoom()];
		return (tilePoint.x >= 0 && tilePoint.x < gridSize.x && tilePoint.y >= 0 && tilePoint.y < gridSize.y);
	},

	_addTile: function (tilePoint, container) {
		var tilePos = this._getTilePos(tilePoint),
			tile = this._getTile(),
			zoom = this._map.getZoom(),
			imageSize = this._imageSize[zoom],
			gridSize = this._gridSize[zoom],
			tileSize = this.options.tileSize;

		if (tilePoint.x === gridSize.x - 1) {
			tile.style.width = imageSize.x - (tileSize * (gridSize.x - 1)) + 'px';
		}

		if (tilePoint.y === gridSize.y - 1) {
			tile.style.height = imageSize.y - (tileSize * (gridSize.y - 1)) + 'px';
		}

		L.DomUtil.setPosition(tile, tilePos, L.Browser.chrome || L.Browser.android23);

		this._tiles[tilePoint.x + ':' + tilePoint.y] = tile;
		this._loadTile(tile, tilePoint);

		if (tile.parentNode !== this._tileContainer) {
			container.appendChild(tile);
		}
	},

	getTileUrl: function (tilePoint) {
		return this._url + 'TileGroup' + this._getTileGroup(tilePoint) + '/' + this._map.getZoom() + '-' + tilePoint.x + '-' + tilePoint.y + '.jpg';
	},

	_getTileGroup: function (tilePoint) {
		var zoom = this._map.getZoom(),
			num = 0,
			gridSize;

		for (z = 0; z < zoom; z++) {
			gridSize = this._gridSize[z];
			num += gridSize.x * gridSize.y;
		}

		num += tilePoint.y * this._gridSize[zoom].x + tilePoint.x;
      	return Math.floor(num / 256);;
	}

});

L.tileLayer.zoomify = function (url, options) {
	return new L.TileLayer.Zoomify(url, options);
};
