const prod = {
  url: {
    API_BASE_URL: "http://localhost:8085",
  },
};

const dev = {
  url: {
    API_BASE_URL: "http://localhost:8085",
  },
};

export const config = process.env.NODE_ENV === "production" ? prod : dev;
