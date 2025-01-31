document.getElementById('save').addEventListener('click', function() {
    const urlPattern = document.getElementById('urlPattern').value;
    if (urlPattern) {
        chrome.storage.sync.set({ urlPattern: urlPattern }, function() {
            alert('URL pattern saved successfully!');
        });
    } else {
        alert('Please enter a URL pattern.');
    }
});