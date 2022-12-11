import { Injectable } from '@angular/core';
import { Trip } from './trips/trips.component';
import { Firestore, collectionData, orderBy, collection, getDocs, query, doc, setDoc, addDoc, where, updateDoc } from '@angular/fire/firestore'
import { getDoc } from '@angular/fire/firestore';
import { deleteDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private db: Firestore) { }
    
  async getCollection() {
    const q = query(collection(this.db, "Wycieczki"), orderBy("id"));

    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }

  async getDocById(id: number) {
    const q = query(collection(this.db, "Wycieczki"), where("id", "==", id))

    const querySnapshot = await getDocs(q);
    return doc(this.db, "Wycieczki", querySnapshot.docs[0]["id"]);
  }

  async addDocTrip(trip: Trip) {
    const querySnapshot = await this.getCollection();
    let maxid = querySnapshot.docs[querySnapshot.docs.length - 1].data()["id"];

    const docRef = await addDoc(collection(this.db, "Wycieczki"), {
        id: Number(maxid + 1),
        name: trip.name,
        country: trip.country,
        startDate: trip.startDate,
        endDate: trip.endDate,
        maxSpots: Number(trip.maxSpots),
        price: Number(trip.price),
        description: trip.description,
        img: trip.image
    })
  }

  async removeDocById(id: number) {
    const q = query(collection(this.db, "Wycieczki"), where("id", "==", id))

    const querySnapshot = await getDocs(q);
    await deleteDoc(doc(this.db, "Wycieczki", querySnapshot.docs[0]["id"]));
  }

  async changePriceOfTrip(id: number, price:number) {
    const q = query(collection(this.db, "Wycieczki"), where("id", "==", id))

    const querySnapshot = await getDocs(q);
    await updateDoc(doc(this.db, "Wycieczki", querySnapshot.docs[0]["id"]), {
        price: price
    });
  }

  async changeDescriptionOfTrip(id: number, description: string) {
    const q = query(collection(this.db, "Wycieczki"), where("id", "==", id))

    const querySnapshot = await getDocs(q);
    await updateDoc(doc(this.db, "Wycieczki", querySnapshot.docs[0]["id"]), {
        description: description
    });
  }

  async changeMaxSpotsOfTrip(id: number, maxSpots: number) {
    const q = query(collection(this.db, "Wycieczki"), where("id", "==", id))

    const querySnapshot = await getDocs(q);
    await updateDoc(doc(this.db, "Wycieczki", querySnapshot.docs[0]["id"]), {
        maxSpots: maxSpots
    });
  }
}