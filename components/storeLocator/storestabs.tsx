"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock3,
  Phone,
  Star,
  X,
  Calendar,
  Navigation,
} from "lucide-react";

import Select from "react-select";
import statesAndCities from "country-state-city/lib/city";
import { State, City } from "country-state-city";

type StoreType = {
  name: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  address: string;
  contact: string;
  email: string;
  hours: string;
  type: string;
  badge: string;
  features: string[];
  distance?: number;
};

const stores: StoreType[] = [
  {
    name: "Morzze Flagship Store",
    city: "Jaipur",
    state: "Rajasthan",
    latitude: 26.9124,
    longitude: 75.7873,
    address: "MI Road, Jaipur, Rajasthan",
    contact: "+91 9876543210",
    email: "jaipur@morzze.com",
    hours: "10:00 AM - 9:00 PM",
    type: "Flagship",
    badge: "bg-[#f4e8c7] text-[#9b5d00]",
    features: ["Parking", "Premium Collection", "Custom Orders"],
  },
  {
    name: "Morzze Delhi Store",
    city: "New Delhi",
    state: "Delhi",
    latitude: 28.6139,
    longitude: 77.209,
    address: "Connaught Place, New Delhi",
    contact: "+91 9988776655",
    email: "delhi@morzze.com",
    hours: "10:00 AM - 9:00 PM",
    type: "Studio",
    badge: "bg-[#eadcff] text-[#6b3eb1]",
    features: ["Parking", "Design Support"],
  },
  {
    name: "Morzze Mumbai Store",
    city: "Mumbai",
    state: "Maharashtra",
    latitude: 19.076,
    longitude: 72.8777,
    address: "Bandra West, Mumbai",
    contact: "+91 8877665544",
    email: "mumbai@morzze.com",
    hours: "11:00 AM - 8:00 PM",
    type: "Dealer",
    badge: "bg-[#dfe8ff] text-[#3a5ca8]",
    features: ["Accessories", "Parking"],
  },
  {
    name: "Morzze Bangalore Store",
    city: "Bangalore",
    state: "Karnataka",
    latitude: 12.9716,
    longitude: 77.5946,
    address: "Indiranagar, Bangalore",
    contact: "+91 7766554433",
    email: "bangalore@morzze.com",
    hours: "10:30 AM - 9:00 PM",
    type: "Flagship",
    badge: "bg-[#f4e8c7] text-[#9b5d00]",
    features: ["Experience Zone", "Parking"],
  },
];

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function StoreLocatorSection() {
  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);

  const [filteredStores, setFilteredStores] = useState<StoreType[]>([]);
  const [activeStore, setActiveStore] = useState<StoreType | null>(null);

  const indianStates = State.getStatesOfCountry("IN");

  const stateOptions = indianStates.map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const cityOptions = selectedState
    ? City.getCitiesOfState("IN", selectedState.value).map((city) => ({
      value: city.name,
      label: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
    }))
    : [];

  const handleSearch = async () => {
    if (!selectedState || !selectedCity) return;

    const userLat = Number(selectedCity.latitude);
    const userLng = Number(selectedCity.longitude);

    const nearestStores = stores
      .map((store) => ({
        ...store,
        distance: calculateDistance(
          userLat,
          userLng,
          store.latitude,
          store.longitude
        ),
      }))
      .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));

    setFilteredStores(nearestStores);
    setActiveStore(nearestStores[0]);
  };

  const mapUrl = useMemo(() => {
    if (!activeStore) return "";

    return `https://www.google.com/maps?q=${activeStore.latitude},${activeStore.longitude}&z=15&output=embed`;
  }, [activeStore]);

  return (
    <section className="w-full bg-black text-white px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* TOP SEARCH */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* STATE */}
          <div className="w-full md:w-[450px]">
            <Select
              options={stateOptions}
              value={selectedState}
              onChange={(value) => {
                setSelectedState(value);
                setSelectedCity(null);
              }}
              placeholder="Select State"
              className="text-black"
              styles={{
                control: (base) => ({
                  ...base,
                  background: "#111111",
                  border: "1px solid #2a2a2a",
                  borderRadius: "999px",
                  height: "56px",
                  boxShadow: "none",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#ffffff",
                }),
                menu: (base) => ({
                  ...base,
                  background: "#111111",
                  color: "#ffffff",
                }),
                option: (base, state) => ({
                  ...base,
                  background: state.isFocused
                    ? "#222222"
                    : "#111111",
                  color: "#ffffff",
                  cursor: "pointer",
                }),
                input: (base) => ({
                  ...base,
                  color: "#ffffff",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#888888",
                }),
              }}
            />
          </div>

          {/* CITY */}
          <div className="w-full md:w-[450px]">
            <Select
              options={cityOptions}
              value={selectedCity}
              onChange={(value) => setSelectedCity(value)}
              placeholder="Select City"
              isDisabled={!selectedState}
              className="text-black"
              styles={{
                control: (base) => ({
                  ...base,
                  background: "#111111",
                  border: "1px solid #2a2a2a",
                  borderRadius: "999px",
                  height: "56px",
                  boxShadow: "none",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#ffffff",
                }),
                menu: (base) => ({
                  ...base,
                  background: "#111111",
                  color: "#ffffff",
                }),
                option: (base, state) => ({
                  ...base,
                  background: state.isFocused
                    ? "#222222"
                    : "#111111",
                  color: "#ffffff",
                  cursor: "pointer",
                }),
                input: (base) => ({
                  ...base,
                  color: "#ffffff",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#888888",
                }),
              }}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSearch}
            className="h-[56px] px-8 rounded-full bg-[#e6aa12] text-black font-medium"
          >
            Find Nearby Stores
          </button>
        </div>

        {/* HIDE UNTIL SEARCH */}
        {filteredStores.length > 0 && activeStore && (
          <div className="grid lg:grid-cols-[350px_1fr] gap-7">
            {/* LEFT STORES */}
            <div className="max-h-[650px] overflow-y-auto pr-2 space-y-3">
              {filteredStores.map((store, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveStore(store)}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left bg-[#121212] border p-4 transition-all ${activeStore.name === store.name
                    ? "border-[#e6aa12]"
                    : "border-[#2a2a2a]"
                    }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-[14px] font-semibold max-w-[75%]">
                      {store.name}
                    </h3>

                    <span
                      className={`px-2 py-[3px] rounded-full text-[10px] ${store.badge}`}
                    >
                      {store.type}
                    </span>
                  </div>

                  <p className="text-[12px] text-[#7a7a7a] mb-2">
                    {store.city}, {store.state}
                  </p>

                  <p className="text-[11px] text-[#666666]">
                    {store.hours}
                  </p>

                  {store.distance && (
                    <p className="text-[#e6aa12] text-[12px] mt-2">
                      {store.distance.toFixed(1)} KM Away
                    </p>
                  )}
                </motion.button>
              ))}
            </div>

            {/* RIGHT DETAILS */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStore.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.45 }}
                className="border border-[#2a2a2a] bg-[#141414] overflow-hidden"
              >
                {/* MAP */}
                <div className="w-full h-[240px]">
                  <iframe
                    src={mapUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>

                {/* DETAILS */}
                <div className="p-5 md:p-6 relative">
                  <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#ececec] text-black flex items-center justify-center">
                    <X size={14} />
                  </button>

                  <h2 className="text-[30px] font-semibold mb-2">
                    {activeStore.name}
                  </h2>

                  <span
                    className={`inline-block px-3 py-[4px] rounded-full text-[11px] mb-6 ${activeStore.badge}`}
                  >
                    {activeStore.type}
                  </span>

                  <div className="grid md:grid-cols-2 gap-7 text-[13px]">
                    {/* ADDRESS */}
                    <div>
                      <p className="flex items-center gap-2 text-[#e6aa12] mb-2">
                        <MapPin size={14} />
                        Address
                      </p>

                      <p className="text-[#7a7a7a] leading-6">
                        {activeStore.address}
                      </p>
                    </div>

                    {/* HOURS */}
                    <div>
                      <p className="flex items-center gap-2 text-[#e6aa12] mb-2">
                        <Clock3 size={14} />
                        Working Hours
                      </p>

                      <p className="text-[#7a7a7a]">
                        {activeStore.hours}
                      </p>
                    </div>

                    {/* CONTACT */}
                    <div>
                      <p className="flex items-center gap-2 text-[#e6aa12] mb-2">
                        <Phone size={14} />
                        Contact
                      </p>

                      <p className="text-[#7a7a7a] leading-6">
                        {activeStore.contact}
                        <br />
                        {activeStore.email}
                      </p>

                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${activeStore.latitude},${activeStore.longitude}`}
                        target="_blank"
                        className="mt-5 w-[180px] h-11 border border-[#d39b10] text-[#d39b10] flex items-center justify-center gap-2"
                      >
                        <Navigation size={14} />
                        Get Directions
                      </a>
                    </div>

                    {/* FEATURES */}
                    <div>
                      {/* <p className="flex items-center gap-2 text-[#e6aa12] mb-2">
                        <Star size={14} />
                        Features
                      </p> */}

                      {/* <div className="flex flex-wrap gap-2">
                        {activeStore.features.map((feature, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-[11px]"
                          >
                            {feature}
                          </span>
                        ))}
                      </div> */}

                      {/* <button className="mt-5 w-[180px] h-11 bg-[#e6aa12] text-black flex items-center justify-center gap-2 font-medium">
                        <Calendar size={14} />
                        Book Appointment
                      </button> */}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}