import { getEffectiveConstraintOfTypeParameter } from "typescript";
import { readALine } from "../utils";
import { User } from "./User";
import { UserBuilder } from "./UserBuilder";
import { MemoryManagement } from "./MemoryManagement";

export class UserDataManagement{
    private users:User[];
    private userBuilder:UserBuilder;
    private memoryManagement:MemoryManagement;
    constructor(){
        this.memoryManagement=new MemoryManagement('./Data/Data.json');
        this.userBuilder=new UserBuilder();
        this.users=[];
        try{
            const data=this.memoryManagement.getData();
            // console.log(data);
            try{
                if(Array.isArray(data)&&data.length>0){
                    let isValid=true;
                    data.forEach(user=>{
                        let temp=new User();
                        temp.copyConstructor(user as User);
                        isValid&&=temp.validateUser();
                    })
                    const arr=data.map(d=>{let user=new User();user.copyConstructor(d);return user});
                    this.users=arr;
                    console.log("Data Loaded from Memory");
                }else{
                    console.log("No Data Found in Memory");
                }

            }catch(err:any){
                console.log(err?.message);
                this.users=[];
            }
        }catch(err:any){
            console.log("ERROR : ",err?.message);
        }
    }
    addUser(){
        try{
            console.log("Please provide details of user :");
            this.userBuilder=new UserBuilder();
            this.userBuilder.setUser();
            const newUser=this.userBuilder.getUser();
            const userPresent=this.users.findIndex(user=>user.getRollNumber()===newUser.getRollNumber());
            if(userPresent!==-1){
                throw new Error("User with this roll number already present.")
            }
            this.users.push(newUser);
            console.log("User added successfully!")
        }catch(err:any){
            console.log("ERROR : ",err?.message);
        }
    }
    displayUsers(){
        console.table(this.users);
    }
    deleteUser(){
        console.log("Please Input the roll Number of user to delete");
        try{
            const rollNumber=parseInt(readALine());
            const exists=this.users.findIndex(user=>user.getRollNumber()===rollNumber);
            if(exists===-1){
                throw new Error("User doesn`t Exists");
            }else{
                this.users.splice(exists,1);
                console.log("User Deleted succcessfully!")
            }
        }catch(err:any){
            console.log(err?.message);
        }
    }
    saveUser(){
        try{
            this.memoryManagement.saveData(this.users);
            console.log("User Saved SuccessFully!")
        }catch(err:any){
            console.log("ERROR : ",err?.message);
        }
    }
    showMenu():number{
        console.log("----------");
        console.log("---Menu---");
        console.log("Press 1. to add user.");
        console.log("Press 2. to display user.");
        console.log("Press 3. to delete user.");
        console.log("Press 4. to save user.");
        console.log("Press 5. to exit");
        console.log("----------");
        try{
            const input= parseInt(readALine());
            switch (input){
                case 1:
                    this.addUser();
                    break;
                case 2:
                    this.displayUsers();
                    break;
                case 3:
                    this.deleteUser();
                    break;
                case 4:
                    this.saveUser();
                    break;
                case 5:
                    return 0;
                    break;
                default:
                    throw new Error("Invalid Input");
            }
        }catch(err:any){
            console.error(err?.message);
        }
        return 1;
    }
    run(){
        while(true){
            let continueLoop=this.showMenu();
            if(!continueLoop) break;
        }
    }
}