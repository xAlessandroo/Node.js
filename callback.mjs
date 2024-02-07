import * as fs from "node:fs"

fs.writeFile("message.txt", "Hello World!", function (error) {
   if(error) {
      console.error(error);
   }
   console.log("The file has been written!");
})
