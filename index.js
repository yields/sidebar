
/**
 * export `Sidebar`
 */

module.exports = Sidebar;

/**
 * map
 */

var map = {
    bottom: ['bottom', 'height']
  , left: ['left', 'width']
  , right: ['right', 'width']
  , top: ['top', 'height']
};

/**
 * Initialize new `Sidebar` with `el`.
 * 
 * @param {Element} el
 * @param {String} location
 */

function Sidebar(el, location){
  if (!(this instanceof Sidebar)) return new Sidebar(el, location);
  if (!el) throw new TypeError('element is required');
  this.location = location || 'left';
  this.map = map[this.location];
  this.rect = el.getBoundingClientRect();
  this.el = el;
}

/**
 * get / set the sidebar state.
 * 
 * @param {String} state
 * @return {Sidebar|String}
 */

Sidebar.prototype.state = function(state){
  if (!state) return this._state || 'closed';
  this._state = state;
  return this;
};

/**
 * toggle open / close.
 * 
 * @return {Sidebar}
 */

Sidebar.prototype.toggle = function(){
  return 'closed' == this.state()
    ? this.open()
    : this.close();
};

/**
 * open sidebar.
 * 
 * @return {Sidebar}
 */

Sidebar.prototype.open = function(){
  var parent = this.el.parentNode
    , rect = this.rect
    , map = this.map
    , el = this.el
    , prect;

  prect = parent.getBoundingClientRect();
  parent.style.position = 'absolute';
  parent.style[map[1]] = prect[map[1]] + 'px';
  parent.style[map[0]] = rect[map[1]] + 'px';
  el.style[map[0]] = 0 + 'px';
  this.state('open');
  return this;
};

/**
 * close sidebar.
 * 
 * @return {sidebar}
 */

Sidebar.prototype.close = function(){
  var parent = this.parent
    , rect = this.rect
    , map = this.map
    , el = this.el;

  parent.style[map[0]] = 0 + 'px';
  el.style[map[0]] = '-' + rect[map[1]] + 'px';
  this.state('closed');
  return this;
};
