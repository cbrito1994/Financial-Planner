

//define data
var tabledata = [
    {id:1, User:"Oli Bob", location:"United Kingdom", gender:"male", rating:1, col:"red", dob:"14/04/1984"},
    
];

//define table
var table = new Tabulator("#wallet-table", {
    data:tabledata,
    autoColumns:true,
});