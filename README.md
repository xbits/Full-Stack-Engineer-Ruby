#João Costa's Fullstack test
[Requirements (original readme.md)](REQUIREMENTS.md)

##How to run
  Frontend and backend must be started independently.
  
  **Frontend**
  
    ```console
      cd marvel-frontend
      
      ember s --proxy http://localhost:3000
    ```
  
  **Backend**
    And in another terminal window.
    
    ```console
        cd marvel-backend
        
        rails s
    ```
    
##Weapons of choice
- Rails 5 
  Because I wanted to try the new api feature.
  
- Ember
  There were some references around the web indicating it was a good choice to go with rails given the similarity of architectural concepts.
  Since I had never tried it, I took opportunity to get familiar with it. 

    
##Architecture
  The requirements asked for usage of two data sources.
  One from marvel api and one to store user relations with marvel objects.
  
  
  - Initially I thought it would be a good idea to get the frontend talking to both servers and mixing the data to present the user.
    Two reasons for this decision:
    * More frontend logic which serves both to prove I can do stuff in a frontend framework(I suppose you had your doubts), and to get to learn the Ember more in depth.   
    * Saving server resources by avoiding the mostly useless round-trip of marvel data through the server.
    However this proved quite challenging and I hit a few roadblocks because this is not the way ember expects to receive data.
    I'm sure it could be done but it likely would require one to escape Ember's standard ways, not ideal given I wasn't even familiar with it's ways.
    Also it required additional requests to the backend to keep Marvel's private key private.
    I lost a lot of time trying to make this solution work and figuring out why it wasn't.
  
   
  - So my second solution was to have the backend request Marvel's data and convert it to rails active_records, then it could handle all the relationships in a normal rails environment.
    I quickly abandoned this solution as it required a lot of custom data handling, such as extending active_record to abstract the remoteness of data, and custom normalizers. 
    The meta data in the Marvel's responses would also have to handled in some unconventional way.
    And the gathered data would be mostly useless because all queries from client would still have to be requested each time.
  
  
  - So my final solution was to proxy the clients requests through the backend and inject the related data into the response keeping marvels format.
    I already had the marvel data normalizer done on the frontend and could reuse it.
    Much simpler!

##Personal evaluation of delivery
  Comments could have more coverage and comply with JSDoc syntax.
  A lot more abstractions could be made especially on the frontend. I'm not yet too confortable with Ember's structure and not sure where to place or hook some features to get a better separation of concerns.
  Overall I feel like it is at a decent state.
###Test coverage
  I didn't made any tests besides the auto-generated assertions.
  If you find it would be worth to make them to assert my proficiency please let me know.
   
##My opinion about ember
  Ember is one opinionated fellow and he hangs out with his also very opinionated friend Ember-cli.
  Together they have lots of opinions about how one should do things.
  They are however not very expressive about their opinions, half the time they just sit in a corner and sulk (No error messages). 
  When you ask them whats wrong they often only give you small hints and expect you to find out the rest by yourself (Methods in documentation only state their properties without eny usage examples)
  And when you ask their friends(people on the web) what's wrong it appears their opinions have changed greatly over time.
 
  Very passive-agressive I'd say.
  
  Still, I liked the stuctural concepts of it. But would likely go with Angular next time.
  

