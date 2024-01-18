import fs from 'fs'
import { User } from './User';

//Followed singleton pattern

export class MemoryManagement{
    private path:string;
    private static memoryManagement:MemoryManagement;
    private constructor(path:string){
        this.path=path;
    }
    static getInstance(path:string){
        if(!this.memoryManagement){
            this.memoryManagement=new MemoryManagement(path);
        }
        return this.memoryManagement;
    }
    getData(){
        const data=fs.readFileSync(this.path);
        // console.log(JSON.parse(data.toString()))
        const jsonData=JSON.parse(data.toString());
        return jsonData;
    }
    saveData(data:any){
        fs.writeFileSync(this.path,JSON.stringify(data));
    }
}
