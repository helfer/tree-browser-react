var TreeNode = (function($){
  "use strict";

  // A simple class to represent a tree node and allow modifications.
  // arg node: object with these properties: name, collapsed, children
  // opt. arg ancestor: a TreeNode to be set as the ancestor of this node
  var TreeNode = function TreeNode( node, ancestor ){
    if(typeof node !== "object"){
      throw "TreeNode constructor takes a node object as argument";
    }
    var that = this;

    this.name = node.name;
    this.collapsed = !!node.collapsed; // evaluates to false if node.collapsed is undefined
    this.children = [];
    this.ancestor = ancestor;
    this.key = node.key;

    this._childKeys = {};

    if( node.children ){
      $.each( node.children, function( i, child ){
        var tn = new TreeNode( child, that );
        that.addChildAtPosition( tn, -1 );
      });
    }
  };


  // adds the child at the given position. If position is -1 or larger than
  // the number of children, it adds the child at the end
  // child must be a TreeNode
  TreeNode.prototype.addChildAtPosition = function( child, position ){
    if( position < 0 || position >= this.children.length ){
      this.children.push( child );
    } else {
      this.children.splice( position, 0, child);
    }
    child.setAncestor( this );
    this.assignChildKey( child );
    this._changed();
  };


  // set ancestor
  TreeNode.prototype.setAncestor = function( node ){
    this.ancestor = node;
  };

  // assign a unique key to this child
  TreeNode.prototype.assignChildKey = function( child ){
    var key = child.name.replace('-','').substring(0,20);
    if( this._childKeys.hasOwnProperty(key) ){
      //duplicate key
      key = key + '-' + this._childKeys[key];
      this._childKeys[key]++;
    } else {
      //we count the number of duplicates
      this._childKeys[key] = 1;
    }
    // not using setKey because we don't want to trigger onChanged
    child.key = key;
  };


  TreeNode.prototype.setKey = function( key ){
    var oldKey = this.key;
    this.key = key;
    if( key !== oldKey ){
      this._changed();
    }
  };

  // set the name of this node
  TreeNode.prototype.setName = function( name ){
    var old_name = this.name;
    this.name = name;
    if( old_name != this.name ){
      this._changed();
    }
  };


  // toggles the collapsed state of this node, which determines if
  // subnodes are shown
  TreeNode.prototype.toggleCollapse = function(){
    this.collapsed = !this.collapsed;
    this._changed();
  };


  // removes one child (argument must be the child node)
  TreeNode.prototype.removeChild = function( child ){
    var index = this.children.indexOf( child );
    if( index > -1 ){
      this.children.splice( index, 1 );
      this._changed();
    }
  };


  // returns the list of all nodes in this node's subtree in preorder
  TreeNode.prototype.getNodeList = function(){
    var list = [ this ];
    $.each( this.children, function( i, child ){
      list.push.apply( list, child.getNodeList() );
    });
    return list;
  };


  // set a function to be called when this node's subtree changes
  TreeNode.prototype.setOnChangeListener = function( callback ){
    this.onChange = callback;
  };

  TreeNode.prototype._changed = function(){
    if( this.onChange ){
      this.onChange();
    }
    if( this.ancestor ){
      this.ancestor._changed();
    }
  };

  return TreeNode;
}($));
