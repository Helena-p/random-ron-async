const quoteBtn = document.querySelector("#get-quote");
const showQuote = document.querySelector("#display-quote");

// Hold previously used quotes
let quotes = [];

// If response return with error
// notify user with error message
// and display a warning with error status in console
async function getQuote() {
    try {
        let response = await fetch(
            "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
        );
        // check response value to be true
        if (!response.ok) {
            throw response.status;
        }

        let data = await response.json();

        // If list of quotes exceed 49, remove the first quote
        if (quotes.length > 49) {
            quotes.shift();
        }
        // If quote exist in list, get new quote
        if (quotes.includes(data[0])) {
            getQuote();
            return;
        }

        // Display quote and then move recently used quote to list of quotes
        showQuote.textContent = data[0];
        quotes.push(data[0]);

        // // If response return with error
        // notify user with error message
        // and display a warning with error status in console
    } catch (error) {
        showQuote.textContent = `Oops..page not found. Please try again later.`;
        console.warn(error);
    }
}

// Run function getQuote on page load
// and diplay quote to user
getQuote();

// Fetch new quote when user click on button
quoteBtn.addEventListener("click", getQuote);
