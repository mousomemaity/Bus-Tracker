const busData = [
  {
    id: "201", 
    busNumber: "201", 
    routeName: "City Center → Airport", 
    source: "City Center", 
    destination: "Airport", 
    currentStop: "Park Street", 
    nextStop: "VIP Road", 
    departure: "08:00 AM", 
    arrival: "08:45 AM", 
    platform: "Platform A", 
    etaMinutes: 5, 
    status: "On Time", 
    driverName: "Robert Miller", 
    availableSeats: 14, 
    totalSeats: 40, 
    frequency: "Every 15 Minutes" 
  },
  {
    id: "115",
    busNumber: "115",
    routeName: "Railway Station → Mall",
    source: "Railway Station",
    destination: "Mall",
    currentStop: "Esplanade",
    nextStop: "Central Plaza",
    departure: "08:15 AM",
    arrival: "09:05 AM",
    platform: "Platform C",
    etaMinutes: 8,
    status: "Delayed",
    driverName: "David Vance",
    availableSeats: 6,
    totalSeats: 45,
    frequency: "Every 20 Minutes"
  },
  {
    id: "78",
    busNumber: "78",
    routeName: "University → Station",
    source: "University",
    destination: "Station",
    currentStop: "College Street",
    nextStop: "Tech Hub",
    departure: "08:30 AM",
    arrival: "09:10 AM",
    platform: "Platform B",
    etaMinutes: 3,
    status: "On Time",
    driverName: "Sarah Jenkins",
    availableSeats: 22,
    totalSeats: 50,
    frequency: "Every 10 Minutes"
  },
  {
    id: "42",
    busNumber: "42",
    routeName: "Airport → Hospital",
    source: "Airport",
    destination: "Hospital",
    currentStop: "Salt Lake",
    nextStop: "Green Avenue",
    departure: "08:45 AM",
    arrival: "09:30 AM",
    platform: "Platform D",
    etaMinutes: 12,
    status: "Cancelled",
    driverName: "Michael Chang",
    availableSeats: 0,
    totalSeats: 40,
    frequency: "Every 30 Minutes"
  },
  {
    id: "305",
    busNumber: "305",
    routeName: "Downtown → West End",
    source: "Downtown",
    destination: "West End",
    currentStop: "Broadway Street",
    nextStop: "Riverfront",
    departure: "09:00 AM",
    arrival: "09:40 AM",
    platform: "Platform A",
    etaMinutes: 6,
    status: "On Time",
    driverName: "Alex Rivera",
    availableSeats: 18,
    totalSeats: 42,
    frequency: "Every 15 Minutes"
  },
  {
    id: "88",
    busNumber: "88",
    routeName: "North Gate → South Hub",
    source: "North Gate",
    destination: "South Hub",
    currentStop: "Market Square",
    nextStop: "Industrial Park",
    departure: "09:15 AM",
    arrival: "10:00 AM",
    platform: "Platform E",
    etaMinutes: 15,
    status: "Delayed",
    driverName: "James Watson",
    availableSeats: 9,
    totalSeats: 48,
    frequency: "Every 25 Minutes"
  }
];


function getStatusBadge(status) {
  
  let badgeClass = "badge-success";
  
  if (status === "Delayed") badgeClass = "badge-warning";
  
  if (status === "Cancelled") badgeClass = "badge-danger";
  
  return `<span class="badge ${badgeClass}">${status}</span>`;
}


document.addEventListener("DOMContentLoaded", () => {
  
  initMobileMenu();
  
  initLiveClock();
  
  initFAQAccordion();
  
  renderLiveBusStatusTable();
  
  renderBusScheduleTable();
  
  startLiveStatusSimulation();
});


function initMobileMenu() {
  
  const menuBtn = document.getElementById("mobileMenuBtn");
  
  const navLinks = document.getElementById("navLinks");
  
  if (menuBtn && navLinks) {
    
    menuBtn.addEventListener("click", () => {
      
      navLinks.classList.toggle("show");
    });

    
    navLinks.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        
        navLinks.classList.remove("show");
      });
    });
  }
}


function initLiveClock() {
  
  const clockElement = document.getElementById("liveClock");
  
  if (!clockElement) return;

  
  function updateClock() {
    
    const now = new Date();
    
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    clockElement.textContent = timeString;
  }

  
  updateClock();
  
  setInterval(updateClock, 1000);
}


function initFAQAccordion() {
  
  const faqItems = document.querySelectorAll(".faq-item");
  
  faqItems.forEach(item => {
    
    const questionBtn = item.querySelector(".faq-question");
    
    if (questionBtn) {
      
      questionBtn.addEventListener("click", () => {
        
        const isActive = item.classList.contains("active");
        
        
        faqItems.forEach(other => other.classList.remove("active"));
        
        
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });
}


function renderLiveBusStatusTable() {
  
  const tableBody = document.getElementById("liveBusStatusBody");
  
  if (!tableBody) return;

  
  tableBody.innerHTML = busData.map(bus => `
    <tr>
      <td class="bus-num-cell">Bus #${bus.busNumber}</td>
      <td>${bus.routeName}</td>
      <td>${bus.currentStop}</td>
      <td>${bus.status === 'Cancelled' ? '--' : bus.etaMinutes + ' min'}</td>
      <td>${getStatusBadge(bus.status)}</td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="openBusModal('${bus.id}')">View Details</button>
      </td>
    </tr>
  `).join('');
}


function renderBusScheduleTable() {
  
  const scheduleBody = document.getElementById("busScheduleBody");
  
  if (!scheduleBody) return;

  
  scheduleBody.innerHTML = busData.map(bus => `
    <tr>
      <td class="bus-num-cell">Bus #${bus.busNumber}</td>
      <td>${bus.departure}</td>
      <td>${bus.arrival}</td>
      <td>${bus.platform}</td>
      <td>${getStatusBadge(bus.status)}</td>
    </tr>
  `).join('');
}


function startLiveStatusSimulation() {
  
  setInterval(() => {
    
    const randomIndex = Math.floor(Math.random() * busData.length);
    
    const bus = busData[randomIndex];

    
    if (bus.status !== "Cancelled") {
      
      if (bus.etaMinutes > 1) {
        
        bus.etaMinutes = Math.max(1, bus.etaMinutes + (Math.random() > 0.6 ? 1 : -1));
      } else {
        
        bus.etaMinutes = Math.floor(Math.random() * 12) + 2;
      }

      
      if (Math.random() < 0.15) {
        const statuses = ["On Time", "Delayed"];
        bus.status = statuses[Math.floor(Math.random() * statuses.length)];
      }
    }

    
    renderLiveBusStatusTable();
    renderBusScheduleTable();

    
    if (typeof filterBuses === 'function') {
      filterBuses();
    }
  }, 10000);
}