//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like

// trap focus when modal dialog is visible
const trapFocus = (element, prevFocusableElement = document.activeElement) => {
    const focusableEls = Array.from(
      element.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
      )
    );
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    let currentFocus = null;

    firstFocusableEl.focus();
    currentFocus = firstFocusableEl;

    const handleFocus = e => {
      e.preventDefault();
      // if the focused element "lives" in your modal container then just focus it
      if (focusableEls.includes(e.target)) {
        currentFocus = e.target;
      } else {
        // you're out of the container
        // if previously the focused element was the first element then focus the last 
        // element - means you were using the shift key
        if (currentFocus === firstFocusableEl) {
          lastFocusableEl.focus();
        } else {
          // you previously were focused on the last element so just focus the first one
          firstFocusableEl.focus();
        }
        // update the current focus var
        currentFocus = document.activeElement;
      }
    };

    document.addEventListener("focus", handleFocus, true);

    return {
      onClose: () => {
        document.removeEventListener("focus", handleFocus, true);
        prevFocusableElement.focus();
      }
    };
  };

// button to open modal
var toggleButton = document.getElementById('communityBtn');
toggleButton.addEventListener('click', function() {
	toggleModal(true);
});

// button to close modal
var closeButton = document.querySelector('.close[data-dismiss="modal"]');
closeButton.addEventListener('click', function() {
	toggleModal(false);
});
var closeButtonInFooter = document.querySelector('.modal-footer button.btn-primary');
closeButtonInFooter.addEventListener('click', function() {
	toggleModal(false);
});

// listen to esc key to close popup
document.addEventListener('keydown', function(event) {
	// Check if the pressed key is the "Escape" key (key code 27)
	if (event.key === 'Escape' || event.keyCode === 27) {
		toggleModal(false);
	}
});

// function to open/close modal
function toggleModal(isOpen) {
	var modal = document.getElementById('communityModal');	
	if (isOpen) {
		modal.classList.add("show");
		modal.style.display = "block";
		trapped = trapFocus(modal);
	} else {	
		modal.classList.remove("show");
		modal.style.display = "none";
		trapped.onClose();
	}
}

// handle tab switching

let tabBtns = [];
let tabPanels = {};
let documenTitles = ["Home", "Service", "Schedule a Service"];

tabBtns = Array.from(document.querySelectorAll("#v-pills-tab a"));

for (let i = 0; i < tabBtns.length; i++) {
  tabBtns[i].addEventListener("click", selectTab, false);
}

let x = document.querySelectorAll(".tab-pane");
for (let i = 0; i < x.length; i++) {
  tabPanels[x[i].id] = x[i];
}


function applyTab(id) {
  for (var i = 0; i < tabBtns.length; i++) {
    if (tabBtns[i].id == id) {
      let tabPanelID = tabBtns[i].id.replace("-tab", "-panel");
      tabPanels[tabPanelID].classList.add("show");
      tabPanels[tabPanelID].classList.add("active");
      tabBtns[i].setAttribute("aria-selected", "true");
      tabBtns[i].parentNode.classList.add("selectedTab");
      tabBtns[i].classList.add("active");
      document.title = documenTitles[i];
    } else {
      let tabPanelID = tabBtns[i].id.replace("-tab", "-panel");
      tabPanels[tabPanelID].classList.remove("show");
      tabPanels[tabPanelID].classList.remove("active");
      tabBtns[i].setAttribute("aria-selected", "false");
      tabBtns[i].parentNode.classList.remove("selectedTab");
      tabBtns[i].classList.remove("active");
    }
  }
  hideToggleMenu();
}

// select tab by widget
function selectTab(e) {
  applyTab(e.target.id);
}

// handle history stack
function historyTabs(selector) {
  var elements = document.querySelectorAll(selector);
  window.addEventListener("popstate", function (event) {
    if (event.state) {
      var targetTab = Array.from(elements).find(function (element) {
        return element.getAttribute("href") === event.state.url;
      });

      if (targetTab) {
        // Manually implement tab showing logic (e.g., add 'active' class).
        showTab(targetTab);
      }
    }
  });
  Array.from(elements).forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      showTab(element);
      var stateObject = { url: element.getAttribute("href") };
      if (!window.location.hash || stateObject.url !== window.location.hash) {
        var newUrl = window.location.pathname + stateObject.url;
        window.history.pushState(stateObject, document.title, newUrl);
      } else {
        window.history.replaceState(
          stateObject,
          document.title,
          window.location.href
        );
      }
    });

    if (!window.location.hash && element.classList.contains("active")) {
      // Shows the first element if there are no query parameters.
      var stateObject = { url: element.getAttribute("href") };
      if (!window.location.hash || stateObject.url !== window.location.hash) {
        var newUrl = window.location.pathname + stateObject.url;
        window.history.pushState(stateObject, document.title, newUrl);
      } else {
        window.history.replaceState(
          stateObject,
          document.title,
          window.location.href
        );
      }
      showTab(element);
    } else if (element.getAttribute("href") === window.location.hash) {
      // Manually implement tab showing logic.
      showTab(element);
    }
  });

  function showTab(tabElement) {
    applyTab(tabElement.id);
  }
}

