dataset = (function(){
  "use strict";

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

  return { treeData: treeData };
}());
