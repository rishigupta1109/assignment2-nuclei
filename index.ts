import { MemoryManagement } from "./utility/classes/MemoryManagement";
import { UserDataManagement } from "./utility/classes/UserDataManagement";

console.log("Welcome to Nuclei User Management System");

function main(){
    const userDataManagement=new UserDataManagement();
    userDataManagement.run();
}
main();
