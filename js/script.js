const busData = [
{
    id: "201",
    busNumber: "201",
    route: "City Center to Airport",
    source: "City Center",
    destination: "Airport",
    currentStop: "Main Street",
    nextStop: "VIP Road",
    departureTime: "10:30 AM",
    arrival: "11:15 AM",
    platform: "Platform A",
    etaMinutes: 5,
    status: "On Time",
    driverName: "Niladri Mahata",
    availableSeats: 14,
    totalSeats: 40,
    frequency: "Every 10 minutes"
},
{
    id: "115",
    busNumber: "115",
    route: "Railway Station to Shopping Mall",
    source: "Railway Station",
    destination: "Shopping Mall",
    currentStop: "College More",
    nextStop: "Bus Stand",
    departureTime: "09:45 AM",
    arrival: "10:30 AM",
    platform: "Platform B",
    etaMinutes: 8,
    status: "Running",
    driverName: "Rahul Das",
    availableSeats: 20,
    totalSeats: 40,
    frequency: "Every 15 minutes"
},
{
    id: "78",
    busNumber: "78",
    route: "University to Central Station",
    source: "University",
    destination: "Central Station",
    currentStop: "Science Park",
    nextStop: "Library",
    departureTime: "11:00 AM",
    arrival: "11:40 AM",
    platform: "Platform C",
    etaMinutes: 3,
    status: "On Time",
    driverName: "Amit Roy",
    availableSeats: 12,
    totalSeats: 40,
    frequency: "Every 20 minutes"
},
{
    id: "42",
    busNumber: "42",
    route: "Airport to City Hospital",
    source: "Airport",
    destination: "City Hospital",
    currentStop: "VIP Road",
    nextStop: "Medical College",
    departureTime: "12:15 PM",
    arrival: "01:00 PM",
    platform: "Platform D",
    etaMinutes: 2,
    status: "Arriving",
    driverName: "Sourav Sen",
    availableSeats: 9,
    totalSeats: 40,
    frequency: "Every 30 minutes"
},
{
    id: "305",
    busNumber: "305",
    route: "Downtown to West End",
    source: "Downtown",
    destination: "West End",
    currentStop: "City Hall",
    nextStop: "West Market",
    departureTime: "01:30 PM",
    arrival: "02:20 PM",
    platform: "Platform E",
    etaMinutes: 7,
    status: "Running",
    driverName: "Rakesh Kumar",
    availableSeats: 18,
    totalSeats: 40,
    frequency: "Every 25 minutes"
},
{
    id: "88",
    busNumber: "88",
    route: "North Gate to South Hub",
    source: "North Gate",
    destination: "South Hub",
    currentStop: "Green Park",
    nextStop: "City Square",
    departureTime: "02:00 PM",
    arrival: "02:55 PM",
    platform: "Platform F",
    etaMinutes: 10,
    status: "Delayed",
    driverName: "Ankit Sharma",
    availableSeats: 24,
    totalSeats: 40,
    frequency: "Every 20 minutes"
},

];

function getStatusBadge(status) {
    let badgeClass = "badge-success";
    if (status === "Delayed") badgeClass = "badge-warning";
    if (status === "Cancelled") badgeClass = "badge-danger";
    return `<span class="badge ${badgeClass}">${status}</span>` ;
}


document.addEventListener("DOMContentLoaded", () =>{
    initMobileMenu(); 
    initLiveClock(); // function call
    initFAQAccordion();
    renderLiveBusStatusTable(); //livebus ar table k call korache
    renderBusScheduleTable();
    startLiveStatusSimulation(); // simulation mane bus kothai ache 

});


function initMobileMenu(){ // function create
    const menuBtn = document.getElementById("mobileMenuBtn"); 
    const navLinks = document.getElementById("navLinks");
    if (menuBtn && navLinks){
        menuBtn.addEventListener("click",() =>{
            navLinks.classList.toggle("show");
        });
    }
}

navLinks.querySelectorAll(".navlink").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});


function initLiveClock(){
    const clockElement = document.getElementById("liveClock");
    if(!clockElement) return;
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit' , minute:'2-digit' , second:'2-digit'}); // HH:MM:SS format
        clockElement.textContent = timeString;
    }
    updateClock();
    setInterval(updateClock, 1000);

}

function initFAQAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item =>{
        const questionBtn = item.querySelector(".faq-question");
        if(questionBtn) {
            questionBtn.addEventListener("click",() =>{
                const isActive = item.classList.contains("active");
                faqItems.forEach(other => other.classList.remove("Active"));
                if (!isActive){
                    item.classList.add("active");
                }
            });
        }
    });
}


function renderLiveBusStatusTable() {
    const tableBody = document.getElementById("liveBusStatustableBody");
    if (!tableBody) return;
    tableBody.innerHTML = busData.map(bus => `
        <tr>
            <td class="bus-num-cell">${bus.busNumber}</td>
            <td>${bus.routeName}</td>
            <td>${bus.currentStop}</td>
            <td>${bus.status === 'cancelled' ? '--' : bus.etaMunites + 'min'}</td>
            <td>${getStatusBadge(bus.status)}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="showBusModel('${bus.id}')">View Details</button>
            </td>
        </tr>
    `).join("");
}

function renderBusScheduleTable(){
    const tableBody = document.getElementById("busScheduleTableBody");
    if(!tableBody) return;
    scheduleBody.innerHTML = busData.map(bus => `
        <tr>
            <td class = "bus-num-cell">${bus.busNumber}</td>
            <td><${bus.departureTime}/td>
            <td>${bus.arrival}</td>
            <td>${bus.platform}</td>
            <td>${getStatusBadge(bus.status)}</td>
        </tr>
    `).join("");
}



function startLiveStatusSimulation(){
    setInterval(() => {
        const randomBusIndex = Math.floor(Math.random() * busData.length);
        const bus = busData[randomBusIndex];
        if (bus.status !== "cancelled"){
            if(bus.etaMinutes > 1){
                bus.etaMinutes = Math.max(1, bus.etaMinutes + (Math.random() > 0.6 ? 1 : -1));
            } else {
                bus.etaMunites = Math.floor(Math.random() *12) +2;
            }

            if(Math.random() < 0.15){
                const statuses = ["On Time","Delayed",];
                bus.status = statuses [Math.floor(Math.random() * statuses.length)];

            }
        }

        renderLiveBusStatusTable();
        renderBusScheduleTable();
        if (typeof filterBuses == 'function'){
            filterBuses();
        }

    }, 10000);
}

