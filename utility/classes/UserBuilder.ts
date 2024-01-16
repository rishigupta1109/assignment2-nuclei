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
            this.user.setCourses(coursesArray);
            this.user.validateUser();
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
   
}