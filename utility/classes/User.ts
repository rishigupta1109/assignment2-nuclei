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
    static validateCourses(courses:Course[]){
        let isValid=true;
        courses.forEach((course:Course)=>{
            if(!validCourses.includes(course.getName())) isValid=false;
        })
        if(!isValid) throw new Error("Course not found");
        if(courses.length<4){
            isValid=false;
            throw new Error("Must select atleast four courses")
        }
        return isValid;
    }
    static validateName(name:string){
        return name.trim().length!==0;
    }
    static validateAddress(address:string){
        return address.trim().length!==0;
    }
    static validateAge(age:number){
        return age>0&&!isNaN(age);
    }
    static validateRollNumber(rollNumber:number){
        return rollNumber>0&&!isNaN(rollNumber);
    }
    static validateUser(user : User){
        if(!this.validateName(user.getName())) throw new Error("Invalid name Inputs")
        if(!this.validateAddress(user.getAddress())) throw new Error("Invalid address Inputs")
        if(!this.validateAge(user.getAge())) throw new Error("Invalid age Inputs")
        if(!this.validateRollNumber(user.getRollNumber())) throw new Error("Invalid roll Number Inputs")
        this.validateCourses(user.getCources());
        return true;
    }
    static fromJson(json:any){
        let user=new User();
        user.copyConstructor(json);
        return user;
    }
    
}