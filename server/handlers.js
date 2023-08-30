'use strict';

const { v4: uuidv4 } = require('uuid');

const e = require("express");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUser = async (req, res) => {
  let client
  const userId = req.params.userId;
  try {
      client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const dbName = "FinalProject";
      const db = client.db(dbName);

      let userResult = await db.collection("usersProfile").findOne({ _id: userId});

      if (userResult === null) {return res.status(200).json({ status: 200, data: null, message: "User not initialized."})}

      let stockResult = await db.collection("kitchen").findOne({ users: [userId]});

      return res.status(200).json({ status: 200, data: {...stockResult, ...userResult}});

  } catch (err) {
      res.status(500).json({ status: 500, message: err });
  } finally {
    client.close()
  }
};

const postNewUser = async (req, res) => {
  let client
  const userData = req.body.userData

  try {
      client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const dbName = "FinalProject";
      const db = client.db(dbName);

      if (userData.inviteCode === undefined)
      {
        const newUser = {
          "_id": userData._id,
          "name": userData.name,
          "system": userData.system
        }

        const newKitchen = {
          "users": [userData._id],
          "items": [],
          "recipeBook": [],
          "groceryList": []
        }

        const newUserResult = await db.collection("usersProfile").insertOne( newUser );
        const newKitchenResult = await db.collection("kitchen").insertOne( newKitchen );

        return res.status(201).json({ status: 201, message: "success"});
      }

  } catch (err) {
      res.status(500).json({ status: 500, message: err });
  } finally {
    client.close()
  }
}

const postNewStock = async (req, res) =>
{
  let client
  let itemData = req.body.itemData
  const id = uuidv4()
  itemData = {...itemData, "stockId" : id}

  try {
      client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const dbName = "FinalProject";
      const db = client.db(dbName);

      const userId = itemData.userId;

      delete itemData.userId

      const result = await db.collection("kitchen").findOneAndUpdate(
        { "users": { $elemMatch: { $eq: userId } } },
        { $push: { "items": itemData } },
        { returnOriginal: false }
      );

      if (result.value !== null) {return res.status(201).json({ status: 201, message: "success"});}

      else {return res.status(400).json({ status: 400, message: "failed"});}

  } catch (err) {
      res.status(500).json({ status: 500, message: err });
  } finally {
    client.close()
  }
}

const modifyStock = async (req, res) =>
{
  let client
  let itemData = req.body.itemData

  try {
      client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const dbName = "FinalProject";
      const db = client.db(dbName);

      const userId = itemData.userId;

      delete itemData.userId

      const result = await db.collection("kitchen").findOneAndUpdate(
        { "users": { $elemMatch: { $eq: userId } } },
        {
          $set: {
            "items.$[item]": itemData,
          }
        },
        {
          arrayFilters: [{ "item.stockId": itemData.stockId }],
          returnOriginal: false
        }
      );

      console.log(result)

      if (result.value) {return res.status(200).json({ status: 200, message: "success"});}

      else {return res.status(400).json({ status: 400, message: "failed"});}

  } catch (err) {
      console.log(err)
      res.status(500).json({ status: 500, message: err });
  } finally {
    client.close()
  }
}

const deleteStock = async (req, res) =>
{
  let client
  let userId = req.params.userId
  let stockId = req.params.stockId

  try {
      client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const dbName = "FinalProject";
      const db = client.db(dbName);

      const result = await db.collection("kitchen").findOneAndUpdate(
        { "users": { $elemMatch: { $eq: userId } } },
        { $pull: { "items": { "stockId": stockId } } },
        { returnOriginal: false }
      );

      if (result.value) {return res.status(200).json({ status: 200, message: "success"});}

      else {return res.status(400).json({ status: 400, message: "failed"});}

  } catch (err) {
      console.log(err)
      res.status(500).json({ status: 500, message: err });
  } finally {
    client.close()
  }
}

module.exports = {getUser, postNewUser, postNewStock, modifyStock, deleteStock}