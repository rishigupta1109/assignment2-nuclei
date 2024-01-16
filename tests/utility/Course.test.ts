import { expect, test } from "vitest";
import { Course } from "../../utility/classes/Course";

test("testing course class and getName function",()=>{
    let testcases=["","John","John Cena","123John"];
    testcases.forEach(testcase=>{
        let course=new Course(testcase);
        expect(course.getName()).toBe(testcase);
    })
})