$(document).ready(function() {
    console.log('turrrrds');
    addElement();
});


function addElement () {
  // create a new div element
  // and give it some content
  var newDiv = document.getElementById("dataHold");
  var newContent = document.createTextNode("Hi there and greetings!");
  newDiv.appendChild(newContent); //add the text node to the newly created div.

  // add the newly created element and its content into the DOM
  var currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
}
