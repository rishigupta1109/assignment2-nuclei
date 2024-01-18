import { expect, test, vi } from "vitest";
import { MemoryManagement } from "../../utility/classes/MemoryManagement";
import { User } from "../../utility/classes/User";
import { UserDataManagement } from "../../utility/classes/UserDataManagement";
import { Course } from "../../utility/classes/Course";
import * as mymodule from "../../utility/utils";

test("testing retrival from memory",()=>{
    const mockReadALine=vi.spyOn(mymodule,"readALine");
    mockReadALine.mockReturnValue("1");
    const memoryManagement=MemoryManagement.getInstance("Data/Data.json");
    const user=new User();
    user.setName("John");
    user.setAge(20);
    user.setAddress("Delhi");
    user.setRollNumber(123);
    user.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    console.log([user]);
    try{
        memoryManagement.saveData([
            user
        ]);
    }catch(err:any){
        console.log(err);
    }
    const userDataManagement=new UserDataManagement();
    console.log(userDataManagement.displayUsers());
    expect(userDataManagement.displayUsers()).toEqual([
        user
    ]);
    
})
test("testing retrival from memory with empty data",()=>{
    const memoryManagement=MemoryManagement.getInstance("Data/Data.json");
    memoryManagement.saveData([]);
    const userDataManagement=new UserDataManagement();
    console.log(userDataManagement.displayUsers());
    expect(userDataManagement.displayUsers()).toEqual([]);
})

test("testing sortUsers function",()=>{
    const mockReadALine=vi.spyOn(mymodule,"readALine");
    const userDataManagement=new UserDataManagement();
    const user1=new User();
    user1.setName("John");
    user1.setAge(25);
    user1.setAddress("Delhi");
    user1.setRollNumber(123);
    user1.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    const user2=new User();
    user2.setName("John Cena");
    user2.setAge(20);
    user2.setAddress("delhi");
    user2.setRollNumber(1235);
    user2.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    const user3=new User();
    user3.setName("John");
    user3.setAge(20);
    user3.setAddress("mumbai");
    user3.setRollNumber(1234);
    user3.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    const users=[
        user1,
        user2,
        user3,
    ]
    let expectedOutpusts=[
        [//ascending order
            [//name
                user1,
                user3,
                user2,
            ],
            [//roll number
                user1,
                user3,
                user2
            ],
            [//age
                user3,user2,user1
            ],
            [//address
                user1,user2,user3
            ],
            
        ],
        [//descending order
            [//name
                user2,user3,user1
            ],
            [//roll number
            user2,user3,user1
            ],
            [//age
                user1,user2,user3
            ],
            [//address
                user3,user2,user1
            ],
            

        ]
    ]
    expectedOutpusts.forEach((order,index)=>{
        //index is 0 for ascending and 1 for descending in array
        order.forEach((field,ind)=>{
            console.log("index",index,"ind",ind);
            users.forEach((user,index)=>{
                mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce(user.getName()).mockReturnValueOnce(user.getAge().toString()).mockReturnValueOnce(user.getAddress()).mockReturnValueOnce(user.getRollNumber().toString()).mockReturnValueOnce("A,B,C,D");
            })

           //index=order ind=field
           mockReadALine.mockReturnValueOnce('5').mockReturnValueOnce('Y').mockReturnValueOnce('N').mockReturnValueOnce((index+1).toString()).mockReturnValueOnce((ind+1).toString());
           userDataManagement.run();
           const op=userDataManagement.displayUsers();
              console.log("op",op);
           expect(op).toEqual(field);

        })
    })
    
})

