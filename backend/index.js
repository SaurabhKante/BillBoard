import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const port = 8800;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

async function initializeDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/billBoardDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database initialization successful.");
  } catch (err) {
    console.error("Error initializing the database:", err);
  }
}

const workSchema = new mongoose.Schema({
  SelectedOption: {
    type: String,
    required: true,
  },
  Size: {
    type: Number,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
});

const itemSchema = new mongoose.Schema({
  ItemName: {
    type: String,
    required: true,
  },
  work: [workSchema],
});

const customerSchema = new mongoose.Schema({
  client: {
    name: {
      type: String,
      required: true, // Ensure the name is required
    },
    address: {
      type: String,
      required: true, // Ensure the address is required
    },
    date: {
      type: Date,
      required: true, // Ensure the date is required
    },
  },
  item: [itemSchema],
});

const Customer = mongoose.model("Customer", customerSchema);

let clientName="";
let clientAddr="";
let cldate="";

app.post("/add", async (req, res) => {
  clientName = req.body.clname;
  clientAddr = req.body.claddr;
  cldate = req.body.date;
  const itemName = req.body.iName;
  const selectedOpt = req.body.option;
  const size = req.body.size;
  const quantity = req.body.qty;

  try {
    // Check if the client already exists
    const existingClient = await Customer.findOne({
      "client.name": clientName,
      "client.address": clientAddr,
      "client.date": cldate,
    });

    if (existingClient) {
      // Check if the item already exists for this client
      const existingItem = existingClient.item.find((item) => item.ItemName === itemName);

      if (existingItem) {
        // Add the new work object to the existing item
        existingItem.work.push({
          SelectedOption: selectedOpt,
          Size: size,
          Quantity: quantity,
        });
      } else {
        // Create a new item and add the work object to it
        existingClient.item.push({
          ItemName: itemName,
          work: [
            {
              SelectedOption: selectedOpt,
              Size: size,
              Quantity: quantity,
            },
          ],
        });
      }

      await existingClient.save();
      console.log("Work added to the existing item:", existingClient);
      res.status(200).send("Work added to the existing item");
    } else {
      // Create a new Customer document
      const newCustomer = new Customer({
        client: {
          name: clientName,
          address: clientAddr,
          date: cldate,
        },
        item: [
          {
            ItemName: itemName,
            work: [
              {
                SelectedOption: selectedOpt,
                Size: size,
                Quantity: quantity,
              },
            ],
          },
        ],
      });
      await newCustomer.save();
      console.log("Data saved to the database");
      res.status(200).send("Data saved to the database");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/invoice', async (req, res) => {
  try {
    // Fetch data from the database (adjust the query based on your data model)
    const clientData = await Customer.find({
      "client.name": clientName,
      "client.address": clientAddr,
      "client.date": cldate,
    });

    // Send the data as the response
    res.status(200).json(clientData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});



(async () => {
  await initializeDatabase();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})();
