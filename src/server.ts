import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  app.get('/filteredimage', async ( req, res ) => {
    let image_url = req.query.image_url;
    // validate the image_url query
    if (!image_url){
      return res.status(400).send("Invalid request! please include image url")
    }
    // call filterImageFromURL(image_url) to filter the image
    let image = await filterImageFromURL(image_url);
    // send the resulting file in the response
    res.status(200).sendFile(image, () => 
    // deletes any files on the server on finish of the response
    {deleteLocalFiles([image])});
  });
  

  /**************************************************************************** */

  //! END @TODO1
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();