test("testing sortUsers function with empty data",()=>{
    const mockReadALine=vi.spyOn(mymodule,"readALine");
    const memoryManagement=MemoryManagement.getInstance("Data/Data.json");
    memoryManagement.saveData([]);
    const userDataManagement=new UserDataManagement();
    expect(userDataManagement.displayUsers()).toEqual([]);
})
test("testing sortUsers function with invalid field",()=>{
    const userDataManagement=new UserDataManagement();
    
    expect(()=>userDataManagement.sortUsers(1,5)).toThrowError("Invalid Field");
    expect(()=>userDataManagement.sortUsers(5,5)).toThrowError("Invalid Order");


})
test("testing add user function",()=>{
    const mockReadALine=vi.spyOn(mymodule,"readALine");
    const userDataManagement=new UserDataManagement();
    const user1=new User();
    user1.setName("John");
    user1.setAge(20);
    user1.setAddress("Delhi");
    user1.setRollNumber(123);
    user1.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    const user2=new User();
    user2.setName("John Cena");
    user2.setAge(20);
    user2.setAddress("Delhi");
    user2.setRollNumber(1235);
    user2.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    const user3=new User();
    user3.setName("John");
    user3.setAge(21);
    user3.setAddress("Delhi");
    user3.setRollNumber(1234);
    user3.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce("John").mockReturnValueOnce("20").mockReturnValueOnce("Delhi").mockReturnValueOnce("123").mockReturnValueOnce("A,B,C,D");
   mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce("John Cena").mockReturnValueOnce("20").mockReturnValueOnce("Delhi").mockReturnValueOnce("1235").mockReturnValueOnce("A,B,C,D");
    mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce("John").mockReturnValueOnce("21").mockReturnValueOnce("Delhi").mockReturnValueOnce("1234").mockReturnValueOnce("A,B,C,D").mockReturnValueOnce("5").mockReturnValueOnce('Y').mockReturnValueOnce('N');
    mockReadALine.mockReturnValue('1');
    userDataManagement.run();
    expect(userDataManagement.displayUsers()).toEqual([
        user1,
        user3,
        user2,
       ]);
})

test("testing add user with akready existing roll number",()=>{
    const mockReadALine=vi.spyOn(mymodule,"readALine");
    const userDataManagement=new UserDataManagement();
    const user1=new User();
    user1.setName("John");
    user1.setAge(20);
    user1.setAddress("Delhi");
    user1.setRollNumber(123);
    user1.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    const user2=new User();
    user2.setName("John Cena");
    user2.setAge(20);
    user2.setAddress("Delhi");
    user2.setRollNumber(1235);
    user2.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    const user3=new User();
    user3.setName("John");
    user3.setAge(21);
    user3.setAddress("Delhi");
    user3.setRollNumber(1234);
    user3.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce("John").mockReturnValueOnce("20").mockReturnValueOnce("Delhi").mockReturnValueOnce("123").mockReturnValueOnce("A,B,C,D");
   mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce("John Cena").mockReturnValueOnce("20").mockReturnValueOnce("Delhi").mockReturnValueOnce("1235").mockReturnValueOnce("A,B,C,D").mockReturnValueOnce("5").mockReturnValueOnce('Y').mockReturnValueOnce('N')
    mockReadALine.mockReturnValueOnce("John").mockReturnValueOnce("21").mockReturnValueOnce("Delhi").mockReturnValueOnce("123").mockReturnValueOnce("A,B,C,D");
    
    userDataManagement.run();
    expect(()=>userDataManagement.addUser()).toThrowError("User with this roll number already present.");
})
test("testing delete user function",()=>{
    const mockReadALine=vi.spyOn(mymodule,"readALine");
    const userDataManagement=new UserDataManagement();
    const user1=new User();
    user1.setName("John");
    user1.setAge(20);
    user1.setAddress("Delhi");
    user1.setRollNumber(123);
    user1.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    const user2=new User();
    user2.setName("John Cena");
    user2.setAge(20);
    user2.setAddress("Delhi");
    user2.setRollNumber(1235);
    user2.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    const user3=new User();
    user3.setName("John");
    user3.setAge(21);
    user3.setAddress("Delhi");
    user3.setRollNumber(1234);
    user3.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce("John").mockReturnValueOnce("20").mockReturnValueOnce("Delhi").mockReturnValueOnce("123").mockReturnValueOnce("A,B,C,D");
   mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce("John Cena").mockReturnValueOnce("20").mockReturnValueOnce("Delhi").mockReturnValueOnce("1235").mockReturnValueOnce("A,B,C,D");
    mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce("John").mockReturnValueOnce("21").mockReturnValueOnce("Delhi").mockReturnValueOnce("1234").mockReturnValueOnce("A,B,C,D").mockReturnValueOnce("3").mockReturnValueOnce("123").mockReturnValueOnce("5").mockReturnValueOnce('Y').mockReturnValueOnce('N');
    mockReadALine.mockReturnValue('1');
    userDataManagement.run();
    expect(userDataManagement.displayUsers()).toEqual([
        user3,
        user2,
       ]);
})

