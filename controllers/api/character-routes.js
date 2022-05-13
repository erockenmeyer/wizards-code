const router = require("express").Router();
const { User, Character } = require("../../models");

router.get("/", (req, res) => {
    Character.findAll({
        attributes: ["id", "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma", "class", "name", "str", "dex", "con", "int", "wis", "cha"],
        include: [
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbCharacterData => res.json(dbCharacterData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/:id", (req, res) => {
    Character.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id", "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma", "class", "name", "str", "dex", "con", "int", "wis", "cha"],
        include: [
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbCharacterData => {
            if (!dbCharacterData) {
                res.status(404).json({ messgae: "No character found with this id" });
                return;
            }
            res.json(dbCharacterData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/", (req, res) => {
    Character.create({
        user_id: req.body.user_id,
        strength: req.body.strength,
        dexterity: req.body.dexterity,
        constitution: req.body.constitution,
        intelligence: req.body.intelligence,
        wisdom: req.body.wisdom,
        charisma: req.body.charisma,
        class: req.body.class,
        name: req.body.name,
        str: req.body.str,
        dex: req.body.dex,
        con: req.body.con,
        int: req.body.int,
        wis: req.body.wis,
        cha: req.body.cha
    })
        .then(dbCharacterData => res.json(dbCharacterData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put("/:id", (req, res) => {
    Character.update(
        {
            
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbCharacterData => {
        if (!dbCharacterData) {
            res.status(404).json({ message: "No character found with this id" });
            return;
        }
        res.json(dbCharacterData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
    Character.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCharacterData => {
        if (!dbCharacterData) {
            res.status(404).json({ messgae: "No character found with this id "});
            return;
        }
        res.json(dbCharacterData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;