// Get the button and message elements
const button = document.getElementById('schedule-call-button');
const thankYouMessage = document.getElementById('thank-you-message');
const errorMessage = document.getElementById('error-message');

// Add a click event listener to the button
button.addEventListener('click', function() {
  // Make an AJAX request to schedule the call
  // If the request is successful, show the thank you message
  // If the request fails, show the error message
});


//apply history stack
historyTabs('a[data-toggle="pill"]');

//hide text area
var textarea = document.getElementById('event_description_area');
textarea.style.display = 'none';

function validateForm() {
  var emailInput = document.getElementById('email');
  var phoneInput = document.getElementById('phone_number');
  var errors = [];

  // Email validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    errors.push('Invalid email address');
  }

  // Phone number validation
  var phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  if (!phoneRegex.test(phoneInput.value)) {
    errors.push('Invalid phone number. Please use the format 000-000-0000');
  }

  // Display errors if any
  if (errors.length > 0) {
    showErrors(errors);
    return;
  } else {
    showThanks();
  }

  // If both validations pass, you can submit the form or perform other actions
  
  // Uncomment the line below to submit the form
  // document.getElementById('myForm').submit();
}

function showErrors(errors) {
  var errorsContainer = document.getElementById('statusContainer');
  errorsContainer.classList.remove(...errorsContainer.classList);
  errorsContainer.classList.add('alert');
  errorsContainer.setAttribute('role', 'alert');
  errorsContainer.classList.add('alert-danger');
  errorsContainer.innerHTML = '<fieldset><legend>Errors</legend><ul>' + errors.map(error => '<li tabindex="0">' + error + '</li>').join('') + '</ul></fieldset>';
}

function showThanks() {
  var successContainer = document.getElementById('statusContainer');
  successContainer.classList.remove(...successContainer.classList);
  successContainer.classList.add('alert');
  successContainer.setAttribute('role', 'alert');
  successContainer.classList.add('alert-success');
  successContainer.innerHTML = '<fieldset><legend>Success</legend><ul><li>Thank you!</li></ul></fieldset>';
  document.getElementById('scheduleacall').reset();
  var textarea = document.getElementById('event_description_area');
  textarea.style.display = 'none';
}

function toggleTextarea(event) {
  var checkbox = event.target;
  var textarea = document.getElementById('event_description_area');

  if (checkbox.checked) {
    textarea.style.display = 'block';
  } else {
    textarea.style.display = 'none';
  }
}

function toggleImage(event) {
  var buttonCheck = document.getElementById('switcher');
  var ariaCheckedValue = buttonCheck.getAttribute('aria-checked');
  var switchImage = document.getElementById('switchImage');
  if (ariaCheckedValue === "false") {
    switchImage.src = './images/switch_yes.jpg';
    buttonCheck.setAttribute('aria-checked', "true");
  } else {
    switchImage.src = './images/switch_no.jpg';
    buttonCheck.setAttribute('aria-checked', "false");
  }
}

function toggleNav(event) {
  var navToggleBtn = document.getElementById('nav-toggle-btn');
  var fullMenu = document.getElementById('v-pills-tab');

  if (navToggleBtn.getAttribute('aria-expanded') === 'false') {
    fullMenu.classList.add('show');
    navToggleBtn.setAttribute('aria-expanded','true');
  } else {
    fullMenu.classList.remove('show');
    navToggleBtn.setAttribute('aria-expanded','false');
  }
}

function hideToggleMenu() {
  var navToggleBtn = document.getElementById('nav-toggle-btn');
  var fullMenu = document.getElementById('v-pills-tab');
  fullMenu.classList.remove('show');
  navToggleBtn.setAttribute('aria-expanded','false');
}
