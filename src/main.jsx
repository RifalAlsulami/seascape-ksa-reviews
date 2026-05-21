import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  Anchor,
  CalendarDays,
  Heart,
  Home,
  LogOut,
  MapPin,
  Search,
  Shield,
  Star,
  User,
  Waves,
  CloudSun,
  WalletCards,
  Ship,
  Bike,
  Utensils,
  Hotel,
  Fish,
  TreePalm,
} from "lucide-react";
import "./styles.css";



/* =========================
   Static Data
   ========================= */

const regions = [
  {
    id: "jeddah",
    name: "Jeddah",
    lat: 21.4858,
    lon: 39.1925,
    tagline: "Red Sea energy, luxury marinas, and beach cafés.",
  },
  {
    id: "umluj",
    name: "Umluj",
    lat: 25.0213,
    lon: 37.2685,
    tagline: "Calm islands, clear water, and peaceful coastal escapes.",
  },
  {
    id: "yanbu",
    name: "Yanbu",
    lat: 24.0895,
    lon: 38.0637,
    tagline: "Diving, coral reefs, and family-friendly sea activities.",
  },
  {
    id: "eastern",
    name: "Eastern Province",
    lat: 26.4207,
    lon: 50.0888,
    tagline: "Corniche views, resorts, and Gulf-side experiences.",
  },
];

const activities = [
  {
    id: 1,
    region: "jeddah",
    type: "Yacht Trips",
    title: "Sunset Yacht Cruise",
    price: 850,
    rating: 4.9,
    duration: "3 hours",
    location: "Jeddah Marina",
    image:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80",
    description:
      "A private sunset yacht cruise with sea views, drinks, and relaxing music. Perfect for friends and family.",
    includes: [
      "Private yacht",
      "Captain included",
      "Refreshments",
      "Bluetooth sound system",
    ],
  },
  {
    id: 2,
    region: "jeddah",
    type: "Jet Ski",
    title: "Jet Ski Adventure",
    price: 220,
    rating: 4.7,
    duration: "45 minutes",
    location: "North Obhur",
   image:
  "https://images.pexels.com/photos/1430675/pexels-photo-1430675.jpeg",
   description:
      "A fun jet ski rental experience with safety instructions and beginner-friendly support.",
    includes: [
      "Safety jacket",
      "Instructor briefing",
      "Fuel included",
      "Photo spot",
    ],
  },
  {
    id: 3,
    region: "jeddah",
    type: "Restaurants & Cafés",
    title: "Seaside Dinner Reservation",
    price: 180,
    rating: 4.6,
    duration: "2 hours",
    location: "Jeddah Waterfront",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    description:
      "Reserve a table at a seaside restaurant with sunset views and seafood options.",
    includes: ["Reserved table", "Sea view", "Family seating", "Menu preview"],
  },
  {
    id: 4,
    region: "umluj",
    type: "Diving",
    title: "Coral Reef Diving Trip",
    price: 520,
    rating: 4.8,
    duration: "4 hours",
    location: "Umluj Islands",
    image:
      "https://images.unsplash.com/photo-1682685796766-0fddd3e480de?auto=format&fit=crop&w=1200&q=80",
    description:
      "Explore coral reefs with a certified diving guide in one of Saudi Arabia’s most beautiful coastal areas.",
    includes: [
      "Diving equipment",
      "Certified guide",
      "Boat transfer",
      "Underwater photos",
    ],
  },
  {
    id: 5,
    region: "umluj",
    type: "Beach Resorts",
    title: "Coastal Resort Day Pass",
    price: 390,
    rating: 4.5,
    duration: "Full day",
    location: "Umluj Coast",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description:
      "A relaxing resort day pass with pool access, beach seating, and dining options.",
    includes: ["Beach access", "Pool access", "Lounge chair", "Dining discount"],
  },
  {
    id: 6,
    region: "yanbu",
    type: "Horse Riding",
    title: "Horseback Riding on the Beach",
    price: 160,
    rating: 4.9,
    duration: "1 hour",
    location: "Yanbu Beach",
    image:
      "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=1200&q=80",
    description:
      "A guided horseback riding experience along the beach, suitable for beginners and photo sessions.",
    includes: ["Guided ride", "Safety support", "Photo stops", "Beginner friendly"],
  },
  {
    id: 7,
    region: "yanbu",
    type: "Diving",
    title: "Beginner Snorkeling Tour",
    price: 250,
    rating: 4.6,
    duration: "2 hours",
    location: "Yanbu Corniche",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    description:
      "A beginner-friendly snorkeling trip with clear water, colorful fish, and guide support.",
    includes: ["Snorkeling gear", "Guide", "Safety briefing", "Water bottle"],
  },
  {
    id: 8,
    region: "eastern",
    type: "Beach Resorts",
    title: "Half Moon Bay Resort Stay",
    price: 690,
    rating: 4.7,
    duration: "1 night",
    location: "Half Moon Bay",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80",
    description:
      "Book a coastal resort stay near Half Moon Bay with family-friendly facilities and sea views.",
    includes: ["Room booking", "Breakfast option", "Beach access", "Parking"],
  },
  {
    id: 9,
    region: "eastern",
    type: "Restaurants & Cafés",
    title: "Corniche Café Booking",
    price: 95,
    rating: 4.4,
    duration: "90 minutes",
    location: "Khobar Corniche",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    description:
      "Reserve a table at a waterfront café for coffee, desserts, and sea views.",
    includes: ["Reserved table", "Sea view seating", "Dessert menu", "Quick booking"],
  },
];

