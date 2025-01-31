function modifyLongformAreas() {
    // Select all divs with class 'v-text-field__slot'
    var vTextFieldSlots = document.querySelectorAll('.v-text-field__slot');
    
    // Iterate through each found element
    for (var i = 0; i < vTextFieldSlots.length; i++) {
      var textarea = vTextFieldSlots[i].getElementsByTagName('textarea')[0];
      
      if (textarea) {
        textarea.rows = '10';
      }
    }
}

// Run the script initially when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", modifyLongformAreas);

// Set up a MutationObserver to detect changes in the DOM and run the script again
const observer = new MutationObserver(modifyLongformAreas);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false
});

// Function to check if the current URL matches the user-saved pattern
function isUrlPatternMatched(url) {
    return new Promise((resolve) => {
        chrome.storage.sync.get('urlPattern', function(result) {
            const urlPattern = result.urlPattern;
            if (urlPattern && url.match(new RegExp(urlPattern.replace(/\*/g, '.*'), 'i'))) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

// Check the URL pattern when the content script is loaded
isUrlPatternMatched(window.location.href).then((matched) => {
    if (matched) {
        modifyLongformAreas();
    } else {
        observer.disconnect(); // Disconnect observer if not matched
    }
});