use Demo 

db.createCollection("employees",{
    
    
    validator:{
        $jsonSchema:{
            bsonType:"object",
            title:"employees required input",
            required:["name","age","department"],
            properties:{
                name:{
                    bsonType:"string",
                    description:"'name',must be string and required"
                },
                age:{
                    bsonType:"int",
                    minimum:18,
                    description:"'age',must be integer and greater than 18 and is required"
                },
                department:{
                    bsonType:"string",
                    enum:["HR","Engineering","Finance"],
                    description:"'department',must include one of three HR,Engineering,Finance"   
                }
               
                
            }
        }
        
    }
}
)

db.employees.insertOne({ name: "Sara", age: 19, department: "HR" })

db.employees.find()

//////2

var data=[
{
    _id:1,
    name:{firstname:"alaa",lastname:"ahmed"},
    age:16,
    address:["cairo","nasr city"],
    status:"single"
},
{
    _id: 2,
    name: { firstName: "mona", lastName: "tarek" },
    age: 22,
    address: ["Giza", "Dokki"],
    status: "married"
  }
]

db.trainningCenter1.insertOne(data[0])

db.trainningCenter1.find()

db.trainningCenter1.drop({})

db.trainningCenter2.insertMany(data)

db.trainningCenter2.drop({})

db.trainningCenter2.find()


///Use find. explain function (find by age field) and mention scanning type

db.trainningCenter2.find({age:22}).explain("executionStats") ///"stage" : "COLLSCAN"

//Create index on created collection named it “IX_age” on age field   

db.trainningCenter2.createIndex({age:1},{name:"IX_age"})  

db.trainningCenter2.find({age:22}).explain("executionStats") ////"stage" : "IXSCAN"

//Create index on created collection named it “compound” on firstNsme and lastName 

db.compuond.insertOne({fname:"ali",lname:"ahmed"})
db.compuond.find()

db.compound.find({fname:"ali",lname:"ahmed"}).explain() /////"stage" : "EOF"


db.compound.createIndex({fname:1,lname:2},{name:"IX_name"})

db.compound.find({fname:1,lname:2}).explain() ///// "stage" : "IXSCAN"

//Try deleteOne , deleteMany from any Collection 

//db.trainningCenter1.insertMany(data)

db.trainningCenter1.deleteOne({})

db.trainningCenter1.find()

db.trainningCenter1.deleteMany({})

//Drop Demo Database 

db.dropDatabase()
