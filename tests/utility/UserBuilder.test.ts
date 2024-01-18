import { expect, test, vi } from "vitest";
import * as mymodule from "../../utility/utils";
import { Course } from "../../utility/classes/Course";
import { UserBuilder } from "../../utility/classes/UserBuilder";

test("testing setUser function",()=>{
    const mockReadALine=vi.spyOn(mymodule,"readALine");
    const trueTestcases=[
        {
            name:"John",
            age:"20",
            address:"Delhi",
            rollNumber:"123",
            courses:"A,B,C,D" ,
            coursesArray:[
                new Course("A"),
                new Course("B"),
                new Course("C"),
                new Course("D"),
            
            ]   
        },
        {
            name:"John Cena",
            age:"20",
            address:"Delhi",
            rollNumber:"123",
            courses:"A,B,C,D,E,F"  ,
            coursesArray:[
                new Course("A"),
                new Course("B"),
                new Course("C"),
                new Course("D"),
                new Course("E"),
                new Course("F"),
            
            ]      
        },
    ]
    trueTestcases.forEach(testcase=>{
        mockReadALine.mockReturnValueOnce(testcase.name)
        mockReadALine.mockReturnValueOnce(testcase.age)
        mockReadALine.mockReturnValueOnce(testcase.address)
        mockReadALine.mockReturnValueOnce(testcase.rollNumber)
        mockReadALine.mockReturnValueOnce(testcase.courses)
        const userBuilder=new UserBuilder();
        userBuilder.setUser();
        const user=userBuilder.getUser();
        expect(user.getName()).toBe(testcase.name);
        expect(user.getAge()).toBe(parseInt(testcase.age));
        expect(user.getAddress()).toBe(testcase.address);
        expect(user.getRollNumber()).toBe(parseInt(testcase.rollNumber));
        expect(user.getCources()).toEqual(testcase.coursesArray);
    })
})

test("testing setUser function with invalid inputs",()=>{
    const falseTestcases=[
        {
            name:"",
            age:"20",
            address:"Delhi",
            rollNumber:"123",
            courses:"A,B,C,D" ,   
        },
        {
            name:"John Cena",
            age:"20",
            address:"Delhi",
            rollNumber:"123",
            courses:"A,B,C"  ,
        },
        {
            name:"John Cena",
            age:"20",
            address:"Delhi",
            rollNumber:"123",
            courses:"A,B,C,D,E,F,G"  ,
        },
        {
            name:"John Cena",
            age:"",
            address:"Delhi",
            rollNumber:"123",
            courses:"A,B,C,D,E,F"  ,
        },
        {
            name:"John Cena",
            age:"-1",
            address:"Delhi",
            rollNumber:"123",
            courses:"A,B,C,D,E"  ,
        },
        {
            name:"John Cena",
            age:"22",
            address:"",
            rollNumber:"123",
            courses:"A,B,C,D,E"  ,
        },
        {
            name:"John Cena",
            age:"22",
            address:"delhi",
            rollNumber:"",
            courses:"A,B,C,D,E"  ,
        },
        {
            name:"John Cena",
            age:"22",
            address:"delhi",
            rollNumber:"-1",
            courses:"A,B,C,D,E"  ,
        },
    ]
    falseTestcases.forEach(testcase=>{
        const mockReadALine=vi.spyOn(mymodule,"readALine");
        mockReadALine.mockReturnValueOnce(testcase.name)
        mockReadALine.mockReturnValueOnce(testcase.age)
        mockReadALine.mockReturnValueOnce(testcase.address)
        mockReadALine.mockReturnValueOnce(testcase.rollNumber)
        mockReadALine.mockReturnValueOnce(testcase.courses)
        const userBuilder=new UserBuilder();
        expect(()=>userBuilder.setUser()).toThrowError();
    })
})
test("testing getCoursesFromString function",()=>{
    const trueTestcases=[
        {
            courses:"A,B,C,D" ,
            coursesArray:[
                new Course("A"),
                new Course("B"),
                new Course("C"),
                new Course("D"),
            
            ]   
        },
        {
            courses:"A,B,C,D,E,F"  ,
            coursesArray:[
                new Course("A"),
                new Course("B"),
                new Course("C"),
                new Course("D"),
                new Course("E"),
                new Course("F"),
            
            ]      
        },
        {
            courses:"A,B,C,D,E,,,F"  ,
            coursesArray:[
                new Course("A"),
                new Course("B"),
                new Course("C"),
                new Course("D"),
                new Course("E"),
                new Course("F"),
            
            ]      
        },
        {
            courses:""  ,
            coursesArray:[
            ]      
        },
    ]
    trueTestcases.forEach(testcase=>{
        const userBuilder=new UserBuilder();
        const coursesArray=userBuilder.getCoursesFromString(testcase.courses);
        expect(coursesArray).toEqual(testcase.coursesArray);
    })
    
})