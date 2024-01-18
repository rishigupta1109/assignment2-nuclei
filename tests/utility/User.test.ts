import { expect, test } from "vitest";
import { Course } from "../../utility/classes/Course";
import { User } from "../../utility/classes/User";

test("testing User class set and get functions",()=>{
    const courses=[new Course('A'),new Course('B'),new Course('C'),new Course('D'),new Course('E'),new Course('F')]
    
    const testccases=[{
        name:"",
        age:0,
        rollNumber:1,
        address:"",
        courses:[],
    }
    ,{
        name:"John",
        age:0,
        rollNumber:1,
        address:"",
        courses:[courses[0]],
    },
    {
        name:"John",
        age:20,
        rollNumber:1,
        address:"",
        courses:[
            courses[0],
            courses[1],
            courses[2],
            courses[3],
            courses[4],
            courses[5],
        
        ],
    },
    {
        name:"John",
        age:20,
        rollNumber:1,
        address:"India",
        courses:[
            courses[0],
            courses[1],
            courses[2],
            courses[3],
            courses[4],
            courses[5],
        ],
    },
    {
        name:"John",
        age:20,
        rollNumber:1,
        address:"India",
        courses:courses,
    }
]
    testccases.forEach(testcase=>{
        let user=new User();
        user.setName(testcase.name);
        user.setAge(testcase.age);
        user.setRollNumber(testcase.rollNumber);
        user.setAddress(testcase.address);
        user.setCourses(testcase.courses);
        expect(user.getName()).toBe(testcase.name);
        expect(user.getAge()).toBe(testcase.age);
        expect(user.getRollNumber()).toBe(testcase.rollNumber);
        expect(user.getAddress()).toBe(testcase.address);
        expect(user.getCources()).toBe(testcase.courses);
    })
})

test("testing User class validate name function",()=>{
    const trueTestcases=[
        "John",
        "John Cena",
        "123John",
    ]
    trueTestcases.forEach(testcase=>{
        let user=new User();
        user.setName(testcase);
        expect(
            User.validateName(user.getName())
        ).toBe(true);
    })
    const falseTestcases=[
        "",
        " ",
        "   ",
    ]
    falseTestcases.forEach(testcase=>{
        let user=new User();
        user.setName(testcase);
        expect(
            User.validateName(user.getName())
        ).toBe(false);
    })
})

test("testing User class validate address function",()=>{
    const trueTestcases=[
        "indore",
        "61/6 indore",
        "america",
    ]
    trueTestcases.forEach(testcase=>{
        let user=new User();
        user.setAddress(testcase);
        expect(
            User.validateAddress(user.getAddress())
        ).toBe(true);
    })
    const falseTestcases=[
        "",
        " ",
        "   ",
    ]
    falseTestcases.forEach(testcase=>{
        let user=new User();
        user.setAddress(testcase);
        expect(
            User.validateAddress(user.getAddress())
        ).toBe(false);
    })
})

test("testing User class validate age function",()=>{
    const trueTestcases=[
        1,
        10,
        100,
        1000,
        10000,
    ]
    trueTestcases.forEach(testcase=>{
        let user=new User();
        user.setAge(testcase);
        expect(User.validateAge(user.getAge())).toBe(true);
    })
    const falseTestcases=[
        0,
        -1,
        -10,
        -100,
        -1000,
        -10000,
    ]
    falseTestcases.forEach(testcase=>{
        let user=new User();
        user.setAge(testcase);
        expect(
            User.validateAge(user.getAge())
        ).toBe(false);
    })
})

test("testing User class validate roll Number function",()=>{
    const trueTestcases=[
        1,
        10,
        100,
        1000,
        10000,
    ]
    trueTestcases.forEach(testcase=>{
        let user=new User();
        user.setRollNumber(testcase);
        expect(User.validateRollNumber(user.getRollNumber())).toBe(true);
    })
    const falseTestcases=[
        0,
        -1,
        -10,
        -100,
        -1000,
        -10000,
    ]
    falseTestcases.forEach(testcase=>{
        let user=new User();
        user.setRollNumber(testcase);
        expect(User.validateRollNumber(user.getRollNumber())).toBe(false);
    })
});

