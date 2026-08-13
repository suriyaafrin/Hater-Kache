import { useCallback, useMemo, useState } from "react";
import { DEFAULT_AREA_ID, areaById } from "../../data/locations";
import { NOTIFICATION_SEED } from "../../data/assistant";
import { usePersistentState } from "../lib/hooks";
import { AppContext } from "./useApp";

const SEED_BOOKINGS = [
  {
    id: "HK-4821",
    proUid: "electrical-1",
    categorySlug: "electrical",
    packageId: "wiring-check",
    packageLabel: "Wiring fault diagnosis",
    day: new Date().toISOString().slice(0, 10),
    slot: "16-18",
    address: { areaId: "dhanmondi", line: "House 42, Road 9/A, Dhanmondi", flat: "Flat B3", phone: "01711-234567" },
    problem: "Breaker trips whenever the geyser and the AC run together.",
    photos: [],
    status: "on_the_way",
    estimate: { min: 800, max: 1800 },
    total: null,
    payment: null,
    emergency: false,
    createdAt: Date.now() - 1000 * 60 * 90,
  },
  {
    id: "HK-4390",
    proUid: "ac-repair-2",
    categorySlug: "ac-repair",
    packageId: "deep-clean",
    packageLabel: "Deep cleaning",
    day: "2026-07-28",
    slot: "10-12",
    address: { areaId: "dhanmondi", line: "House 42, Road 9/A, Dhanmondi", flat: "Flat B3", phone: "01711-234567" },
    problem: "Indoor unit smelled damp and cooling had dropped.",
    photos: [],
    status: "completed",
    estimate: { min: 900, max: 1500 },
    total: 1250,
    payment: "bkash",
    reviewed: true,
    emergency: false,
    createdAt: Date.parse("2026-07-28T10:20:00"),
  },
  {
    id: "HK-4102",
    proUid: "plumbing-3",
    categorySlug: "plumbing",
    packageId: "tap-leak",
    packageLabel: "Tap or leak repair",
    day: "2026-06-14",
    slot: "12-14",
    address: { areaId: "dhanmondi", line: "House 42, Road 9/A, Dhanmondi", flat: "Flat B3", phone: "01711-234567" },
    problem: "Kitchen mixer tap dripping through the night.",
    photos: [],
    status: "completed",
    estimate: { min: 400, max: 800 },
    total: 650,
    payment: "cash",
    reviewed: false,
    emergency: false,
    createdAt: Date.parse("2026-06-14T12:40:00"),
  },
];

const SEED_CHATS = {
  "HK-4821": [
    { id: 1, from: "pro", text: "Assalamu alaikum. I have your address, leaving Mohammadpur now.", at: "3:41 PM" },
    { id: 2, from: "me", text: "Walaikum assalam. The main gate guard will let you in, ask for flat B3.", at: "3:43 PM" },
    { id: 3, from: "pro", text: "Understood. Please keep the distribution board accessible.", at: "3:44 PM" },
  ],
};

export function AppProvider({ children }) {
  const [areaId, setAreaId] = usePersistentState("hk.area", DEFAULT_AREA_ID);
  const [favourites, setFavourites] = usePersistentState("hk.favourites", ["ac-repair-2", "plumbing-3"]);
  const [bookings, setBookings] = usePersistentState("hk.bookings", SEED_BOOKINGS);
  const [notifications, setNotifications] = usePersistentState("hk.notifications", NOTIFICATION_SEED);
  const [chats, setChats] = usePersistentState("hk.chats", SEED_CHATS);
  const [points, setPoints] = usePersistentState("hk.points", 1250);
  const [user, setUser] = usePersistentState("hk.user", {
    signedIn: true,
    role: "customer",
    name: "Ayesha Siddiqua",
    phone: "01711-234567",
    email: "ayesha@example.com",
  });
  const [toasts, setToasts] = useState([]);

  const area = useMemo(() => areaById(areaId), [areaId]);

  const toast = useCallback((message, tone = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3600);
  }, []);

  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const toggleFavourite = useCallback(
    (uid) => {
      let added = false;
      setFavourites((list) => {
        added = !list.includes(uid);
        return added ? [...list, uid] : list.filter((x) => x !== uid);
      });
      return added;
    },
    [setFavourites]
  );

  const isFavourite = useCallback((uid) => favourites.includes(uid), [favourites]);

  const addBooking = useCallback(
    (booking) => {
      setBookings((list) => [booking, ...list]);
      setPoints((p) => p + 100);
      setNotifications((list) => [
        {
          id: `n-${booking.id}`,
          kind: "job",
          title: "Request sent",
          body: `${booking.packageLabel} · booking ${booking.id}`,
          ago: "Just now",
          read: false,
          to: `/track/${booking.id}`,
        },
        ...list,
      ]);
    },
    [setBookings, setNotifications, setPoints]
  );

  const updateBooking = useCallback(
    (id, patch) => setBookings((list) => list.map((b) => (b.id === id ? { ...b, ...patch } : b))),
    [setBookings]
  );

  const cancelBooking = useCallback(
    (id) => setBookings((list) => list.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))),
    [setBookings]
  );

  const sendMessage = useCallback(
    (bookingId, text) => {
      const at = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
      setChats((c) => ({
        ...c,
        [bookingId]: [...(c[bookingId] || []), { id: Date.now(), from: "me", text, at }],
      }));
    },
    [setChats]
  );

  const receiveMessage = useCallback(
    (bookingId, text) => {
      const at = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
      setChats((c) => ({
        ...c,
        [bookingId]: [...(c[bookingId] || []), { id: Date.now() + 1, from: "pro", text, at }],
      }));
    },
    [setChats]
  );

  const markAllRead = useCallback(
    () => setNotifications((list) => list.map((n) => ({ ...n, read: true }))),
    [setNotifications]
  );

  const markRead = useCallback(
    (id) => setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n))),
    [setNotifications]
  );

  const value = useMemo(
    () => ({
      area,
      areaId,
      setAreaId,
      favourites,
      toggleFavourite,
      isFavourite,
      bookings,
      addBooking,
      updateBooking,
      cancelBooking,
      activeBooking: bookings.find((b) =>
        ["requested", "accepted", "on_the_way", "started"].includes(b.status)
      ),
      notifications,
      unread: notifications.filter((n) => !n.read).length,
      markAllRead,
      markRead,
      chats,
      sendMessage,
      receiveMessage,
      points,
      setPoints,
      user,
      setUser,
      toasts,
      toast,
      dismissToast,
    }),
    [
      area, areaId, setAreaId, favourites, toggleFavourite, isFavourite, bookings, addBooking,
      updateBooking, cancelBooking, notifications, markAllRead, markRead, chats, sendMessage,
      receiveMessage, points, setPoints, user, setUser, toasts, toast, dismissToast,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

