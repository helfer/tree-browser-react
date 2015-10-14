
var treeRoot = new TreeNode(treeData);
ReactDOM.render(
  React.createElement(TreeBrowser, {node: treeRoot, visible: "true"}),
  document.getElementById('content')
);

var updateTree = function(){
  ReactDOM.render(
    React.createElement(TreeBrowser, {node: treeRoot, visible: "true"}),
    document.getElementById('content')
  );
};
treeRoot.setOnChangeListener(updateTree);

var modifyTree = function modifyTree(){
  RandomTreeModifier.makeRandomModification(treeRoot);
};
