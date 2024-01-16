import fs from 'fs'
import { User } from './User';
export class MemoryManagement{
    private path:string;
    constructor(path:string){
        this.path=path;
    }
    getData(){
        const data=fs.readFileSync(this.path);
        // console.log(JSON.parse(data.toString()))
        const jsonData=JSON.parse(data.toString());
        return jsonData;
    }
    saveData(data:User[]){
        fs.writeFileSync(this.path,JSON.stringify(data));
    }
}