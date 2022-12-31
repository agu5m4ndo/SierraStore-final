const { database } = require('firebase-admin'),
    admin = require('firebase-admin');

const serviceAccount = require('../../db/final-coderhouse-firebase-adminsdk-c3iy7-509dde72c0.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

console.log('Base de datos conectada a través de firebase')

const db = admin.firestore();

class ContenedorFirebase {
    constructor(collectionName) {
        this.collectionName = collectionName;
        this.query = db.collection(collectionName);
        this.idValue = 1;
    }

    increaseId() {
        this.idValue++;
    }

    async create(object, key) {
        try {
            object.id = this.idValue;
            this.increaseId();
            const option = key ? key : object.id;
            const doc = this.query.doc(`${option}`);
            await doc.create(object)
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            const querySnapshot = await this.query.get();
            const list = querySnapshot.docs.map(doc => doc.data());
            return list;
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const doc = this.query.doc(`${id}`);
            const item = await doc.get();
            const response = item.data();
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, differences) {
        try {
            let doc = this.query.doc(`${id}`);
            let item = doc.update(differences);
            return item
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            let doc = query.doc(`${id}`);
            let item = doc.delete();
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = ContenedorFirebase;