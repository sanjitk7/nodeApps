const BirthdayParty = {
    name: "Sanjit's Bday Party",
    GuestList :["Gorti","Arvind","Menon"],
    PrintGuestList(){
        console.log("This is "+ this.name + "'s Guest List:")
        this.GuestList.forEach((guest)=>{
            
            console.log(guest + "is attending " + this.name)
        })
        }
}

BirthdayParty.PrintGuestList()