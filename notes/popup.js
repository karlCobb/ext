var data = new Array();
var storage = chrome.storage.local;
var notes = document.getElementsByClassName('line');
var current_note;
var LAST_SESSIONS_DATA = "LAST_SESSIONS_DATA";

function start(){
storage.get(LAST_SESSIONS_DATA, function(result){
var result = result[LAST_SESSIONS_DATA];

if(result !== null){
for(var i = 0; i < result.length; i++)
notes[i].value = result[i];
}
});

}

function update(){
obj = {};
for(var i = 0; i < notes.length; ++i)
data[i] = notes[i].value;

obj[LAST_SESSIONS_DATA] = data;

storage.set(obj);

}

function clear(){
for(var i = 0; i < notes.length; ++i)
notes[i].value = "";
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
current_note = file;
});

});
});


}

function saveDataAs() {
obj = {};

for (var i = 0; i < notes.length; i++){
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
current_note = saved;
}//end if confirmed saved
});//end get data
}//end confirm check
}

function saveData(){
var obj = {};
if(current_note !== undefined){

for (var i = 0; i < notes.length; i++)
data[i] = notes[i].value;

obj[current_note] = data;

storage.set(obj, function(){
alert('saved in ' + current_note);
});
}else{
saveDataAs();
}
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('save-as').addEventListener('click', saveDataAs);
    document.getElementById('save').addEventListener('click', saveData);
    document.getElementById('open').addEventListener('click', openData);
    document.getElementById('new').addEventListener('click', clear);
	start();
	setInterval(update, 1000);
});
