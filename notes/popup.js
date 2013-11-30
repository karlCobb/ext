var data = new Array();
var storage = chrome.storage.local;
var notes = document.getElementsByClassName('line');

function clear(){
for(var i = 0; i < notes.length; ++i)
notes[i] = "";
}


function openData() {
var keys;

storage.get(null, function(items){
keys = Object.keys(items);

//number of bytes being used

storage.getBytesInUse(null, function (bytes){
var bytes = bytes;


var fileList = "";

for(var i = 0; i < keys.length; i++){
var newString = keys[i];
fileList = fileList.concat("\t", newString, "\n");
}

var file = prompt('What file would you like opened?' + 
fileList + 'You currently are using ' + bytes + ' bytes');

storage.get(file, function(result) {
var result = result[file];
for(var i = 0; i < result.length; i++){
notes[i].value = result[i];
}

});

});
});


}

function saveData() {
obj = {};

for (var i = 0; i < notes.length; i++){
//if(notes[i].value != "")
data[i] = notes[i].value;
}


var saved = prompt('Save file as: ');

if(saved !== null){

storage.get(null, function(items){
var confirmed = true;
var allKeys = Object.keys(items);
for(var i = 0; i < allKeys.length; i++){
if(saved === allKeys[i])
{
confirmed = confirm('file ' + saved + ' all ready exists are you sure you\'d like to save?');
if(confirmed === false){
saved = prompt('Save file as: ');
i = 0;
}//end if saved
}//end if confirmed
}//end for
if(confirmed === true && saved !== null){
obj[saved] = data;
storage.set(obj, function(){alert('saved: ' + 
data + ' in file ' + saved);});
}//end if confirmed saved
});//end get data
}//end confirm check
}




document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('save').addEventListener('click', saveData);
    document.getElementById('open').addEventListener('click', openData);
    document.getElementById('New').addEventListener('click', clear);
    
});
