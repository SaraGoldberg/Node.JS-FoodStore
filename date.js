class MyDate {

    date = new Date();

    constructor(date) {
        if(date == "")
            this.date = new Date();
        else
            this.date = new Date(date);
    }
    getISODate(){
        return this.date.toISOString();
    }
    getUTCStringDate(){
        return this.date.toUTCString();
    }
    getLocaleTimeStringDate(){
        return this.date.toLocaleTimeString();
    }
}
module.exports.MyDate = MyDate;