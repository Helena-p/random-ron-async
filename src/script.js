const quoteBtn = document.querySelector("#get-quote");
const showQuote = document.querySelector("#display-quote");

let quotes = [];

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

        if (quotes.length > 49) {
            quotes.shift();
        }

        if (quotes.includes(data[0])) {
            getQuote();
            return;
        }
        showQuote.textContent = data[0];
        quotes.push(data[0]);
    } catch (error) {
        showQuote.textContent = `Oops..page not found. Please try again later.`;
    }
}

getQuote();

quoteBtn.addEventListener("click", getQuote);
