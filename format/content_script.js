var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.clutterRemover {color: blue; display: inline-block; white-space: normal;}';
document.getElementsByTagName('head')[0].appendChild(style);
console.log(style);
var jquery = document.createElement('script');
jquery.src = '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(jquery);

var jqueryui = document.createElement('script');
jqueryui.src = '//ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js';
document.getElementsByTagName('head')[0].appendChild(jqueryui);
var scripts = document.getElementsByTagName('script');

console.log(scripts);




newNode={
removed: 0,
id: "",
parent: ""
};


function createNode(id) {
var div = document.getElementById(id);
newNode = document.createElement('button');
newNode.innerHTML = 'Remove ' + id;
newNode.id = id;
newNode.className =  "clutterRemover";
newNode.onclick = toggleNode;
div.appendChild(newNode);
}


function toggleNode() {
if(this.removed != 1)
{
var div = this.parentNode;
this.parent = div;
var divParent = div.parentNode;
divParent.replaceChild(this, div);
this.removed = 1;
this.innerHTML = 'Add ' + this.id;
}
else
{
var GetNodeBack = this.parent;
var parent = this.parentNode;
parent.replaceChild(GetNodeBack, this);
GetNodeBack.appendChild(this);
this.innerHTML = 'Remove ' + this.id;
this.removed = 0;
console.log(this.className);
}

}

var allNodes = document.getElementsByTagName("div");
for(var i = 0; i < allNodes.length; i++)
{
console.log(i);
console.log(allNodes[i].id);
var id = allNodes[i].id;
if(allNodes[i].id != "")
{
//document.getElementById(id).style.margin = "0px";
createNode(id);

}


}

