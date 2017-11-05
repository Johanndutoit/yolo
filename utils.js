/**
* Returns the diff of two dates in milliseconds
**/
var diffDates = function(date1, date2) {

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime()
  var date2_ms = date2.getTime()

  // Calculate the difference in milliseconds
  var difference_ms = Math.abs(date1_ms - date2_ms)

  // Convert back to days and return
  return difference_ms;

};

/**
* Calculates the diff in days between two dates
**/
var daysBetweenDates = function(date1, date2) {

  // get the diff
  var diff = diffDates(date1, date2);

  // The number of milliseconds in one day
  var ONE_DAY = 1000 * 60 * 60 * 24

  // Convert back to days and return
  return diff/ONE_DAY;

};

/**
* Saves the options configured in chrome's storage that is synced
**/
var saveOptions = function(params, fn) {

  // Save it using the Chrome extension storage API.
  chrome.storage.sync.set(params, function() {

    // done
    fn();

  });

};

/**
* Returns the saved options for the plugin from chrome's storage
**/
var getOptions = function(fn) {

  // get from the synced storage
  chrome.storage.sync.get(null, function(options) {

    // return
    fn(options);

  });

};

/**
* Returns the value of the input by it's id
**/
var getInputValueByID = function(elementID, fn) {

  var el = document.getElementsById(elementID);
  return (el || {}).value || '';

};

/**
* Adds a event listener on the object id passed
**/
var bindToID = function(elementID, fn) {

  var el = document.getElementsById(elementID);
  if(!el) return;
  el.addEventListener('click', fn);

};

/**
* Adds a event listener on the object class passed
**/
var bindToClass = function(className, fn) {

  var els = document.getElementsByClassName(className);
  for(var i = 0; i < (els || []).length; i++) {

    els[i].addEventListener('click', fn);

  }

};

// the current section
var currentSection = '';

/**
* Shows a certain section with a matching "data-section" tag
* the rest are hidden, really simple method to just hide/show content
* for now.
**/
var getSection = function() {

  // just return it
  return currentSection;

};

/**
* Shows a certain section with a matching "data-section" tag
* the rest are hidden, really simple method to just hide/show content
* for now.
**/
/* Edited to ulitize the class system for better looks */
var showSection = function (sectionClass, target) {

  // set the current
  currentSection = target;

  // get all with the section
  var els = document.getElementsByClassName(sectionClass);

  // loop all matching elements
  for (var i = 0; i < els.length; i++) {

    if (els[i].getAttribute('data-section') == target) {

      // show
      els[i].classList.add('tab-section-active');

    } else {

      // hide
      els[i].classList.remove('tab-section-active');

    }

  }

};
