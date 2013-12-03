function removeButtons(){
var clutter = document.getElementsByClassName('clutterRemover');
var size = clutter.length;
while(clutter.length > 0){
console.log(clutter[0].innerHTML + clutter.length);
if(clutter[0].removed === 1){


//brings parent's back
//var GetNodeBack = clutter[0].parent;
//var parent = clutter[0].parentNode;
//parent.replaceChild(GetNodeBack, clutter[0]);
//GetNodeBack.appendChild(clutter[0]);

clutter[0].innerHTML = 'Remove ' + this.id;
clutter[0].removed = 0;
}
clutter[0].remove();

}
}
removeButtons();

