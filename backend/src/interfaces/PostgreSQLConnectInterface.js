module.exports = class PostgreSQLConnectInterface {

    /**
     * @description Gets the current date and time and formats it as a timestamp string.
     *
     * The format of the timestamp string is "YYYY-MM-DD HH:mm:ss.SSS", where:
     * - "YYYY" is the four-digit year.
     * - "MM" is the two-digit month (01 = January, 12 = December).
     * - "DD" is the two-digit day of the month.
     * - "HH" is the two-digit hour of the day in 24-hour format.
     * - "mm" is the two-digit minute of the hour.
     * - "ss" is the two-digit second of the minute.
     * - "SSS" is the three-digit millisecond of the second.
     *
     * @returns {string} The formatted timestamp string.
     */
    getCurrentTimeStamp() {
        throw new Error(
            'Interface violation: PostgreSQLConnect getCurrentTimeStamp() not implemented.'
        );
    }

    async createAccount(username, email, password) {
        throw new Error(
            'Interface violation: PostgreSQLConnect async createAccount(username, email, password) not implemented.'
        );
    }

    async getAccount(email=null, userID=null) {
        throw new Error(
            'Interface violation: PostgreSQlConnect async getAccount(email) not implemented.'
        )
    }

    async createPost(userID, username, title, poststate, postproperties) {
        throw new Error(
            'Interface violation: PostgreSQLConnect async createPost(userID, postTitle, postBinaryData) not implemented.'
        );
    }

    async getPost(post) {
        throw new Error(
            'Interface violation: PostgreSQLConnect async getPost(postTitle) not implemented.'
        );
    }

    async getPostsList(sorting, userID) {
        throw new Error(
            'Interface violation: PostgreSQLConnect async getPostsList(client, sorting, userID) not implemented.'
        );
    }
};
