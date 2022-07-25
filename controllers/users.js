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
        let data = JSON.parse(fs.readFileSync('./db.json'));
        // Menambahkan data baru
        data.users.push({
            id: data.users[data.users.length - 1].id + 1,
            ...req.body
        })

        // Menulis ulang data terbaru
        fs.writeFileSync('./db.json', JSON.stringify(data));
        res.status(200).send(JSON.parse(fs.readFileSync('./db.json')).users);
    },
    updateData: (req, res) => {
        let data = JSON.parse(fs.readFileSync('./db.json'));

        let idx = data.users.findIndex(val => val.id == req.params.id);

        data.users[idx] = { ...data.users[idx], ...req.body };

        fs.writeFileSync('./db.json', JSON.stringify(data));
        res.status(200).send(JSON.parse(fs.readFileSync('./db.json')).users);
    },
    deleteData: (req, res) => {
        let data = JSON.parse(fs.readFileSync('./db.json'));

        let idx = data.users.findIndex(val => val.id == req.params.id);

        data.users.splice(idx, 1);
        fs.writeFileSync('./db.json', JSON.stringify(data));
        res.status(200).send(JSON.parse(fs.readFileSync('./db.json')).users)
    }
}