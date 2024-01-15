import { Course } from "./Course";

export class User{
    private name:string;
    private address:string;
    private rollNumber:number;
    private age:number;
    private courses:Course[];
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
    setCourses(courses:string){
        this.courses=this.getCoursesFromString(courses) ;       
    }
    getCoursesFromString(courses:string):Course[]{
        let coursesStrings=courses.split(',');
        coursesStrings=coursesStrings.map(courseString=>courseString.trim());
        let coursesArray= coursesStrings.map(course=>new Course(course));
        return coursesArray;
    }
}