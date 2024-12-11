const { MongoClient } = require("mongodb");

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || "files_manager";
const url =
  "mongodb+srv://farghamdy:soWfMen7SxfjWwrG@cluster0.nfiitbr.mongodb.net/schoolDB?retryWrites=true&w=majority&appName=Cluster0";

class DBClient {
  constructor() {
    this.db = null;
    this.usersCollection = null;
    this.filesCollection = null;
  }

  /**
   * Initializes the MongoDB client and connects to the database
   */
  async connect() {
    try {
      const client = await MongoClient.connect(url, {
        useUnifiedTopology: true,
      });
      this.db = client.db(DB_DATABASE);
      this.usersCollection = this.db.collection("users");
      this.filesCollection = this.db.collection("files");
      console.log("Connected successfully to server");
    } catch (err) {
      console.log("Error connecting to database:", err.message);
    }
  }

  /**
   * Checks if connection to MongoDB is alive
   * @return {boolean} true if connection is alive, false otherwise
   */
  isAlive() {
    return Boolean(this.db);
  }

  /**
   * Returns the number of documents in the collection "users"
   * @return {number} the amount of users
   */
  async nbUsers() {
    if (this.usersCollection) {
      const numberOfUsers = await this.usersCollection.countDocuments();
      return numberOfUsers;
    }
    return 0;
  }

  /**
   * Returns the number of documents in the collection "files"
   * @return {number} the amount of files
   */
  async nbFiles() {
    if (this.filesCollection) {
      const numberOfFiles = await this.filesCollection.countDocuments();
      return numberOfFiles;
    }
    return 0;
  }
}

// Initialize DB client and connect
const dbClient = new DBClient();
dbClient.connect().then(() => {
  // After connection, you can start performing DB operations
  // Example:
  dbClient.nbUsers().then((count) => console.log(count));
});

module.exports = dbClient;
