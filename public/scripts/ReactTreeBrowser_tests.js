var fullTree = new TreeNode(dataset.treeData);

var simpleTree = new TreeNode({ name: 'root', children: [], collapsed: false });

var mediumTree = new TreeNode({
  name: 'root',
  collapsed: false,
  children: [
    {
      name: 'child',
      collapsed: true,
      children: []
    }
  ]
});

TestUtil = React.addons.TestUtils;


QUnit.test( "ReactTreeBrowser renders a treeNode", function( assert ) {
    var treeBrowser = TestUtil.renderIntoDocument(
      React.createElement(ReactTreeBrowser, {node: simpleTree, visible: true}),
      document.getElementById('content')
    );
    var found = TestUtil.findRenderedComponentWithType( treeBrowser, ReactTreeBrowser);
    assert.ok( found != null, 'React creates treeNode - pass' );
});


QUnit.test( "ReactTreeBrowser respects node visibility", function( assert ) {
    var treeBrowser = TestUtil.renderIntoDocument(
      React.createElement(ReactTreeBrowser, {node: simpleTree, visible: false}),
      document.getElementById('content')
    );
    var found = TestUtil.findRenderedComponentWithType( treeBrowser, ReactTreeBrowser);
    assert.ok( found.props.visible === false, 'ReactTreeBrowser has prop visible = false - pass' );

    var foundDOM = TestUtil.findRenderedDOMComponentWithTag( treeBrowser, 'div');
    assert.ok( foundDOM.style.display === "none", 'Invisible nodes have display:none - pass' );
});


QUnit.test( "ReactTreeBrowser renders the whole tree", function( assert ) {
    var treeBrowser = TestUtil.renderIntoDocument(
      React.createElement(ReactTreeBrowser, {node: fullTree, visible: true}),
      document.getElementById('content')
    );
    var found = TestUtil.scryRenderedComponentsWithType( treeBrowser, ReactTreeBrowser);
    assert.ok( found.length === 6, 'ReactTreeBrowser renders the whole tree - pass' );
});


QUnit.test( "ReactTreeBrowser toggleCollapse changes visibility", function( assert ) {
    var treeBrowser = TestUtil.renderIntoDocument(
      React.createElement(ReactTreeBrowser, {node: mediumTree, visible: true}),
      document.getElementById('content')
    );
    var toggle = TestUtil.findRenderedDOMComponentWithClass( treeBrowser, 'toggleCollapse');
    var found = TestUtil.scryRenderedComponentsWithType( treeBrowser, ReactTreeBrowser);
    var foundDOM = TestUtil.scryRenderedDOMComponentsWithTag( treeBrowser, 'div');

    assert.ok( found[0].state.collapsed === false, 'Root is not collapsed by default - pass' );
    assert.ok( foundDOM[1].style.display !== 'none', 'Child is visible by default - pass' );

    TestUtil.Simulate.click(toggle);

    // and now it should be invisible
    assert.ok( found[0].state.collapsed === true, 'Root is collapsed after toggle - pass' );
    assert.ok( foundDOM[1].style.display === 'none', 'Child is invisible after toggle - pass' );
});
