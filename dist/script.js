/*

Date picker class to filter offers etc.

Each offer gets a data-start attr e.g. data-start="201909"

The class then figures out if the offers data-start is before the chosen date, entered by the user - if so, display, otherwise, hide 

*/


// Date Picker Code
function DateFilter(props) {
    this._container = document.querySelector(props.container);
    this._offer = this._container.querySelector(props.offer);
    this._props = props;
    this._dateFrom = this._container.querySelector(props.dateFrom);
    this._filterParent = props.filterParent;
    var hideClass = props.hideClass || 'hide'; // if no specific hide class has been provided in setup, then default to 'hide'
    var self = this;
    var offers = this._container.querySelectorAll(props.offer);
    var applyCta = this._container.querySelector(props.dateFilterCTA);
    var offerTileWithHideClass = props.offer + "." + hideClass;
    var filterParentWrap = props.filterParent + " " + props.offer;
    var noResultsHeading = $(this._container).find('.no-results-header');

    // add a min date and value to the date picker 
    this.addMinDate = function() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();

      if (dd < 10) { dd = '0' + dd; } // add 0 to day if day is less than 10 e.g. 09

      if (mm < 10) { mm = '0' + mm; } // add 0 to month if month is less than 10 e.g. 09

      today = yyyy + "-" + mm; // e.g. 2019-07
    
      $(this._dateFrom).attr({'min': today, 'value': today}); // set the min attr and current date on input
    };

    applyCta.addEventListener('click', function() {

       // grab value from input dateFrom field
      
        var dateFrom = parseInt(this._container.querySelector(props.dateFrom).value.split('-').join(''));
      
        offers.forEach(function(offer) {
          
            // loop through each offer and check the data-start
          
            var offerStart = parseInt(offer.getAttribute("data-start"));
          
           // if offer falls inbetween the value provided in the input field - display or hide accordingly
          
            if(offerStart <= dateFrom) {
                 offer.classList.remove(hideClass); // be sure to add 'hide' class to your css file
            } else {
                 offer.classList.add(hideClass);
            }
          
            // If no dates match the tiles - if the amount of hidden offers matches 
            // the total length of offers on the page, then no matches have been found
            // - display 'no results found' message 
          
          if (jQuery(offerTileWithHideClass).length === jQuery(filterParentWrap).length) {
              jQuery(noResultsHeading).removeClass(hideClass);
            } else {
              jQuery(noResultsHeading).addClass(hideClass);
            }
  
        });
           
    }.bind(self));
  
  // override offer start date
   this.setDate = function(offer, newDate) {
     var thisOffer = this._container.querySelector(offer);
     $(thisOffer).attr('data-start', newDate);
   };
  
  // return offer start date 
   this.getDate = function(offer) {
      var thisOffer = this._container.querySelector(offer);
      return $(thisOffer).attr('data-start');
   };
        
  // any function that needs to run on page load, fire into the init function 
  this.init = function() {
     this.addMinDate(); // add min date to date picker
   };
      
  this.init(); // fire init function
}
var filter = new DateFilter({
  container: ".container", // element that wraps, both the input and offers
  filterParent: ".wrap", // parent element that holds the offers
  offer: '.item-container', // offer to be displayed/filtered
  dateFilterCTA: '.apply-cta', // CTA that triggers the date filter
  dateFrom: '#datepicker-from' // the dateFrom input field ID
});

// set date on offer 1 - param 1 => offer ID, param 2 => new date
filter.setDate('#offer-1', '201909');

// get offer 1 start date
console.log(filter.getDate('#offer-1'));