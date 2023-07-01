"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function () {
    const displayQuote = document.querySelector('[data-quote]');
    const button = document.querySelector('[type="button"]');
    const endpoint = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
    const quotes = [];
    const responseHandler = (response) => {
        if (!response.ok)
            throw Error(response.statusText);
        return response.json();
    };
    const renderQuote = (data) => {
        quotes.includes(data[0])
            ? getQuote()
            : (displayQuote.textContent = `‟ ${data[0]}`);
        if (quotes.length >= 50)
            quotes.shift();
        quotes.push(data[0]);
    };
    const errorHandler = (error) => {
        if (displayQuote) {
            displayQuote.innerHTML = `Error: ${error}, No quotes available at this time`;
        }
    };
    const getQuote = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(endpoint);
            const data = yield responseHandler(response);
            const renderData = yield renderQuote(data);
            return renderData;
        }
        catch (error) {
            errorHandler(error);
            console.error(error);
        }
    });
    getQuote();
    button.addEventListener('click', getQuote);
})();
