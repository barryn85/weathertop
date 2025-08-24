import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { accountsController } from "./accounts-controller.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    if (!loggedInUser) return response.redirect("/login");

    const stations = await stationStore.getStationsByUserId(loggedInUser._id);

    // Attach reports to each station
    for (let station of stations) {
      station.reports = await reportStore.getReportsByStationId(station._id);
    }

    const viewData = {
      title: "Station Dashboard",
      stations,
    };

    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    if (!loggedInUser) return response.redirect("/login");

    const newStation = {
      title: request.body.title,
      city: request.body.city,
      userid: loggedInUser._id,
    };

    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  async deleteStation(request, response) {
    await stationStore.deleteStationById(request.params.id);
    response.redirect("/dashboard");
  },
};
