/*jslint browser: true */
// the page is recreated / re-rendered each time the button is clicked

var checkboxClickListener = function(ev) {
  var checkbox = ev.target;
  localStorage[checkbox.name] = checkbox.checked;
};

document.addEventListener('DOMContentLoaded', function() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0, checkbox; (checkbox = checkboxes[i]); i++) {
    // localStorage values are always strings
    checkbox.checked = localStorage[checkbox.name] == 'true';
    checkbox.addEventListener('click', checkboxClickListener);
  }
});
