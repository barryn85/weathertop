import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import axios from "axios";

export const stationController = {
  // View station and reports
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    if (!station) return response.redirect("/dashboard");

    // Attach reports
    station.reports = await reportStore.getReportsByStationId(station._id);

    response.render("station-view", { title: station.title, station });
  },

  // Add weather report
  async addReport(request, response) {
  const station = await stationStore.getStationById(request.params.id);
  if (!station) return response.redirect("/dashboard");

  const city = station.city || "Tramore";
  const weatherRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8db3d97e7df66a1775c8299c854aede9`;

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
        stationId: station._id,
      };
    }
  } catch (err) {
    console.error("Weather API error:", err.message);
  }

  await reportStore.addReport(station._id, report);

  // 🔹 Redirect back to the station page
  response.redirect("/station/" + station._id);
},


  // Delete report
  async deleteReport(request, response) {
    await reportStore.deleteReport(request.params.reportid);
    response.redirect("/station/" + request.params.id);
  },
};

