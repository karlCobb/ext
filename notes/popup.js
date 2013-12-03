var data = new Array();
var storage = chrome.storage.local;
var notes = document.getElementsByClassName('line');
var current_note;
var LAST_SESSIONS_DATA = "LAST_SESSIONS_DATA";
var LAST_SESSIONS_FILE = "LAST_SESSIONS_FILE";

function start(){
storage.get(LAST_SESSIONS_FILE, function(result){
var file = result[LAST_SESSIONS_FILE];

if(file !== undefined && file !== ''){
current_note = file;
}
storage.get(LAST_SESSIONS_DATA, function(result){
var result = result[LAST_SESSIONS_DATA];

if(result !== null){
for(var i = 0; i < result.length; i++)
notes[i].value = result[i];
}
});
});
}

function update(){
obj = {};
for(var i = 0; i < notes.length; ++i)
data[i] = notes[i].value;

obj[LAST_SESSIONS_DATA] = data;


storage.set(obj);

fileObj = {};
fileObj[LAST_SESSIONS_FILE] = current_note;
storage.set(fileObj);
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


var fileList = "\n";

for(var i = 3; i < keys.length; i++){
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
if(current_note !== undefined && current_note !== ''){

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

function deleteFile(){    
if(current_note !== undefined){
var confirmed = confirm('Are you sure you want to delete file ' + current_note);
if(confirmed === true){
storage.remove(current_note, function(result){

alert(current_note + ' has been deleted');

});
}
}else{
alert('There is currently no file opened');

}
}

function newFile(){
if(current_note !== undefined && current_note !== ''){
var confirmed = confirm('Would you like to save file ' + current_note + ' before opening a new file?');
if(confirmed === true){
saveData();
}
}
clear();
setInterval(setCurrent_note, 2000);
}

function setCurrent_note(){
current_note = '';
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('save-as').addEventListener('click', saveDataAs);
    document.getElementById('save').addEventListener('click', saveData);
    document.getElementById('open').addEventListener('click', openData);
    document.getElementById('new').addEventListener('click', newFile);
    document.getElementById('delete').addEventListener('click', deleteFile);
	start();
	setInterval(update, 1000);
});
