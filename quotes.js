const quoteContainer  = document.getElementById('quote-container');
const quoteText  = document.getElementById('quote');
const authorText  = document.getElementById('author');
const twitterBtn  = document.getElementById('twitter');
const newQuoteBtn  = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let count = 0;

//Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hide Loading
function complete(){
  if (!loader.hidden){      // means if loader hidden is false
    loader.hidden =true;
    quoteContainer.hidden = false;
  }
}
//Get Quote From API
async function getQuotes() {
    loading();
    const proxyUrl = 'https://still-ridge-58937.herokuapp.com/';
    //const apiUrl = 'https://type.fit/api/quotes';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //console.log(data);
        // I fAuthor is blank, add 'Unknown'
        if (data.quoteAuthor === ''){
          authorText.innerText = 'Unknow';
        } else {
          authorText.innerText = data.quoteAuthor;
        }
        //Reduce font size forlong quotes
        if (data.quoteText.length > 120) {
          quoteText.classList.add('long-quote');
        }else {
          quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        //Stop Loader, Show Quote
        complete();
        //throw new Error('ooops');
    }catch(error){
        count++;       
      if (count < 10){
         getQuotes();
      //return;
      }else {
        console.log('Something is wrong');
      }
        //Catch Error Here
    }
}

//Tweeet Quote
function tweetQuote () {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);
//On Load
getQuotes();
//loading();

