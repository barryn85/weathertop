import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import axios from "axios";

export const stationController = {
  
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    if (!station) return response.redirect("/dashboard");

    // Load all reports for this station
    station.reports = await reportStore.getReportsByStationId(station._id);

    response.render("station-view", { title: station.title, station });
  },

  // Add repport
  async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    if (!station) return response.redirect("/dashboard");

    const city = station.city || "Tramore";

    
    const apiKey = "8db3d97e7df66a1775c8299c854aede9";

    const weatherRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    let report = {};
    try {
      const result = await axios.get(weatherRequestUrl);
      if (result.status === 200) {
        const data = result.data;
        report = {
          code: data.weather[0].id,
          temperature: data.main.temp,
          windSpeed: data.wind.speed,
          windDirection: data.wind.deg,
          pressure: data.main.pressure,
          stationid: station._id, // lowercase to match your report-store.js
        };
      }
    } catch (err) {
      console.error("Weather API error:", err.message);
    }

    await reportStore.addReport(station._id, report);
    response.redirect("/station/" + station._id);
  },

  // Delete a report
  async deleteReport(request, response) {
    await reportStore.deleteReport(request.params.reportid);
    response.redirect("/station/" + request.params.id);
  },
};


