/*
 * TreeNode tests
 *
 * @flow
 */


var treeData = {
  name: "root",
  collapsed: false,
  children: [
  {
    name: "Apples",
    key: "testkey",
    collapsed: true,
    children: []
  },
  {
    name: "Apples",
    collapsed: true,
    children: []
  },
  {
    name: "Oranges",
    collapsed: true,
    children: [
    {
      name: "Pears",
      collapsed: false,
      children: []
    },
    {
      name: "Pears",
      collapsed: false,
      children: []
    }
    ]
  }
  ]
};

QUnit.test( "Basic TreeNode constructor test", function( assert ) {
    var root = new TreeNode( treeData );
    assert.equal( root.name, 'root', "TreeNode has name root - passed" );
    assert.equal( root.children.length, 3, "Tree Node has 3 children - passed" );
    assert.equal( root.collapsed, false, "TreeNode is not collapsed - passed" );
    assert.ok( root.ancestor === undefined, "TreeNode has no ancestor - passed" );
});

QUnit.test( "Advanced treeNode constructor test", function( assert ) {
    assert.throws(
      function(){ new TreeNode( '' ) },
      "TreeNode throws error when called with string - passed"
    );
    var ancestor = new TreeNode( { name: 'ancestor', children: [], collapsed: true } );
    var root = new TreeNode( treeData, ancestor );
    assert.equal( root.ancestor, ancestor, "TreeNode constructor uses ancestor argument - passed" );
});


QUnit.test( "TreeNode rename test", function( assert ) {
    var root = new TreeNode( treeData );
    assert.equal( root.name, 'root', "TreeNode has name root - passed" );
    root.setName('rootX');
    assert.equal( root.children.length, 3, "TreeNode root name changed to rootX" );
});


QUnit.test( "TreeNode add child test", function( assert ) {
    var root = new TreeNode( treeData );
    var numChildren = root.children.length;
    var newNode = new TreeNode( { name: 'newGuy', children: [], collapsed: true } );
    var existingChild = root.children[1];
    root.addChildAtPosition(newNode, 1);
    assert.equal( root.children.length, numChildren + 1, "TreeNode now has 1 more child - passed" );
    assert.equal( root.children[1], newNode, "New node was added at position 1 - passed" );
    assert.equal( root.children[2], existingChild, "Existing child is now at position 2 - passed" );
});


QUnit.test( "TreeNode delete child test", function( assert ) {
    var root = new TreeNode( treeData );
    var numChildren = root.children.length;
    var existingChild = root.children[1];
    var nextChild = root.children[2];
    root.removeChild(existingChild);
    assert.equal( root.children.length, numChildren - 1, "TreeNode now has 1 fewer children - passed" );
    assert.equal( root.children[1], nextChild, "Next node was moved to position 1 - passed" );
});


QUnit.test( "Test TreeNode toggleCollapse", function( assert ) {
    var root = new TreeNode( treeData );
    var state = root.collapsed;
    root.toggleCollapse();
    assert.equal( root.collapsed, !state, 'Collapsed state toggle - passed' );
});


QUnit.test( "Test TreeNode getNodeList", function( assert ) {
    var root = new TreeNode( treeData );
    root.toggleCollapse();
    assert.equal( root.getNodeList().length, 6, 'getNodeList returns all children - passed' );
    //make sure the order is correct
    assert.equal( root.getNodeList()[0], root, 'Root node is first in nodeList - passed' );
    assert.equal( root.getNodeList()[1], root.children[0], 'First child is second in nodeList - passed' );
});


QUnit.test( "Test TreeNode assignChildKey", function( assert ) {
    var root = new TreeNode( { name: 'root', children: [], collapsed: true } );
    var newNode1 = new TreeNode( { name: 'newGuy', children: [], collapsed: true } );
    var newNode2 = new TreeNode( { name: 'newGuy', children: [], collapsed: true } );
    var newNode3 = new TreeNode( { name: 'newGuy-Different', children: [], collapsed: true } );
    root.addChildAtPosition( newNode1, -1 );
    assert.equal( newNode1.key, 'newGuy', 'Child gets assigned a key - passed' );
    root.addChildAtPosition( newNode2, -1 );
    assert.equal( newNode2.key, 'newGuy-1', 'Duplicate gets a key number - passed' );
    root.addChildAtPosition( newNode3, -1 );
    assert.equal( newNode3.key, 'newGuyDifferent', 'Dashes are removed in key name - passed' );
});


QUnit.test( "Test TreeNode onChange callback - rename", function( assert ) {
    assert.expect(4);

    var root = new TreeNode( treeData );
    var done1 = assert.async();
    var done2 = assert.async();
    var done3 = assert.async();
    var done4 = assert.async();

    root.setOnChangeListener( function(){
      assert.ok('onChange is called on rename');
      done1();
    } );
    root.setName('rootX');

    root.setOnChangeListener( function(){
      assert.ok('onChange is called on addChild');
      done2();
    } );
    var newNode = new TreeNode( { name: 'newGuy', children: [], collapsed: true } );
    root.addChildAtPosition(newNode, 1);

    root.setOnChangeListener( function(){
      assert.ok('onChange is called on removeChild');
      done3();
    } );
    var newNode = new TreeNode( { name: 'newGuy', children: [], collapsed: true } );
    var existingChild = root.children[1];
    root.removeChild( existingChild );


    root.setOnChangeListener( function(){
      assert.ok('onChange propagates up to root');
      done4();
    } );
    root.children[0].setName('newName2');
});
