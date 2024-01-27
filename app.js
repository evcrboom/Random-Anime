import express from "express";
import axios from "axios";
import morgan from "morgan";

const app = express();
const port = 3000;
app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(morgan("common"));
const api__URL = "https://api.jikan.moe/v4";


app.get('/', ( req , res ) => {
        res.render("index.ejs",{dataName: "If you don't know which anime to watch, try choosing randomly here!!!",
                                dataPic :  "https://i.pinimg.com/236x/af/1c/30/af1c30d6d881d9447dec06149f61d2f9.jpg",
                                dataStory : ""
                            })
});

app.post("/random", async ( req , res ) => {
    try{
        const result = await axios.get(`https://api.jikan.moe/v4/anime/${Math.floor(Math.random()*10015)+1}`);       
        console.log(result.data.data.images.jpg.large_image_url) 
        res.render("index.ejs",{dataName : result.data.data.title,
                                dataPic :  result.data.data.images.jpg.large_image_url,
                                dataStory : result.data.data.synopsis
                            }); 
                                    
    } catch(error) {
        console.log(error.response.data);
        res.render("index.ejs",{dataName : "ขอโทษค่ะไฟล์เสียสุ่มใหม่นะจ๊ะ",
                                dataPic :  "https://pm1.aminoapps.com/6164/39aa15aeebfeef9ea5210f407303a83203083352_hq.jpg",
                                dataStory: ""
                            })
    }   
});








app.listen(port, ()=> {
    console.log(`let's Gooo port ${port}`);
})