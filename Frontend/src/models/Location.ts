export class Location {
    constructor(public id:number, public city:string, public state:string, public address:string, public zip:string, public accessPoints:Array<number>)
    {}

    locationName:() => string = () => {
        return `${this.city}, ${this.state}`
    }
}