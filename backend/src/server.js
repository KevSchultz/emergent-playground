const application = require('./application');

const PORT = 3010;

application.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
