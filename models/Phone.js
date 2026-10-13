const mongoose = require("mongoose")

const PhoneSchema = new mongoose.Schema({

    title: {
        type: String,
        require: [true , "Заголовок не заполнен!"]
    },
    description:{
        type: String,
        require: [true, "Описание не заполнено!"]
    },
    price: {
        type: Number,
        require: [true, "Цена не указана!"],
        min: 0
    },
    model: {
        type: String , Number,
        require: [true, "Модель не указана!"]
    }
});

module.exports = mongoose.model("Phone" , PhoneSchema)