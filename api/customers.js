var faker = require('faker');
faker.locale = "ru";

function generateCustomers () {
    const departments = [];
    const peoples = [];

    for (let i = 0; i < 10; i++) {
        const department = faker.commerce.department();
        const idDepartment = faker.random.number();
        const randomPeople = Math.round(Math.random() * (10 - 1) + 1);

        for (let i = 0; i < randomPeople; i++) {
            const id = faker.random.number();
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const phoneNumber = faker.phone.phoneNumber();
            const avatarUrl = faker.image.avatar();

            peoples.push({
                id,
                firstName,
                lastName,
                phoneNumber,
                avatarUrl,
                idDepartment
            })
        }

        departments.push({
            idDepartment,
            department
        })
    }

    return { "api": {
        departments,
        peoples
    } }
}


// json-server requires that you export
// a function which generates the data set
module.exports = generateCustomers