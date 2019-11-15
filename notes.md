npm i
npm run setup-db
heroku addons:create heroku-postgresql:hobby-dev
heroku create
 heroku addons:create heroku-postgresql:hobby-dev
 heroku config:get DATABASE_URL
 $ npm run setup-db
 $ heroku config:get DATABASE_URL
 npm run setup-db
 heroku run npm run setup-db
 heroku addons:create heroku-postgresql:hobby-dev


 quotes.map(quote => {
     if (favorites.find(favorite => favorite.quote === quote.quote )) {
         const newStarreQuote
     }
 })

 const favoritesLookup = favorites.reduce((acc,curr) => ....)




 
 quotes.forEach(quote => {
   favorites.forEach(quotation => {
       if(quote.quote === quotation.quote) {
           quote.star = true;
       }
   });
   return quotes;
});