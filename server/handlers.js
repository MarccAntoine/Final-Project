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

      let stockResult = await db.collection("kitchen").findOne({ "users": { $elemMatch: { $eq: userId } } });

      stockResult
      ? res.status(200).json({ status: 200, data: {...stockResult, ...userResult}})
      : res.status(400).json({ status: 400, message : "Did not find kitchen for this user!" })

  } catch (err) {
      res.status(500).json({ status: 500, message: err });
  } finally {
    client.close()
  }
};

const postNewUser = async (req, res) => {
  let client
  const userData = req.body.userData
  const id = uuidv4()

  try {
      client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const dbName = "FinalProject";
      const db = client.db(dbName);

      const newUser = {
        "_id": userData._id,
        "name": userData.name,
        "system": userData.system
      }

      const newKitchen = {
        "users": [userData._id],
        "items": [],
        "recipeBook": [],
        "groceryList": id,
        "planner" : []
      }

      const newList = {
        "_id" : id,
        "list" : []
      }

      const newUserResult = await db.collection("usersProfile").insertOne( newUser );
      const newKitchenResult = await db.collection("kitchen").insertOne( newKitchen );
      const newListResult = await db.collection("grocery").insertOne( newList );

      (newListResult.acknowledged && newKitchenResult.acknowledged && newUserResult.acknowledged)
      ? res.status(201).json({ status: 201, message: "success"})
      : res.status(500).json({ status: 500, message: "Failed to insert document."})

  } catch (err) {
      res.status(500).json({ status: 500, message: err });
  } finally {
    client.close()
  }
}

const getUserInviteCode = async (req, res) => {
  let client
  const userId = req.params.userId;
  const newCodeInvite = uuidv4()

  try {
      client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const dbName = "FinalProject";
      const db = client.db(dbName);

      const newCode = {
        "_id": newCodeInvite,
        "inviteId": userId,
      }

      let newCodeResult = await db.collection("invites").insertOne(newCode);

      newCodeResult.acknowledged 
      ? res.status(200).json({ status: 200, data: newCodeInvite})
      : res.status(500).json({ status: 500, message: "Failed to insert document."})

  } catch (err) {
      res.status(500).json({ status: 500, message: err });
  } finally {
    client.close()
  }
};

const postNewUserInvited = async (req, res) =>
{
  let client
  const userData = req.body.userData

  try {
      client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const dbName = "FinalProject";
      const db = client.db(dbName);

      const newUser = {
        "_id": userData._id,
        "name": userData.name,
      }

      const inviteId = userData.inviteId

      const invitingUser = await db.collection("invites").findOneAndDelete({ _id : inviteId })

      if (invitingUser.value)
      {
        const kitchenUsersUpdate = await db.collection("kitchen").findOneAndUpdate(
          { "users": { $elemMatch: { $eq: invitingUser.value.inviteId } } },
          { $push: { "users": userData._id } },
          { returnOriginal: false }
        )

        if (kitchenUsersUpdate.value)
        {
          const newUserResult = await db.collection("usersProfile").insertOne( newUser );

          newUserResult.acknowledged
          ? res.status(201).json({ status: 201, message: "success"})
          : res.status(500).json({ status: 500, message: "Could not create the user."})
        }
        else {return res.status(500).json({ status: 500, message: "Failed to inssert user to the kitchen"})}
      }
      else {return res.status(400).json({ status: 400, message: "Did not find the invite code!"})}
    
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

  if (!itemData.stockId)
  {
    const id = uuidv4()
    itemData = {...itemData, "stockId" : id}
  }

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

      result.value 
      ? res.status(201).json({ status: 201, message: "success"})
      : res.status(400).json({ status: 400, message: "Failed to find the kitchen and add the product."})

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

      result.value
      ? res.status(200).json({ status: 200, message: "success"})
      : res.status(400).json({ status: 400, message: "Failed to find the user/stock and to update the product."})

  } catch (err) {
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

      result.value
      ? res.status(200).json({ status: 200, message: "success"})
      : res.status(400).json({ status: 400, message: "Failed to fint the user/stocks and to delete the product."})

  } catch (err) {
      res.status(500).json({ status: 500, message: err });
  } finally {
    client.close()
  }
}

const postAddGrocery = async (req, res) =>
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

      const groceryId = itemData.userId;

      delete itemData.userId

      const result = await db.collection("grocery").findOneAndUpdate(
        { "_id": groceryId },
        { $push: { "list": itemData } },
        { returnOriginal: false }
      );

      result.value
      ? res.status(201).json({ status: 201, message: "success"})
      : res.status(400).json({ status: 400, message: "Failed to find the grocery and to add the product."})

  } catch (err) {
      res.status(500).json({ status: 500, message: err });
  } finally {
    client.close()
  }
}

const getGrocery = async (req, res) =>
{
  let client
  const groceryId = req.params.groceryId;

  try {
      client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const dbName = "FinalProject";
      const db = client.db(dbName);

      let groceryResult = await db.collection("grocery").findOne({ _id: groceryId});

      groceryResult
      ? res.status(200).json({ status: 200, data: groceryResult})
      : res.status(404).json({ status: 404, message: "Could not find the grocery list."})

  } catch (err) {
      res.status(500).json({ status: 500, message: err });
  } finally {
    client.close()
  }
}

