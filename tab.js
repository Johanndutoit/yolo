var timer = null;
var currentSection = '';

var handleFormSubmit = function() {

  // set the current dob
  var dobEl = document.getElementById("property_field_dob");
  if(dobEl.value == "") return;
  saveOptions({

    dob:  dobEl.value

  }, function(){

    render();

  });
  return false;

};

var render = function(params) {

  if(!params) params = {};
  if(timer) {
    clearTimeout(timer);
    timer = null;
  }

  getOptions(function(options){

    // sanity check with sections
    var sections = ((options || {}).dob || '').split('-');

    // set the current dob
    var dobEl = document.getElementById("property_field_dob");
    dobEl.value = (options || {}).dob;

    if(!options.dob || sections.length < 3) {

      // birth date is not set!
      return showSection('tab-section', 'properties');

    }

    // birth date is not set!
    showSection('tab-section', 'counter');

    // constants
    var timer           = null;
    var UPDATE_PERIOD   = 1000; // 1 second
    var timestamp       = new Date();
    var median          = Math.floor(daysBetweenDates(new Date(2000, 01, 01), new Date(2070, 01, 01)));

    // create the ticker
    var tick = new Clock(document.querySelectorAll('.clock')[0]);

    // parse the dob date
    var sections = ((options || {}).dob || '').split('-');

    // sets the actual UI components up
    var setState = function() {

      if(getSection() != 'counter') return;
      if(timer) clearTimeout(timer);

      // get the days
      var days    = daysBetweenDates(new Date(), new Date(sections[0], sections[1], sections[2]));
      var rdays   = Math.floor(days);
      var fdays   = rdays.toLocaleString(
        undefined, // use a string like 'en-US' to override browser locale
        { minimumFractionDigits: 0 }
      );

      // create the element
      tick.update(fdays);

      // set the items
      document.title = rdays + ' Days';

      // set mean
      document.getElementById('days_left').innerText = Math.floor(median - days).toLocaleString(
        undefined, // use a string like 'en-US' to override browser locale
        { minimumFractionDigits: 0 }
      ).toString();

      // run again
      timer = setTimeout(setState, UPDATE_PERIOD);

    };

    // do a run
    setState();

  });

};

var boot = function() {

  // bind events
  bindToClass('link-properties', function() {

    showSection('tab-section', 'properties');
    return false;

  });

  var formEl = document.getElementById('property-form');
  if (formEl.attachEvent) {
    formEl.attachEvent("submit", handleFormSubmit);
  } else {
    formEl.addEventListener("submit", handleFormSubmit);
  }

  render({});

};

document.addEventListener('DOMContentLoaded', function() { boot() });