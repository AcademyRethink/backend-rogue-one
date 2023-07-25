"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoute = void 0;
const reportRoutes_1 = require("./reportRoutes");
const categories_1 = require("./categories");
const graphRoute_1 = require("./graphRoute");
const inventoryRoutes_1 = require("./inventoryRoutes");
const express_1 = require("express");
const dashboardRoute = (0, express_1.Router)();
exports.dashboardRoute = dashboardRoute;
dashboardRoute.get('/', (req, res) => {
    return res.json({ message: 'Hello, this is the dashboard!' });
});
dashboardRoute.use('/inventory', inventoryRoutes_1.router);
dashboardRoute.use('/graphs', graphRoute_1.router);
dashboardRoute.use('/categories', categories_1.router);
dashboardRoute.use('/report', reportRoutes_1.report);
dashboardRoute.use('/', (req, res) => {
    return res.json({ ok: true });
});
;
dashboardRoute.post('/home', (req, res) => {
    return res.json({ ok: true });
});
