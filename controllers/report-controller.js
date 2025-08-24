import { reportStore } from "../models/report-store.js";

export const reportController = {
  async addReport(request, response) {
    const newReport = {
      title: request.body.title,
      content: request.body.content,
    };
    console.log(`Adding report ${newReport.title}`);
    await reportStore.addReport(newReport);
    response.redirect("/station/" + request.params.id);
  },

  async deleteReport(request, response) {
    console.log(`Deleting report ${request.params.reportid}`);
    await reportStore.deleteReport(request.params.reportid);
    response.redirect("/station/" + request.params.id);
  },

  
};
