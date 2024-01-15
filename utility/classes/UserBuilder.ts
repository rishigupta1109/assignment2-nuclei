import { isNumericLiteral } from "typescript";
import { validCourses } from "../constant";
import { readALine } from "../utils";
import { Course } from "./Course";
import { User } from "./User";

export class UserBuilder{
    private user:User;
    constructor(){
        this.user=new User()
    }
    setUser(){
            console.log('Name :');
            const name=readALine();
            console.log('Age :');
            const age=parseInt(readALine());
            console.log('Address :');
            const address=readALine();
            console.log('Roll Number :');
            const rollNumber=parseInt(readALine());
            console.log('Courses :');
            const cources=readALine();
            this.user=new User();
            this.user.setName(name);
            this.user.setAddress(address);
            this.user.setRollNumber(rollNumber);
            this.user.setAge(age);
            const coursesArray=this.getCoursesFromString(cources);
            if(!this.validateName(name)) throw new Error("Invalid name Inputs")
            if(!this.validateAddress(address)) throw new Error("Invalid address Inputs")
            if(!this.validateAge(age)) throw new Error("Invalid age Inputs")
            if(!this.validateRollNumber(rollNumber)) throw new Error("Invalid roll Number Inputs")
            if(!this.validateCourses(coursesArray)) throw new Error("Invalid course Inputs")
            this.user.setCourses(coursesArray);
    }
    getUser(){
        return this.user;
    }
    getCoursesFromString(courses:string):Course[]{
        let coursesStrings=courses.split(',');
        coursesStrings=coursesStrings.map(courseString=>courseString.trim());
        let coursesArray= coursesStrings.map(course=>new Course(course));
        return coursesArray;
    }
    validateCourses(courses:Course[]){
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
    validateName(name:string){
        return name.trim().length!==0;
    }
    validateAddress(add:string){
        return add.trim().length!==0;
    }
    validateAge(age:number){
        return age>0&&!isNaN(age);
    }
    validateRollNumber(roll:number){
        return roll>0&&!isNaN(roll);
    }
}