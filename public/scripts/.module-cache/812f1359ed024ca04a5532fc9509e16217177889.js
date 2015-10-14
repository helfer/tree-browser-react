
var TreeBrowser = React.createClass({displayName: "TreeBrowser",

  getInitialState: function(){
    return {
      collapsed: this.props.node.collapsed || false
    };
  },

  toggleCollapse: function(){
    this.setState({ collapsed: !this.state.collapsed });
  },

  getNodeId: function( node ){
    if( typeof node.name !== "string" ){
      throw "Node name must be a string";
    }
    // limit id to length 20. Using a hash would be better (todo)
    return node.name.substring( 0, 20 );
  },

  render: function() {
    var that = this;

    var childKeys = {};

    // create Child nodes and deterministically assign unique keys
    var childNodes = this.props.node.children.map( function( node ){

      // if two nodes have the same key, they get numbered: "a", "a1", "a2" etc.
      var key = node.key || that.getNodeId(node);
      if( childKeys.hasOwnProperty(key) ){
        key = key + childKeys[key];
        childKeys[key]++;
      } else {
        childKeys[key] = 1;
      }

      return (
        React.createElement(TreeBrowser, {node: node, key: key, visible: !that.state.collapsed})
      );
    });

    if( this.props.node.children && this.props.node.children.length > 0 ){
      var state = this.state.collapsed ? '+' : '-';
      var collapsedIndicator = (
          React.createElement("span", {onClick: this.toggleCollapse, className: "toggleCollapse"}, 
            state
          )
      );

    } else {
      var collapsedIndicator = (
          React.createElement("span", {className: "togglePlaceholder"}, " ")
      );
    }

    var style = {};
    if( !this.props.visible ){
      style = {
        'display': 'none'
      }
    }

    return (
      React.createElement("div", {className: "treeNode", style: style}, 
        React.createElement("li", null, 
          collapsedIndicator, 
          this.props.node.name
        ), 
        React.createElement("ul", null, 
          childNodes
        )
      )
    );
  }
});

