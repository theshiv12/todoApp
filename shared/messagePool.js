const messagePool = new Map();

messagePool.set('userAlreadyRegistered', "User already registered with this Email.");
messagePool.set('userRegisteredSuccess', "User is registered successfully");
messagePool.set('userNotRegistered', "User registration failed!");
messagePool.set('APP_TO_DB_CONNECTION', "Application connected to MongoDB Successfully.");
messagePool.set('APP_STARTED', "Application Server is running on port:");
messagePool.set('taskAdded', "New Task created successfully");
messagePool.set('SUCCESS_STATUS_CODE', 200);
messagePool.set('BAD_REQUEST_STATUS_CODE', 400);
messagePool.set('NOT_FOUND_STATUS_CODE', 404);
messagePool.set('INTERNAL_SERVER_ERROR', 500);


module.exports = messagePool;