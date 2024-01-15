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
    
}