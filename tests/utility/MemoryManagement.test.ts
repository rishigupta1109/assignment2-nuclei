import { expect, test } from "vitest";
import { MemoryManagement } from "../../utility/classes/MemoryManagement";
import { Course } from "../../utility/classes/Course";
import { User } from "../../utility/classes/User";

test("testing memory management",()=>{
    let memoryManagement= MemoryManagement.getInstance("Data/Data.json");
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
    memoryManagement.saveData([
        user
    ]);
    expect(memoryManagement.getData()).toEqual([
        {
            "name": "John",
            "age": 20,
            "address": "Delhi",
            "rollNumber": 123,
            "courses": [
                {
                    "name": "A"
                },
                {
                    "name": "B"
                },
                {
                    "name": "C"
                },
                {
                    "name": "D"
                }
            ]
        }
    ]);
})