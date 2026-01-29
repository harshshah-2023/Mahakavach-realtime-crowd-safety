export const LINE_DETAILS = {
  central: {
    name: "Central Line",
    overview:
      "The Central Line is the busiest suburban railway corridor, operating fast and slow services from CSMT to Kalyan with branches to Kasara and Khopoli.",
    routes: [
      "CSMT → Kalyan (24 stations)",
      "Kalyan → Kasara (10 stations)",
      "Kalyan → Khopoli (13 stations)"
    ],
    interchanges: ["Dadar", "Kurla"],
    notes:
      "Extremely high congestion on fast trains towards CSMT during morning peak."
  },

  harbour: {
    name: "Harbour Line",
    overview:
      "The Harbour Line connects Navi Mumbai and western suburbs, operating slow trains only with all routes converging at Wadala Road.",
    routes: [
      "CSMT ↔ Panvel",
      "CSMT ↔ Goregaon (via Andheri)",
      "Panvel ↔ Goregaon"
    ],
    interchanges: ["Kurla", "Vashi", "Mahim Jn."],
    notes:
      "High passenger churn due to interchange-heavy nature of the line."
  },

  western: {
    name: "Western Line",
    overview:
      "The Western Line runs from Churchgate to Dahanu Road with fast, slow, and AC local services.",
    routes: [
      "Churchgate → Dahanu Road (37+ stations)"
    ],
    interchanges: ["Dadar", "Bandra", "Andheri", "Goregaon"],
    notes:
      "Peak hour frequency as high as every 3 minutes during rush hours."
  }
};
