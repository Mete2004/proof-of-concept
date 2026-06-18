console.log('Hier komt je server voor Sprint 12.')

import express from "express";
 
// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from "liquidjs";
 
// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express();
 
// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({ extended: true }));
 
app.use(express.json());
// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static("public"));


 
// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine("liquid", engine.express());
 
// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set("views", "./views");


async function getProducts() {
    const response = await fetch(
        "https://fdnd-agency.directus.app/items/decathlon_products?fields=*.*"
    );

    const data = await response.json();

    return data.data;
}

async function getReviews() {
    const response = await fetch(
        "https://fdnd-agency.directus.app/items/decathlon_reviews?sort=-created_at"
    );

    const data = await response.json();

    return data.data;
}
 
 
app.get("/", async function (request, response) {
 
    const products = await getProducts();
    const reviews = await getReviews();

    response.render("index.liquid", {
        product: products[0],
        reviews: reviews
    });
});


app.post("/reviews", async function (request, response) {

    console.log(request.body);

    const reviewData = {
      title: request.body["review-title"],
      description: request.body["review-description"],
      name: request.body["reviewer-name"],
      rating: Number(request.body.rating),
      created_at: new Date().toISOString().split("T")[0],

      attributes: [
          {
              criteria: "grip",
              score: Number(request.body["grip-rating"])
          },
          {
              criteria: "foot support",
              score: Number(request.body["foot-support-rating"])
          },
          {
              criteria: "lightweight",
              score: Number(request.body["lightweight-rating"])
          },
          {
              criteria: "cushioning",
              score: Number(request.body["cushioning-rating"])
          }
      ]
  };

    const directusResponse = await fetch(
        "https://fdnd-agency.directus.app/items/decathlon_reviews",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewData)
        }
    );

    const directusData = await directusResponse.json();

    //controleren of het verzoek van javascript of normale formulierverzending komt
    if (request.headers.accept.includes("application/json")) {
        response.json({
            success: true
        });
    } else {
        response.redirect("/");
    }

    console.log(request.headers.accept);
});
 
 
// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set("port", process.env.PORT || 8000);
 
// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console
  console.log(
    `Daarna kun je via http://localhost:${app.get("port")}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`,
  );
});