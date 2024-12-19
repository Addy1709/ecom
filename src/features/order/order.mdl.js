import { MyApplicationError } from "../../error-handler/applicationError.js";
export default class OredrModel {
    constructor(userId,TotalAmount,TimeStamp) {
        this.userId=userId;
        this.TotalAmount=TotalAmount;
        this.TimeStamp=TimeStamp;
    }
}