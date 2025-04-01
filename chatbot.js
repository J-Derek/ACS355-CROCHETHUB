document.addEventListener("DOMContentLoaded", function() {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    const responses = {
        "how to crochet a scarf": {
            text: "To crochet a scarf, you can start with a simple chain stitch. Here's a tutorial: ",
            link: "https://www.youtube.com/watch?v=example1" // replace with actual link
        },
        "how to make a granny square": {
            text: "Granny squares are easy to make! Check this video: ",
            link: "https://www.youtube.com/watch?v=example2" // replace with actual link
        },
        "what yarn for beginners": {
            text: "For beginners, I recommend using worsted weight yarn. It's easy to work with.",
            link: ""
        },
        // Add more responses as needed
    };

    sendButton.addEventListener("click", function() {
        const input = userInput.value.toLowerCase();
        userInput.value = "";

        const response = responses[input] || { text: "I'm sorry, I don't understand that. Please ask about crochet!" };
        chatBox.innerHTML += `<div>User: ${input}</div>`;
        chatBox.innerHTML += `<div>Bot: ${response.text} ${response.link ? `<a href="${response.link}" target="_blank">here</a>` : ""}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
    });
});