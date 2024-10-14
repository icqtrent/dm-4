import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const addToSheet = functions.firestore
  .document("users/{userId}")
  .onCreate(async (snap, context) => {
    const newValue = snap.data();

    const scriptUrl = "https://script.google.com/macros/s/AKfycbw2QOUQwcQ6y47fQ9NrVu9bfofRIEC8hf6-U0s7xKzsdCuo5qcyMJzDGm4Pj4YGNgUgbw/exec";

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newValue),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      console.log("Data sent to Google Sheets");
    } catch (error) {
      console.error("Error sending data to Google Sheets", error);
    }
  });
