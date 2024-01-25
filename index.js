body {
  margin: 0;
  padding: 0;
  }

 /* Book Display */ 
#book {
 position: relative;
  width: 1020px;
   height: 610px;            
    background-color: #eee;
   overflow: hidden;
  margin: auto;
 border: 2px solid black;
 }

 .cover {
  position: absolute;
   top: 0;
    left: 0;
     width: 100%;
    height: 100%;
   background-size: cover;
 }

  .pages {
   position: absolute;
    top: 0;
     left: 0;
    width: 100%;
   height: 100%;
 }

  .page {
   position: absolute;
    top: 0;
     width: 48%;
      height: 100%;
       background-color: #f5f5dc;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
     padding: 20px;
    line-height: 16px;
