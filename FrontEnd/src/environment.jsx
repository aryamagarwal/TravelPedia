const prod = {
  url: {
    API_BASE_URL: "http://13.60.74.234:8085",
  },
};

const dev = {
  url: {
    API_BASE_URL: "http://13.60.74.234:8085",
  },
  // "http://13.60.74.234:8085"
};

export const config = process.env.NODE_ENV === "production" ? prod : dev;
