// Event Data
const events = [
    {
        id: 1,
        name: "Tech Innovation Summit 2026",
        category: "Technology",
        date: "2026-12-15T10:00:00",
        venue: "Bhubaneswar Convention Centre",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        description: "Explore the latest technologies, artificial intelligence, innovation and future trends with industry experts."
    },
    {
        id: 2,
        name: "Music Festival 2026",
        category: "Music",
        date: "2026-12-20T18:00:00",
        venue: "City Open Ground",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
        description: "Enjoy an unforgettable musical experience featuring live performances, talented artists and amazing entertainment."
    },
    {
        id: 3,
        name: "Business Leadership Conference",
        category: "Business",
        date: "2027-01-10T09:00:00",
        venue: "Grand Convention Hall",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
        description: "Meet successful entrepreneurs and business leaders to explore leadership, networking and business opportunities."
    },
    {
        id: 4,
        name: "Creative Art Exhibition",
        category: "Art",
        date: "2027-01-18T11:00:00",
        venue: "Modern Art Gallery",
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800",
        description: "Discover creative artwork, photography, paintings and inspiring artistic expressions."
    },
    {
        id: 5,
        name: "Web Development Workshop",
        category: "Education",
        date: "2027-01-25T10:00:00",
        venue: "Innovation Learning Centre",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
        description: "Learn HTML, CSS and JavaScript through practical activities and interactive learning sessions."
    },
    {
        id: 6,
        name: "AI and Future Technology",
        category: "Technology",
        date: "2027-02-05T09:30:00",
        venue: "Digital Technology Park",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
        description: "Explore artificial intelligence, machine learning, automation and emerging technologies."
    }
];

// HTML Elements
const eventContainer = document.getElementById("eventContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const noEvents = document.getElementById("noEvents");

const selectedEvent = document.getElementById("selectedEvent");
const registrationForm = document.getElementById("registrationForm");
const formMessage = document.getElementById("formMessage");

const eventModal = document.getElementById("eventModal");

// Format Date
function formatDate(date) {
    return new Date(date).toLocaleString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
}

// Display Events
function displayEvents(eventList) {
    eventContainer.innerHTML = "";

    noEvents.hidden = eventList.length !== 0;

    eventList.forEach(event => {
        const card = document.createElement("article");
        card.className = "event-card";

        card.innerHTML = `
            <img src="${event.image}" alt="${event.name}" loading="lazy">

            <div class="event-card-content">
                <span class="event-category">${event.category}</span>

                <h3>${event.name}</h3>

                <div class="event-meta">
                    📅 ${formatDate(event.date)}
                </div>

                <div class="event-meta">
                    📍 ${event.venue}
                </div>

                <p>${event.description}</p>

                <button class="details-btn" data-event-id="${event.id}">
                    View Details →
                </button>
            </div>
        `;

        eventContainer.appendChild(card);
    });
}

// Populate Registration Dropdown
function populateDropdown() {
    selectedEvent.innerHTML = '<option value="">Choose an event</option>';

    events.forEach(event => {
        const option = document.createElement("option");

        option.value = event.id;
        option.textContent = event.name;

        selectedEvent.appendChild(option);
    });
}

// Search and Filter Events
function filterEvents() {
    const searchText = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filteredEvents = events.filter(event => {
        const matchesSearch =
            event.name.toLowerCase().includes(searchText) ||
            event.category.toLowerCase().includes(searchText) ||
            event.venue.toLowerCase().includes(searchText);

        const matchesCategory =
            category === "All" || event.category === category;

        return matchesSearch && matchesCategory;
    });

    displayEvents(filteredEvents);
}

searchInput.addEventListener("input", filterEvents);
categoryFilter.addEventListener("change", filterEvents);

// Event Details Modal
eventContainer.addEventListener("click", function(event) {
    const button = event.target.closest(".details-btn");

    if (!button) return;

    const eventId = Number(button.dataset.eventId);
    showEventDetails(eventId);
});

function showEventDetails(eventId) {
    const event = events.find(item => item.id === eventId);

    if (!event) return;

    document.getElementById("modalImage").src = event.image;
    document.getElementById("modalImage").alt = event.name;

    document.getElementById("modalCategory").textContent = event.category;
    document.getElementById("modalTitle").textContent = event.name;
    document.getElementById("modalDate").textContent =
        "📅 " + formatDate(event.date);
    document.getElementById("modalVenue").textContent =
        "📍 " + event.venue;
    document.getElementById("modalDescription").textContent =
        event.description;

    document.getElementById("modalRegister").onclick = function() {
        selectedEvent.value = String(event.id);
        eventModal.close();

        document.getElementById("register").scrollIntoView({
            behavior: "smooth"
        });
    };

    eventModal.showModal();
}

// Close Modal
document.getElementById("closeModal").addEventListener("click", function() {
    eventModal.close();
});

// Close Modal on Outside Click
eventModal.addEventListener("click", function(event) {
    if (event.target === eventModal) {
        eventModal.close();
    }
});

// Registration Form Validation
registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const eventId = Number(selectedEvent.value);

    formMessage.className = "form-message";

    // Name Validation
    if (name.length < 3 || !/^[a-zA-Z\s'-]+$/.test(name)) {
        showMessage("Please enter a valid name (at least 3 characters).", "error");
        return;
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showMessage("Please enter a valid email address.", "error");
        return;
    }

    // Phone Validation
    if (!/^[6-9]\d{9}$/.test(phone)) {
        showMessage("Please enter a valid 10-digit Indian phone number.", "error");
        return;
    }

    // Event Validation
    const eventData = events.find(item => item.id === eventId);

    if (!eventData) {
        showMessage("Please select an event.", "error");
        return;
    }

    // Check Event Date
    if (new Date(eventData.date) <= new Date()) {
        showMessage("Registration for this event has closed.", "error");
        return;
    }

    // Registration Data
    const registration = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        event: eventData.name,
        registrationDate: new Date().toISOString()
    };

    // Save Registration in LocalStorage
    try {
        const registrations = JSON.parse(
            localStorage.getItem("eventRegistrations") || "[]"
        );

        registrations.push(registration);

        localStorage.setItem(
            "eventRegistrations",
            JSON.stringify(registrations)
        );

        showMessage(
            "Registration successful! Thank you, " + name + ".",
            "success"
        );

        registrationForm.reset();

    } catch (error) {
        showMessage(
            "Unable to save registration in this browser.",
            "error"
        );
    }
});

// Display Messages
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = "form-message " + type;
}

// Dark and Light Mode
const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("eventifyTheme") === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "☾";
}

themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");

    localStorage.setItem(
        "eventifyTheme",
        isLight ? "light" : "dark"
    );

    themeToggle.textContent = isLight ? "☾" : "☀";
});

// Event Countdown Timer
const nextEvent = events
    .filter(event => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

function updateCountdown() {
    if (!nextEvent) return;

    const eventTime = new Date(nextEvent.date).getTime();
    const currentTime = Date.now();

    const difference = eventTime - currentTime;

    if (difference <= 0) {
        document.querySelector(".countdown-section p").textContent =
            "The event has started!";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

// Initialize Website
populateDropdown();
displayEvents(events);
updateCountdown();

setInterval(updateCountdown, 1000);