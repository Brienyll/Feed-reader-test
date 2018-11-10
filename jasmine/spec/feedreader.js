/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


       // check if url is defined

         it('url defined' ,function() {
             for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
             }
         });


        // check ift he name is defined

         it('name defined' ,function() {
             for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
             }
         });

    });

    // Test suite Menu

    describe('The menu', function( ){

        // check menu-hidden is hidden

        it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         // check if menu changes toggles on click

          it('toggle', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });
   
    // Test suite Initial Entries

    describe('Initial Entries', function() {

       //Async - check that feed loads 

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('done', function() {
            let entries = $('.feed .entry');
            expect(entries.length).toBeGreaterThan(0);
        });

    });
    
    // Test suite Feed Selection 

    describe('New Feed Selection', function() {
        let firstFeed, SecondFeed;

        // check that there are 2 feeds

        it('2 feeds', function() {
            expect(allFeeds.length).toBeGreaterThan(1);
        });


         beforeEach(function(done){

             loadFeed(1, function() {
                 firstFeed = $('.feed').html();
                 loadFeed(0, function(){
                     secondFeed = $('.feed').html();
                     done();
                 });
            });
        });

        it('different feeds loaded', function(){
            expect(firstFeed).not.toBe(secondFeed);
        });    
    });
}());
