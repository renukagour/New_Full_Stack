import fs from 'fs/promises';
console.log("starting");

const a= await fs.readFile("file2.txt") //already a module so use directly await
console.log(a.toString());

const b=await fs.writeFile("file3.txt","This is file 3");
console.log(b);

const c=await fs.appendFile("file3.txt","\n\nThis is appending data");
console.log(c);