const typeIcons = {
  "Yacht Trips": Ship,
  "Jet Ski": Bike,
  Diving: Fish,
  "Beach Resorts": Hotel,
  "Restaurants & Cafés": Utensils,
  "Horse Riding": TreePalm,
};

/* =========================
   Helper Functions
   ========================= */

function getStored(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function isPastDate(dateValue) {
  const selectedDate = new Date(dateValue);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate < today;
}

/* =========================
   Authentication Context
   ========================= */

const AuthContext = createContext(null);

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStored("seascape_user", null));

  const login = (email, name = "SeaScape User") => {
    const nextUser = { email, name };
    localStorage.setItem("seascape_user", JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem("seascape_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/* =========================
   Protected Route
   ========================= */

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/* =========================
   Layout Components
   ========================= */

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <Link className="brand" to="/" aria-label="Go to SeaScape KSA home page">
        <span className="brandIcon">
          <Waves size={24} aria-hidden="true" />
        </span>
        <span>SeaScape KSA</span>
      </Link>

      <nav aria-label="Main navigation">
        <Link to="/">
          <Home size={18} aria-hidden="true" /> Home
        </Link>
        <Link to="/explore">
          <Search size={18} aria-hidden="true" /> Explore
        </Link>
        <Link to="/dashboard">
          <User size={18} aria-hidden="true" /> Dashboard
        </Link>

        {user ? (
          <button
            className="linkButton"
            type="button"
            onClick={logout}
            aria-label="Log out from SeaScape KSA"
          >
            <LogOut size={18} aria-hidden="true" /> Logout
          </button>
        ) : (
          <Link className="navCta" to="/login">
            <Shield size={18} aria-hidden="true" /> Login
          </Link>
        )}
      </nav>
    </header>
  );
}

/* =========================
   Pages
   ========================= */

function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="heroText">
          <p className="eyebrow">Saudi coastal tourism, simplified</p>
          <h1>Book sea activities, resorts, and beach experiences in one place.</h1>
          <p className="heroDesc">
            Discover yacht trips, jet ski rentals, diving tours, horseback riding
            on the beach, seaside cafés, and resorts across Saudi Arabia’s coastal
            regions.
          </p>

          <div className="heroActions">
            <Link className="primaryBtn" to="/explore">
              Explore Activities
            </Link>
            <Link className="secondaryBtn" to="/dashboard">
              My Bookings
            </Link>
          </div>
        </div>

        <div className="heroCard" role="img" aria-label="Beautiful Saudi beach view">
          <div className="glassCard">
            <Anchor size={34} aria-hidden="true" />
            <h3>Smart coastal booking</h3>
            <p>
              Select your region and instantly view available marine services
              around you.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="sectionTitle">
          <p className="eyebrow">Available regions</p>
          <h2>Choose your coast</h2>
        </div>

        <div className="regionGrid">
          {regions.map((region) => (
            <Link
              className="regionCard"
              key={region.id}
              to={`/explore?region=${region.id}`}
              aria-label={`Explore activities in ${region.name}`}
            >
              <MapPin aria-hidden="true" />
              <h3>{region.name}</h3>
              <p>{region.tagline}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

/* =========================
   Weather API Hook
   ========================= */

function useWeather(regionId) {
  const [weather, setWeather] = useState({
    loading: true,
    data: null,
    error: "",
  });

  useEffect(() => {
    const selectedRegion = regions.find((region) => region.id === regionId) || regions[0];

    setWeather({ loading: true, data: null, error: "" });

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${selectedRegion.lat}&longitude=${selectedRegion.lon}&current=temperature_2m,wind_speed_10m&timezone=auto`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Weather request failed");
        }
        return response.json();
      })
      .then((data) => {
        setWeather({ loading: false, data: data.current, error: "" });
      })
      .catch(() => {
        setWeather({
          loading: false,
          data: null,
          error: "Weather unavailable",
        });
      });
  }, [regionId]);

  return weather;
}

function ExplorePage() {
  const [searchParams] = useSearchParams();
  const [region, setRegion] = useState(searchParams.get("region") || "jeddah");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");

  const weather = useWeather(region);

  const types = ["All", ...new Set(activities.map((activity) => activity.type))];

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesRegion = activity.region === region;
      const matchesType = type === "All" || activity.type === type;
      const matchesSearch =
        activity.title.toLowerCase().includes(search.toLowerCase()) ||
        activity.location.toLowerCase().includes(search.toLowerCase());

      return matchesRegion && matchesType && matchesSearch;
    });
  }, [region, type, search]);

  return (
    <main className="page">
      <section className="topPanel">
        <div>
          <p className="eyebrow">Explore</p>
          <h1>Find coastal services by region</h1>
          <p>
            Filter activities, check weather, and book your next sea experience.
          </p>
        </div>

        <div className="weatherCard" aria-live="polite">
          <CloudSun aria-hidden="true" />
          {weather.loading ? (
            <p>Loading weather...</p>
          ) : weather.error ? (
            <p>{weather.error}</p>
          ) : (
            <p>
              <b>{Math.round(weather.data.temperature_2m)}°C</b> · Wind{" "}
              {Math.round(weather.data.wind_speed_10m)} km/h
            </p>
          )}
        </div>
      </section>

      <section className="filters" aria-label="Activity filters">
        <label htmlFor="region-filter">
          Region
          <select
            id="region-filter"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
          >
            {regions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="type-filter">
          Service Type
          <select
            id="type-filter"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            {types.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="search-filter" className="searchBox">
          Search
          <input
            id="search-filter"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title or location"
            aria-label="Search activities by title or location"
          />
        </label>
      </section>

      <section className="activityGrid" aria-label="Activity results">
        {filteredActivities.length === 0 ? (
          <div className="empty">No activities found. Try another filter.</div>
        ) : (
          filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        )}
      </section>
    </main>
  );
}

/* =========================
   Reusable Activity Card
   ========================= */

function ActivityCard({ activity }) {
  const Icon = typeIcons[activity.type] || Waves;

  return (
    <article className="activityCard">
      <img src={activity.image} alt={`${activity.title} in ${activity.location}`} />

      <div className="activityBody">
        <div className="tag">
          <Icon size={16} aria-hidden="true" /> {activity.type}
        </div>

        <h3>{activity.title}</h3>
        <p>{activity.description}</p>

        <div className="meta">
          <span>
            <MapPin size={16} aria-hidden="true" /> {activity.location}
          </span>
          <span>
            <Star size={16} aria-hidden="true" /> {activity.rating}
          </span>
          <span>
            <WalletCards size={16} aria-hidden="true" /> {activity.price} SAR
          </span>
        </div>

        <Link
          className="cardBtn"
          to={`/activity/${activity.id}`}
          aria-label={`View details for ${activity.title}`}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

function ActivityDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const activity = activities.find((item) => String(item.id) === id);

  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`https://seascape-ksa-reviews.onrender.com/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!activity) {
    return (
      <main className="page">
        <div className="empty">Activity not found.</div>
      </main>
    );
  }

  const addReview = async () => {
    if (!reviewName.trim() || !reviewText.trim()) {
      alert("Please enter your name and review.");
      return;
    }

    const response = await fetch("https://seascape-ksa-reviews.onrender.com/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activityId: activity.id,
        name: reviewName,
        review: reviewText,
      }),
    });

    const newReview = await response.json();

    setReviews([...reviews, newReview]);
    setReviewName("");
    setReviewText("");
    alert("Review added successfully!");
  };

  const saveFavorite = () => {
    const favorites = getStored("seascape_favorites", []);

    if (!favorites.includes(activity.id)) {
      localStorage.setItem(
        "seascape_favorites",
        JSON.stringify([...favorites, activity.id])
      );
      alert("Added to favorites!");
    } else {
      alert("This activity is already in your favorites.");
    }
  };

  const bookActivity = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!date) {
      alert("Please select a booking date.");
      return;
    }

    if (isPastDate(date)) {
      alert("Please choose today or a future date.");
      return;
    }

    if (guests < 1) {
      alert("Guests must be at least 1.");
      return;
    }

    const bookings = getStored("seascape_bookings", []);

    const newBooking = {
      id: Date.now(),
      activityId: activity.id,
      date,
      guests,
      total: guests * activity.price,
    };

    localStorage.setItem(
      "seascape_bookings",
      JSON.stringify([...bookings, newBooking])
    );

    alert("Booking confirmed successfully!");
    navigate("/dashboard");
  };

  return (
    <main className="detailsPage">
      <img
        className="detailsImage"
        src={activity.image}
        alt={`${activity.title} activity photo`}
      />

      <section className="detailsContent">
        <div>
          <p className="eyebrow">{activity.type}</p>
          <h1>{activity.title}</h1>
          <p className="detailsDesc">{activity.description}</p>

          <div className="meta large">
            <span>
              <MapPin aria-hidden="true" /> {activity.location}
            </span>
            <span>
              <Star aria-hidden="true" /> {activity.rating}
            </span>
            <span>
              <CalendarDays aria-hidden="true" /> {activity.duration}
            </span>
            <span>
              <WalletCards aria-hidden="true" /> {activity.price} SAR/person
            </span>
          </div>

          <h3>Included</h3>
          <ul className="included">
            {activity.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <a
            className="mapLink"
            target="_blank"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              activity.location
            )}`}
            rel="noreferrer"
            aria-label={`Open ${activity.location} in Google Maps`}
          >
            Open Location in Google Maps
          </a>

          <section className="reviewsBox">
            <h3>User Reviews</h3>

            <label>
              Name
              <input
                type="text"
                value={reviewName}
                onChange={(event) => setReviewName(event.target.value)}
                placeholder="Enter your name"
              />
            </label>

            <label>
              Review
              <textarea
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                placeholder="Write your review"
                rows="4"
              />
            </label>

            <button className="primaryBtn wide" type="button" onClick={addReview}>
              Add Review
            </button>

            <div className="reviewsList">
              {reviews.length === 0 ? (
                <p className="muted">No reviews yet.</p>
              ) : (
                reviews.map((item) => (
                  <div className="reviewCard" key={item.id}>
                    <h4>{item.name}</h4>
                    <p>{item.review}</p>
                    <span>{item.date}</span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <aside className="bookingBox" aria-label="Booking form">
          <h2>Book this experience</h2>

          <label htmlFor="booking-date">
            Date
            <input
              id="booking-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>

          <label htmlFor="booking-guests">
            Guests
            <input
              id="booking-guests"
              type="number"
              min="1"
              value={guests}
              onChange={(event) => setGuests(Number(event.target.value))}
            />
          </label>

          <div className="total">
            Total: <b>{guests * activity.price} SAR</b>
          </div>

          <button
            className="primaryBtn wide"
            type="button"
            onClick={bookActivity}
            aria-label={`Book ${activity.title}`}
          >
            Book Now
          </button>

          <button
            className="secondaryBtn wide"
            type="button"
            onClick={saveFavorite}
            aria-label={`Add ${activity.title} to favorites`}
          >
            <Heart size={18} aria-hidden="true" /> Add to Favorites
          </button>
        </aside>
      </section>
    </main>
  );
}

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (event) => {
    event.preventDefault();

    if (isRegister && name.trim().length < 2) {
      alert("Please enter your full name.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    login(email, name || email.split("@")[0]);
    navigate("/dashboard");
  };

  return (
    <main className="authPage">
      <form className="authCard" onSubmit={submitForm}>
        <Waves size={40} aria-hidden="true" />
        <h1>{isRegister ? "Create Account" : "Welcome Back"}</h1>
        <p>
          {isRegister
            ? "Register to save your bookings and favorites."
            : "Login to continue booking coastal experiences."}
        </p>

        {isRegister && (
          <label htmlFor="full-name">
            Full Name
            <input
              id="full-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              aria-label="Full name"
            />
          </label>
        )}

        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimum 6 characters"
            aria-label="Password"
          />
        </label>

        <button className="primaryBtn wide" type="submit">
          {isRegister ? "Register" : "Login"}
        </button>

        <button
          className="textBtn"
          type="button"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account? Login" : "New user? Create account"}
        </button>
      </form>
    </main>
  );
}

function DashboardPage() {
  const { user } = useAuth();

  const bookings = getStored("seascape_bookings", []);
  const favorites = getStored("seascape_favorites", []);

  const bookingActivities = bookings
    .map((booking) => ({
      ...booking,
      activity: activities.find((item) => item.id === booking.activityId),
    }))
    .filter((booking) => booking.activity);

  const favoriteActivities = activities.filter((activity) =>
    favorites.includes(activity.id)
  );

  return (
    <main className="page">
      <section className="topPanel">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Hello, {user?.name}</h1>
          <p>Manage your SeaScape KSA bookings and favorite experiences.</p>
        </div>
      </section>

      <section className="dashboardGrid">
        <div className="dashSection">
          <h2>My Bookings</h2>

          {bookingActivities.length === 0 ? (
            <p className="muted">No bookings yet.</p>
          ) : (
            bookingActivities.map((booking) => (
              <div className="miniCard" key={booking.id}>
                <img
                  src={booking.activity.image}
                  alt={`${booking.activity.title} booking`}
                />
                <div>
                  <h3>{booking.activity.title}</h3>
                  <p>
                    {booking.date} · {booking.guests} guest(s) · {booking.total} SAR
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="dashSection">
          <h2>Favorites</h2>

          {favoriteActivities.length === 0 ? (
            <p className="muted">No favorites yet.</p>
          ) : (
            favoriteActivities.map((activity) => (
              <Link
                className="miniCard"
                to={`/activity/${activity.id}`}
                key={activity.id}
                aria-label={`Open favorite activity ${activity.title}`}
              >
                <img src={activity.image} alt={`${activity.title} favorite`} />
                <div>
                  <h3>{activity.title}</h3>
                  <p>
                    {activity.location} · {activity.price} SAR
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

/* =========================
   Main App
   ========================= */

 
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/activity/:id" element={<ActivityDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>

        <footer className="footer">
          SeaScape KSA © 2026 · Coastal Booking Platform
        </footer>
      </AuthProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
