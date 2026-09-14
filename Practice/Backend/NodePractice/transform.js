import fs from 'fs/promises';

const readData=async()=>{
    try {
        const rawData= await fs.readFile('./input.json','utf-8')
        const products=JSON.parse(rawData);
        // console.log(products);

        const transformed=products.filter((p)=>p.stock>0).map((p)=>{
            return {
                ...p, 
                discountedPrice: p.price-p.price*0.1}
        })

        console.log(transformed);

        const jsonString=JSON.stringify(transformed,null,2);
        await fs.writeFile('./output.json',jsonString);

        console.log("Successfully written");
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log("Input file not found. Check the file path.");
          } else if (error instanceof SyntaxError) {
            console.log("Input file exists, but isn't valid JSON.");
          } else {
            console.log("Unexpected error:", error.message);
          }
    }
   
}

readData();
console.log("Started");