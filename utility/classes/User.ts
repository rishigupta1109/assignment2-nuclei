import { validCourses } from "../constant";
import { Course } from "./Course";

export class User{
    private name:string;
    private address:string;
    private rollNumber:number;
    private age:number;
    private courses:Course[];
    constructor(){
        this.name="";
        this.address="";
        this.rollNumber=-1;
        this.age=-1;
        this.courses=[];
    }
    copyConstructor(user:User){
        this.name=user.name;
        this.address=user.address;
        this.age=user.age;
        this.courses=user.courses.map((course:any)=>new Course(course.name));
        this.rollNumber=user.rollNumber
    }
    getName(){return this.name;}
    getRollNumber(){return this.rollNumber;}
    getAge(){return this.age;}
    getAddress(){return this.address;}
    getCources(){return this.courses;}
    setName(name:string){
        this.name=name;        
    }
    setAge(age:number){
        this.age=age;        
    }
    setAddress(address:string){
        this.address=address;        
    }
    setRollNumber(rollNumber:number){
        this.rollNumber=rollNumber;   
    }
    setCourses(courses:Course[]){
        this.courses=(courses) ;       
    }
    validateCourses(){
        let isValid=true;
        this.courses.forEach((course:Course)=>{
            if(!validCourses.includes(course.getName())) isValid=false;
        })
        if(!isValid) throw new Error("Course not found");
        if(this.courses.length<4){
            isValid=false;
            throw new Error("Must select atleast four courses")
        }
        return isValid;
    }
    validateName(){
        return this.name.trim().length!==0;
    }
    validateAddress(){
        return this.address.trim().length!==0;
    }
    validateAge(){
        return this.age>0&&!isNaN(this.age);
    }
    validateRollNumber(){
        return this.rollNumber>0&&!isNaN(this.rollNumber);
    }
    validateUser(){
        if(!this.validateName()) throw new Error("Invalid name Inputs")
        if(!this.validateAddress()) throw new Error("Invalid address Inputs")
        if(!this.validateAge()) throw new Error("Invalid age Inputs")
        if(!this.validateRollNumber()) throw new Error("Invalid roll Number Inputs")
        if(!this.validateCourses()) throw new Error("Invalid course Inputs")
        return true;
    }
    
    
}