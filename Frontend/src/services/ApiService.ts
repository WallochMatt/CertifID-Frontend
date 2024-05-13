import {Appsettings} from "../../Appsettings";
import { Location } from "../models/Location"
import { Group } from "../models/Group"
import { User } from "../models/User"
import { AccessPoint } from "../models/AccessPoint"

export interface IApiService {
    getUsers : () => Promise<Array<User>>;
    getGroups : () => Promise<Array<Group>>;
    getLocations : () => Promise<Array<Location>>;
    getAccessPoints : () => Promise<Array<AccessPoint>>;

    addUser : (user: User) => Promise<User>;
}

class DatabaseData{
    constructor(public users:Array<User>, public groups:Array<Group>, public locations:Array<Location>, public accessPoints:Array<AccessPoint>){}

    static generateFakeData:() => DatabaseData = () => {
        let groups:Array<Group> = [
            new Group(0, "Web Application Team", "Software Developmnet", "Active", "Create and maintain buisness site"),
            new Group(1, "Human Resources", "Human Resources", "Active", "Foster positive workplace environment"),
            new Group(2, "Security", "Security", "Active", "Provide protection from potential threats"),
            new Group(3, "Trainers", "Education", "Active", "Train employees on skills to use CID"),
            new Group(4, "Backend Infrustrucutre", "Software Development", "Active", "Maintain data and models"),
        ]

        let accessPoints:Array<AccessPoint> = [
            new AccessPoint("Front Door", [0]),
            new AccessPoint("Back Door", [1]),
            new AccessPoint("West Side Entrnace", [2]),
            new AccessPoint("Underground Parking", [4]),
            new AccessPoint("Main Entrance", [3]),
        ]

        let locations:Array<Location> =  [
            new Location(0, "Milwaukee", "WI", "777 E Wisconsin Ave", "53202", [0, 3]),
            new Location(0, "Madison", "WI", "999 N Wesker Ave", "86753", [1]),
            new Location(0, "Chicago", "IL", "123 DeBeirs Blvd", "53202", [2, 4])
        ]

        let users:Array<User> = [
            new User("Matthew", "Walloch", "mattwall@cidmail.com" ,0, 0, "Software Engineer I"),
            new User("Christian", "Haliga", "chaliga@cidmail.com" ,0, 4, "Software Engineer III"),
            new User("Chad", "Gouin", "chadgo@cidmail.com" ,2, 2, "Security Specialist"),
            new User("Emily", "Gouin", "emgouin@cidmail.com" ,2, 3, "Admin Trainer"),
            new User("Andrew", "Keiser", "akkeiser@cidmail.com" ,1, 1, "HR Representative"),

        ]
        return new DatabaseData(users, groups, locations, accessPoints)
    }
}





class MockApiService implements IApiService{
    private _data:DatabaseData = DatabaseData.generateFakeData();

    async getUsers(){
        return(await Promise.resolve(this._data.users))
    }
    async getGroups(){
        return(await Promise.resolve(this._data.groups))
    }
    async getLocations(){
        return(await Promise.resolve(this._data.locations))
    }
    async getAccessPoints(){
        return(await Promise.resolve(this._data.accessPoints))
    }

    async addUser(user: User) {
        this._data.users.push(user);
        return await Promise.resolve(user);
    }
}

class RealApiService implements IApiService{
    private baseUrl : string =  `${window.location.origin}/api`;


    async getUsers(){
        let response = await fetch(`${this.baseUrl}/GetUsers`)
        return(JSON.parse(`{"data": ${await response.text()} }`).data)
    }
    async getGroups(){
        let response = await fetch(`${this.baseUrl}/GetGroups`)
        return(JSON.parse(`{"data": ${await response.text()} }`).data)
    }
    async getLocations(){
        let response = await fetch(`${this.baseUrl}/GetLocations`)
        return(JSON.parse(`{"data": ${await response.text()} }`).data)
    }
    async getAccessPoints(){
        let response = await fetch(`${this.baseUrl}/GetAccessPoints`)
        return(JSON.parse(`{"data": ${await response.text()} }`).data)
    }
    
}

// export const ApiService : IApiService = Appsettings.Built ? new RealApiService() : new MockApiService()
export const ApiService : IApiService = new MockApiService();