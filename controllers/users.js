const fs = require('fs');

module.exports = {
    getData: (req, res) => {
        let usersData = JSON.parse(fs.readFileSync('./db.json')).users;
        if (JSON.stringify(req.query) != '{}') {

            let filterData = usersData.filter((val) => {
                let check = [];
                for (const prop in req.query) {
                    check.push(val[prop] == req.query[prop]);
                }
                if (!check.includes(false)) {
                    return val
                }
            })

            if (filterData.length == 0) {
                res.status(400).send({
                    error: 'Data not found ⚠️'
                });
            } else {
                res.status(200).send(filterData);
            }

        } else {
            res.status(200).send(usersData)
        }
    },
    addData: (req, res) => {
        // Membaca data yg sudah ada
        let usersData = JSON.parse(fs.readFileSync('./db.json')).users;
        // Menambahkan data baru
        usersData.push({
            id: usersData[usersData.length - 1].id + 1,
            ...req.body
        })

        // Menulis ulang data terbaru
        fs.writeFileSync('./db.json', JSON.stringify(usersData));
        res.status(200).send(fs.readFileSync('./db.json'));
    },
    updateData: (req, res) => {

    },
    deleteData: (req, res) => {

    }
}