const deleteFromGrocery = async (req, res) =>
{
  let client
  let groceryId = req.params.groceryId
  let stockId = req.params.stockId

  try {
      client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const dbName = "FinalProject";
      const db = client.db(dbName);

      const result = await db.collection("grocery").findOneAndUpdate(
        { "_id": groceryId },
        { $pull: { "list": { "stockId": stockId } } },
        { returnOriginal: false }
      );

      result.value
      ? res.status(200).json({ status: 200, message: "success"})
      : res.status(400).json({ status: 400, message: "Could not find the product and delete it."})

  } catch (err) {
      res.status(500).json({ status: 500, message: err });
  } finally {
    client.close()
  }
}

const postNewRecipe = async (req, res) =>
{
  let client
  let recipeData = req.body.recipeData

  const id = uuidv4()
  recipeData = {...recipeData, "_id" : id}
  

  try {
      client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const dbName = "FinalProject";
      const db = client.db(dbName);

      const userId = recipeData.userId;

      delete recipeData.userId

      const recipesResult = await db.collection("recipes").insertOne(recipeData)

      if (recipesResult.acknowledged)
      {
        const recipeIdresult = await db.collection("kitchen").findOneAndUpdate(
          { "users": { $elemMatch: { $eq: userId } } },
          { $push: { "recipeBook": id } },
          { returnOriginal: false }
        );

        recipeIdresult.value
        ? res.status(201).json({ status: 201, message: "success"})
        : res.status(400).json({ status: 400, message: "Failed to add the recipe to the user's recipe book."})
      }
      else 
      {
        return res.status(400).json({ status: 400, message: "Failed to add the recipe in the database."})
      }

  } catch (err) {
      res.status(500).json({ status: 500, message: err });
  } finally {
    client.close()
  }
}

const getRecipes = async (req, res) =>
{
  let client
  const userId = req.params.userId;

  try {
      client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const dbName = "FinalProject";
      const db = client.db(dbName);

      const userQuery = { "users": { $elemMatch: { $eq: userId } } }

      let userResult = await db.collection("kitchen").findOne(userQuery);

      if (userResult)
      {
        if (userResult.recipeBook.length === 0) 
        {
          return res.status(200).json({ status: 200, data: [null], message: "No recipes"})
        }
        else
        {
          const query = { _id: { $in: userResult.recipeBook } }
          const recipesResult = await db.collection("recipes").find(query).toArray()

          recipesResult
          ? res.status(200).json({ status: 200, data: recipesResult})
          : res.status(404).json({ status: 404, message: "Failed to find recipes from the user recipe book."})
        }
      }
      else
      {
        return res.status(404).json({ status : 404, message: "Failed to find the User"})
      }

  } catch (err) {
      res.status(500).json({ status: 500, message: err });
  } finally {
    client.close()
  }
}

const getPlanner = async (req, res) =>
{
  let client
  const userId = req.params.userId;

  try {
      client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const dbName = "FinalProject";
      const db = client.db(dbName);

      const userQuery = { "users": { $elemMatch: { $eq: userId } } }

      let userResult = await db.collection("kitchen").findOne(userQuery);

      if (userResult)
      {
        if (userResult.planner.length === 0) 
        {
          return res.status(200).json({ status: 200, data: ["null"], message: "No planner created yet."})
        }
        else 
        {
          const plannerResult = await db.collection("planners").findOne({ _id : userResult.planner})

          if (plannerResult)
          {
            plannerResult.planner.length === 0
            ? res.status(200).json({ status: 200, data: [userResult.planner], message: "No planner"})
            : res.status(200).json({ status: 200, data: plannerResult})
          }
          else
          {
            return res.status(404).json({ status: 404, message : "Failed to find the planner."})
          }
        }
      }
      else
      {
        return res.status(404).json({ status: 404, message : "Failed to find the user."})
      }

  } catch (err) {
      res.status(500).json({ status: 500, message: err });
  } finally {
    client.close()
  }
}

const addPlan = async (req, res) =>
{
  let client
  const plannerData = req.body.plannerData;

  try {
      client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const dbName = "FinalProject";
      const db = client.db(dbName);

      const plannerId = plannerData._id

      delete plannerData._id

      const plannerDataArray = [plannerData.current, plannerData.next]

      let updateResult = await db.collection("planners").findOneAndUpdate(
        { _id : plannerId },
        { $set: { planner : plannerDataArray } }
      );

      updateResult.value
      ? res.status(200).json({ status: 200, message: "success"})
      : res.status(400).json({ status: 200, message: "failed to find the planner and add the plan."})

  } catch (err) {
      res.status(500).json({ status: 500, message: err });
  } finally {
    client.close()
  }
}

module.exports = {getUser, postNewUser, postNewStock, modifyStock, deleteStock, postAddGrocery, getGrocery, deleteFromGrocery, postNewRecipe, getRecipes, getPlanner, addPlan, getUserInviteCode, postNewUserInvited}