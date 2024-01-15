import { readALine } from "../utils";
import { User } from "./User";

export class UserDataManagement{
    private users:User[];
    constructor(){
        this.users=[];
    }
    takeInputs(){

    } 
    addUser(){

    }
    displayUsers(){}
    deleteUser(){}
    saveUser(){}
    showMenu():number{
        console.log("Menu");
        console.log("Press 1. to add user.");
        console.log("Press 2. to display user.");
        console.log("Press 3. to delete user.");
        console.log("Press 4. to save user.");
        console.log("Press 5. to exit");
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