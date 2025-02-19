document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("confirmation").innerText = "Message sent! I'll get back to you soon.";
});
