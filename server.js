const express = require("express")
const mongoose = require("mongoose")

const Phone = require("./models/Phone")

const PORT = 5000;

const app = express()
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/phone").then(()=>{
    console.log("Успешное подключение к БД");
    
}).catch((error)=>{
    console.error("Ошибка при подключение к БД" + error);
    
})

app.get("/phones" , async (req , res )=>{
    try{
    const phones = await Phone.find()
    res.json(phones)
}   catch(error){
    res.send("Ошибка при получение модели телефона" + error)
}   
})

app.get("/phones/:id" , async (req , res )=>{
    try{
    const = {id}
    const phone = await Phone.find()
    res.json(phone)
}   catch(error){
    res.send("Ошибка при получение модели телефона" + error)
}   
})


app.post('/addphone' , async (req , res)=>{
    const {title , description , price , model} = req.body
    try{
        const newPhone = await Phone.create({
            title,
            description,
            price,
            model
        })
        await newPhone.save()
        res.send("Телефон добавлен успешно!")
    }catch (error){
        console.log("Ошибка при добавлении товара:" + error);
        res.send("Товар добавлен успешно!")
    }
})

app.patch("/phone/:id" , async (req , res)=>{
    try{
        const {id} = req.params

        
        const phoneUpdate = await Phone.findByIdAndUpdate(id , {$set: req.body} , {new: true})
        res.json(phoneUpdate)
    }catch(error){
        console.log("Ошибка при обновлении телефона:" + error);
        res.send("Ошибка при обновлении телефона!")
    }
})

app.put("/phone/:id" , async (req , res)=>{
    try{
        const{id} = req.params
        const {title , description , price , model} = req.body
        console.log(id);
        
        const updatePhone = await Phone.findByIdAndUpdate(id , {
            title,
            description,
            price,
            model
        }, {new: true})
        
        if(!updatePhone){
            res.json("Такого телефона не существует!")
        }

        res.json(updatePhone , "Телефон обновлен успешно")
    }catch (error){
        console.log("Ошибка при обновлении товара:" + error);
    }
})

app.delete("/phone/:id" , async (req , res)=>{
    try{
        const {id} = req.params
        const phone = await Phone.findByIdAndDelete(id)

        if(!phone) {
            res.send("Такого телефона не существует!")
        }
        res.send("Телефон успешно удален!")
    } catch (error) {
        console.log("Ошибка при удалении телефона!");
        res.send("Ошибка при удалении телефона" + error)
        
    }
})

app.listen(PORT , ()=>{
    console.log("Успешное подключение к серверу порт:" + PORT);
    
})