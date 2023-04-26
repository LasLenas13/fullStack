const express = require("express");
const cors = require("cors");

const app = express();

let meals = [];

app.use(express.json());
app.use(cors());

app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

app.post('/orders', (req, res) => {
  const meal = {
    id: meals.length + 1,
    name: req.body.name,
    meal: req.body.meal,
    side: req.body.side,
    drink: req.body.drink,
    diningOption: req.body.diningOption,
    pickupTime: req.body.pickupTime
  };
  meals.push(meal);
  res.send(meal);
});

app.get('/orders', (req, res) => {
  const sortedMeals = meals.sort((a, b) => {
    return new Date(a.pickupTime) - new Date(b.pickupTime);
  });
  res.send(sortedMeals);
});

app.put('/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const meal = meals.find((meal) => meal.id === id);
  if (meal) {
    meal.name = req.body.name;
    meal.meal = req.body.meal;
    meal.side = req.body.side;
    meal.drink = req.body.drink;
    meal.diningOption = req.body.diningOption;
    meal.pickupTime = req.body.pickupTime;
    res.send(meal);
  } else {
    res.status(404).send('Meal not found');
  }
});

app.listen(6000, () => {
  console.log("app listening on 6000");
});
