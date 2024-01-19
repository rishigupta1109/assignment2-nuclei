import { readALine } from '../utils';
import { User } from './User';
import { UserBuilder } from './UserBuilder';
import { MemoryManagement } from './MemoryManagement';

export class UserDataManagement {
  private users: User[];
  private userBuilder: UserBuilder;
  private memoryManagement: MemoryManagement;
  constructor() {
    this.memoryManagement = MemoryManagement.getInstance('./Data/Data.json');
    this.userBuilder = new UserBuilder();
    this.users = [];
    try {
      const data = this.memoryManagement.getData();
      // console.log(data);
      try {
        if (Array.isArray(data) && data.length > 0) {
          const arr: User[] = [];
          data.forEach((user) => {
            let userWithMeths = User.fromJson(user);
            User.validateUser(userWithMeths);
            arr.push(userWithMeths);
          });
          this.users = arr;
          console.log('Data Loaded from Memory');
        } else {
          this.users = [];
          console.log('No Data Found in Memory');
        }
      } catch (err: any) {
        console.log(err, err?.message);
        this.users = [];
      }
    } catch (err: any) {
      this.users = [];
      console.log('ERROR : ', err?.message);
    }
  }
  sortUsers(order: number = 1, field: number = 1) {
    if (order !== 1 && order !== 2) {
      throw new Error('Invalid Order');
    }
    if (field !== 1 && field !== 2 && field !== 3 && field !== 4) {
      throw new Error('Invalid Field');
    }
    this.users.sort((user1, user2) => {
      let val1: string | number, val2: string | number;
      let secVal1: string | number, secVal2: string | number;
      switch (field) {
        case 1:
          val1 = user1.getName();
          val2 = user2.getName();
          secVal1 = user1.getRollNumber();
          secVal2 = user2.getRollNumber();
          break;
        case 2:
          val1 = user1.getRollNumber();
          val2 = user2.getRollNumber();
          secVal1 = user1.getName();
          secVal2 = user2.getName();
          break;
        case 3:
          val1 = user1.getAge();
          val2 = user2.getAge();
          secVal1 = user1.getName();
          secVal2 = user2.getName();
          break;
        case 4:
          val1 = user1.getAddress();
          val2 = user2.getAddress();
          secVal1 = user1.getName();
          secVal2 = user2.getName();
          break;
      }
      if (order === 1) {
        if (val1 < val2) return -1;
        else if (val1 > val2) return 1;
        else if (secVal1 < secVal2) return -1;
        else return 1;
      } else {
        if (val1 < val2) return 1;
        else if (val1 > val2) return -1;
        else if (secVal1 < secVal2) return 1;
        else return -1;
      }
    });
  }
  addUser() {
    console.log('Please provide details of user :');
    this.userBuilder = new UserBuilder();
    this.userBuilder.setUser();
    const newUser = this.userBuilder.getUser();
    const userPresent = this.users.findIndex(
      (user) => user.getRollNumber() === newUser.getRollNumber(),
    );
    if (userPresent !== -1) {
      throw new Error('User with this roll number already present.');
    }
    this.users.push(newUser);
    this.sortUsers();
    console.log('User added successfully!');
  }
  sortPrompt() {
    console.log('Please select the order in which you want to sort :');
    console.log('Press 1. to sort in ascending order');
    console.log('Press 2. to sort in descending order');
    const order = parseInt(readALine());
    if (order !== 1 && order !== 2) {
      throw new Error('Invalid Input');
    }
    console.log('Please select the field on which you want to sort :');
    console.log('Press 1. to sort by name');
    console.log('Press 2. to sort by roll number');
    console.log('Press 3. to sort by age');
    console.log('Press 4. to sort by address');
    const field = parseInt(readALine());
    if (field !== 1 && field !== 2 && field !== 3 && field !== 4) {
      throw new Error('Invalid Input');
    }
    this.sortUsers(order, field);
  }
  displayUsers() {
    if (this.users.length === 0) {
      console.log('No Users Present');
      return this.users;
    }
    this.sortPrompt();
    console.log('Displaying Users :');
    console.table(this.users);
    return this.users;
  }
  deleteUser() {
    console.log('Please Input the roll Number of user to delete');
    const rollNumber = parseInt(readALine());
    const exists = this.users.findIndex(
      (user) => user.getRollNumber() === rollNumber,
    );
    if (exists === -1) {
      throw new Error('User doesn`t Exists');
    } else {
      this.users.splice(exists, 1);
      console.log('User Deleted succcessfully!');
    }
  }
  saveUsers() {
    this.sortUsers();
    this.memoryManagement.saveData(this.users);
    console.log('Data Saved SuccessFully!');
  }
  confirmTermination() {
    console.log('Are you sure you want to exit ? (Y/N)');
    const inputA = readALine();
    if (inputA === 'Y') {
      console.log('do you want to save the data ? (Y/N)');
      const input = readALine();
      if (input === 'Y') {
        this.saveUsers();
      } else if (input !== 'N') {
        throw new Error('Invalid Input');
      }
      return true;
    } else if (inputA === 'N') {
      return false;
    } else {
      throw new Error('Invalid Input');
    }
  }
  showMenu(): number {
    console.log('----------');
    console.log('---Menu---');
    console.log('Press 1. to add user.');
    console.log('Press 2. to display user.');
    console.log('Press 3. to delete user.');
    console.log('Press 4. to save user.');
    console.log('Press 5. to exit');
    console.log('----------');
    const input = parseInt(readALine());
    switch (input) {
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
        this.saveUsers();
        break;
      case 5:
        if (this.confirmTermination()) return 0;
        break;
      default:
        throw new Error('Invalid Input');
    }

    return 1;
  }
  run() {
    while (true) {
      try {
        let continueLoop = this.showMenu();
        if (!continueLoop) break;
      } catch (err: any) {
        console.log('ERROR : ', err?.message);
      }
    }
  }
}
