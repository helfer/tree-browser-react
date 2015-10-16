/*
 * @flow
 */

var ReactTreeBrowser = (function(React, $){
  "use strict";

  var TreeBrowser = React.createClass({

    displayName: "TreeBrowser",

    propTypes: {
      node: React.PropTypes.shape({
          name: React.PropTypes.string.isRequired,
          children: React.PropTypes.array,
          collapsed: React.PropTypes.bool
        }).isRequired,
      visible: React.PropTypes.bool,
      key: React.PropTypes.string
    },

    getDefaultProps: function(){
      return {
        visible: true
      };
    },

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

      var childNodes = [];
      if( this.props.node.children ){
        childNodes = this.props.node.children.map( function( node ){
          return (
            React.createElement(TreeBrowser, {node: node, key: node.key, visible: !that.state.collapsed})
          );
        });
      }

      var collapsedIndicator;
      if( this.props.node.children && this.props.node.children.length > 0 ){
        var state = this.state.collapsed ? '+' : '-';
        collapsedIndicator = (
          React.createElement("span", {onClick: this.toggleCollapse, className: "toggleCollapse"},
            state
          )
        );

      } else {
        collapsedIndicator = (
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