test("testing delete user function with empty data",()=>{
    const mockReadALine=vi.spyOn(mymodule,"readALine");
    const userDataManagement=new UserDataManagement();
    const memoryManagement=MemoryManagement.getInstance("Data/Data.json");
    memoryManagement.saveData([]);
    mockReadALine.mockReturnValueOnce("5").mockReturnValueOnce('Y').mockReturnValueOnce('N').mockReturnValueOnce('3');
    userDataManagement.run();
    expect(()=>userDataManagement.deleteUser()).toThrowError();
})

test("testing delete with invalid roll no",()=>{
    const mockReadALine=vi.spyOn(mymodule,"readALine");
    const userDataManagement=new UserDataManagement();
    const user1=new User();
    user1.setName("John");
    user1.setAge(20);
    user1.setAddress("Delhi");
    user1.setRollNumber(123);
    user1.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    const user2=new User();
    user2.setName("John Cena");
    user2.setAge(20);
    user2.setAddress("Delhi");
    user2.setRollNumber(1235);
    user2.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    const user3=new User();
    user3.setName("John");
    user3.setAge(21);
    user3.setAddress("Delhi");
    user3.setRollNumber(1234);
    user3.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce("John").mockReturnValueOnce("20").mockReturnValueOnce("Delhi").mockReturnValueOnce("123").mockReturnValueOnce("A,B,C,D");
   mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce("John Cena").mockReturnValueOnce("20").mockReturnValueOnce("Delhi").mockReturnValueOnce("1235").mockReturnValueOnce("A,B,C,D");
    mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce("John").mockReturnValueOnce("21").mockReturnValueOnce("Delhi").mockReturnValueOnce("1234").mockReturnValueOnce("A,B,C,D").mockReturnValueOnce("5").mockReturnValueOnce('Y').mockReturnValueOnce('N').mockReturnValueOnce("12321");
    mockReadALine.mockReturnValue('3');
    userDataManagement.run();
    expect(()=>userDataManagement.deleteUser()).toThrowError("User doesn`t Exists");
})
test("testing save user function",()=>{
    const mockReadALine=vi.spyOn(mymodule,"readALine");
    const userDataManagement=new UserDataManagement();
    const user1=new User();
    user1.setName("John");
    user1.setAge(20);
    user1.setAddress("Delhi");
    user1.setRollNumber(123);
    user1.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    const user2=new User();
    user2.setName("John Cena");
    user2.setAge(20);
    user2.setAddress("Delhi");
    user2.setRollNumber(1235);
    user2.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    const user3=new User();
    user3.setName("John");
    user3.setAge(21);
    user3.setAddress("Delhi");
    user3.setRollNumber(1234);
    user3.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce("John").mockReturnValueOnce("20").mockReturnValueOnce("Delhi").mockReturnValueOnce("123").mockReturnValueOnce("A,B,C,D");
   mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce("John Cena").mockReturnValueOnce("20").mockReturnValueOnce("Delhi").mockReturnValueOnce("1235").mockReturnValueOnce("A,B,C,D");
    mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce("John").mockReturnValueOnce("21").mockReturnValueOnce("Delhi").mockReturnValueOnce("1234").mockReturnValueOnce("A,B,C,D").mockReturnValueOnce("5").mockReturnValueOnce('Y').mockReturnValueOnce('Y');
    mockReadALine.mockReturnValue('1');;
    userDataManagement.run();
    expect(userDataManagement.displayUsers()).toEqual([
        user1,
        user3,
        user2,
       ]);
})
test("Invalid menu input",()=>{
    const mockReadALine=vi.spyOn(mymodule,"readALine");
    const userDataManagement=new UserDataManagement();
    mockReadALine.mockReturnValueOnce("6").mockReturnValueOnce("5").mockReturnValueOnce('Y').mockReturnValueOnce('N');
    expect(()=>userDataManagement.showMenu()).toThrowError("Invalid Input");
})
test("Testing save from menu",()=>{
    const mockReadALine=vi.spyOn(mymodule,"readALine");
    let memoryManagement=MemoryManagement.getInstance("Data/Data.json");
    memoryManagement.saveData([]);
    const userDataManagement=new UserDataManagement();
    let user=new User();
    user.setName("John");
    user.setAge(20);
    user.setAddress("Delhi");
    user.setRollNumber(123);
    user.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce("John").mockReturnValueOnce("20").mockReturnValueOnce("Delhi").mockReturnValueOnce("123").mockReturnValueOnce("A,B,C,D").mockReturnValueOnce("4").mockReturnValueOnce("5").mockReturnValueOnce('Y').mockReturnValueOnce('N');
    mockReadALine.mockReturnValue('1');
    userDataManagement.run();
    expect(userDataManagement.displayUsers()).toEqual([
        user
    ]);
})
test("Testing display from menu",()=>{
    const mockReadALine=vi.spyOn(mymodule,"readALine");
    let memoryManagement=MemoryManagement.getInstance("Data/Data.json");
    memoryManagement.saveData([]);
    const userDataManagement=new UserDataManagement();
    let user=new User();
    user.setName("John");
    user.setAge(20);
    user.setAddress("Delhi");
    user.setRollNumber(123);
    user.setCourses([
        new Course("A"),
        new Course("B"),
        new Course("C"),
        new Course("D"),
    ]);
    mockReadALine.mockReturnValueOnce("1").mockReturnValueOnce("John").mockReturnValueOnce("20").mockReturnValueOnce("Delhi").mockReturnValueOnce("123").mockReturnValueOnce("A,B,C,D").mockReturnValueOnce("2").mockReturnValueOnce("1").mockReturnValueOnce("1").mockReturnValueOnce("5").mockReturnValueOnce('Y').mockReturnValueOnce('N');
    mockReadALine.mockReturnValue('1');
    userDataManagement.run();
    expect(userDataManagement.displayUsers()).toEqual([
        user
    ]);
})

test("Testing confirm termination",()=>{
    const mockReadALine=vi.spyOn(mymodule,"readALine");
    const userDataManagement=new UserDataManagement();
    mockReadALine.mockReturnValueOnce("Y");
    mockReadALine.mockReturnValueOnce("Y");
    expect(userDataManagement.confirmTermination()).toEqual(true);
})
test("Testing confirm termination with invalid ip",()=>{
    const mockReadALine=vi.spyOn(mymodule,"readALine");
    const userDataManagement=new UserDataManagement();
    mockReadALine.mockReturnValueOnce("Y");
    mockReadALine.mockReturnValueOnce("asd");
    expect(()=>userDataManagement.confirmTermination()).toThrowError();
    mockReadALine.mockReturnValueOnce("asd");
    expect(()=>userDataManagement.confirmTermination()).toThrowError();
    mockReadALine.mockReturnValueOnce("N");
    expect(userDataManagement.confirmTermination()).toEqual(false);
})