const AWS = require("aws-sdk");

class Dynamo {
    /**
     * Class to set up connecting to the DynamoDB on AWS.
     * @param region {string} AWS region to connect to eg. "us-west-2"
     * @param ip {string} endpoint address of the database
     */
    constructor(region, ip) {
        AWS.config.update({
            region: region,
            endpoint: ip
        });
        this.conn = new AWS.DynamoDB();
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    /**
     * Creates a table in the region specified. Table names should
     * be unique in each region.
     * @param dbParam {JSON} params for creating a table
     * @returns promise of creating table in the database
     */
    _createTable(dbParam) {
        return new Promise((resolve, reject) => {
            this.conn.createTable(dbParam, function(err, data){
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    }

    /**
     * Creates a Episodes table
     * @returns Promise of creating Episode Table in the database
     */
    createEpisodesTable() {
        const params = {
            TableName: "Episodes",
            KeySchema: [
                {AttributeName: "show", KeyType: "HASH"},
                {AttributeName: "title", KeyType: "RANGE"},
            ],
            AttributeDefinitions: [
                {AttributeName: "show", AttributeType: "S"},
                {AttributeName: "title", AttributeType: "S"},
                {AttributeName: "date", AttributeType: "N"}
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            },
            GlobalSecondaryIndexes: [{
                IndexName: "DateIndex",
                KeySchema: [
                    {AttributeName: "date", KeyType: "HASH"}
                ],
                Projection: {
                    ProjectionType: "INCLUDE",
                    NonKeyAttributes:["show", "title", "description", "season", "episode"]
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                }
            }]

        }
        return new Promise((resolve) => {
            resolve(this._createTable(params));
        })
    }

    /**
     *
     * @returns Promise of creating a Shows table
     */
    createShowTable() {
        const params = {
            TableName: "Shows",
            KeySchema: [
                { AttributeName: "network", KeyType: "HASH"},
                { AttributeName: "show", KeyType: "RANGE"}
            ],
            AttributeDefinitions: [
                {AttributeName: "network", AttributeType: "S"},
                {AttributeName: "show", AttributeType: "S"}
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 3
            }
        }
        return new Promise((resolve) => {
            resolve(this._createTable(params));
        });
    }

    /**
     * Creates a Users table.
     * @returns returns promise to create a User Table
     */
    createUserTable() {
        const params = {
            TableName: "Users",
            KeySchema: [
                {AttributeName: "email", KeyType: "HASH"}
            ],
            AttributeDefinitions: [
                { AttributeName: "email", AttributeType: "S"}
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 3,
                WriteCapacityUnits: 1
            }
        }
        return new Promise((resolve) => {
            resolve(this._createTable(params))
        });
    }

    /**
     * Private promise method to insert data into DynamoDB
     * @param {JSON} dbParams
     * @returns {Promise<JSON>}
     * @private
     */
    _insertTable(dbParams) {
        return new Promise((resolve, reject) => {
            this.docClient.put(dbParams, function(err, data){
               if (err) {
                   reject(err);
               } else {
                   resolve(data);
               }
            });
        });
    }

    /**
     * Inserting into Episodes database
     * @param {JSON} episode
     * @returns {Promise<JSON>}
     */
    insertEpisode(episode) {
        const params = {
            TableName: "Episodes",
            Item: {
                "show": episode.show,
                "title": episode.title,
                "info": episode.info
            }
        }
        return new Promise((resolve) => {
            resolve(this._insertTable(params));
        });
    }

    /**
     * Inserting into Shows database
     * @param {JSON} show
     * @returns {Promise<JSON>}
     */
    insertShow(show) {
        const params = {
            TableName: "Shows",
            Item: {
                "network": show.network,
                "show": show.title,
                "info": show.info
            }
        }
        return new Promise((resolve) => {
            resolve(this._insertTable(params));
        });
    }

    /**
     * Inserting into Users database
     * @param {JSON} user
     * @returns {Promise<JSON>}
     */
    insertUser(user) {
        const params = {
            TableName: "Users",
            Item: {
                "email": user.email,
                "info": user.info
            }
        }

        return new Promise((resolve) => {
            resolve(this._insertTable(params));
        });
    }

    /**
     * Returns a promise of the query of DynamoDB
     * @param {JSON} dbParams
     * @returns {Promise<JSON>}
     * @private method
     */
    _queryTable(dbParams) {
        return new Promise((resolve, reject)=> {
            this.docClient.query(dbParams, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        }).catch(function(err) {
            console.error(JSON.stringify(err, null, 2));
        });
    }


    /**
     *  Queries the Episode table
     * @param {Object} episode data structure, requires show then episode name
     * @returns {Promise<Object>}a Promise of a JSON-obj
     */
    queryEpisode(episode) {
        let params;
        if (episode.hasOwnProperty('title') && episode.hasOwnProperty('show')) {
            params = {
                TableName: "Episodes",
                KeyConditionExpression: "#show = :show and title = :title",
                ExpressionAttributeNames: {
                    "#show": "show"
                },
                ExpressionAttributeValues: {
                    ":show": episode.show,
                    ":title": episode.title
                }
            };
        } else if (episode.hasOwnProperty('show')) {
            params = {
                TableName: "Episodes",
                KeyConditionExpression: "#show = :show",
                ExpressionAttributeNames: {
                    "#show": "show"
                },
                ExpressionAttributeValues: {
                    ":show": episode.show
                }
            };
        } else {
            throw new Error("Needs to have property of show and/or episode.");
        }
        return this._queryTable(params);
    }

    /**
     * Queries the Shows table
     * @param {Object} show has to contain the network and/or show property to query
     * @returns {Promise<JSON>}
     */
    queryShow(show) {
        let params;
        if (show.hasOwnProperty('network') && show.hasOwnProperty('show')) {
            params = {
                TableName: "Shows",
                KeyConditionExpression: "#network = :network and show = :show",
                ExpressionAttributeNames: {
                    "#network": "network"
                },
                ExpressionAttributeValues: {
                    ":network": show.network,
                    ":show": show.show
                }
            }
        } else if (show.hasOwnProperty('network')) {
            params = {
                TableName: "Shows",
                KeyConditionExpression: "#network = :network",
                ExpressionAttributeNames: {
                    "#network": "network"
                },
                ExpressionAttributeValues: {
                    ":network": show.network
                }
            }
        } else {
            throw new Error("Show query requires property of network and/or show.");
        }
        return this._queryTable(params);
    }

    /**
     * Queries the Users table
     * @param {Object} user requires the email property
     * @returns {Promise<Object>}
     */
    queryUser(user) {
        if (!user.hasOwnProperty('email')){
            throw new Error("user object requires the property of email.");
        }
        const params = {
            TableName: "Users",
            KeyConditionExpression: "#email = :email",
            ExpressionAttributeNames: {
                "#email": "email"
            },
            ExpressionAttributeValues: {
                ":email": user.email
            }
        }
        return this._queryTable(params);
    }

}

module.exports = Dynamo