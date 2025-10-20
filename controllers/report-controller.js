import { reportStore } from "../models/report-store.js";

export const reportController = {
  async addReport(request, response) {
    const stationId = request.params.id;
    // expects a simple form with these names
    const report = {
      code: request.body.code,
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    console.log(`Adding report to station ${stationId}`);
    await reportStore.addReport(stationId, report);
    response.redirect("/station/" + stationId);
  },

  async deleteReport(request, response) {
    console.log(`Deleting report ${request.params.reportid}`);
    await reportStore.deleteReport(request.params.reportid);
    response.redirect("/station/" + request.params.id);
  },
};
