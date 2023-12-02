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

//apply history stack
historyTabs('a[data-toggle="pill"]');
