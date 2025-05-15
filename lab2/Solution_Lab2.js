use ITI_Mongo

//Find documents where the "tags" field exists. 

db.inventory.find({tags:{$exists:true}},{tags:1})

//Find documents where the "tags" field does not contain values "ssl" or "security." 

db.inventory.find({tags:{$nin:["ssl","security"]}},{tags:1})

//db.inventory.find({tags:{$in:["ssl","security"]}})

//Find documents where the "qty" field is equal to 85. 

db.inventory.find({qty:85})

//Find documents where the "tags" array contains all of the values [ssl, security] using the `$all` operator. 

db.inventory.find({tags:{$all:["ssl", "security"]}},{tags:1})

//Find documents where the "tags" array has a size of 3. 

db.inventory.find({tags:{$size:3}})


//Update the "item" field in the "paper" document, setting "size.uom" to "meter" and using the `$currentDate` operator. 
db.inventory.updateOne(
{item:"paper"},
{
    $set:{"size.uom":"meter"},
    $currentDate:{lastModified:true}
}
)

db.inventory.find({},{"size.uom":1,_id:0})

//Also, use the upsert option and change filter condition item:”paper”. 

db.inventory.updateOne({item:"paper"},
{
   $set:{"size.uom":"meter"} ,
   $setOnInsert:{age:40}
},
{
    upsert:true
}
)
 

//Try `updateMany`, and `replaceOne`. 

db.inventory.updateMany({item:"paper"},
{
   $set:{"size.uom":"meter"} ,
   $setOnInsert:{age:40}
},
{
    upsert:true
}
)

//replaceOne`.
db.employee.replaceOne(
{_id:1},
{
    fName:"alaa",
    lName:"abdullah",
    age:16
},
{upsert:true}
)


//Insert a document with incorrect field names "neme" and "ege," then rename them to "name" and "age." 
db.employee.insertOne({"neme":"ali","ege":30})

db.employee.updateMany(
{neme:"ali"},
{
    $rename:{"neme":"name",
              "ege":"age"}
})


db.employee.find()


//Try to reset any document field using the `$unset` function. 

db.orders.updateOne({_id:2},
{
    $unset:{date:""}
}

)
db.orders.find()

//Try update operators like `$inc`, `$min`, `$max`, and `$mul` to modify document fields. 

//////////////`$inc`
db.employees.updateOne(
{
  name: "Alice Smith"  
},
{
   $inc:{salary:1000}
}
)
db.employees.find()

//////////////$min

db.employees.updateOne(
{"name" : "Bob Johnson"},
{
    $min:{salary:65000}
}
)

////////////////$max
db.employees.updateOne(
{"name" :  "John Doe"},
{
    $max:{salary:70000}
}
)

////////$mul

db.sales.updateMany(
{"product": "Widget"},
{
    $mul:{price:2}
    }
)

db.sales.find({"product": "Widget"})

//Calculate the total revenue for product from sales collection documents within the date range '01-01-2020' to '01-01-2023' and then sort them in descending order by total revenue. 
//Total Revenue=  Sum (Quantity * Price) 





db.sales.aggregate([
  {
    $match: {
      date: {
        $gte: ISODate("2020-01-01"),
        $lte: ISODate("2023-01-01")
      }
    }
  },
  
  {
    $project: {
      revenue: { $multiply: ["$quantity", "$price"] }
    }
  },
  
  {
    $group: {
      _id: "$product",
      Total_Revenue: { $sum: "$revenue" }
    }
  },
  
  {
    $sort: {
      Total_Revenue: -1
    }
  }
])

//Calculate the average salary for employees for each department from the employee’s collection. 

db.employees.aggregate([

{
    //group
    $group:{
        _id:"$department",
        avg_salary:{$avg:"$salary"}
    }    
}
])

///Use likes Collection to calculate max and min likes per title 

db.likes.aggregate([
{
    //group
    $group:{
    _id:"$title",
    max_calc:{$max:"$likes"},
    min_calc:{$min:"$likes"}
}}

])





