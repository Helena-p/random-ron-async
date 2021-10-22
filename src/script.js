"use strict";

const displayQuote = document.querySelector("[data-quote]");
const button = document.querySelector('[type="button"]');
const endpoint = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
const quotes = [];

const responseHandler = (response) => {
    if (!response.ok) throw Error(response.statusText);
    return response.json();
};

const renderQuote = (data) => {
    quotes.includes(data[0])
        ? getQuote()
        : (displayQuote.textContent = `‟ ${data[0]}`);
    if (quotes.length >= 50) quotes.shift();
    quotes.push(data[0]);
};

const errorHandler = (error) => {
    displayQuote.textContent = `${error}, No quotes available at this time`;
};

const getQuote = async (event) => {
    try {
        const response = await fetch(endpoint);
        const data = await responseHandler(response);
        const renderData = await renderQuote(data);
        return renderData;
    } catch (error) {
        errorHandler(error);
        console.error(error);
    }
};

getQuote();
button.addEventListener("click", getQuote);
