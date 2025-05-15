
//Create a Database named "ITI_Mongo". 

show dbs

use ITI_Mongo

db.staff.insertOne({_id:1, name:"ahmed", age:20, gender:"M", department:"os"})
db.staff.find()

db.staff.insertMany(
[{_id:2, name:'mohamed', age:21, gender: "M", department:"Sales"},       
{_id:3, name:"hoda",age: 25, gender:"F", managerName:"ahmed", department:"production"},
{_id:4, name:"alaa", age:15, gender:"F",DOB:"2025-05-10"}] )


///Find all documents. 
db.staff.find()

//Find documents where gender is "male".

db.staff.find({"gender":"M"})

//Find documents with age between 20 and 25. 

db.staff.find({age:{$gte:20,$lte:25}})

//Find documents where age is 25 and gender is "female"

db.staff.find({$and:[{age:25},{gender:"F"}]})

//Find documents where age is 20 or gender is "female".

db.staff.find({$or:[{age:20},{gender:"F"}]})

//Update one document in the "Staff" collection where age is 15, set the name to "new student". 

db.staff.updateOne({age:15},{$set:{name:"new student"}})

//Update many documents in the "Staff" collection, setting the department to "AI".
db.staff.updateMany({},{$set:{department:"AI"}})

//Create a new collection called "test" and insert documents from Question 3. 
db.test.insertMany(
[{_id:1, name:"ahmed", age:20, gender:"M", department:"os"},
{_id:2, name:'mohamed', age:21, gender: "M", department:"Sales"},       
{_id:3, name:"hoda",age: 25, gender:"F", managerName:"ahmed", department:"production"},
{_id:4, name:"alaa", age:15, gender:"F",DOB:"2025-05-10"}] )


db.test.find()

//Try to delete one document from the "test" collection where age is 15.

db.test.deleteOne({age:15})

//try to delete all male gender
 
db.test.deleteMany({gender:"M"})

//Try to delete all documents in the "test" collection. 

db.test.deleteMany({})
 
