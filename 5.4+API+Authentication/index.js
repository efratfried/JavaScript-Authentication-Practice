import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "efratGr";
const yourPassword = "0522829511";
const yourAPIKey = "d18ae412-3928-448e-9154-f911bcb92362";
const yourBearerToken = "3ef77799-9082-40fd-af31-ef3c37fa5cb6";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/random");
    console.log(response)
    res.render('index.ejs', { content: JSON.stringify(response.data) });

  } catch (error) {
    res.status(404).send(error.message);

  }

});

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }

});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(API_URL + '/filter', {
      params: {
        score: 5,
        apiKey: yourAPIKey

      }
    });
    res.render("index.ejs", { content: JSON.stringify(response.data) });

  } catch (error) {
    res.status(404).send(error.message);
  }
});

const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
