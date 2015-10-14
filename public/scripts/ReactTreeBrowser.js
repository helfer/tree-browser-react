var ReactTreeBrowser = (function(React, $){
  "use strict";

  var TreeBrowser = React.createClass({displayName: "TreeBrowser",

    getInitialState: function(){
      return {
        collapsed: this.props.node.collapsed || false
      };
    },

    toggleCollapse: function(){
      this.setState({ collapsed: !this.state.collapsed });
    },

    render: function() {
      var that = this;

      var childNodes = this.props.node.children.map( function( node ){
        return (
          React.createElement(TreeBrowser, {node: node, key: node.key, visible: !that.state.collapsed})
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

  return TreeBrowser;
}(React, $));
