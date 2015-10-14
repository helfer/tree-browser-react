# React TreeBrowser

A bare-bones demo of a tree browser using React.js. It makes minimal use of
external libraries and build tools so as to be easily adaptable for any use case.
For example it would be straightforward to create one or more npm modules out of
it.

## Dependencies

React and JQuery are the only dependencies.

QUnit is used to run the in-browser tests.

## Running the demo

Clone the repo, then run the following

Npm: 
```javascript
$ npm install
$ node server.js
```
Then you should see the demo app running at localhost:3000.

## Usage

The TreeBrowser comes in two parts:
1. A TreeNode class which defines some useful functions for modifying trees.
2. A React component called TreeBrowser, which takes a TreeNode and renders it.

Each of the parts is in a separate file and injects one variable into the global
scope.

All other files are used for the demo only:
- randomTreeModifier: used to make random modifications to the tree
- dataset: defines a simple tree dataset
- index.html: html file for the demo
- base.css: a few lines of css, absolutely no frills
- test.html: html file for the QUnit tests
- TreeNode_test.js: QUnit tests for TreeNode
- ReactTreeBrowser_test.js: QUnit tests for ReactTreeBrowser

## TreeNode

A tree in the form of an object should be passed to the TreeNode constructor. It
should have at least the following properties:
- name: the name of this node

The following arguments are optional:
- collapsed: whether children of this node should be displayed
- children: an array of children, can be empty
- key: a unique identifier to be used for this node (if not passed, it will be
  auto-generated)

Optionally, a TreeNode to be used as the ancestor can be passed as the second argument.

Minimal example:

```javascript
var tree = {
  name: 'root',
};

var root = new TreeNode( tree );
```

Here is an example that uses all the arguments:

```javascript
var ancestor = new TreeNode({ name: 'root' });

var tree = {
  name: 'child'
  collapsed: true,
  children: [
    { name: 'grandchild1' },
    { name: 'grandchild2' }
  ],
  key: 'root_key'
};

var root = new TreeNode( tree, ancestor );
```



### TreeNode functions

A TreeNode has the following functions

#### TreeNode.setOnChangeListener( fun )
Sets the function fun to be called on any future changes to this node or its
descendants.


#### TreeNode.setName( name )
Sets the name of the node. Name should be a String.


#### TreeNode.setKey( newKey )
Sets the key to newKey. NewKey should be a String.


#### TreeNode.setAncestor( node )
Sets the ancestor to the TreeNode node.


#### TreeNode.addChildAtPosition( node, pos )
Adds the TreeNode node at position pos among its children. If pos is
negative or larger than the number of children, treeNode will be appended to the
end of the children array.


#### TreeNode.removeChild( node )
Removes the TreeNode node from the list of children, if it is there.


#### TreeNode.toggleCollapse()
Toggles this node's state between collapsed and not collapsed.


#### TreeNode.getNodeList()
Returns the list of all nodes in the subtree in preorder, including the node it
is called on.


## TreeBrowser

This React component renders a very basic display of a TreeNode that's passed to
it. Nodes can be expanded or collapsed by clicking on the toggle icon.


A minimal usage example:
```javascript
var root = new TreeNode({ name: 'root' });
var domElement = doucment.getElementById("some-element-id-here");

ReactDOM.render(
  React.createElement(ReactTreeBrowser, {node: root, visible: true}),
  domElement
);
```

To reflect updates in the tree, the component can be re-rendered in the tree's
onChange callback:
```javascript
var updateTree = function(){
  ReactDOM.render(
    React.createElement(ReactTreeBrowser, {node: treeRoot, visible: true}),
    document.getElementById('content')
  );
};
root.setOnChangeListener(updateTree);
```