test("testing User class validate courses function",()=>{
    const trueTestcases=[
        [new Course('A'),new Course('B'),new Course('C'),new Course('D'),new Course('E'),new Course('F')],
        [new Course('A'),new Course('B'),new Course('C'),new Course('D')],
        [new Course('A'),new Course('B'),new Course('C'),new Course('D'),new Course('E')],
    ]
    trueTestcases.forEach(testcase=>{
        let user=new User();
        user.setCourses(testcase);
        expect(User.validateCourses(user.getCources())).toBe(true);
    })
    
})
test("testing User class validate courses function fail cases",()=>{
    const falseTestcases=[
        [new Course('A'),new Course('B'),new Course('C')],
        [new Course('A'),new Course('B'),new Course('C'),new Course('D'),new Course('E'),new Course('F'),new Course('G'),new Course('H')],
    ]
    
        let user=new User();
        user.setCourses(falseTestcases[0]);
        expect(()=>User.validateCourses(user.getCources())).toThrowError("Must select atleast four courses");
        user.setCourses(falseTestcases[1]);
        expect(()=>User.validateCourses(user.getCources())).toThrowError("Course not found");
    
})
test("testing User class validate user function",()=>{
    const trueTestcases=[
        {
            name:"John",
            age:20,
            rollNumber:1,
            address:"India",
            courses:[
                new Course('A'),
                new Course('B'),
                new Course('C'),
                new Course('D'),
                new Course('E'),
                new Course('F'),
            ],
        },
        {
            name:"John",
            age:20,
            rollNumber:1,
            address:"India",
            courses:[
                new Course('A'),
                new Course('B'),
                new Course('C'),
                new Course('D'),
                new Course('E'),
                new Course('F'),
            ],
        },
    ]
    trueTestcases.forEach(testcase=>{
        let user=new User();
        user.setName(testcase.name);
        user.setAge(testcase.age);
        user.setRollNumber(testcase.rollNumber);
        user.setAddress(testcase.address);
        user.setCourses(testcase.courses);
        expect(User.validateUser(user)).toBe(true);
    })
})
test("testing User class validate user function fail cases",()=>{

    const falseTestcases=[
        {
            name:"John",
            age:20,
            rollNumber:1,
            address:"India",
            courses:[
                new Course('A'),
                new Course('B'),
                new Course('C'),
               
            ],
            expeectedError:"Must select atleast four courses"
        },
        {
            name:"John",
            age:22,
            rollNumber:1,
            address:"India",
            courses:[
                new Course('A'),
                new Course('B'),
                new Course('C'),
                new Course('D'),
                new Course('E'),
                new Course('F'),
                new Course('G'),
                new Course('H'),
            ],
            expeectedError:"Course not found"
        },
        {
            name:"",
            age:20,
            rollNumber:1,
            address:"India",
            courses:[
                new Course('A'),
                new Course('B'),
                new Course('C'),
                new Course('D'),
                new Course('E'),
                new Course('F'),
            ],
            expeectedError:"Invalid name Inputs"
        },
        {
            name:"John",
            age:-1,
            rollNumber:1,
            address:"India",
            courses:[
                new Course('A'),
                new Course('B'),
                new Course('C'),
                new Course('D'),
                new Course('E'),
                new Course('F'),
            ],
            expeectedError:"Invalid age Inputs"
        },
        {
            name:"John",
            age:20,
            rollNumber:-130,
            address:"India",
            courses:[
                new Course('A'),
                new Course('B'),
                new Course('C'),
                new Course('D'),
                new Course('E'),
                new Course('F'),
            ],
            expeectedError:"Invalid roll Number Inputs"
        },
        {
            name:"John",
            age:20,
            rollNumber:1,
            address:"",
            courses:[
                new Course('A'),
                new Course('B'),
                new Course('C'),
                new Course('D'),
                new Course('E'),
                new Course('F'),
            ],
            expeectedError:"Invalid address Inputs"
        },


    ]
    falseTestcases.forEach(testcase=>{
        let user=new User();
        user.setName(testcase.name);
        user.setAge(testcase.age);
        user.setRollNumber(testcase.rollNumber);
        user.setAddress(testcase.address);
        user.setCourses(testcase.courses);
        expect(()=>User.validateUser(user)).toThrowError(testcase.expeectedError);
    }
    )
    
})
test("testing copy constructor",()=>{
    const testcases=[
        {
            name:"John",
            age:20,
            rollNumber:1,
            address:"India",
            courses:[
                new Course('A'),
                new Course('B'),
                new Course('C'),
                new Course('D'),
                new Course('E'),
                new Course('F'),
            ],
        },
        {
            name:"John",
            age:20,
            rollNumber:1,
            address:"India",
            courses:[
                new Course('A'),
                new Course('B'),
                new Course('C'),
                new Course('D'),
                new Course('E'),
                new Course('F'),
            ],
        },
    ]
    testcases.forEach(testcase=>{
        let user=new User();
        user.setName(testcase.name);
        user.setAge(testcase.age);
        user.setRollNumber(testcase.rollNumber);
        user.setAddress(testcase.address);
        user.setCourses(testcase.courses);
        let user2=new User();
        user2.copyConstructor(user);
        expect(user2.getName()).toBe(testcase.name);
        expect(user2.getAge()).toBe(testcase.age);
        expect(user2.getRollNumber()).toBe(testcase.rollNumber);
        expect(user2.getAddress()).toBe(testcase.address);
        expect(user2.getCources()).toStrictEqual(testcase.courses);
    })
})