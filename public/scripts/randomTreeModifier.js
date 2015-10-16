/*
 * @flow
 */

var randomTreeModifier = (function($){
  "use strict";

  var makeRandomName = function makeRandomName() {
    var names = ['Apples', 'Oranges', 'Pears', 'Bananas'];
    return names[randint(0, names.length - 1)] + ' ' + randint(10, 99);
  };

  //changes the last word/number or adds number if no word given
  var modifyNameRandomly = function modifyNameRandomly(name){
    var lastSpacePos = name.lastIndexOf(' ');
    if( lastSpacePos > -1 ){
      return name.substring(0, lastSpacePos) + ' ' + randint(10, 99);
    } else {
      return name + ' ' + randint(10, 99);
    }
  };

  var randint = function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var makeRandomNode = function makeRandomNode() {

    var name = makeRandomName();
    var isCollapsed = Math.random() < 0.5;
    var node = {
      name: name,
      collapsed: isCollapsed,
      children: []
    };

    return new TreeNode(node);
  };


  // make a random modification to the tree. type can be 'add', 'delete' or 'rename'
  var makeRandomModification = function makeRandomModification(tree, type) {
    //pick a random modification
    //make adding more likely than deleting to balance things a bit
    var modifications = ['add', 'add', 'delete', 'rename'];
    var mod = type || modifications[randint(0, modifications.length - 1)];

    //pick a random node that should be affected
    var nodeList = tree.getNodeList();
    var node;
    if (nodeList.length === 1) {
      //never delete or rename the root
      mod = 'add';
      node = tree;
    } else {
      node = nodeList[randint(1, nodeList.length - 1)];
    }

    // apply modification
    if (mod === 'add') {
      var child = makeRandomNode();
      node.addChildAtPosition(child, randint(0, node.children.length));
    } else if (mod === 'delete' && !!node.ancestor) {
      node.ancestor.removeChild(node);
    } else if (mod === 'rename') {
      node.setName( modifyNameRandomly( node.name ) );
    }
  };

  return {
    makeRandomModification: makeRandomModification
  };

}($));
